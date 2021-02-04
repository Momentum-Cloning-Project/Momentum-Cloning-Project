const $todoListMenu = document.querySelector(".sub-todo__menu");
const $dropdown = document.querySelector(".sub-todo__drop-down");
const $inputTodo = document.querySelector(".sub-todo__input");
const $todosState = document.querySelector(".sub-todo__selected");
const $todos = document.querySelector(".sub-todo__list");
const $inboxOption = document.querySelector("#Inbox > span");
const $todayOption = document.querySelector("#Today > span");
const $doneOption = document.querySelector("#Done > span");

const URL = 'http://localhost:5000'; 
const DEFAULT_STATE = 'Today';

let todos = [];
let todoState = DEFAULT_STATE;

$todoListMenu.onclick = () => {
  $dropdown.classList.toggle("active");
}

const createNew = () => {
  const $createBtn = document.querySelector(".sub-todo__new-button");
  todoState = DEFAULT_STATE;
  $createBtn.style.opacity = 0;
  $inputTodo.classList.remove('hidden');
}

const render = () => {
  let html = '';

  $todosState.firstChild.nodeValue = todoState;

  const _todos = todos.filter(({ completed }) => (todoState === 'Done' ? completed : todoState === 'Today' ? !completed : true));  
  const allCount = todos.length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = allCount - completedCount; 

  $inboxOption.textContent = allCount;
  $doneOption.textContent = completedCount;
  $todayOption.textContent = activeCount;

  if (_todos.length === 0) {
    $inputTodo.classList.add('hidden');
    html += `<div class="sub-todo__empty">
      <span>No Todos Yet</span>
      <button class="sub-todo__go-to-button"> ${todoState === 'Done' ? activeCount : completedCount } 
      todos in ${todoState === 'Today' ? 'Done' : 'Today'}<i class="fa fa-chevron-right" aria-hidden="true"></i></button>
      <button onclick="createNew()" class="sub-todo__new-button">New Todo</button>  
    </div> 
    `;
  } else {
    _todos.forEach(({ id, content, completed }) => {
      html += `<li id="${id}" class="todo-item">
          <input id="ck-${id}" class="checkbox" type="checkbox" ${ completed ? 'checked' : ''}>
          <label class= "${completed ? 'done' : ''}" for="ck-${id}">${content}</label>
          <i class="remove-todo fa fa-times" aria-hidden="true"></i>
        </li>`;
    });
  }
  $todos.innerHTML = html;
}

const updateTodos = _todos => {
  todos = _todos;
  render();
};

const config = (method, payload) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

const generateId = () => (todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1);

const getTodos = () => {
  fetch(`${URL}/todos`)
  .then(res => res.json())
  .then(updateTodos)
  .catch(console.error);
};

const addTodo = content => {
  fetch(`${URL}/todos`, config('POST',  { id: generateId(), content, completed: false }))
  .then(res => res.json())
  .then(updateTodos)
  .catch(console.error);
};

const toggleTodo = id => {
  const { completed } = todos.find(todo => todo.id === +id);
  fetch(`${URL}/todos/${id}`, config('PATCH', { completed }))
  .then(res => res.json())
  .then(updateTodos)
  .catch(console.error);
};

const removeTodo = id => {
  fetch(`${URL}/todos/${id}`, config('DELETE'))
  .then(res => res.json())
  .then(updateTodos)
  .catch(console.error);
}

window.onload = getTodos;

$dropdown.onclick = e => {
  todoState = (e.target.classList.contains('todo-count') ? e.target.parentNode.id : e.target.id);
  $dropdown.classList.remove("active");
  $inputTodo.classList.remove("hidden");
  render();
}

$inputTodo.onkeyup = ({ key, target }) => {
  const content = target.value.trim();
  if (key !== 'Enter' || content === '') return;
  addTodo(content);
  target.value = '';
};

$todos.onchange = e => {
  toggleTodo(e.target.parentNode.id);
};

$todos.onclick = e => {
  if (!e.target.matches('.remove-todo')) return;
  removeTodo(e.target.parentNode.id);
};