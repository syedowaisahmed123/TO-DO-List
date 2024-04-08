const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const submitButton = document.getElementById('submit');
let taskIdCounter = 1;

// Function to add a new task
function addTask(taskText) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task list-group-item';
    taskItem.innerHTML = `
        <span class="task-number">${taskIdCounter}</span>
        <span>${taskText}</span>
        <button class="btn btn-secondary btn-sm float-right" onclick="editTask(this)">Edit</button>
        <button class="btn btn-danger btn-sm float-right mr-2" onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(taskItem);
    taskIdCounter++;
}

// Event listener for adding a new task when submit button is clicked
submitButton.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert("Please enter a task!");
        return; // Stop execution if input field is empty
    }
    addTask(taskText);
    taskInput.value = '';
    saveTasksToLocalStorage();
});

function deleteTask(task) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        task.parentElement.remove();
        taskIdCounter--; // Decrease taskIdCounter when a task is deleted
        // Update task numbers
        const taskNumbers = document.querySelectorAll('.task-number');
        taskNumbers.forEach((taskNumber, index) => {
            taskNumber.textContent = index + 1;
        });
        saveTasksToLocalStorage();
    }
}

// Function to edit a task
function editTask(task) {
    const newText = prompt('Enter new task text:');
    if (newText !== null && newText.trim() !== '') {
        task.previousElementSibling.textContent = newText;
        saveTasksToLocalStorage();
    }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('.task').forEach(task => {
        tasks.push(task.querySelector('span:not(.task-number)').textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => addTask(taskText));
}

// Load tasks when the page loads
window.onload = loadTasksFromLocalStorage;
