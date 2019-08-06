/*jshint esversion: 6 */
import {todoModal} from './modals.js';
import Todo from '../components/todo.js';
import Project from '../components/project.js';
import {getProjects,updateContainer} from '../localStorage.js';

import {
  projectsContainer,
  projectModalHandler
} from './projectModal.js';

const todoModalHandler = (() => {
  const render = function() {
    modalHandler(todoModal());
  };

  function modalHandler(params){
    let modal = params.modal;
    let submit = params.submit;
    let title = params.title;
    let priority = params.priority;
    let description = params.description;
    let dueDate = params.dueDate;

    submit.addEventListener('click',()=>{
      let newTodo = new Todo(title.value,description.value,
        priority.options[priority.selectedIndex].value,dueDate.value);
      let currentProject = JSON.parse(localStorage.getItem("currentProject"));
      Object.setPrototypeOf(currentProject,Project.prototype);
      let todoDiv = newTodo.appendTodo(currentProject);
      currentProject.addTodo(newTodo);
      updateContainer(currentProject);
      showSavedTodos(currentProject);
      resetTodoModal(modal,title,description,priority,dueDate);
    });
  }

  function resetTodoModal(modal,title,description,priority,dueDate){
    title.value = "";
    description.value = "";
    priority.options[priority.selectedIndex].value = "Low";
    dueDate.value = "";
    modal.style.display = "none";
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
              Object.setPrototypeOf(todo, Todo.prototype);
              projectTodos.appendChild(todo.appendTodo(currentProject));
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
  todoModalHandler,
  projectModalHandler,
  projectsContainer
};
