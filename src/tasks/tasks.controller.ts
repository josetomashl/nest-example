import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';
import { GetAuthor } from '../decorators/get-author.decorator';

@Controller('tasks')
export class TasksController {
  private readonly logger = new Logger(TasksController.name);

  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll(@GetAuthor() user: User): Promise<Task[]> {
    // Example of logging messages into the console
    this.logger.verbose(`User "${user.username}" retrieving all tasks`);
    return this.taskService.findAll(user);
  }

  @Get(':id')
  async findById(
    @Param('id') id: string,
    @GetAuthor() user: User,
  ): Promise<Task> {
    const task = await this.taskService.findById(id, user);
    if (!task) throw new NotFoundException();
    return task;
  }

  @Post()
  async create(
    @GetAuthor() user: User,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" posted a new task with title "${createTaskDto.title}"`,
    );
    return this.taskService.create(createTaskDto, user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetAuthor() user: User,
  ): Promise<Task> {
    await this.findById(id, user);
    return this.taskService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @GetAuthor() user: User,
  ): Promise<void> {
    await this.findById(id, user);
    return this.taskService.delete(id);
  }
}
