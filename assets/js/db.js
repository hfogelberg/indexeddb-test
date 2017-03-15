var iDB = (function() {
  var DB = {};
  var datastore = null;

  // Open Db connection
  DB.open = function(callback) {
    var version = 1;
    var request = indexedDB.open('todos', version);

    // Handle db store upgrade
    request.onupgradeneeded = function(e) {
      alert('onupgradeneeded');
      var db = e.target.result;
      e.target.transaction.onerror = DB.onerror;

      if (db.objectStoreNames.contains('todo')) {
        db.deleteObjectStore('todo');
      }

      var store = db.createObjectStore('todo', {
        keyPath: 'timestamp'
      });
    };

    request.onsuccess = function(e) {
      datastore = e.target.result;
      callback();
    };
    request.onerror = DB.onerror;
  };

  // Create todo
  DB.createTodo = function(text, callback) {
    var db = datastore;
    var transaction  = db.transaction(['todo'], 'readwrite');
    var objStore = transaction.objectStore('todo');
    var timestamp = new Date().getTime();
    var todo = {
      'text': text,
      'timestamp': timestamp
    };
    var request = objStore.put(todo);

    request.onsuccess = function(e) {
      callback(todo);
    };
    request.onerror  = DB.onerror;
  };

  return DB;
}());
