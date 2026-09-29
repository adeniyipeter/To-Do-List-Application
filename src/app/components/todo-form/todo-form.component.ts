import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent {
  @Input() isSubmitting: boolean = false;
  @Output() addTodo = new EventEmitter<string>();

  taskTitle: string = '';
  errorMessage: string = '';
  isTouched: boolean = false;

  onSubmit(): void {
    this.isTouched = true;
    const trimmedTitle = this.taskTitle.trim();

    if (!trimmedTitle) {
      this.errorMessage = 'Task title cannot be empty.';
      return;
    }

    if (trimmedTitle.length < 3) {
      this.errorMessage = 'Task title must be at least 3 characters long.';
      return;
    }

    this.errorMessage = '';
    this.addTodo.emit(trimmedTitle);
  }

  onInputChange(): void {
    if (this.isTouched) {
      if (!this.taskTitle.trim()) {
        this.errorMessage = 'Task title cannot be empty.';
      } else if (this.taskTitle.trim().length < 3) {
        this.errorMessage = 'Task title must be at least 3 characters long.';
      } else {
        this.errorMessage = '';
      }
    }
  }

  reset(): void {
    this.taskTitle = '';
    this.errorMessage = '';
    this.isTouched = false;
  }
}
