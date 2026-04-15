import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnknownBug } from '@unknown-bug/entities/unknown-bug.entity';
import { Rating } from '../rating/entities/rating.entity';
import { Comment } from '@comment/entities/comment.entity'
import { User } from '@user/entities/user.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly comRepo: Repository<Comment>,
    @InjectRepository(UnknownBug)
    private readonly ubugRepo: Repository<UnknownBug>,
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  async create(createCommentDto: CreateCommentDto, userID: number) {
    const ubug = await this.ubugRepo.find({ where: { id: createCommentDto.ubugId } })

    if (!ubug) throw new NotFoundException("Unknown bug not found!")

    const com = this.comRepo.create({
      text: createCommentDto.text,
      ubug: { id: createCommentDto.ubugId },
      rating: 0,
      user: { id: userID }
    });
    return this.comRepo.save(com);
  }

  async findAll() {
    return this.comRepo.find({
      relations: ['user', 'ubug', 'ratings']
    })
  }

  async findOne(id: number) {
    return this.comRepo.findOne({
      where: { id },
      relations: ['user', 'ubug', 'ratings']
    })
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a ${id} comment`;
  }

  async remove(id: number, userId: number) {
    const com = await this.findOne(id);

    if (com) {
      if (com.user.id) {
        return this.comRepo.remove(com)
      } else {
        throw new UnauthorizedException("Can only remove your comments")
      }
    } else {
      return `Cannot find comment with this id: ${id}`
    }
  }

  async like(commentId: number, userId: number) {
    const com = await this.comRepo.findOne({
      where: { id: commentId },
      relations: ['user', 'ratings'],
    });

    if (!com) {
      return `Cannot find comment with this id: ${commentId}`;
    }

    let rating = await this.ratingRepo
      .createQueryBuilder('rating')
      .where('rating.userId = :userId', { userId })
      .andWhere('rating.commentId = :commentId', { commentId })
      .getOne();

    if (!rating) {
      await this.ratingRepo.insert({
        userId,
        commentId,
        rate: '+',
      });

      await this.comRepo.increment({ id: commentId }, 'rating', +1);
      await this.userRepo.increment({ id: com.user.id }, 'reputation', +1)

      return `You liked comment ${commentId}`;
    }

    if (rating.rate === '+') {
      await this.ratingRepo.delete(rating)
      await this.comRepo.increment({ id: commentId }, 'rating', -1);
      await this.userRepo.increment({ id: com.user.id }, 'reputation', -1)
      return `You removed your like.`;
    }

    if (rating.rate === '-') {
      await this.ratingRepo.update(
        { id: rating.id },
        { rate: '+' }
      );

      await this.comRepo.increment({ id: commentId }, 'rating', +2);
      await this.userRepo.increment({ id: com.user.id }, 'reputation', +2)
      return `You changed your dislike to like.`;
    }
  }

  async dislike(commentId: number, userId: number) {
    const com = await this.comRepo.findOne({
      where: { id: commentId },
      relations: ['user', 'ratings']
    });

    if (!com) {
      return `Cannot find comment with this id: ${commentId}`;
    }


    let rating = await this.ratingRepo
      .createQueryBuilder('rating')
      .where('rating.userId = :userId', { userId })
      .andWhere('rating.commentId = :commentId', { commentId })
      .getOne();

    console.log('RATING1:', rating);


    if (!rating) {
      await this.ratingRepo.insert({
        userId,
        commentId,
        rate: '-',
      });

      await this.comRepo.increment({ id: commentId }, 'rating', -1);
      await this.userRepo.increment({ id: com.user.id }, 'reputation', -1)

      return `You disliked comment ${commentId}`;
    }

    if (rating.rate === '-') {
      await this.ratingRepo.delete({ id: rating.id });

      await this.comRepo.increment({ id: commentId }, 'rating', 1);
      await this.userRepo.increment({ id: com.user.id }, 'reputation', 1)

      return `You removed your dislike.`;
    }
    else if (rating.rate === '+') {
      await this.ratingRepo.update(
        { id: rating.id },
        { rate: '-' }
      );

      await this.comRepo.increment({ id: commentId }, 'rating', -2);
      await this.userRepo.increment({ id: com.user.id }, 'reputation', -2)

      return `You changed your like to dislike.`;
    }
  }

}
