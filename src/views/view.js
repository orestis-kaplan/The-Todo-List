/*jshint esversion: 6 */
import buttons from './buttons.js';
import {projectsContainer,todoModal,projectModal} from './todoModal.js';

// console.log(todoModal);
projectsContainer.initializeContainer();
projectModal.render();
buttons.addProjectButton();
todoModal.render();
buttons.addTodoButton();

//console.log(JSON.parse(localStorage.getItem("project")));
