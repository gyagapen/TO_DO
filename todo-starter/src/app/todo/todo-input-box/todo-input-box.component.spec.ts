import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoInputBoxComponent } from './todo-input-box.component';
import {FormsModule} from '@angular/forms';
import {TodoModel} from '../../todo-model';
import {TodoService} from '../todo.service';
import {HttpClient, HttpErrorResponse, HttpHandler} from '@angular/common/http';
import {TodoItemModel} from '../../todo-item-model';
import {of} from 'rxjs';

describe('TodoInputBoxComponent', () => {
  let component: TodoInputBoxComponent;
  let fixture: ComponentFixture<TodoInputBoxComponent>;
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ TodoInputBoxComponent ],
      providers: [HttpClient, HttpHandler, TodoService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoInputBoxComponent);
    todoService = TestBed.get(TodoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('test add item', () => {
    it('should add new item to existing list', () => {
      const todoItem: TodoItemModel = <TodoItemModel>{};
      spyOn(todoService, 'addItem').and.returnValue(of(todoItem));
      const todoList: TodoModel = new TodoModel();
      todoList.id = 0;
      component.selectedList = todoList;
      component.addItem('item description');
      expect(component.selectedList.items.length).toBe(1);
    });
    it('populate error msg on add item service failure', () => {
      spyOn(todoService, 'addItem').and.returnValue(of(HttpErrorResponse));
      const todoList: TodoModel = new TodoModel();
      todoList.id = 0;
      component.selectedList = todoList;
      component.addItem('item description');
      expect(component.errorMsg).not.toBeTruthy(null);
    });
  });
});
