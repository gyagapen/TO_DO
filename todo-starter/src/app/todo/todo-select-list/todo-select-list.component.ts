import {Component, OnInit, ViewChild} from '@angular/core';
import {TodoModel} from '../../todo-model';
import {TodoService} from '../todo.service';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {TodoItemModel} from '../../todo-item-model';
import {TodoModule} from '../todo.module';

@Component({
  selector: 'app-todo-select-list',
  templateUrl: './todo-select-list.component.html',
  styleUrls: ['./todo-select-list.component.css'],
})
export class TodoSelectListComponent implements OnInit {

  todoList: TodoModel[];
  selectedList: number;
  errorMsg: String;
  newItemName: String;


  constructor(private todoService: TodoService) {
    this.todoList = new Array<TodoModel>();
    this.selectedList = -1;
    this.errorMsg = '';
  }

  ngOnInit() {
    this.fetchAllList();
  }

  fetchAllList() {
    this.todoService.getTodoList().subscribe(
      (res) => {this.todoList = res;
        if (this.todoList.length > 0) {
          this.selectedList = 0;
        }
      });
  }


  createTodoList(newItemName: string) {

    try {
      if (this.isListNameValid(newItemName)) {
        this.todoService.createTodoList(newItemName).subscribe(
          (v) => {
            this.todoList.push(v as TodoModel);
            this.errorMsg = '';
          },
          (e) => this.errorMsg = 'Error while adding new item' + e.message
        );
      }
    } catch (e) {
      this.errorMsg = 'Error while adding new item' + e.message.toString();
    }

  }

  isListNameValid(listName: string) {

    let isValid: Boolean = true;
    const validCharacters =  new RegExp('^[A-Za-z0-9 ]+$');

    // check if null
    if (listName.trim() === '') {
      isValid = false;
      this.errorMsg = 'Name cannot be null';
    } else {
      // check if contains special characters
      if (!(validCharacters.test(listName))) {
        isValid = false;
        this.errorMsg = 'Name cannot contain any special character';
      }
    }

    return isValid;

  }

  onSelect(event) {
    this.selectedList = event.srcElement.selectedIndex;
  }
}
