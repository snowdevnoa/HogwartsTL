const form = document.querySelector('form');
const taskInput = document.getElementById('new-task');
const taskList = document.querySelector('#task-list');
const clearBtn = document.getElementById('clear-all');
const filter = document.querySelector('#filter');

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
}

const tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(function (task) {
  const newLi = document.createElement('li');
  const newContent = document.createTextNode(task);
  const newDelete = document.createElement('button');

  newDelete.classList.add('delete');
  newLi.classList.add('task-item');

  newLi.append(newContent, newDelete);

  console.log(newLi);
  taskList.appendChild(newLi);
});

//placeholder for last task inserted
taskInput.setAttribute('placeholder', localStorage.getItem('task'));

//delete task

taskList.addEventListener('click', removeTask);

function removeTask(e) {
  if (e.target.classList.contains('delete')) {
    console.log(e.target.parentElement);
    e.target.parentElement.remove();

    //remove from LS
    removeTaskFromLocalStorage(e.target.parentElement);
  }
}

function removeTaskFromLocalStorage(taskItem) {
  //check the local storage
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear all tasks

clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure?')) {
    localStorage.clear();
    console.log('Cleared Success');
    location.reload();
  }
});

//filter tasks
filter.addEventListener('keyup', filterTasks);

function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.task-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
