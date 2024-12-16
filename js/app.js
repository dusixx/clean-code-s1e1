import { createTaskElement } from "./helpers.js";

const taskInput = document.querySelector(".add-task__input");
const addButton = document.querySelector(".add-task__btn");
const incompleteTasks = document.querySelector(".todo__tasks");
const completedTasks = document.querySelector(".completed__tasks");

addButton.addEventListener("click", addTask);
incompleteTasks.addEventListener("click", handleTaskClick);
completedTasks.addEventListener("click", handleTaskClick);

function addTask() {
  if (!taskInput.value) {
    return;
  }
  incompleteTasks.append(createTaskElement(taskInput.value));
  taskInput.value = "";
}

function editTask(task) {
  const editInput = task.querySelector(".task__input");
  const label = task.querySelector(".task__label");
  const editBtn = task.querySelector(".task__edit");

  const isEditMode = task.classList.toggle("task_edit");

  if(isEditMode){
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  } else {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  }
}

function handleTaskClick({ target, currentTarget }) {
  const task = target.closest(".task");
  
  const list = currentTarget === completedTasks 
    ? incompleteTasks 
    : completedTasks;

  if(target.matches(".task__check")) {
    list.append(task);
  } else if(target.matches(".task__edit")) {
    editTask(task);
  } else if(target.closest(".task__delete")) {
    task.remove();
  }
}