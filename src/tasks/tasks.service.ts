import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { SearchFilterDto } from './dto/search-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'a', description: 'a', status: TaskStatus.DONE },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByFilters(filterDto: SearchFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.findAll();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  findById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  create(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateStatus(id: string, status: TaskStatus): Task {
    const task = this.findById(id);
    task.status = status;
    return task;
  }

  delete(id: string) {
    const task = this.findById(id);
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }
}
