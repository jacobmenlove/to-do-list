document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-button');
    const taskList = document.getElementById('task-list');
    const tasksLeftSpan = document.querySelector('.tasks-left');
    const filterButtons = document.querySelectorAll('.filter-button');
    const clearCompletedButton = document.querySelector('.clear-completed');
    
    // App State
    let tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];
    let currentFilter = 'all';
    
    // Functions
    function renderTasks() {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });
        
        if (filteredTasks.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-list';
            emptyMessage.textContent = currentFilter === 'all' 
                ? 'Your list is empty. Add a task to get started!' 
                : currentFilter === 'active' 
                    ? 'No active tasks left. Great job!' 
                    : 'No completed tasks yet.';
            taskList.appendChild(emptyMessage);
        } else {
            filteredTasks.forEach(task => {
                createTaskElement(task);
            });
        }
        
        updateTasksLeft();
        saveTasks();
    }
    
    function createTaskElement(task) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.dataset.id = task.id;
        
        const checkbox = document.createElement('div');
        checkbox.className = `task-checkbox ${task.completed ? 'checked' : ''}`;
        checkbox.addEventListener('click', () => toggleTask(task.id));
        
        const taskText = document.createElement('span');
        taskText.className = `task-text ${task.completed ? 'completed' : ''}`;
        taskText.textContent = task.text;
        
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.innerHTML = '&times;';
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        
        taskList.appendChild(taskItem);
    }
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text === '') return;
        
        const newTask = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        tasks.unshift(newTask);
        taskInput.value = '';
        renderTasks();
    }
    
    function toggleTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        renderTasks();
    }
    
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }
    
    function updateTasksLeft() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksLeftSpan.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} left`;
    }
    
    function saveTasks() {
        localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    }
    
    function setFilter(filter) {
        currentFilter = filter;
        
        filterButtons.forEach(button => {
            if (button.dataset.filter === filter) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
        
        renderTasks();
    }
    
    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
    }
    
    // Event Listeners
    addButton.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            setFilter(button.dataset.filter);
        });
    });
    
    clearCompletedButton.addEventListener('click', clearCompleted);
    
    // Initial render
    renderTasks();
});