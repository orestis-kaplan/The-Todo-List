/*jshint esversion: 6 */
import Todo from '../components/todo.js';
import Project from '../components/project.js';

import {
  projectsContainer,
  projectModal
} from './projectModal.js';

const todoModal = (() => {
  const render = function(project) {
    let modal = document.createElement('div');
    modal.id = 'todo-modal';
    modal.className = 'todo-modal';

    let title = document.createElement('input');
    title.id = 'todo-title-input';
    title.className = 'todo-title-input';

    let description = document.createElement('textarea');
    description.id = 'todo-description-input';
    description.className = 'todo-description-input';

    let priority = document.createElement('select');
    priority.id = 'priority';
    priorityDropdown(['Low', 'Medium', 'High'], priority, ['red', 'orange', 'pink']);

    let submit = document.createElement('button');
    submit.id = 'submit-todo';
    submit.className = 'submit-todo';
    submit.innerText = 'Save';

    modal.style.visibility = "hidden";
    modal.appendChild(title);
    modal.appendChild(description);
    modal.appendChild(priority);
    modal.appendChild(submit);

    document.body.appendChild(modal);
    saveTodo();
  };

  function priorityDropdown(levels, priority, colors) {
    levels.forEach((level, index) => {
      let option = document.createElement('option');
      option.value = level;
      option.innerText = level;
      priority.appendChild(option);
    });
  }

  function saveTodo() {
      let project = new Project("default");
      if(JSON.parse(localStorage.getItem("project-"+project.id-1)).name == "default")
        localStorage.setItem("project-"+project.id-1,JSON.stringify(project));
      setDefaultProject(project);
      setTodo(project);
  }

  function setDefaultProject(project) {
    project.initTodoList();
    projectsContainer.addProject(project);
    projectsContainer.update(project.render());
  }

  function setTodo(project) {
    let title = document.getElementById('todo-title-input');
    let modal = document.getElementById('todo-modal');
    let description = document.getElementById('todo-description-input');
    let priority = document.getElementById('priority');
    let submit = document.getElementById('submit-todo');
    submit.addEventListener('click', () => {
      project = projectsContainer.projects[projectsContainer.projects.length-1];
      modal.style.visibility = 'hidden';
      title.innerText = "";
      description.innerText = "";
      let todo = new Todo(title.value, description.value,
        priority[priority.selectedIndex].value);
      project.addTodo(todo);
      localStorage.setItem("project-"+project.id,JSON.stringify(project));
      let todoDiv = todo.appendTodo(project);
      project.update(todoDiv);
      showTodosOnclick(project);
      showTodos(project);
    });
  }

  function showTodosOnclick(project){
    let newProjectDiv = document.getElementById('project-'+project.id);
    newProjectDiv.addEventListener('click',()=>{
      showTodos(project);
    });
  }

  function showTodos(project){
    project = JSON.parse(localStorage.getItem("project-"+project.id));
    let todosOfProject = document.getElementById('project-' + project.id + '-todos');
    projectsContainer.projects.forEach((pro)=>{
      let proDiv = document.getElementById('project-' + pro.id + '-todos');
      if(project.id == pro.id){
        todosOfProject.style.display = "block";
      }
      else {
        proDiv.style.display = "none";
        todosOfProject.style.display = "block";
      }
    });
  }
  return {
    render: render
  };

})();

export {
  todoModal,
  projectModal,
  projectsContainer
};
