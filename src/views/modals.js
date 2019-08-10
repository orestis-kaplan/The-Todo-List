/*jshint esversion: 6 */

const projectModal = () => {
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
};

const todoModal = () => {
  let modal = document.createElement('div');
  modal.id = 'todo-modal';
  modal.className = 'todo-modal';

  let modalButtons = document.createElement('div');
  modalButtons.id = 'todo-modal-buttons';
  modalButtons.className = 'todo-modal-buttons';

  let title = document.createElement('input');
  title.id = 'todo-title-input';
  title.className = 'todo-title-input';
  title.placeholder = 'Enter Title';

  let description = document.createElement('textarea');
  description.id = 'todo-description-input';
  description.className = 'todo-description-input';
  description.placeholder = 'Enter description';

  let priority = document.createElement('select');
  priority.id = 'priority';
  priorityDropdown(['Low', 'Medium', 'High'], priority, ['red', 'orange', 'pink']);

  let dueDate = document.createElement('input');
  dueDate.type = "date";
  dueDate.id = 'todo-dueDate-input';
  dueDate.className = 'todo-dueDate-input';
  dueDate.placeholder = 'Enter due date';

  let submit = document.createElement('button');
  submit.id = 'submit-todo';
  submit.className = 'submit-todo';
  submit.innerText = 'Save';

  modal.style.display = "none";
  modal.appendChild(title);
  modal.appendChild(description);
  modal.appendChild(priority);
  modal.appendChild(dueDate);
  modalButtons.appendChild(submit);
  modal.appendChild(modalButtons);

  document.body.appendChild(modal);
  return {
    modal,
    title,
    description,
    priority,
    dueDate,
    submit
  };
};

const updateTodoModal = () => {
  let modal = document.createElement('div');
  modal.id = 'update-todo-modal';
  modal.className = 'todo-modal';

  let modalButtons = document.createElement('div');
  modalButtons.id = 'update-todo-modal-buttons';
  modalButtons.className = 'todo-modal-buttons';

  let title = document.createElement('input');
  title.id = 'update-todo-title-input';
  title.className = 'todo-title-input';
  title.required = true;

  let description = document.createElement('textarea');
  description.id = 'update-todo-description-input';
  description.className = 'todo-description-input';
  description.required = true;
  description.placeholder = 'Enter description';

  let priority = document.createElement('select');
  priority.id = 'update-priority';
  priorityDropdown(['Low', 'Medium', 'High'], priority, ['red', 'orange', 'pink']);

  let dueDate = document.createElement('input');
  dueDate.required = true;
  dueDate.type = "date";
  dueDate.id = 'update-todo-dueDate-input';
  dueDate.className = 'update-todo-dueDate-input';

  let submit = document.createElement('button');
  submit.id = 'update-submit-todo';
  submit.className = 'submit-todo';
  submit.innerText = 'Save';

  modal.style.display = "none";
  modal.appendChild(title);
  modal.appendChild(description);
  modal.appendChild(priority);
  modal.appendChild(dueDate);
  modalButtons.appendChild(submit);
  modal.appendChild(modalButtons);

  document.body.appendChild(modal);
};

function priorityDropdown(levels, priority, colors) {
  levels.forEach((level, index) => {
    let option = document.createElement('option');
    option.value = level;
    option.innerText = level;
    priority.appendChild(option);
  });
}

export {
  projectModal,
  todoModal,
  updateTodoModal
};
