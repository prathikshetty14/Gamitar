document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const todoList = document.getElementById('todo-list').querySelector('ul');
    const doingList = document.getElementById('doing-list').querySelector('ul');
    const doneList = document.getElementById('done-list').querySelector('ul');
    const sortBySelect = document.getElementById('sort-by');

    let todos = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const endDate = document.getElementById('end-date').value;
        const priority = document.getElementById('priority').value;

        const todo = {
            id: Date.now(),
            title,
            description,
            endDate,
            priority,
            status: 'todo'
        };

        todos.push(todo);
        renderTodos();

        form.reset();
    });

    sortBySelect.addEventListener('change', () => {
        renderTodos();
    });

    function renderTodos() {
        todoList.innerHTML = '';
        doingList.innerHTML = '';
        doneList.innerHTML = '';

        const sortBy = sortBySelect.value;

        const sortedTodos = todos.sort((a, b) => {
            if (sortBy === 'priority') {
                const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
                if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
                    return new Date(a.endDate) - new Date(b.endDate);
                }
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            } else if (sortBy === 'end-date') {
                return new Date(a.endDate) - new Date(b.endDate);
            }
        });

        sortedTodos.forEach(todo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${todo.title}</strong>
                    <p>${todo.description}</p>
                    <small>${new Date(todo.endDate).toLocaleDateString()}</small><br />
                    <small class="priority">Priority: <span class="${todo.priority}">${todo.priority}</span></small>
                </div>
                <div>
                    <select onchange="updateStatus(${todo.id}, this.value)">
                        <option value="todo" ${todo.status === 'todo' ? 'selected' : ''}>To Do</option>
                        <option value="doing" ${todo.status === 'doing' ? 'selected' : ''}>Doing</option>
                        <option value="done" ${todo.status === 'done' ? 'selected' : ''}>Done</option>
                    </select>
                    <button class="edit" onclick="editTodo(${todo.id})">Edit</button>
                    <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            `;

            if (todo.status === 'todo') {
                todoList.appendChild(li);
            } else if (todo.status === 'doing') {
                doingList.appendChild(li);
            } else {
                doneList.appendChild(li);
            }
        });
    }

    window.editTodo = function (id) {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            document.getElementById('title').value = todo.title;
            document.getElementById('description').value = todo.description;
            document.getElementById('end-date').value = todo.endDate;
            document.getElementById('priority').value = todo.priority;

            deleteTodo(id);
        }
    };

    window.deleteTodo = function (id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
    };

    window.updateStatus = function (id, status) {
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            todo.status = status;
            renderTodos();
        }
    };
});
