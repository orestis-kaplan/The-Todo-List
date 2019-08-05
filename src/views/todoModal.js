/*jshint esversion: 6 */
import Todo from '../components/todo.js';
import Project from '../components/project.js';
import {saveContainer,getProjects,removeProject,saveCurrentProject} from '../localStorage.js';

import {
  projectsContainer,
  projectModal
} from './projectModal.js';

const todoModal = (() => {
  const render = function(project) {
    let modal = document.createElement('div');
    modal.id = 'todo-modal';
    modal.className = 'todo-modal';

    let modalButtons = document.createElement('div');
    modalButtons.id = 'todo-modal-buttons';
    modalButtons.className = 'todo-modal-buttons';

    let title = document.createElement('input');
    title.id = 'todo-title-input';
    title.className = 'todo-title-input';
    title.placeholder = 'Enter Title';

    let description = document.createElement('textarea');
    description.id = 'todo-description-input';
    description.className = 'todo-description-input';
    description.placeholder = 'Enter description';

    let priority = document.createElement('select');
    priority.id = 'priority';
    priorityDropdown(['Low', 'Medium', 'High'], priority, ['red', 'orange', 'pink']);

    let submit = document.createElement('button');
    submit.id = 'submit-todo';
    submit.className = 'submit-todo';
    submit.innerText = 'Save';

    modal.style.display = "none";
    modal.appendChild(title);
    modal.appendChild(description);
    modal.appendChild(priority);
    modalButtons.appendChild(submit);
    modal.appendChild(modalButtons);

    document.body.appendChild(modal);

    modalHandler(modal,title,description,priority,submit);
  };

  function modalHandler(modal,title,description,priority,submit){
    submit.addEventListener('click',()=>{
      let newTodo = new Todo(title.value,description.value,
        priority.options[priority.selectedIndex].value);
      let todoDiv = newTodo.appendTodo();
      let currentProject = JSON.parse(localStorage.getItem("currentProject"));
      Object.setPrototypeOf(currentProject,Project.prototype);
      currentProject.addTodo(newTodo);
      updateContainer(currentProject);
      showSavedTodos(currentProject);
      resetTodoModal(modal,title,description,priority);
    });
  }

  function resetTodoModal(modal,title,description,priority){
    title.value = "";
    description.value = "";
    priority.options[priority.selectedIndex].value = "Low";
    modal.style.display = "none";
  }

  function updateContainer(currentProject){
    projectsContainer.projects.forEach((element)=>{
      if (element.name == currentProject.name) {
        element.todos = currentProject.todos;
      }
    });
    saveCurrentProject(currentProject);
    saveContainer(projectsContainer);
  }

  function priorityDropdown(levels, priority, colors) {
    levels.forEach((level, index) => {
      let option = document.createElement('option');
      option.value = level;
      option.innerText = level;
      priority.appendChild(option);
    });
  }

  function showSavedTodos(currentProject) {
    let projectsContainer = getProjects().projects;
    projectsContainer.forEach((element) => {
      let projectTodos = document.getElementById('project-todos');
      if(element.name == currentProject.name){
        projectTodos.innerHTML = "";
          if (projectTodos) {
            projectTodos.style.display = "block";
            element.todos.forEach((todo) => {
              console.log(todo);
              Object.setPrototypeOf(todo, Todo.prototype);
              projectTodos.appendChild(todo.appendTodo());
            });
          }
      }
    });
  }

  return {
    render: render,
    showSavedTodos: showSavedTodos
  };

})();

export {
  todoModal,
  projectModal,
  projectsContainer
};
