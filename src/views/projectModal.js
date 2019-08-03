/*jshint esversion: 6 */
import Container from '../components/container.js';
import Project from '../components/project.js';

let projectsContainer = new Container([]);

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
    let container = document.getElementById('projectsContainer');
    input.addEventListener('keyup',(e)=>{
      if(e.keyCode == 13){
        let newProject = new Project(input.value);
        let newProjectDiv = newProject.render();
        projectsContainer.addProject(newProject);
        projectsContainer.update(newProjectDiv);
        input.value = "";
        modal.style.display = "none";
        newProject.initTodoList();
        showProject(newProject);
      }
    });
  }

  function showProject(project){
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
  return{render: render};
})();

export {projectModal,projectsContainer};
