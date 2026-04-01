import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { KnownBug } from 'src/known-bug/entities/known-bug.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(KnownBug)
    private readonly knownRepo: Repository<KnownBug>
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, ...rest } = createUserDto;

    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Korisnik sa ovim email-om vec postoji');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepo.create({
      ...rest,
      email,
      password: hashedPassword,
      reputation: 0,
      unknown_bugs_scanned: 0,
      comments_helping_others: 0,
      other_users_rated: 0,
    });

    return this.userRepo.save(user);
  }
  async findAll() {
    return this.userRepo.find({
      relations: ['known_scans', 'unknown_scans', 'saved_bugs']
    });
  }

  async findOne(id: number) {
    return this.userRepo.findOne({
      where: { id },
      relations: ['known_scans', 'unknown_scans', 'saved_bugs']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (user) {
      return this.userRepo.remove(user);
    } else return `No user found with this id:  #${id}`;
  }

  async addfound(id: number, userID: number) {
    const kbug = await this.knownRepo.findOneBy({ id: id })
    const user = await this.userRepo.findOneBy({ id: userID })

    if (kbug && user) {
      user.known_scans.push(kbug);

      return this.userRepo.save(user);
    } else return `Custom error!`;
  }

  async savebug(id: number, userID: number) {
    const kbug = await this.knownRepo.findOneBy({ id: id })
    const user = await this.userRepo.findOneBy({ id: userID })

    if (kbug && user) {
      if (!user.saved_bugs.some(b => b.id === id)) {
        user.saved_bugs.push(kbug);
        return this.userRepo.save(user);
      }
    } else return `Custom error!`;

  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
    });
  }
}
