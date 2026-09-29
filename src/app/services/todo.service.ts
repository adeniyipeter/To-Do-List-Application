import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private http: HttpClient) {}

  /**
   * Fetch todos from JSONPlaceholder API
   * @param limit Optional limit of items to retrieve (default: 20 for optimal performance & pagination)
   */
  getTodos(limit: number = 20): Observable<Todo[]> {
    const url = limit ? `${this.apiUrl}?_limit=${limit}` : this.apiUrl;
    return this.http.get<Todo[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Add a new todo (Simulated by JSONPlaceholder)
   */
  addTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing todo (Simulated by JSONPlaceholder)
   */
  updateTodo(id: number, todo: Partial<Todo>): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}`, todo).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete a todo (Simulated by JSONPlaceholder)
   */
  deleteTodo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 0) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else if (error.status === 404) {
        errorMessage = 'Requested todo was not found on the server.';
      } else {
        errorMessage = `Server returned code ${error.status}: ${error.statusText || error.message}`;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
