import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { User } from '@user/entities/user.entity';
import { Comment } from '@comment/entities/comment.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) { }

  async create(createRatingDto: CreateRatingDto): Promise<Rating> {
    const rating = this.ratingRepo.create({
      user: { id: createRatingDto.userId },
      comment: { id: createRatingDto.commentId } as any,
      rate: createRatingDto.rate,
    });

    return await this.ratingRepo.save(rating);
  }


  async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
    const rating = await this.ratingRepo.findOneBy({ id });
    if (!rating) {
      throw new Error(`Rating with id ${id} not found`);
    }

    if (updateRatingDto.rate) {
      rating.rate = updateRatingDto.rate;
    }

    return this.ratingRepo.save(rating);
  }

  async remove(id: number, userId: number): Promise<string> {
    const rating = await this.ratingRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!rating) {
      return `Cannot find rating with id: #${id}`;
    }

    if (rating.user.id !== userId) {
      return `You are not authorized to delete this rating.`;
    }

    await this.ratingRepo.remove(rating);
    return `Rating #${id} deleted successfully.`;
  }

  async findAll(): Promise<Rating[]> {
    return this.ratingRepo.find({ relations: ['user', 'comment'] });
  }

  async findOne(id: number): Promise<Rating | null> {
    return this.ratingRepo.findOne({
      where: { id },
      relations: ['user', 'comment'],
    });
  }
}
