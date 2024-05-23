Sure! Here is a step-by-step guide on how to set up and run the to-do list project using HTML, CSS, and JavaScript.

### Project Structure

Create a project directory with the following structure:

```
to-do-list/
│
├── index.html
├── style.css
└── script.js
```

### 1. **index.html**

Create an `index.html` file in the project directory with the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To-Do List</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="container">
      <h1>To-Do List</h1>
      <form id="todo-form">
        <input type="text" id="title" placeholder="Title" required />
        <input
          type="text"
          id="description"
          placeholder="Description"
          required
        />
        <input type="date" id="end-date" required />
        <select id="priority" required>
          <option value="" disabled selected>Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Add To-Do</button>
      </form>
      <div class="controls">
        <select id="sort-by">
          <option value="priority">Sort by Priority</option>
          <option value="end-date">Sort by End Date</option>
        </select>
      </div>
      <div class="lists">
        <div class="list" id="todo-list">
          <h2>To Do</h2>
          <ul></ul>
        </div>
        <div class="list" id="doing-list">
          <h2>Doing</h2>
          <ul></ul>
        </div>
        <div class="list" id="done-list">
          <h2>Done</h2>
          <ul></ul>
        </div>
      </div>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

### 2. **style.css**

Create a `style.css` file in the project directory with the following content:

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  width: 90%;
  max-width: 1200px;
  background: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

form input,
form select,
form button {
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  background-color: #28a745;
  color: white;
  border: none;
}

.lists {
  display: flex;
  justify-content: space-between;
}

.list {
  width: 32%;
}

.list h2 {
  text-align: center;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 4px;
}

li button.edit {
  background-color: #077bff;
}

li button.complete {
  background-color: #28a745;
}

li small.priority {
  font-weight: bold;
}

li .Low {
  color: #dcdc0d;
}

li .Medium {
  color: #ffac07;
}

li .High {
  color: #ff0707;
}
```

### 3. **script.js**

Create a `script.js` file in the project directory with the following content:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const todoList = document.getElementById("todo-list").querySelector("ul");
  const doingList = document.getElementById("doing-list").querySelector("ul");
  const doneList = document.getElementById("done-list").querySelector("ul");
  const sortBySelect = document.getElementById("sort-by");

  let todos = [];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const endDate = document.getElementById("end-date").value;
    const priority = document.getElementById("priority").value;

    const todo = {
      id: Date.now(),
      title,
      description,
      endDate,
      priority,
      status: "todo",
    };

    todos.push(todo);
    renderTodos();

    form.reset();
  });

  sortBySelect.addEventListener("change", () => {
    renderTodos();
  });

  function renderTodos() {
    todoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";

    const sortBy = sortBySelect.value;

    const sortedTodos = todos.sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        if (priorityOrder[a.priority] === priorityOrder[b.priority]) {
          return new Date(a.endDate) - new Date(b.endDate);
        }
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === "end-date") {
        return new Date(a.endDate) - new Date(b.endDate);
      }
    });

    sortedTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
                <div>
                    <strong>${todo.title}</strong>
                    <p>${todo.description}</p>
                    <small>${new Date(
                      todo.endDate
                    ).toLocaleDateString()}</small><br />
                    <small class="priority">Priority: <span class="${
                      todo.priority
                    }">${todo.priority}</span></small>
                </div>
                <div>
                    <select onchange="updateStatus(${todo.id}, this.value)">
                        <option value="todo" ${
                          todo.status === "todo" ? "selected" : ""
                        }>To Do</option>
                        <option value="doing" ${
                          todo.status === "doing" ? "selected" : ""
                        }>Doing</option>
                        <option value="done" ${
                          todo.status === "done" ? "selected" : ""
                        }>Done</option>
                    </select>
                    <button class="edit" onclick="editTodo(${
                      todo.id
                    })">Edit</button>
                    <button class="delete" onclick="deleteTodo(${
                      todo.id
                    })">Delete</button>
                </div>
            `;

      if (todo.status === "todo") {
        todoList.appendChild(li);
      } else if (todo.status === "doing") {
        doingList.appendChild(li);
      } else {
        doneList.appendChild(li);
      }
    });
  }

  window.editTodo = function (id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      document.getElementById("title").value = todo.title;
      document.getElementById("description").value = todo.description;
      document.getElementById("end-date").value = todo.endDate;
      document.getElementById("priority").value = todo.priority;

      deleteTodo(id);
    }
  };

  window.deleteTodo = function (id) {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  };

  window.updateStatus = function (id, status) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      todo.status = status;
      renderTodos();
    }
  };
});
```

### Running the Project

1. **Set up the project directory**:

   - Create a new directory for your project.
   - Inside this directory, create three files: `index.html`, `style.css`, and `script.js`.

2. **Copy the code**:

   - Copy the provided HTML code into the `index.html` file.
   - Copy the provided CSS code into the `style.css` file.
   - Copy the provided JavaScript code into the `script.js` file.

3. **Open the project in a browser**:

   - Open the `index.html` file in your web browser by double-clicking on it or right-clicking and selecting "Open with" followed by your browser of choice.

4. **Interact with the application**:
   - Add, edit, delete, and mark tasks as complete using the provided form and buttons.
   - Sort tasks using the dropdown menu to organize them by priority or end date.

That's it! You now have a functional to-do list application that you can extend and customize as needed.
