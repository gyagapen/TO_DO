import { TodoItemModel } from './todo-item-model';

export class TodoModel {
  id: number;
  name: string;
  items: TodoItemModel[];

  constructor() {
    this.name = '';
    this.items = new Array<TodoItemModel>();
  }
}


