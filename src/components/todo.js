/*jshint esversion: 6 */
import {updateContainer} from '../localStorage.js';
import {format} from 'date-fns';
import {updateTodoModalHandler} from '../views/todoUpdate.js';

if (!localStorage.getItem("todoId")) {
  localStorage.setItem("todoId", 0);
}

class Todo {
  constructor(title, description, priority,dueDate,completed=false) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = completed;
    this.id = JSON.parse(localStorage.getItem("todoId"));
    localStorage.todoId++;
  }


  appendTodo(currentProject) {
    let todoDiv = document.createElement('div');
    todoDiv.id = 'todo-'+this.id;
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

    let dueDate = document.createElement('div');
    dueDate.className = 'todo-dueDate';
    dueDate.innerText = format(new Date(this.dueDate),'DD/MM/YYYY');

    let completed = document.createElement('div');
    completed.id = "completed";
    completed.className = 'todo-completed';
    completed.innerText = this.completed;
    completed.addEventListener('click',()=>{
      currentProject.todos.forEach((element)=>{
        if(element.name == this.name){
          element.completed = true;
          completed.innerText = "true";
        }
      });
      updateContainer(currentProject);
    });

    let editButton = document.createElement('div');
    editButton.id = 'edit-button';
    editButton.innerText = 'Edit';

    let removeButton = document.createElement('div');
    removeButton.className = "remove-todo";
    removeButton.innerHTML = '<span class="remove-span"></span>';
    removeButton.addEventListener('click',()=>{
      todoDiv.remove();
      currentProject.removeTodo(this);
      updateContainer(currentProject);
    });

    todoDiv.addEventListener('mouseover',()=>{
      todoDiv.style.boxShadow= '1px 1px 7px #2aa7e8 inset';
    });

    todoDiv.addEventListener('mouseout',()=>{
      todoDiv.style.boxShadow= 'none';
    });

    titleDiv.appendChild(title);
    todoDiv.appendChild(editButton);
    todoDiv.appendChild(priority);
    todoDiv.appendChild(titleDiv);
    todoDiv.appendChild(description);
    todoDiv.appendChild(dueDate);
    todoDiv.appendChild(completed);
    todoDiv.appendChild(removeButton);

    editButton.addEventListener('click',(event)=>{
      if (!localStorage.getItem("currentTodo")) {
        localStorage.setItem("currentTodo", JSON.stringify(this));
      }
      localStorage.setItem("currentTodo", JSON.stringify(this));
        updateTodoModalHandler();
    });

    return todoDiv;
  }
}

export default Todo;
