import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Input() isUpdating: boolean = false;
  @Input() isDeleting: boolean = false;

  @Output() toggleComplete = new EventEmitter<Todo>();
  @Output() editTodo = new EventEmitter<{ id: number; title: string }>();
  @Output() deleteTodo = new EventEmitter<number>();

  isEditing: boolean = false;
  editTitle: string = '';
  editError: string = '';

  startEdit(): void {
    if (this.isUpdating || this.isDeleting) return;
    this.isEditing = true;
    this.editTitle = this.todo.title;
    this.editError = '';
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editError = '';
  }

  saveEdit(): void {
    const trimmed = this.editTitle.trim();
    if (!trimmed) {
      this.editError = 'Title cannot be empty.';
      return;
    }
    if (trimmed === this.todo.title) {
      this.cancelEdit();
      return;
    }

    this.editTodo.emit({ id: this.todo.id, title: trimmed });
    this.isEditing = false;
    this.editError = '';
  }

  onToggle(): void {
    if (this.isUpdating || this.isDeleting) return;
    this.toggleComplete.emit(this.todo);
  }

  onDelete(): void {
    if (this.isUpdating || this.isDeleting) return;
    this.deleteTodo.emit(this.todo.id);
  }
}
