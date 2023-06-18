import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from './users.repository';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(userCreateInput) {
    try {
      const hashedPassword = await bcrypt.hash(userCreateInput.password, 10);
      const createdUser = await this.usersRepository.createUser({
        data: {
          ...userCreateInput,
          password: hashedPassword,
        },
      });
      createdUser.password = undefined;

      return createdUser;
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
  }

  async findUniqueUser(params: Prisma.UserWhereUniqueInput) {
    const user = this.usersRepository.findUniqueUser({ where: params });
    return user;
  }
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
