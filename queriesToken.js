const Pool = require("pg").Pool;
const pool = new Pool({
    user: "pwa",
    host: "localhost",
    database: "pwa",
    password: "password",
    port: 5432,
});
const getTokens = (request, response) => {
    pool.query("SELECT * FROM tokens ORDER BY id ASC", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getAllTokens = async() => {
    try {
        const result = await pool.query("SELECT * FROM tokens ORDER BY id ASC");
        const tokens = result.rows.map((row) => row.token);
        return tokens;
    } catch (error) {
        throw error;
    }
};

const createToken = (request, response) => {
    const token = request.params.token;
    pool.query(
        "SELECT * FROM tokens WHERE token = $1", [token],
        (error, results) => {
            if (results.rows.length == 0) {
                pool.query(
                    "INSERT INTO tokens (token) VALUES ($1)", [token],
                    (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        response
                            .status(201)
                            .send(`Token added with ID: ${results.insertId}`);
                    }
                );
            }
        }
    );
};

module.exports = {
    getTokens,
    createToken,
    getAllTokens,
};