import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const userNameExist = await this.prismaService.user.findUnique({
      where: {
        id: createTaskDto.userId,
      },
    });

    if (!userNameExist) {
      throw new NotFoundException(`UserId don't exist`);
    }

    return this.prismaService.task.create({
      data: {
        description: createTaskDto.description,
        days: createTaskDto.days,
        currentTime: createTaskDto.currentTime,
        finish: createTaskDto.finish,
        start: createTaskDto.start,
        status: createTaskDto.status,
        totalTime: createTaskDto.totalTime,
        type: createTaskDto.type,
        userId: createTaskDto.userId,
      },
    });
  }

  async findAll(userId: string) {
    const userNameExist = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userNameExist) {
      throw new NotFoundException(`UserId don't exist`);
    }

    return this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(taskId: string) {
    return this.prismaService.task.findUniqueOrThrow({
      where: {
        id: taskId,
      },
    });
  }

  async findToday(userId: string, day: string) {
    const allTask = await this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
    if (allTask.length <= 0) {
      throw new NotFoundException('User do not have any tasks');
    }

    const taskToday = {};

    allTask.map((task, i) => {
      if (task.days[day] == true) {
        taskToday[i] = task;
      }
    });

    return taskToday;
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return this.prismaService.task.update({
      where: {
        id,
      },
      data: {
        description: updateTaskDto.description,
        days: updateTaskDto.days,
        currentTime: updateTaskDto.currentTime,
        finish: updateTaskDto.finish,
        start: updateTaskDto.start,
        status: updateTaskDto.status,
        totalTime: updateTaskDto.totalTime,
        type: updateTaskDto.type,
      },
    });
  }

  remove(id: string) {
    return this.prismaService.task.delete({
      where: {
        id,
      },
    });
  }
}
