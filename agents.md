# AGENTS.md

## Project Overview

This project is an Angular To-Do List application.

The application uses the JSONPlaceholder Todo API for API integration practice.

The application should allow users to:

- Create tasks
- View tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Mark tasks as pending
- Filter tasks
- Handle loading states
- Handle API errors

---

## Technology Requirements

### Node.js

The project is being developed with:

```text
Node.js 16
```

- Use Node.js 16 for this project.
- Do not require Node.js 18, 20, 22, or newer.
- Do not upgrade the project to require a newer Node.js version.
- Make sure installed dependencies are compatible with Node.js 16.

### Angular

Use:

```text
Angular 16
```

Important:

- Do not upgrade Angular to Angular 17, 18, 19, 20, or 21.
- Use Angular 16-compatible packages.
- Keep Angular packages on the Angular 16 major version.
- Check `package.json` before installing Angular-related dependencies.
- Avoid packages whose peer dependencies require a newer Angular version.

### TypeScript

Use a TypeScript version compatible with Angular 16.

Do not install a newer TypeScript version simply because it is available.

### Package Manager

Use the package manager already configured by the project.

Do not switch package managers unless explicitly requested.

---

## API

Use JSONPlaceholder:

```text
https://jsonplaceholder.typicode.com/todos
```

Example response:

```json
{
  "userId": 1,
  "id": 1,
  "title": "delectus aut autem",
  "completed": false
}
```

### Important API Notes

JSONPlaceholder is a fake REST API for development and practice.

- GET requests return sample todo data.
- POST requests are simulated.
- PUT requests are simulated.
- PATCH requests are simulated.
- DELETE requests are simulated.
- Changes are not permanently stored on the server.

Do not treat JSONPlaceholder as a production database.

---

## Development Rules

- Keep the code clean, readable, and maintainable.
- Follow the existing project structure and coding style.
- Do not introduce unnecessary dependencies.
- Do not rewrite working code unless necessary.
- Keep changes focused on the requested task.
- Preserve existing functionality.
- Prefer simple solutions over unnecessary abstractions.
- Do not add libraries when Angular already provides the required functionality.

---

## Angular Rules

- Use Angular 16.
- Use TypeScript.
- Use Angular services for API communication.
- Use `HttpClient` for HTTP requests.
- Keep API logic inside services rather than components.
- Keep components focused on UI and user interaction.
- Use interfaces/types for application models.
- Avoid `any` unless absolutely necessary.
- Use meaningful variable, method, and component names.
- Follow Angular 16 conventions.
- Do not introduce Angular features that require a newer Angular version.

---

## Todo Model

Use a consistent Todo model based on the JSONPlaceholder API:

