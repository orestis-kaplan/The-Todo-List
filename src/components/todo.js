/*jshint esversion: 6 */
class Todo {
  constructor(title, description, priority, completed = false) {
    this.title = title;
    this.description = description;
    //this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  appendTodo() {
    let todoDiv = document.createElement('div');
    todoDiv.className = 'todo';

    let titleDiv = document.createElement('div');
    let title = document.createElement('span');
    title.className = 'todo-title';
    title.innerHTML = this.title;

    let description = document.createElement('div');
    description.className = 'todo-description';
    description.innerText = this.description;

    let priority = document.createElement('div');
    priority.className = 'todo-priority';
    priority.innerText = this.priority;

    let completed = document.createElement('div');
    completed.className = 'todo-completed';
    completed.innerText = this.completed;

    let removeButton = document.createElement('div');
    removeButton.className = "remove-todo";
    removeButton.innerHTML = '<span class="remove-span"></span>';

    titleDiv.appendChild(title);
    todoDiv.appendChild(priority);
    todoDiv.appendChild(titleDiv);
    todoDiv.appendChild(description);
    todoDiv.appendChild(completed);
    todoDiv.appendChild(removeButton);

    return todoDiv;
  }
}
export default Todo;
