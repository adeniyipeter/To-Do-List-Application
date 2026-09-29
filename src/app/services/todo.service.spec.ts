import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  const mockTodos: Todo[] = [
    { userId: 1, id: 1, title: 'Learn Angular', completed: false },
    { userId: 1, id: 2, title: 'Build Todo App', completed: true }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService]
    });
    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos from JSONPlaceholder (GET)', () => {
    service.getTodos(2).subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos?_limit=2');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos);
  });

  it('should add a new todo (POST)', () => {
    const newTodoPayload = { title: 'New Task', completed: false, userId: 1 };
    const mockCreatedTodo: Todo = { id: 201, ...newTodoPayload };

    service.addTodo(newTodoPayload).subscribe((res) => {
      expect(res.id).toBe(201);
      expect(res.title).toBe('New Task');
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodoPayload);
    req.flush(mockCreatedTodo);
  });

  it('should update a todo (PATCH)', () => {
    const updatePayload = { completed: true };
    const mockUpdatedTodo: Todo = { userId: 1, id: 1, title: 'Learn Angular', completed: true };

    service.updateTodo(1, updatePayload).subscribe((res) => {
      expect(res.completed).toBeTrue();
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockUpdatedTodo);
  });

  it('should delete a todo (DELETE)', () => {
    service.deleteTodo(1).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle API errors gracefully', () => {
    service.getTodos().subscribe({
      next: () => fail('expected an error, not todos'),
      error: (error: Error) => {
        expect(error.message).toContain('Server returned code 500');
      }
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/todos?_limit=20');
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
