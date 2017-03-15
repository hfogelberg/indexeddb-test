window.onload = function() {
  iDB.open(refreshTodos);
  var newTodoForm = document.getElementById('new-todo-form');
  var newTodoInput = document.getElementById('new-todo');

  newTodoForm.onsubmit = function() {
    var text = newTodoInput.value;

    if (text.replace(/ /g,'') != '') {
      iDB.createTodo(text, function(todo) {
        refreshTodos();
      });
    }

    newTodoInput.value = '';
    return false;
  };

  function refreshTodos() {
    console.log('refreshTodos');
    iDB.fetchTodos(function(todos) {
      console.log('Toods fetched', todos);

      var todoList = document.getElementById('todo-items');
      todoList.innerHTML = '';

      for(var i=todos.length;i>=0;i--) {
        var todo = todos[i-1];
        console.log(todo);
        var li = document.createElement('li');
        li.id = 'todo-' + todo.timestamp;
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.setAttribute('data-id', todo.timestamp);
        li.appendChild(checkbox);
        var span = document.createElement('span');
        span.innerHTML = todo.text;
        li.appendChild(span);
        todoList.appendChild(li);

        // event listener to delete todo
        checkbox.addEventListener('click', function(e) {
          var id = parseInt(e.target.getAttribute('data-id'));
          iDB.deleteTodo(id, refreshTodos);
        });
      }
    });
  };
}
