/*jshint esversion: 6 */

const saveContainer = (container)=>{
  localStorage.setItem("container",JSON.stringify(container));
};

const saveCurrentProject = (project)=>{
  localStorage.setItem("currentProject",JSON.stringify(project));
}

const getProjects = ()=>{
  return JSON.parse(localStorage.getItem("container"));
};

const removeProject = (project)=>{
  let remove = JSON.parse(localStorage.getItem("container")).projects.find((element)=>{
	   return element.name == project.name;
  });
  let container = JSON.parse(localStorage.getItem("container"));
  let index = container.indexOf(remove);
  container.splice(index,1);
  localStorage.setItem("container",JSON.stringify(container));
};

export {saveContainer,getProjects,removeProject,saveCurrentProject};
