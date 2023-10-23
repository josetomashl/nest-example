import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    return this.tasksRepository.findBy({ user });
  }

  async findById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.findOneBy({ id, user });
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    return this.tasksRepository.save(newTask);
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    await this.tasksRepository.update(id, updateTaskDto);
    return this.findById(id, user);
  }

  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
