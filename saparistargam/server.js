const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const port = 3001;

app.use(express.json());
app.use(cors());
// Загрузка данных из файла
const loadUsers = () => {
  const rawData = fs.readFileSync("./data/users.json");
  const users = JSON.parse(rawData);
  return users;
};
const loadPost = () => {
  const rawData = fs.readFileSync("./data/post.json");
  const posts = JSON.parse(rawData);
  return posts;
};

// Сохранение данных в файл
const saveUsers = (users) => {
  fs.writeFileSync("./data/users.json", JSON.stringify(users));
};

const savePosts = (users) => {
  fs.writeFileSync("./data/post.json", JSON.stringify(users));
};
// app.get("/items", (req, res) => {
//   const users = loadUsers();
//   res.json(users);
// });
// // Обработка POST-запроса
// app.post("/items", (req, res) => {
//   const users = loadUsers();
//   const newUser = req.body;
//   users.push(newUser);
//   saveUsers(users);
//   res.send("User added");
// });
app.get("/items", (req, res) => {
  const users = loadUsers();
  res.json(users);
});

app.post("/items", (req, res) => {
  const users = loadUsers();
  const newUser = req.body;
  const targetName = newUser.id;
  const index = users.findIndex((item) => item.id === targetName);
  console.log(targetName);
  if (index !== -1) {
    users.splice(index, 1, newUser);
  } else {
    users.push(newUser);
  }

  saveUsers(users);
  res.send("User added/updated");
});

app.get("/posts", (req, res) => {
  const posts = loadPost();
  res.json(posts);
});
app.post("/posts", (req, res) => {
  const posts = loadPost();
  const newPost = req.body;
  posts.unshift(newPost);
  savePosts(posts);
  res.send("Posts added");
});

app.post("/edit", (req, res) => {
  const posts = loadPost();
  const { id_user, name, avatar } = req.body;

  const updatedPosts = posts.map((post) => {
    if (post.id_user === id_user) {
      const updatedPost = Object.assign({}, post, { name, avatar });
      return updatedPost;
    }
    return post;
  });

  savePosts(updatedPosts);

  res.send("Users updated");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
