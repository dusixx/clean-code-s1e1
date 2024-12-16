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
    src: "./assets/remove.svg",
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