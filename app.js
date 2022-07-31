const form = document.querySelector('form');
const taskInput = document.getElementById('new-task');
const submitBtn = document.getElementById('submit-task');
const taskList = document.querySelector('#task-list');
const clearBtn = document.getElementById('clear-all');
const filter = document.querySelector('#filter');
const house = document.querySelector('ul.house');
const main = document.querySelector('body');

// check local storage
let tasks = JSON.parse(localStorage.getItem('tasks'));

if (localStorage.getItem('tasks') === null) {
  tasks = [];
} else {
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
}

//submit a task
form.addEventListener('submit', submitTask);

function submitTask(e) {
  console.log(`Event type: ${e.type}`);

  const newTask = taskInput.value;

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

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

// HOGWART HOUSE THEME w/ Event Delegation

house.addEventListener('click', changeTheme);

function changeTheme(e) {
  console.log(e.target.id);
  localStorage.setItem('house', e.target.id);
  location.reload();
}

let houseTheme = localStorage.getItem('house');

switch (houseTheme) {
  case 'gryffindor':
    main.style.backgroundImage =
      'linear-gradient(to bottom, var(--gf-red-main), black)';
    main.style.color = 'var(--gf-yellow-main)';
    submitBtn.style.backgroundColor = 'var(--gf-red2)';
    submitBtn.style.color = 'white';
    clearBtn.style.backgroundColor = 'var(--gf-red2)';
    clearBtn.style.color = 'white';
    break;
  case 'hufflepuff':
    main.style.backgroundImage =
      'linear-gradient(to bottom, var(--hp-yellow-main), black)';
    main.style.color = 'white';
    submitBtn.style.backgroundColor = 'var(--hp-yellow2)';
    submitBtn.style.color = 'white';
    clearBtn.style.backgroundColor = 'var(--hp-yellow2)';
    clearBtn.style.color = 'white';
    break;
  case 'ravenclaw':
    main.style.backgroundImage =
      'linear-gradient(to bottom, var(--rc-blue-main), black)';
    main.style.color = 'white';
    submitBtn.style.backgroundColor = 'var(--rc-blue2)';
    submitBtn.style.color = 'white';
    clearBtn.style.backgroundColor = 'var(--rc-blue2)';
    clearBtn.style.color = 'white';
    break;
  case 'slytherin':
    main.style.backgroundImage =
      'linear-gradient(to bottom, var(--sl-green-main), black)';
    main.style.color = 'var(--sl-grey2)';
    submitBtn.style.backgroundColor = 'var(--sl-green2)';
    submitBtn.style.color = 'white';
    clearBtn.style.backgroundColor = 'var(--sl-green2)';
    clearBtn.style.color = 'white';
    break;
}
