/*jshint esversion: 6 */
import {getProjects,updateContainer} from '../localStorage.js';

class Todo {
  constructor(title, description, priority, completed=false ) {
    this.title = title;
    this.description = description;
    //this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }


  appendTodo(currentProject) {
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
    completed.addEventListener('click',()=>{
      currentProject.todos.forEach((element)=>{
        if(element.name == this.name){
          element.completed = true;
          completed.innerText = "true";
        }
      });
      updateContainer(currentProject);
    });

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
    todoDiv.appendChild(priority);
    todoDiv.appendChild(titleDiv);
    todoDiv.appendChild(description);
    todoDiv.appendChild(completed);
    todoDiv.appendChild(removeButton);

    return todoDiv;
  }
}
export default Todo;
