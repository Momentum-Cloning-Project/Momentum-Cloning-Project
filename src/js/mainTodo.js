let $mainTodo = document.getElementById('mainTodo');
const $mainTodoContent = document.querySelector('.main-content');

export const mainTodoHandler = () => {
    if(JSON.parse(localStorage.getItem('main-todo')) !== null) {
        removeCurrentToDoContent();
        createNewTodo(JSON.parse(localStorage.getItem('main-todo')));
    }
    $mainTodoContent.addEventListener('change', toggleMainTodo);
    
    $mainTodoContent.addEventListener('keyup', e => {
        e.preventDefault();

        if (!(e.key === 'Enter')) return;
        if (e.target.value === '') alert('no value');
        $mainTodo = document.getElementById('mainTodo');
        const todo = $mainTodo.value;
        localStorage.setItem('main-todo', JSON.stringify(todo));


        removeCurrentToDoContent();
        createNewTodo(JSON.parse(localStorage.getItem('main-todo')));
    })

    $mainTodoContent.addEventListener('click', backToOriginState)
}

const removeCurrentToDoContent = () => {
    const htmlCollection = [...$mainTodoContent.children];
    if(htmlCollection[2]) {
        $mainTodoContent.removeChild(htmlCollection[2]);
    }
    if(htmlCollection[3]) {
        $mainTodoContent.removeChild(htmlCollection[3]);
    }
    
}

const createNewTodo = todo => {
    const $newNode = document.createElement('div');
    $newNode.classList.add('main-todo');

    $newNode.innerHTML = `<p class="main-todo__heading">Today</p>
        <div class='main-todo__content'>
        <input type="checkbox" class="main-todo__checkbox"/>
        <span id='mainTodoDescription' class="main-todo__description" >${todo}</span>
        <i class="fa fa-times" class="remove-icon"></i>
        </div>`;


    $mainTodoContent.appendChild($newNode);
}

const toggleMainTodo = e => {
    if (!e.target.classList.contains('main-todo__checkbox')) return;
    e.target.nextElementSibling.classList.toggle('line-through');
}

const backToOriginState = e => {
    if (!e.target.classList.contains('fa-times')) return;

    removeCurrentToDoContent();
    const $newNode = document.createElement('label');
    $newNode.classList.add('main-content__input-label');
    $newNode.setAttribute('for', "mainTodo");
    $newNode.textContent = 'What is your main focus for today?'

    const $newNode1 = document.createElement('input');
    $newNode1.classList.add('main-content__input');
    $newNode1.setAttribute('type', 'text');
    $newNode1.setAttribute('id', 'mainTodo');
    $newNode1.setAttribute('name', 'main-todo');
    
    $mainTodoContent.appendChild($newNode);
    $mainTodoContent.appendChild($newNode1);

    localStorage.removeItem('main-todo');
}