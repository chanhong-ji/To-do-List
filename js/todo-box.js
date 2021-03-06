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
let completedTodos = [];
const savedTodos = localStorage.getItem("todos");
const savedCompletedTodos = localStorage.getItem("completedTodos");

todoForm.addEventListener("submit", submitTodoForm);

function submitTodoForm(event) {
  event.preventDefault();
  const newTodoObj = {
    title: todoTitle.value,
    detail: todoDetail.value,
    id: Date.now(),
  };
  todoTitle.value = "";
  todoDetail.value = "";
  todoForm.classList.add("hidden");
  todos.push(newTodoObj);
  paintTodo(newTodoObj);
  saveTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
function saveCompletedTodos() {
  localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
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
  const completedTodo = todos.find((todo) => todo.id == parseInt(li.id));
  completedTodos.push(completedTodo);
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  li.remove();
  saveTodos();
  saveCompletedTodos();
}

function spotlightTodo(event) {
  event.target.classList.toggle("yellow");
}

if (savedTodos) {
  const parsedTodos = JSON.parse(savedTodos);
  todos = parsedTodos;
  todos.forEach(paintTodo);
}
if (savedCompletedTodos) {
  const parsedCompletedTodos = JSON.parse(savedCompletedTodos);
  completedTodos = parsedCompletedTodos;
}

// todo btn
const formPlusBtn = document.querySelector(".todo-box button");
function showForm() {
  todoForm.classList.toggle("hidden");
}

formPlusBtn.addEventListener("click", showForm);

// on click exchange Btn
const todoTop = document.querySelector(".small-box__top");
const todoTopSpan = todoTop.querySelector("span");
const exchangeBtn = todoTop.querySelector("i:last-child");

exchangeBtn.addEventListener("click", exchangeLists);

function exchangeLists() {
  todoTopSpan.innerText = todoTopSpan.innerHTML == "To Do" ? "Done" : "To Do";
  todoLists.innerHTML = "";
  if (todoTopSpan.innerText == "To Do") {
    todos.forEach(paintTodo);
    formPlusBtn.classList.remove("hidden");
  } else {
    formPlusBtn.classList.add("hidden");
    todoForm.classList.add("hidden");
    completedTodos.forEach(paintCompletedTodo);
  }
}

function paintCompletedTodo(completedtodoObj) {
  const li = document.createElement("li");
  const trash = document.createElement("span");
  const infoBox = document.createElement("div");
  const infoTitle = document.createElement("span");
  const infoDetail = document.createElement("span");
  todoLists.appendChild(li);
  li.id = completedtodoObj.id;
  li.appendChild(trash);
  li.appendChild(infoBox);
  infoBox.appendChild(infoTitle);
  infoBox.appendChild(infoDetail);
  trash.innerHTML = '<i class="fas fa-trash"></i>';
  infoTitle.innerText = completedtodoObj.title;
  infoDetail.innerText = completedtodoObj.detail;
  trash.addEventListener("click", deleteCompletedTodo);
}

function deleteCompletedTodo(event) {
  const li = event.target.parentElement.parentElement;
  completedTodos = completedTodos.filter((todo) => todo.id !== parseInt(li.id));
  saveCompletedTodos();
  li.remove();
}
