import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoFormComponent } from './todo-form.component';

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not emit if task title is empty', () => {
    spyOn(component.addTodo, 'emit');
    component.taskTitle = '   ';
    component.onSubmit();

    expect(component.errorMessage).toBe('Task title cannot be empty.');
    expect(component.addTodo.emit).not.toHaveBeenCalled();
  });

  it('should not emit if task title is less than 3 characters', () => {
    spyOn(component.addTodo, 'emit');
    component.taskTitle = 'ab';
    component.onSubmit();

    expect(component.errorMessage).toBe('Task title must be at least 3 characters long.');
    expect(component.addTodo.emit).not.toHaveBeenCalled();
  });

  it('should emit trimmed title when valid', () => {
    spyOn(component.addTodo, 'emit');
    component.taskTitle = '  Buy groceries  ';
    component.onSubmit();

    expect(component.errorMessage).toBe('');
    expect(component.addTodo.emit).toHaveBeenCalledWith('Buy groceries');
  });

  it('should reset form state on reset()', () => {
    component.taskTitle = 'Some text';
    component.errorMessage = 'Some error';
    component.isTouched = true;

    component.reset();

    expect(component.taskTitle).toBe('');
    expect(component.errorMessage).toBe('');
    expect(component.isTouched).toBeFalse();
  });
});
