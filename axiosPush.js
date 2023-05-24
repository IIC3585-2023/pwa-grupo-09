const axios = require("axios");
const db_token = require("./queriesToken");

async function pushNotifications(information) {
    const url = " https://fcm.googleapis.com/fcm/send";

    const headers = {
        "Content-Type": "application/json",
        Authorization: "key=AAAAWn8XdRU:APA91bG4TZQqE2ZYdgBNAoIIqReHTgq0PKvJ7tyHstbZLorVA57WrputDuuH4W6VqrjvKIRH4r7KjE6szGFE-F9ys9dIGzn_HvbNrXPQVG3VslOQJzPu8_kwL67_vylOa7RgLEqdDuUm",
    };

    tokens = await db_token.getAllTokens();
    tokens.forEach((token) => {
        const data = {
            notification: {
                title: information.title,
                body: information.body,
                click_action: "http://127.0.0.1:8080/index.html",
                icon: "https://icons.veryicon.com/png/o/food--drinks/supermarket-supplies/banana-37.png",
            },
            to: token,
        };

        axios
            .post(url, data, { headers })
            .then((response) => {
                console.log("Response:", response.data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    });
}

module.exports = pushNotifications;