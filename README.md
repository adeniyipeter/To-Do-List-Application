# TaskFlow - Angular 16 To-Do List Application

A responsive, feature-rich To-Do List application built with **Angular 16**, **TypeScript**, and the **JSONPlaceholder Todo API**.

---

## 🚀 Features

- **Task Creation**: Add tasks with title validation (trimmed whitespace, minimum length, non-empty).
- **Task Management**:
  - View all tasks with completion status badges.
  - Toggle tasks between **Completed** and **Pending**.
  - Inline task editing (with validation, keyboard shortcuts Enter/Escape, and cancellation).
  - Delete tasks with immediate UI update and error recovery.
- **Client-Side Filtering**:
  - Filter tasks by **All**, **Pending**, and **Completed** with live count badges.
  - Instant in-memory filtering without redundant API calls.
- **Pagination**:
  - Smooth page navigation for large task lists with Prev/Next and page numbers.
- **API Integration & Resilience**:
  - Connected to `https://jsonplaceholder.typicode.com/todos`.
  - Comprehensive loading indicators (`Loading todos...`).
  - Graceful API error handling with dismissible alerts and retry options.
  - Proper handling of JSONPlaceholder simulated REST responses.
- **Responsive & Modern UI**:
  - Mobile-first, accessible, clean design without external heavy CSS frameworks.

---

## 🛠️ Technology Stack

- **Framework**: Angular 16 (16.2.x)
- **Runtime**: Node.js 16 (`.nvmrc` provided)
- **Language**: TypeScript 5.1.x
- **HTTP Client**: Angular `HttpClientModule` & RxJS
- **Testing**: Jasmine & Karma with ChromeHeadless

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── todo-form/      # Input field and Add button with validation
│   │   ├── todo-item/      # Task row, checkbox toggle, inline edit, delete
│   │   └── todo-list/      # List container, filters, pagination, states
│   ├── models/
│   │   └── todo.model.ts   # Todo interface and filter types
│   ├── services/
│   │   ├── todo.service.ts # JSONPlaceholder API integration
│   │   └── todo.service.spec.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   └── app.module.ts
├── assets/
└── styles.css              # Global styles & modern CSS reset
```

---

## 🏁 Getting Started

### 1. Ensure Node.js 16 is active

```bash
nvm use 16
# or: node -v (should be v16.x)
```

### 2. Development Server

```bash
npm start
```
Navigate to `http://localhost:4200/`. The app will automatically reload on source changes.

### 3. Production Build

```bash
npm run build
```
Build artifacts are compiled into `dist/todo-list`.

### 4. Running Unit Tests

```bash
npm test
```
Runs the Jasmine unit test suite in headless mode.

---

## 📝 API Notes

- Uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) fake REST API.
- `POST`, `PATCH`, and `DELETE` requests are simulated by the mock server and are not permanently persisted on the remote database.
