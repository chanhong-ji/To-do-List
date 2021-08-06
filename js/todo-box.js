// todo-box__control-bar Date
const TodoDate = document.querySelector(
  ".todo-box__control-bar span:nth-child(2)"
);

const date = new Date();
TodoDate.innerText = `${date.getMonth() + 1} / ${date.getDate()}`;

// todo-box__lists
const todoForm = document.querySelector(".todo-box__form");
const todoTitle = todoForm.querySelector("input:first-child");
const todoDetail = todoForm.querySelector("input:nth-child(2)");
const todoLists = document.querySelector(".todo-box__lists");

let todos = [];
const savedTodos = localStorage.getItem("todos");

todoForm.addEventListener("submit", submitTodoForm);

function submitTodoForm(event) {
  event.preventDefault();
  const newTodoObj = {
    title: todoTitle.value,
    detail: todoDetail.value,
    id: new Date(),
  };
  todoTitle.value = "";
  todoDetail.value = "";
  todos.push(newTodoObj);
  todoForm.classList.add("hidden");
  paintTodo(newTodoObj);
  saveTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function paintTodo(todoObj) {
  const li = document.createElement("li");
  const circle = document.createElement("span");
  const infoBox = document.createElement("div");
  const infoTitle = document.createElement("span");
  const infoDetail = document.createElement("span");
  const star = document.createElement("span");
  if (todos) {
    todoLists.insertBefore(li, todoLists.querySelector("li"));
  } else {
    todoLists.appendChild(li);
  }
  li.id = todoObj.id;
  li.appendChild(circle);
  li.appendChild(infoBox);
  li.appendChild(star);
  infoBox.appendChild(infoTitle);
  infoBox.appendChild(infoDetail);
  circle.innerHTML = '<i class="far fa-check-circle fa-lg"></i>';
  star.innerHTML = '<i class="fas fa-star fa-lg"></i>';
  infoTitle.innerText = todoObj.title;
  infoDetail.innerText = todoObj.detail;
  circle.addEventListener("click", deleteTodo);
  star.addEventListener("click", spotlightTodo);
}

function deleteTodo(event) {
  const li = event.target.parentElement.parentElement;
  todos = todos.filter((todo) => todo.id !== li.id);
  li.remove();
  saveTodos();
}

function spotlightTodo(event) {
  event.target.classList.toggle("yellow");
}

if (savedTodos) {
  todos = JSON.parse(savedTodos);
  todos.forEach(paintTodo);
}

// todo btn
const formPlusBtn = document.querySelector(".todo-box button");
function showForm() {
  todoForm.classList.toggle("hidden");
}

formPlusBtn.addEventListener("click", showForm);
