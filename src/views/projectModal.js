/*jshint esversion: 6 */
import {projectModal} from './modals.js';
import Container from '../components/container.js';
import Project from '../components/project.js';
import {saveContainer,getProjects,updateContainer,saveCurrentProject} from '../localStorage.js';
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

const projectModalHandler =(()=>{
  const render=()=>{
    projectModal();
    saveProjectListener();
  };

  function saveProjectListener(){
    let modal = document.getElementById('projectModal');
    let input = document.getElementById('addProjectId');
    input.addEventListener('keyup',(e)=>{
      if(e.keyCode == 13){
        let newProject = new Project(input.value,color.getRandomColor());
        newProject.initTodoList();
        let newProjectDiv = newProject.render();
        if(getProjects() != null){
          projectsContainer = getProjects();
          Object.setPrototypeOf(projectsContainer,Container.prototype);
          projectsContainer.addProject(newProject);
        }
        else {
          projectsContainer.addProject(newProject);
          updateContainer(newProject);
        }
        saveCurrentProject(newProject);
        saveContainer(projectsContainer);
        updateContainer(newProject);
        projectsContainer.update(newProjectDiv);
        input.value = "";
        modal.style.display = "none";
      }
    });
  }

  return{render};
})();

export {projectModalHandler,projectsContainer,currentProject};
