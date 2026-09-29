import { Component, OnInit } from '@angular/core';
import { Todo, TodoFilter } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  isLoading: boolean = false;
  isAdding: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  // Track items currently undergoing async update/delete
  updatingTodoIds: Set<number> = new Set<number>();
  deletingTodoIds: Set<number> = new Set<number>();

  // Filter state
  currentFilter: TodoFilter = 'all';

  // Pagination state
  currentPage: number = 1;
  pageSize: number = 7;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Fetch initial todos from JSONPlaceholder
    this.todoService.getTodos(25).subscribe({
      next: (data) => {
        this.todos = data;
        this.isLoading = false;
      },
      error: (err: Error) => {
        this.isLoading = false;
        this.errorMessage = err.message || 'Unable to load todos. Please try again.';
      }
    });
  }

  // Adding a new task
  handleAddTodo(title: string): void {
    this.isAdding = true;
    this.errorMessage = '';

    const newTodoPayload = {
      title,
      completed: false,
      userId: 1
    };

    this.todoService.addTodo(newTodoPayload).subscribe({
      next: (created) => {
        this.isAdding = false;
        // JSONPlaceholder mock returns id: 201 for any POST.
        // If 201 is already present, ensure unique local ID.
        const safeId = this.todos.some(t => t.id === created.id)
          ? Math.max(0, ...this.todos.map(t => t.id)) + 1
          : created.id;

        const newTodo: Todo = {
          ...created,
          id: safeId
        };

        // Add to top of list
        this.todos = [newTodo, ...this.todos];
        this.showSuccess('Task added successfully!');
        this.currentPage = 1; // Return to first page to see the new item
      },
      error: (err: Error) => {
        this.isAdding = false;
        this.errorMessage = `Failed to add task: ${err.message}`;
      }
    });
  }

  // Toggling complete/pending
  handleToggleComplete(todo: Todo): void {
    const updatedStatus = !todo.completed;
    this.updatingTodoIds.add(todo.id);
    this.errorMessage = '';

    this.todoService.updateTodo(todo.id, { completed: updatedStatus }).subscribe({
      next: (res) => {
        this.updatingTodoIds.delete(todo.id);
        todo.completed = updatedStatus;
        this.showSuccess(`Task marked as ${updatedStatus ? 'completed' : 'pending'}.`);
      },
      error: () => {
        // Fallback for simulated newly created IDs (>100) or network edge cases
        this.updatingTodoIds.delete(todo.id);
        todo.completed = updatedStatus;
        this.showSuccess(`Task marked as ${updatedStatus ? 'completed' : 'pending'} (simulated).`);
      }
    });
  }

  // Editing a task title
  handleEditTodo(event: { id: number; title: string }): void {
    const target = this.todos.find(t => t.id === event.id);
    if (!target) return;

    this.updatingTodoIds.add(event.id);
    this.errorMessage = '';

    this.todoService.updateTodo(event.id, { title: event.title }).subscribe({
      next: () => {
        this.updatingTodoIds.delete(event.id);
        target.title = event.title;
        this.showSuccess('Task updated successfully.');
      },
      error: () => {
        // Fallback for newly created simulated IDs
        this.updatingTodoIds.delete(event.id);
        target.title = event.title;
        this.showSuccess('Task updated successfully (simulated).');
      }
    });
  }

  // Deleting a task
  handleDeleteTodo(id: number): void {
    this.deletingTodoIds.add(id);
    this.errorMessage = '';

    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.deletingTodoIds.delete(id);
        this.todos = this.todos.filter(t => t.id !== id);
        this.showSuccess('Task deleted successfully.');
        this.adjustPaginationAfterDelete();
      },
      error: () => {
        // Fallback for newly created simulated IDs
        this.deletingTodoIds.delete(id);
        this.todos = this.todos.filter(t => t.id !== id);
        this.showSuccess('Task deleted successfully.');
        this.adjustPaginationAfterDelete();
      }
    });
  }

  // Filtering
  setFilter(filter: TodoFilter): void {
    this.currentFilter = filter;
    this.currentPage = 1;
  }

  get filteredTodos(): Todo[] {
    switch (this.currentFilter) {
      case 'completed':
        return this.todos.filter(t => t.completed);
      case 'pending':
        return this.todos.filter(t => !t.completed);
      default:
        return this.todos;
    }
  }

  // Filter counts
  get totalCount(): number {
    return this.todos.length;
  }

  get completedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }

  get pendingCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  // Pagination getters
  get paginatedTodos(): Todo[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredTodos.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredTodos.length / this.pageSize) || 1;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  private adjustPaginationAfterDelete(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = Math.max(1, this.totalPages);
    }
  }

  private showSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      if (this.successMessage === message) {
        this.successMessage = '';
      }
    }, 3500);
  }

  clearError(): void {
    this.errorMessage = '';
  }

  clearSuccess(): void {
    this.successMessage = '';
  }
}
