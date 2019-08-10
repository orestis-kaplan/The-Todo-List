/*jshint esversion: 6 */
import {getProjects} from '../localStorage.js';
import Todo from './todo.js';

if (!localStorage.getItem("projectId")) {
  localStorage.setItem("projectId", 1);
}


class Project {
  constructor(name, color, todos = []) {
    this.id = JSON.parse(localStorage.getItem("projectId"));
    this.name = name;
    this.todos = todos;
    this.color = color;
    localStorage.projectId++;
  }

  addTodo(todos) {
    this.todos.push(todos);
  }

  removeTodo(todo) {
    var index = this.todos.forEach((element,index)=>{
      if(element.name == todo.name)
        return index;
    });
    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  addToCheckList(todos) {
    this.checkList.push(todos);
  }

  initTodoList() {
    if (!document.getElementById('project-todos')) {
      let projectDiv = document.createElement('div');
      projectDiv.id = 'project-todos';
      projectDiv.className = 'project-todo';
      let todoContainer = document.getElementById('todosContainer');
      todoContainer.appendChild(projectDiv);
    }

  }

  render() {
    let currentProject = this;
    let newProjectDiv = document.createElement('div');
    newProjectDiv.innerText = this.name;
    newProjectDiv.id = 'project-' + this.id;
    newProjectDiv.className = 'project';
    newProjectDiv.style.background = this.color;

    newProjectDiv.addEventListener('mouseover',()=>{
      newProjectDiv.style.boxShadow= '1px 1px 10px white';
    });

    newProjectDiv.addEventListener('mouseout',()=>{
      newProjectDiv.style.boxShadow= 'none';
    });

    newProjectDiv.addEventListener('click', () => {
        localStorage.setItem("currentProject", JSON.stringify(currentProject));
        let projectsContainer = getProjects().projects;
        projectsContainer.forEach((element) => {
          let projectTodos = document.getElementById('project-todos');
          if(element.name == currentProject.name){
              if (projectTodos) {
                projectTodos.innerHTML = "";
                projectTodos.style.display = "block";
                element.todos.forEach((todo) => {
                  Object.setPrototypeOf(todo, Todo.prototype);
                  projectTodos.appendChild(todo.appendTodo(currentProject));
                });
              }
          }
        });
    });
    return newProjectDiv;
  }

  update(todo) {
    let project = document.getElementById('project-todos');
    project.appendChild(todo);
  }
}

export default Project;
