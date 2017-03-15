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
  }
}
