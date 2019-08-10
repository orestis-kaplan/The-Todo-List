/*jshint esversion: 6 */
import Project from '../components/project.js';
import Todo from '../components/todo.js';
import {getProjects,saveContainer} from '../localStorage.js';

function updateTodoModalHandler(){
  let thisTodo = JSON.parse(localStorage.getItem("currentTodo"));
  Object.setPrototypeOf(thisTodo,Todo.prototype);
  let modal = document.getElementById('update-todo-modal');
  let submit = document.getElementById('update-submit-todo');
  let title = document.getElementById('update-todo-title-input');
  title.value = thisTodo.title;
  let priority = document.getElementById('update-priority');
  priority.value = thisTodo.priority;
  let description = document.getElementById('update-todo-description-input');
  description.value = thisTodo.description;
  let dueDate = document.getElementById('update-todo-dueDate-input');
  dueDate.value = thisTodo.dueDate;
  modal.style.display = "flex";

  submit.addEventListener('click',(e)=>{
    if(!title.checkValidity() || !description.checkValidity() || !dueDate.checkValidity()){
      e.preventDefault();
      alert("Fill all fields");
    }
    else{
      thisTodo.title = title.value;
      thisTodo.description = description.value;
      thisTodo.priority = priority.options[priority.selectedIndex].value;
      thisTodo.dueDate = dueDate.value;
      let currentProject = JSON.parse(localStorage.getItem("currentProject"));
      Object.setPrototypeOf(currentProject,Project.prototype);
      saveTodo(currentProject,thisTodo);
      showSavedTodos(currentProject);
      modal.style.display = "none";
     }
  });
}

function showSavedTodos(currentProject) {
  let projectsContainer = getProjects();
  let array = projectsContainer;
  for (var i = 0; i < array.projects.length; i++) {
    let projectTodos = document.getElementById('project-todos');
    if(array.projects[i].name == currentProject.name){
      array.projects[i].todos = currentProject.todos;
      projectTodos.innerHTML = "";
      if (projectTodos) {
        projectTodos.style.display = "block";
        array.projects[i].todos.forEach((todo) => {
          Object.setPrototypeOf(todo, Todo.prototype);
          projectTodos.appendChild(todo.appendTodo(currentProject));
        });
      }
    }
  }
  saveContainer(array);
}

function saveTodo(currentProject,thisTodo){
  for (var i = 0; i < currentProject.todos.length; i++) {
    Object.setPrototypeOf(currentProject.todos[i],Todo.prototype);
    if(thisTodo.id === currentProject.todos[i].id){
      currentProject.todos[i] = thisTodo;
    }
  }
}

export {updateTodoModalHandler};
