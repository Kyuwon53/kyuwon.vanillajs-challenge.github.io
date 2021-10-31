const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector("#todo-list");
const todoInput = todoForm.querySelector("input");

const TODOS_KEY = "todos";
const TEXT_LINE = "text-line";

let toDos = [];

function saveToDos(){
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo (event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter(toDo => toDo.liId !== parseInt(li.liId));
  saveToDos();
}

function checkToDo (event) {
  const li = event.target.parentElement;
  const className = li.getAttribute("class");
  console.log(className);
  if (className === TEXT_LINE) {
    li.classList.remove(TEXT_LINE);
  } else {
    li.classList.add(TEXT_LINE);
  }
}

function paintToDo(newTodo) {
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const toDoDate = document.createElement("span");

  toDoDate.innerText = newTodo.ulId;

  ul.appendChild(li);
  li.liId = newTodo.liId;

  const span = document.createElement("span");
  span.innerText = newTodo.text;

  const button = document.createElement("button");
  button.innerText = "X";
  button.classList.add("button");
  button.classList.add("delete");
  button.addEventListener("click", deleteToDo);


  li.addEventListener("click", checkToDo);
  li.appendChild(span);
  li.appendChild(toDoDate);
  li.appendChild(button);
  todoList.appendChild(ul);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    ulId: `${year}${month}${day}`,
    liId: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(saveToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

