import { TaskStatus } from '../task.model';

export class SearchFilterDto {
  status?: TaskStatus;
  search?: string;
}
