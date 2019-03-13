export class TodoItemModel {
  id: number;
  description: string;
  completed: boolean;

  constructor() {
    this.description = '';
    this.completed = false;
  }

}
