import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepository.find();
    return tasks;
  }

  async findById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) throw new NotFoundException();
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.save(createTaskDto);
    return task;
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.findById(id);
    task.status = status;
    return this.tasksRepository.save(task);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findById(id);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async delete(id: string) {
    const task = await this.findById(id);
    // TODO: fix when id is not found (don't know what is happening)
    return this.tasksRepository.delete(task);
  }
}
