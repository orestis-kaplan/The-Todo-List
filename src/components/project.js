/*jshint esversion: 6 */
import {saveProject,getProjects,removeProject} from '../localStorage.js';
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

  removeTodo(todos) {
    var index = this.todos.indexOf(todos);

    if (index != -1) {
      this.todos.splice(index, 1);
    }
  }

  addToCheckList(todos) {
    this.checkList.push(todos);
  }

  initTodoList() {
    if (!document.getElementById('project-' + this.id + '-todos')) {
      let projectDiv = document.createElement('div');
      projectDiv.id = 'project-' + this.id + '-todos';
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
    newProjectDiv.addEventListener('click', () => {
      localStorage.setItem("currentProject",JSON.stringify(currentProject));
    });

    return newProjectDiv;
  }

  update(todo) {
    let project = document.getElementById('project-' + this.id + '-todos');
    project.style.display = "block";
    project.appendChild(todo);
  }

  showSavedTodos(){
    let projectsContainer = getProjects().projects;
    projectsContainer.forEach((element)=>{
      let project = document.getElementById('project-' + element.id + '-todos');
      if (project) {
        if (element.name == this.name) {
          project.style.display = "block";
          element.todos.forEach((todo)=>{
            Object.setPrototypeOf(todo,Todo.prototype);
            project.appendChild(todo.appendTodo());
          });
        }
        else{
          project.style.display ="none";
        }

      }
    });
  }
}

export default Project;
