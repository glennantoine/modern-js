//App Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListners();

//Load all event listners function
function loadEventListners() {
  //Add Task Event
  form.addEventListener('submit', addTask);
  //Remove Task Event Listener
  taskList.addEventListener('click', removeTask);
  //Clear Tasks Event Listener
  clearBtn.addEventListener('click', clearTasks);
  //Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);

}


//Add Task Function
function addTask(e){
  const task = taskInput.value;

  if(task === ''){
    alert('Please Enter a Task');
  }

  //Creat li element
  const li = document.createElement('li');
  //Add Class
  li.className = 'collection-item';
  //Create text node and append to li
  li.appendChild(document.createTextNode(task));
  //Create new link element
  const link = document.createElement('a');
  //Add class
  link.className = 'delete-item secondary-content';
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append link to li element
  li.appendChild(link);
  //Append li to ul (Task List)
  taskList.appendChild(li);
  //Clear Input field
  taskInput.value = '';

  saveTaskToLocalStorage(task);

  //Prevent form default behavior 
  e.preventDefault();
}

// //Save Task to LocalStorage
function saveTaskToLocalStorage(task){
  let tasks;
  
  //If no Tasks save set tasks to empty array
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  // //Save to LocalStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Tasks Function
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
  }
}

//Clear All Tasks
function clearTasks(e){
  //Clear all html from within ul.collection
  //taskList.innerHTML = '';

  //Faster Method (https://jsperf.com/innerhtml-vs-removechild/47)
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Filter Tasks 
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}