import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from './todo-item.component';
import { Todo } from '../../models/todo.model';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  const mockTodo: Todo = {
    userId: 1,
    id: 10,
    title: 'Test task',
    completed: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = { ...mockTodo };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggleComplete when onToggle is called', () => {
    spyOn(component.toggleComplete, 'emit');
    component.onToggle();
    expect(component.toggleComplete.emit).toHaveBeenCalledWith(component.todo);
  });

  it('should enter and cancel edit mode', () => {
    component.startEdit();
    expect(component.isEditing).toBeTrue();
    expect(component.editTitle).toBe('Test task');

    component.cancelEdit();
    expect(component.isEditing).toBeFalse();
    expect(component.editTitle).toBe('');
  });

  it('should not save edit if title is empty', () => {
    spyOn(component.editTodo, 'emit');
    component.startEdit();
    component.editTitle = '   ';
    component.saveEdit();

    expect(component.editError).toBe('Title cannot be empty.');
    expect(component.editTodo.emit).not.toHaveBeenCalled();
    expect(component.isEditing).toBeTrue();
  });

  it('should emit editTodo when edited title is valid', () => {
    spyOn(component.editTodo, 'emit');
    component.startEdit();
    component.editTitle = 'Updated title';
    component.saveEdit();

    expect(component.editTodo.emit).toHaveBeenCalledWith({ id: 10, title: 'Updated title' });
    expect(component.isEditing).toBeFalse();
  });

  it('should emit deleteTodo when onDelete is called', () => {
    spyOn(component.deleteTodo, 'emit');
    component.onDelete();
    expect(component.deleteTodo.emit).toHaveBeenCalledWith(10);
  });
});
