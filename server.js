const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const db = require("./queries");
const db_post = require("./queriesPost");
const db_token = require("./queriesToken");

const sendPushNotification = require("./axiosPush");

app.use(morgan("dev"));
app.use(bodyParser.json());

// Configurar el middleware para servir archivos estáticos
//app.use(express.static(path.join(__dirname, "public")));

// Ruta de inicio
/* app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
}); */

app.use(
    cors({
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

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

app.get("/tokens", db_token.getTokens);
app.post("/tokens/:token", db_token.createToken);

// Iniciar el servidor

//sendPushNotification();

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});