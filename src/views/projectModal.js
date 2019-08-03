/*jshint esversion: 6 */
import Container from '../components/container.js';
import Project from '../components/project.js';
import {saveContainer,getProjects,removeProject,saveCurrentProject} from '../localStorage.js';
import color from './colours.js';

let projectsContainer = new Container([]);
let currentProject = new Project("default",color.getRandomColor());

  if(getProjects() != null){
    projectsContainer = getProjects();
    Object.setPrototypeOf(projectsContainer,Container.prototype);
  }
  else {
    projectsContainer.addProject(currentProject);
    saveContainer(projectsContainer);
    saveCurrentProject(currentProject);
  }

const projectModal =(()=>{
  const render=()=>{
    let modal = document.createElement('div');
    modal.id = 'projectModal';
    modal.className = 'modal';

    let input = document.createElement('input');
    input.id = 'addProjectId';
    input.className = 'add-project-input';
    input.placeholder = "Enter a project name";
    modal.style.display = "none";
    modal.appendChild(input);
    document.body.appendChild(modal);
    saveProjectListener(modal,input);
  };

  function saveProjectListener(modal,input){
    input.addEventListener('keyup',(e)=>{
      if(e.keyCode == 13){
        let newProject = new Project(input.value,color.getRandomColor());
        currentProject = newProject;
        let newProjectDiv = newProject.render();
        projectsContainer.addProject(newProject);
        saveContainer(projectsContainer);
        projectsContainer.update(newProjectDiv);
        input.value = "";
        modal.style.display = "none";
        newProject.initTodoList();
        newProject.showSavedTodos();
      }
    });
  }
  return{render: render};
})();

export {projectModal,projectsContainer,currentProject};
