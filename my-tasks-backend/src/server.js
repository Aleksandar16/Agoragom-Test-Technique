const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 8080;
const cors = require('cors');
const tasksJSON = './src/data/tasks.json';

app.use(bodyParser.json());
app.use(cors());

let tasks = [];
if (fs.existsSync(tasksJSON)) {
  const tasksData = fs.readFileSync(tasksJSON);
  tasks = JSON.parse(tasksData);
}

app.get('/api/tasks', (req, res) => {
  res.send(tasks)
})

app.post('/api/tasks', (req, res) => {
  const title = req.body.title;
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title: title
  };

  tasks.push(newTask);

  fs.writeFile(tasksJSON, JSON.stringify(tasks, null, 2), err => {
    if (err) {
      return res.status(500).send('Error 505.');
    }
    res.status(200).send('Tâche ajoutée avec succès.');
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  task = tasks.filter((task) => task.id === id);

  tasks.find(task => task.id === id).title = req.body.title;

  fs.writeFile(tasksJSON, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error 505.');
    }
    res.status(200).send('Tâche modifiée avec succès.');
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  fs.writeFile(tasksJSON, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error 505.');
    }
    res.status(200).send('Tâche supprimée avec succès.');
  });
});

app.listen(port, () => {
  console.log(`App started http://localhost:${port}`);
});
