const toDoForm = document.querySelector("#todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector("#todo-list"); 

let toDos = [];
const TODOS_KEY = "todos";

const saveToDos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const removeToDo = (event) => {
  const li = event.target.parentElement;
  toDos = toDos.filter((item) => item.id !== parseInt(li.id));
  saveToDos();
  li.remove();
}

const paintToDo = (newToDo) => {
   const li = document.createElement("li");
   li.id = newToDo.id;
   const span = document.createElement("span");
   const button = document.createElement("button");

   span.innerText = newToDo.text;
   button.innerText = "❌";
   button.addEventListener("click", removeToDo);

   li.appendChild(span);
   li.appendChild(button);
   toDoList.appendChild(li); 
}

const handleToDoSubmit = (event) => {
  event.preventDefault();
  const newToDo = { 
    id: Date.now(),
    text: toDoInput.value,
  };
  toDos.push(newToDo);
  toDoInput.value = "";
  paintToDo(newToDo);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit); 

const savedToDos = localStorage.getItem(TODOS_KEY); 
if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos); 
  toDos = parsedToDos;
  parsedToDos.forEach((item) => {
    paintToDo(item);
  });
}