// app.js
// This file controls what the app does.
// Students will fill in the logic for adding, updating, and deleting tasks.

// The array where all tasks will be stored
let tasks = [];

// ID counter for new tasks
let nextTaskId = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  // When starting the app:
  // - Load tasks from localStorage
  const savedTasks = JSON.parse(localStorage.getItem("STORAGE_KEY")) || [];
  tasks = savedTasks;

  // - Update nextTaskId so it doesn't conflict
  if (tasks.length > 0) {
    nextTaskId = Math.max (...tasks.map(t => t.id)) + 1
  }

  // - Show tasks on the page

  // TODO: Load tasks and render them
  tasks.forEach(task => renderTask(task, taskList, emptyState));


  // When the user submits the form to add a task:
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // What should happen here:
    // - Read values from the form (title, category, due date)

    const title = form.querySelector("#task-title").value.trim();
    const category = form.querySelector("#task-category").value.trim();
    const dueDate = form.querySelector("#task-due-date").value;

    // - Validate that the title is not empty
    if (title === "") {
      alert("Task title cannot be empty!");
      return;
  }

    // - Create a new task object
    const newTask = {
      id: nextTaskId++,
      title,
      category,
      dueDate,
      completed: false
  };

    // - Add it to the tasks array
    tasks.push(newTask);
     // - Save updated tasks to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // - Update the page to show the new task
    renderTask(newTask, taskList, emptyState);
     // - Clear the form
    form.reset();
});
   
    // TODO: Add a new task
  });



  // When clicking inside the task list (“event delegation”):
  taskList.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest(".task-item");
    if (!listItem) return;

    const taskId = Number(listItem.dataset.id);

    // If the checkbox was clicked:
    if (target.classList.contains("task-checkbox")) {
      // What should happen here:
      // - Find the matching task in the array
      const task = tasks.find(t => t.id === taskId);

      if (task) { 
        task.completed = !task.completed;// - Toggle its completed state
        localStorage.setItem("tasks", JSON.stringify(tasks));// - Save updated tasks
        updateTaskInDOM(taskId, task.completed);// - Update the page
      }
      // TODO: Toggle completed state
      return;
    }

    // If the delete button was clicked:
    if (target.classList.contains("task-delete-btn")) {

      if (target.classList.contains("task-delete-btn")){
        tasks = tasks.filter(t => t.id !== taskId); // - Remove the task from the tasks array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // - Save updated tasks
        removeTaskFromDOM(taskId); // - Update the page
      }

      // TODO: Delete the task
      return;
    }
  });
