/*jshint esversion: 6 */
import buttons from './buttons.js';
import {projectsContainer,todoModal,projectModal} from './todoModal.js';

projectsContainer.initializeContainer();
projectModal.render();
buttons.addProjectButton();
todoModal.render();
buttons.addTodoButton();
buttons.addCancelButton();
