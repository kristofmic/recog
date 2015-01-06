var
  fs = require('fs'),
  tasks;

tasks = fs.readdirSync(__dirname);

tasks.forEach(function(task) {
  task = task.split('.')[0];

  exports[task] = require('./' + task);
});