```ts
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

If additional fields are required by the application, update the model consistently.

---

## Project Structure

Prefer a clean structure similar to:

```text
src/
├── app/
│   ├── components/
│   │   ├── todo-list/
│   │   ├── todo-item/
│   │   └── todo-form/
│   ├── models/
│   │   └── todo.model.ts
│   ├── services/
│   │   └── todo.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   └── app.module.ts
├── assets/
└── styles.css
```

Follow the existing project structure if it differs rather than restructuring the entire project unnecessarily.

---

## TodoService

Create a dedicated service for API communication.

Expected methods:

```ts
getTodos()
addTodo(todo)
updateTodo(id, todo)
deleteTodo(id)
```

The service should be responsible for:

- Making HTTP requests
- Building API URLs
- Returning API observables
- Handling API-related logic

Do not place HTTP requests directly inside presentation components.

---

## UI Requirements

The application should provide:

### Todo List

- Display all todos.
- Display the todo title.
- Display completed/pending status.
- Provide edit functionality.
- Provide delete functionality.
- Provide a completion toggle.

### Add Todo

- Provide an input field.
- Provide an Add button.
- Prevent empty todo submission.
- Trim whitespace from the input.
- Clear the input after a successful creation.

### Edit Todo

- Allow users to edit an existing todo.
- Do not create a duplicate when editing.
- Prevent empty titles.

### Delete Todo

- Allow users to delete a todo.
- Remove the todo from the UI after a successful request.
- Handle API errors gracefully.

### Complete/Pending

Users should be able to:

- Mark a todo as completed.
- Mark a completed todo as pending.

The UI should clearly distinguish completed todos from pending todos.

---

## Filtering

Provide the following filters:

```text
All
Pending
Completed
```

The currently selected filter should be visually identifiable.

Filtering should happen without unnecessarily making another API request.

---

## Loading State

The application should show a loading state while todos are being retrieved.

Example:

```text
Loading todos...
```

Do not display an empty-state message while the initial API request is still loading.

---

## Error Handling

Handle API failures gracefully.

For example:

```text
Unable to load todos. Please try again.
```

The application should not crash because an API request fails.

Handle errors for:

- Loading todos
- Creating todos
- Updating todos
- Deleting todos

---

## Empty State

When there are no todos to display, show a useful message.

Example:

```text
No tasks yet. Add a task to get started.
```

Do not show the empty state while data is still loading.

---

## Validation

- Do not allow empty task titles.
- Trim whitespace from task titles.
- Prevent submission when the title is invalid.
- Provide clear validation feedback.
- Keep validation simple and user-friendly.

---

## State Management

Do not introduce NgRx or another state-management library unless explicitly requested.

For this project, simple Angular component state and services are sufficient.

Keep the implementation easy to understand.

---

## Styling

- Keep the UI clean and modern.
- Make the application responsive.
- Ensure buttons are clearly identifiable.
- Maintain consistent spacing.
- Maintain consistent typography.
- Make completed todos visually distinguishable.
- Avoid unnecessary animations.
- Do not introduce a CSS framework unless explicitly requested.

---

## Dependencies

Before installing a package:

1. Check whether Angular already provides the required functionality.
2. Check `package.json`.
3. Verify that the package supports Angular 16.
4. Verify that the package works with Node.js 16.
5. Avoid unnecessary dependencies.

Never install the latest version of a package blindly.

Prefer versions compatible with:

```text
Angular 16
Node.js 16
```

---

## Code Quality

Before completing a task:

1. Review all changed files.
2. Remove unused imports.
3. Remove unused variables.
4. Check TypeScript errors.
5. Check Angular compilation errors.
6. Run tests if available.
7. Run a production build when appropriate.
8. Verify that existing functionality still works.

Do not mark a task as complete if the application does not build successfully.

---

## Git Rules

Use clear and descriptive commit messages.

Examples:

```text
feat: add todo list
feat: integrate todo api
feat: add todo filtering
feat: add todo editing
feat: add todo deletion
fix: prevent empty todo submission
fix: handle todo api errors
refactor: simplify todo service
```

Do not commit:

- `node_modules`
- Build artifacts
- `.env` files containing secrets
- API keys
- Passwords
- Temporary files
- IDE-specific files unless intentionally configured

---

## Agent Workflow

When working on a task, follow this process.

### Step 1 — Understand

Read the relevant project files before making changes.

Check:

- `package.json`
- Angular version
- Node.js requirements
- Existing components
- Existing services
- Existing routing
- Existing styling

Do not assume the project structure.

### Step 2 — Plan

Identify:

- Files that need modification
- New files that are required
- Existing functionality that could be affected
- Dependencies that may be needed

### Step 3 — Implement

Make the smallest clean change that solves the requested task.

Avoid unrelated refactoring.

### Step 4 — Verify

Check:

- TypeScript compilation
- Angular compilation
- Runtime behavior
- API requests
- Existing functionality
- Responsive UI

### Step 5 — Report

After completing the task, briefly explain:

- What was changed
- Which files were changed
- Any important implementation details
- Any remaining issues

---

## Important Constraints

- Do not upgrade Angular.
- Do not change the project from Angular 16.
- Do not require a newer Node.js version than Node 16.
- Do not invent API endpoints.
- Use the JSONPlaceholder API specified above.
- Do not assume a dependency is installed.
- Check `package.json` before using a dependency.
- Do not install incompatible package versions.
- Do not introduce unnecessary libraries.
- Do not duplicate existing functionality.
- Do not make unrelated changes.
- Do not remove working functionality.
- Do not create a backend unless explicitly requested.
- Do not add authentication unless explicitly requested.
- Do not add a database unless explicitly requested.
- Ask for clarification when a requirement is genuinely ambiguous.

---

## Definition of Done

A feature is complete when:

- [ ] The requested functionality works.
- [ ] Existing functionality still works.
- [ ] Angular remains on version 16.
- [ ] The project works with Node.js 16.
- [ ] JSONPlaceholder API integration works where required.
- [ ] Loading states are handled.
- [ ] API errors are handled.
- [ ] Validation works.
- [ ] Code is clean and maintainable.
- [ ] No unnecessary dependencies were added.
- [ ] No obvious TypeScript/compiler errors exist.
- [ ] Relevant tests pass.
- [ ] Production build succeeds.
- [ ] `TODO.md` is updated.
