const sendPushNotification = require("./axiosPush");

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "pwa",
    host: "localhost",
    database: "pwa",
    password: "password",
    port: 5432,
});
const getPosts = (request, response) => {
    sendPushNotification();

    pool.query("SELECT * FROM posts ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getPostById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query("SELECT * FROM posts WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

//change
const createPost = (request, response) => {
    const { title, body, img_url } = request.body;

    pool.query(
        "INSERT INTO posts (title, body, img_url) VALUES ($1, $2)", [title, body, img_url],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(201).send(`Post added with ID: ${results.insertId}`);
        }
    );
};

const updatePost = (request, response) => {
    const id = parseInt(request.params.id);
    const { title, body, img_url } = request.body;

    pool.query(
        "UPDATE posts SET name = $1, password = $2 WHERE id = $3", [title, body, img_url, id],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).send(`Post modified with ID: ${id}`);
        }
    );
};

const deletePost = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query("DELETE FROM posts WHERE id = $1", [id], (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Post deleted with ID: ${id}`);
    });
};

module.exports = {
    getPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};