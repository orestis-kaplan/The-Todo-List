/*jshint esversion: 6 */

// project name listener
const buttons = (() => {
  const addTodoButton = ()=>{
   let modal = document.getElementById('todo-modal');
   let container = document.getElementById('todosContainer');
   let button = document.createElement('div');
   if (!button.id) {
     button.className = "todo-button";
     button.id = 'todo-button';
     button.innerText = 'New Todo';
     button.addEventListener('click', () => {
      modal.style.display = "flex";
     });
     container.prepend(button);
   }
  };
  const addProjectButton = ()=>{
   let modal = document.getElementById('projectModal');
   let container = document.getElementById('projectsContainer');
   let button = document.createElement('div');

   button.className = "plus-button";
   button.id = 'plusButton';
   button.innerText = '+';
   button.addEventListener('click', () => {
    modal.style.display = "block";
   });
   container.appendChild(button);
 };
  const addCancelButton = ()=>{
    let modal = document.getElementById('todo-modal');
    let modalButtons = document.getElementById('todo-modal-buttons');
    let button = document.createElement('button');
    if (!button.id) {
      button.className = "cancel-button";
      button.id = 'cancel-button';
      button.innerText = 'Cancel';
      button.addEventListener('click', () => {
       modal.style.display = "none";
      });
      modalButtons.appendChild(button);
    }
  };
  return {
    addTodoButton: addTodoButton,
    addProjectButton: addProjectButton,
    addCancelButton: addCancelButton
  };
})();

export default buttons;
