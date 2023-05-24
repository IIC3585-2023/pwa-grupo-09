const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const db = require("./queries");
const db_post = require("./queriesPost");

const sendPushNotification = require("./axiosPush");

// Configurar el middleware para servir archivos estáticos
//app.use(express.static(path.join(__dirname, "public")));

// Ruta de inicio
/* app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
}); */

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.get("/posts", db_post.getPosts);
app.get("/posts/:id", db_post.getPostById);
app.post("/posts", db_post.createPost);
app.put("/posts/:id", db_post.updatePost);
app.delete("/posts/:id", db_post.deletePost);

// Iniciar el servidor

//sendPushNotification();

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});