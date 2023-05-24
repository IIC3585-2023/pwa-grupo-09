const axios = require("axios");

function pushNotifications() {
    const url = " https://fcm.googleapis.com/fcm/send";

    const headers = {
        "Content-Type": "application/json",
        Authorization: "key=AAAAWn8XdRU:APA91bG4TZQqE2ZYdgBNAoIIqReHTgq0PKvJ7tyHstbZLorVA57WrputDuuH4W6VqrjvKIRH4r7KjE6szGFE-F9ys9dIGzn_HvbNrXPQVG3VslOQJzPu8_kwL67_vylOa7RgLEqdDuUm",
    };

    token =
        "epbiYfpNeD9wSnPB2mxPZu:APA91bE002IvHy08x5mPHqTMLgb3jQz3wbrlnlExNfEaCtm0-nWMX_UtvjtH3YoctRTCorThDh3nVUKjEZe63YUd6gU4Xu0T3vVHk8djU7u0vRigAEZVAeCkcMYw3scV-XgCgl3T1Tcr";

    const data = {
        notification: {
            title: "Alguien consultó lost posts creados",
            body: "Quizas leyeron tu texto?",
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
}

module.exports = pushNotifications;