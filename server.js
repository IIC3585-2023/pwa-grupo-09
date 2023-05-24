const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const db_post = require("./queriesPost");
const db_token = require("./queriesToken");

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use(
    cors({
        origin: "http://localhost:8080",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/posts", db_post.getPosts);
app.get("/posts/:id", db_post.getPostById);
app.post("/posts", db_post.createPost);
app.put("/posts/:id", db_post.updatePost);
app.delete("/posts/:id", db_post.deletePost);

app.get("/tokens", db_token.getTokens);
app.post("/tokens/:token", db_token.createToken);

// Start server

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});