/*jshint esversion: 6 */
import buttons from './buttons.js';
import {projectsContainer,todoModal,projectModal} from './todoModal.js';
import {saveContainer,getProjects,removeProject,saveCurrentProject} from '../localStorage.js';

import Project from '../components/project.js';
import Todo from '../components/todo.js';


projectsContainer.initializeContainer();
projectModal.render();
buttons.addProjectButton();
todoModal.render();
buttons.addTodoButton();
buttons.addCancelButton();

let currentProject = JSON.parse(localStorage.getItem("container")).projects[0];
saveCurrentProject(currentProject);
Object.setPrototypeOf(currentProject, Project.prototype);
currentProject.initTodoList();
todoModal.showSavedTodos(currentProject);
