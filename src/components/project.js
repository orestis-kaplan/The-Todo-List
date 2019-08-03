/*jshint esversion: 6 */
import color from '../views/colours.js';

if(!localStorage.getItem("projectId")){
  localStorage.setItem("projectId",1);
}


class Project{
  constructor(name,todos = []){
    this.id = JSON.parse(localStorage.getItem("projectId"));
    this.name = name;
    this.todos = todos;
    localStorage.projectId++;
  }

  addTodo(todos){
    this.todos.push(todos);
  }

  removeTodo(todos){
    var index = this.todos.indexOf(todos);

    if(index != -1){
      this.todos.splice(index,1);
    }
  }

  addToCheckList(todos){
    this.checkList.push(todos);
  }

  initTodoList(){
      let projectDiv = document.createElement('div');
      projectDiv.id = 'project-' + this.id + '-todos';
      projectDiv.className = 'project-todo';
      projectDiv.style.display = "none";
      let todoContainer = document.getElementById('todosContainer');
      todoContainer.appendChild(projectDiv);
  }

  render(){
    localStorage.setItem("project-"+this.id,JSON.stringify(this));

    let newProjectDiv = document.createElement('div');
    newProjectDiv.innerText = this.name;
    newProjectDiv.id = 'project-'+this.id;
    newProjectDiv.className = 'project';
    newProjectDiv.style.background = color.getRandomColor();

    return newProjectDiv;
  }

  update(todo){
    let project = document.getElementById('project-' + this.id + '-todos');
    project.appendChild(todo);
  }
}

export default Project;
