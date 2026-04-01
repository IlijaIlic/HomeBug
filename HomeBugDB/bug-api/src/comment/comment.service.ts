import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UnknownBug } from 'src/unknown-bug/entities/unknown-bug.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment)
    private readonly comRepo: Repository<Comment>,
    @InjectRepository(UnknownBug)
    private readonly ubugRepo: Repository<UnknownBug>,
  ) { }

  async create(createCommentDto: CreateCommentDto, userID: number) {
    const ubug = await this.ubugRepo.find({ where: { id: createCommentDto.ubugId } })

    if (!ubug) throw new NotFoundException("Unknown bug not found!")

    const com = this.comRepo.create({
      text: createCommentDto.text,
      ubug: { id: createCommentDto.ubugId },
      rating: 0,
      user: {id: userID}
    });
    return this.comRepo.save(com);
  }

  async findAll() {
    return this.comRepo.find({
      relations: ['user', 'ubug']
    })
  }

  async findOne(id: number) {
    return this.comRepo.find({
      where: { id },
      relations: ['user', 'ubug']
    })
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const com = await this.findOne(id);

    if (com) {
      return this.comRepo.remove(com)
    } else {
      return `Cannot find comment with this id: #${id}`
    }
  }

  async like(id: number) {
    const com = await this.comRepo.findOneBy({ id: id });
    if (com) {
      com.rating++;
      await this.comRepo.save(com);
    } else {
      return `Cannot find comment with this id: #${id}`
    }
  }

  async dislike(id: number) {
    const com = await this.comRepo.findOneBy({ id: id });
    if (com) {
      com.rating--;
      await this.comRepo.save(com);
    } else {
      return `Cannot find comment with this id: #${id}`
    }
  }
}
