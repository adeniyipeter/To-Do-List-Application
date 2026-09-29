import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TodoListComponent } from './todo-list.component';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  template: '<div>Mock Form</div>'
})
class MockTodoFormComponent {
  @Input() isSubmitting: boolean = false;
  @Output() addTodo = new EventEmitter<string>();
}

@Component({
  selector: 'app-todo-item',
  template: '<div>Mock Item</div>'
})
class MockTodoItemComponent {
  @Input() todo!: Todo;
  @Input() isUpdating: boolean = false;
  @Input() isDeleting: boolean = false;
  @Output() toggleComplete = new EventEmitter<Todo>();
  @Output() editTodo = new EventEmitter<{ id: number; title: string }>();
  @Output() deleteTodo = new EventEmitter<number>();
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let mockTodoService: jasmine.SpyObj<TodoService>;

  const initialMockTodos: Todo[] = [
    { userId: 1, id: 1, title: 'Task 1', completed: false },
    { userId: 1, id: 2, title: 'Task 2', completed: true },
    { userId: 1, id: 3, title: 'Task 3', completed: false }
  ];

  beforeEach(async () => {
    mockTodoService = jasmine.createSpyObj('TodoService', [
      'getTodos',
      'addTodo',
      'updateTodo',
      'deleteTodo'
    ]);

    mockTodoService.getTodos.and.callFake(() => of(JSON.parse(JSON.stringify(initialMockTodos))));
    mockTodoService.addTodo.and.returnValue(of({ userId: 1, id: 201, title: 'New task', completed: false }));
    mockTodoService.updateTodo.and.returnValue(of({ userId: 1, id: 1, title: 'Updated task', completed: true }));
    mockTodoService.deleteTodo.and.returnValue(of(undefined as unknown as void));

    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        MockTodoFormComponent,
        MockTodoItemComponent
      ],
      imports: [FormsModule],
      providers: [
        { provide: TodoService, useValue: mockTodoService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load todos on initialization', () => {
    fixture.detectChanges(); // calls ngOnInit -> fetchTodos()
    expect(mockTodoService.getTodos).toHaveBeenCalled();
    expect(component.todos.length).toBe(3);
    expect(component.isLoading).toBeFalse();
  });

  it('should handle API error when loading todos', () => {
    mockTodoService.getTodos.and.returnValue(throwError(() => new Error('Server error')));
    fixture.detectChanges();

    expect(component.isLoading).toBeFalse();
    expect(component.errorMessage).toBe('Server error');
    expect(component.todos.length).toBe(0);
  });

  it('should add a new task to the top of list', () => {
    fixture.detectChanges();
    component.handleAddTodo('New task');

    expect(mockTodoService.addTodo).toHaveBeenCalledWith({
      title: 'New task',
      completed: false,
      userId: 1
    });
    expect(component.todos.length).toBe(4);
    expect(component.todos[0].title).toBe('New task');
  });

  it('should toggle task completion status', () => {
    fixture.detectChanges();
    const task = component.todos[0]; // completed: false
    component.handleToggleComplete(task);

    expect(mockTodoService.updateTodo).toHaveBeenCalledWith(task.id, { completed: true });
    expect(task.completed).toBeTrue();
  });

  it('should edit task title', () => {
    fixture.detectChanges();
    component.handleEditTodo({ id: 1, title: 'Edited Task 1' });

    expect(mockTodoService.updateTodo).toHaveBeenCalledWith(1, { title: 'Edited Task 1' });
    const updated = component.todos.find(t => t.id === 1);
    expect(updated?.title).toBe('Edited Task 1');
  });

  it('should delete a task from the list', () => {
    fixture.detectChanges();
    component.handleDeleteTodo(1);

    expect(mockTodoService.deleteTodo).toHaveBeenCalledWith(1);
    expect(component.todos.some(t => t.id === 1)).toBeFalse();
    expect(component.todos.length).toBe(2);
  });

  it('should filter todos by All, Pending, and Completed', () => {
    fixture.detectChanges();

    component.setFilter('all');
    expect(component.filteredTodos.length).toBe(3);

    component.setFilter('pending');
    expect(component.filteredTodos.length).toBe(2);
    expect(component.filteredTodos.every(t => !t.completed)).toBeTrue();

    component.setFilter('completed');
    expect(component.filteredTodos.length).toBe(1);
    expect(component.filteredTodos.every(t => t.completed)).toBeTrue();
  });

  it('should calculate counts correctly', () => {
    fixture.detectChanges();
    expect(component.totalCount).toBe(3);
    expect(component.pendingCount).toBe(2);
    expect(component.completedCount).toBe(1);
  });
});
