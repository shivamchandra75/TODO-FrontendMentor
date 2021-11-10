// SELECTORS
let darkMode = localStorage.getItem("darkMode"); //this line searchs for the item in the getItem("") if it is there passes it to the variable if not creates it and then passes it.once it is created in local storage then it would stay there.
const inputSection = document.querySelector(".input");
const todoListContainer = document.querySelector(".list-div");
const todoList = document.querySelector(".todo-list");
const addTodoBtn = document.querySelector(".input-div-btn");
const filterDiv = document.querySelector(".filter-div");
const todoCount = document.querySelector(".todo-count");
const themeBtn = document.querySelector(".theme-toggle-btn");
const bgImage = document.querySelector("#body-bg-image");
const themeImg = document.querySelector(".theme-img");
const containers = document.querySelectorAll(".container");
const filterBtnContainer = document.querySelector(".filter-btn-container");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", uiUpdateOnPageLoad);
addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", checkTodo);
filterDiv.addEventListener("click", filterTodos);
themeBtn.addEventListener("click", toggleDarkMode);
filterBtnContainer.addEventListener("click", currentActiveBtn);

// FUNCTIONS

// this function adds a todo to todo list.
function addTodo(event) {
  event.preventDefault();
  // Creating a TodoDiv
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo", "count", "draggables");
  todoDiv.setAttribute("draggable", "true");
  // Create completed button
  const completedBtn = document.createElement("button");
  completedBtn.classList.add("completed-todo-btn");
  completedBtn.innerHTML =
    '<img src="../images/icon-check.svg" class="check-img" alt="cross">'; //the image path is relative to dist folder
  todoDiv.appendChild(completedBtn);
  // Creating li to store the entered value.
  const todoText = document.createElement("li");
  todoText.innerText = inputSection.value;
  todoText.classList.add("todo-text");
  todoDiv.appendChild(todoText);
  saveLocalTodos(inputSection.value);
  // Create a delete todo button
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.classList.add("delete-todo-btn");
  deleteTodoBtn.innerHTML =
    '<img src="../images/icon-cross.svg" class="cross-img" alt="cross">'; //the image path is relative to dist folder
  todoDiv.appendChild(deleteTodoBtn);
  todoList.appendChild(todoDiv);
  updateTodoCount();
  dragablesList();
  inputSection.value = "";
}

// this func checks if the todo is completed or removed.
function checkTodo(e) {
  const item = e.target;
  if (item.classList[0] === "delete-todo-btn") {
    item.parentElement.remove(); //Here the parent element is todoDiv.
    updateTodoCount();
    removeLocalTodo(item.parentElement);
  }
  if (item.classList[0] === "completed-todo-btn") {
    const parent = item.parentElement;
    if (parent.children[1].classList.contains("completed")) {
      parent.classList.toggle("count");
      parent.children[1].classList.toggle("completed");
      item.classList.toggle("btn-gradient");
      item.children[0].style.opacity = "0";
      updateTodoCount();
    } else {
      parent.classList.toggle("count");
      parent.children[1].classList.toggle("completed");
      item.classList.toggle("btn-gradient");
      item.children[0].style.opacity = "1";
      updateTodoCount();
    }
  }
}

function updateTodoCount() {
  const count = document.querySelectorAll(".todo-list .count").length;
  todoCount.innerText = count + " " + "items left";
}

function filterTodos(event) {
  const item = event.target;
  const todos = todoList.childNodes;
  if (item.classList[0] === "filter-completed-btn") {
    todos.forEach((todo) => {
      if (todo.children[1].classList.contains("completed")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    });
  }
  if (item.classList[0] === "filter-active-btn") {
    todos.forEach((todo) => {
      if (todo.children[1].classList.contains("completed")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    });
  }
  if (item.classList[0] === "filter-all-btn") {
    todos.forEach((todo) => {
      todo.style.display = "flex";
    });
  }

  if (item.classList[0] === "filter-clear-btn") {
    [...todoList.children].forEach((todo) => {
      if (!todo.classList.contains("count")) {
        todo.remove();
      }
    });
  }
}

const enableDarkMode = () => {
  // this will enable dark mode.
  document.body.classList.add("dark");
  bgImage.src = "../images/bg-desktop-dark.jpg";
  themeImg.src = "../images/icon-sun.svg";
  // update the value in localStorage.
  darkMode = localStorage.setItem("darkMode", "enabled");
};

const disableDarkMode = () => {
  // this will disable dark mode.
  document.body.classList.remove("dark");
  bgImage.src = "../images/bg-desktop-light.jpg";
  themeImg.src = "../images/icon-moon.svg";
  // update the value in localStorage.
  darkMode = localStorage.setItem("darkMode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

function toggleDarkMode() {
  darkMode = localStorage.getItem("darkMode");
  if (darkMode !== "enabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
}

// This function saves your todos to your local storage on your device only
function saveLocalTodos(todo) {
  // first check if we already have todos in local storage
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// This function updates the ui when it finds old todos saved in you local storage
function uiUpdateOnPageLoad() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo", "count", "draggables");
    todoDiv.setAttribute("draggable", "true");
    // Create completed button
    const completedBtn = document.createElement("button");
    completedBtn.classList.add("completed-todo-btn");
    completedBtn.innerHTML =
      '<img src="../images/icon-check.svg" class="check-img" alt="cross">';
    todoDiv.appendChild(completedBtn);
    // Creating li to store the entered value.
    const todoText = document.createElement("li");
    todoText.innerText = todo;
    todoText.classList.add("todo-text");
    todoDiv.appendChild(todoText);
    // Create a delete todo button
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.classList.add("delete-todo-btn");
    deleteTodoBtn.innerHTML =
      '<img src="../images/icon-cross.svg" class="cross-img" alt="cross">';
    todoDiv.appendChild(deleteTodoBtn);
    todoList.appendChild(todoDiv);
    updateTodoCount();
    dragablesList();
  });
}

function removeLocalTodo(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  console.log(todos);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function dragablesList() {
  let dragables = document.querySelectorAll(".draggables");

  dragables.forEach((todo) => {
    todo.addEventListener("dragstart", () => {
      todo.classList.add("dragging");
    });

    todo.addEventListener("touchstart", () => {
      todo.classList.add("dragging");
    });

    todo.addEventListener("dragend", () => {
      todo.classList.remove("dragging");
    });

    todo.addEventListener("touchend", () => {
      todo.classList.remove("dragging");
    });

    todo.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const afterElement = getDragAfterElement(todoList, e.touches[0].clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement == null) {
        todoList.appendChild(draggable);
      } else {
        todoList.insertBefore(draggable, afterElement);
      }
    });
  });
}

todoList.addEventListener("dragover", (e) => {
  e.preventDefault();
  const afterElement = getDragAfterElement(todoList, e.clientY);
  const draggable = document.querySelector(".dragging");
  if (afterElement == null) {
    todoList.appendChild(draggable);
  } else {
    todoList.insertBefore(draggable, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggables:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// this function makes the currently active filter button blue.
function currentActiveBtn(e) {
  const item = e.target;
  const buttonArray = [...filterBtnContainer.querySelectorAll(".fbtn")];

  buttonArray.forEach((filterBtn) => {
    if (filterBtn.classList.contains("active")) {
      filterBtn.classList.remove("active");
    }
  });

  item.classList.add("active");
}
