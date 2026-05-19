import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.email) throw new Error('Email is required');

    if (!createUserDto.password || createUserDto.password.length < 8)
      throw new Error('Password must be at least 8 characters long');

    if (createUserDto.password !== createUserDto.confirmPassword)
      throw new Error('Passwords do not match');

    await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        password: createUserDto.email,
        email: createUserDto.email,
        name: '',
      },
    });

    return `User ${createUserDto.username} created !`;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
