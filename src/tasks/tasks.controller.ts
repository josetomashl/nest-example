import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchFilterDto } from './dto/search-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  findAll(@Query() filterDto: SearchFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.taskService.findByFilters(filterDto);
    } else {
      return this.taskService.findAll();
    }
  }

  @Get(':id')
  findById(@Param('id') id: string): Task {
    return this.taskService.findById(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.taskService.updateStatus(id, status);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.taskService.delete(id);
  }
}
