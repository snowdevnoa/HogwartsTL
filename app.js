const form = document.querySelector('form');
const taskInput = document.getElementById('new-task');
const taskList = document.querySelector('.task-list');

form.addEventListener('submit', submitTask);

function submitTask(e) {
  console.log(`Event type: ${e.type}`);

  const newTask = taskInput.value;

  localStorage.setItem('task', newTask);
  console.log(`The new task is: ${localStorage.getItem('task')}`);

  //check the local storage
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  e.preventDefault();
}

const tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(function (task) {
  const newLi = document.createElement('li');
  const newContent = document.createTextNode(task);
  const newEdit = document.createElement('button');
  const newDelete = document.createElement('button');

  newEdit.classList.add('edit');
  newDelete.classList.add('delete');

  newLi.append(newContent, newEdit, newDelete);

  console.log(newLi);
});

//placeholder for last task inserted
taskInput.setAttribute('placeholder', localStorage.getItem('task'));
