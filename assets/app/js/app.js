var
  helloWorld = require('./hello_world'),
  app = document.querySelector('#app'),
  heading = document.createElement('h1');

heading.innerText = helloWorld();
app.appendChild(heading);