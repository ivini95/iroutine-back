import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userNameExist = await this.prismaService.user.findUnique({
      where: {
        name: createUserDto.name,
      },
    });

    if (userNameExist) {
      throw new NotFoundException(`User ${createUserDto.name} alredy exist`);
    }

    return this.prismaService.user.create({
      data: {
        name: createUserDto.name,
        password: createUserDto.password,
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userNameExist = await this.prismaService.user.findUnique({
      where: {
        name: updateUserDto.name,
      },
    });

    if (userNameExist) {
      throw new NotFoundException(`User ${updateUserDto.name} alredy exist`);
    }

    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        name: updateUserDto.name,
      },
    });
  }

  async remove(id: string) {
    await this.prismaService.task.deleteMany({
      where: {
        userId: id,
      },
    });

    return this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }
}
