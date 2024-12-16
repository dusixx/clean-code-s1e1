//----------------
// Helpers
//----------------

const createElement = (tagName, props, childs, opts) => {
  const el = document.createElement(tagName, opts);
  Object.entries(props).forEach(([k, v]) => (el[k] = v));
  try { 
    el.append(...childs); 
  } catch {
  }
  return el;
}

export const createTaskElement = function(text) {
  const checkBox = createElement("input", {
    type: "checkbox", 
    className: "task__check"
  });

  const label = createElement("label", {
    innerText: text,
    className: "task__label"
  });

  const editInput = createElement("input", {
    type: "text",
    className: "task__input text-input-primary"
  });

  const editButton = createElement("button", {
    type: "button",
    innerText: "Edit",
    className: "task__edit btn-primary"
  });

  const deleteButtonImg = createElement("img", {
    src: "./remove.svg",
    className: "task__icon",
    alt: "Remove task button icon"
  });

  const deleteButton = createElement("button", {
    type: "button",
    className: "task__delete btn-primary"
  }, [ deleteButtonImg ]);

  return createElement("li", {
    className: "task"
  }, [ checkBox, label, editInput, editButton, deleteButton ]);
}

//----------------
// App
//----------------

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