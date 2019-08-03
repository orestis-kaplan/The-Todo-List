/*jshint esversion: 6 */
import todoModal from '../views/todoModal.js';

class Container{
  constructor(projects){
    this.projects = projects;
  }

  addProject(project){
    this.projects.push(project);
  }

  removeProject(project){
    var index = this.projects.indexOf(project);

    if(index != -1){
      this.projects.splice(index,1);
    }
  }

  initializeContainer(){
     let container = document.createElement('div');
     container.className = "container";

     let projectContainer = document.createElement('div');
     projectContainer.id = "projectsContainer";
     projectContainer.className = "projectsContainer";

     let todoContainer = document.createElement('div');
     todoContainer.id = "todosContainer";
     todoContainer.className = "todo-container";

     let todoCategories = document.createElement('div');
     todoCategories.className = "todo-categories";

     let priorityCategory = document.createElement('div');
     priorityCategory.innerText = 'Priority';
     todoCategories.appendChild(priorityCategory);

     let titleCategory = document.createElement('div');
     titleCategory.innerText = 'Title';
     todoCategories.appendChild(titleCategory);

     let descriptionCategory = document.createElement('div');
     descriptionCategory.innerText = 'Description';
     todoCategories.appendChild(descriptionCategory);

     let completedCategory = document.createElement('div');
     completedCategory.innerText = 'Completed';
     todoCategories.appendChild(completedCategory);

     todoContainer.appendChild(todoCategories);

     container.appendChild(projectContainer);
     container.appendChild(todoContainer);

     document.body.appendChild(container);
 }

  update(project){
    let container = document.getElementById('projectsContainer');
    container.prepend(project);
  }

}

export default Container;
