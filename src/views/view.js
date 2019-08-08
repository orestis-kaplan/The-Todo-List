/*jshint esversion: 6 */
import buttons from './buttons.js';
import {projectsContainer,todoModalHandler,projectModalHandler} from './todoModal.js';
import {saveCurrentProject} from '../localStorage.js';
import {updateTodoModal} from './modals.js';
import Project from '../components/project.js';

updateTodoModal();
projectsContainer.initializeContainer();
projectModalHandler.render();
buttons.addProjectButton();
todoModalHandler.render();
buttons.addTodoButton();
buttons.addCancelButton();

let currentProject = JSON.parse(localStorage.getItem("container")).projects[0];
saveCurrentProject(currentProject);
Object.setPrototypeOf(currentProject, Project.prototype);
currentProject.initTodoList();
todoModalHandler.showSavedTodos(currentProject);
