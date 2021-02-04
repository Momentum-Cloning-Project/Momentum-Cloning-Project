const express = require('express');
const cors = require('cors');

let todos = [
 
];

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.post('/todos', (req, res) => {
  // TODO:  ID 가 중복일때 에러처리
  // TODO:  페이로드가 없을때 에러처리
  todos = [...todos, req.body];
  return res.send(todos);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos.forEach(todo => {
    if (todo.id === +id) todo.completed = !req.body.completed;
  });
  res.send(todos);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(todo => todo.id !== +id);
  return res.send(todos);
});

app.listen(PORT, () => console.log(`server running on ${PORT}`));
