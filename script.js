// Step 1: Select HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Step 2: Add event listener to button
addTaskBtn.addEventListener("click", addTask);

// Step 3: Function to add a task
function addTask() {
    const taskText = taskInput.value.trim(); // Get input value and remove spaces

    if (taskText === "") {
        alert("Please enter a task!"); // Prevent empty tasks
        return;
    }

    // Step 4: Create a new <li> element
    const li = document.createElement("li");
    li.innerHTML = `${taskText} <button class="delete-btn">X</button>`;

    // Step 5: Add delete functionality
    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
    });

    // Step 6: Append <li> to <ul>
    taskList.appendChild(li);

    // Step 7: Clear the input field
    taskInput.value = "";
}
