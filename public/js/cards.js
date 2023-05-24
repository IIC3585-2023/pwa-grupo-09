const getCards = async() => {
    /* const boxes = [{
                            img_url: "https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg",
                            title: "Title 1",
                            body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque.",
                        },
                        {
                            img_url: "https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg",
                            title: "Title 2",
                            body: "Nulla nec tincidunt quam. In feugiat diam eget lobortis facilisis. Suspendisse bibendum malesuada felis vitae consequat.",
                        },
                        {
                            img_url: "https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg",
                            title: "Title 3",
                            body: "Sed fermentum tellus vel quam posuere, nec interdum neque consectetur. Maecenas sed mattis lectus, eu iaculis leo.",
                        },
                        {
                            img_url: "https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg",
                            title: "Title 4",
                            body: "Etiam finibus risus a felis condimentum, ac dictum dui lacinia. Phasellus id felis a purus fringilla molestie.",
                        },
                    ]; */
    let boxes;
    try {
        const response = await fetch("http://localhost:3000/posts");
        boxes = await response.json();
        // Handle the response data
    } catch (error) {
        console.error(error);
        const cachedResponse = await caches.match("http://localhost:3000/posts");
        if (cachedResponse) {
            const cachedData = await cachedResponse.json();
            boxes = await cachedData.json();
        }
    }

    // Generate boxes dynamically
    const boxRow = document.getElementById("boxRow");
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];

        const col = document.createElement("div");
        col.className = "col-sm-6 col-md-4";

        const boxElement = document.createElement("div");
        boxElement.className = "box card m-2";

        const img = document.createElement("img");
        img.src = box.img_url;
        img.className = "card-img-top";
        img.alt = "Image " + (i + 1);

        const cardBody = document.createElement("div");
        cardBody.className = "card-body";

        const title = document.createElement("h5");
        title.className = "card-title";
        title.textContent = box.title;

        const body = document.createElement("p");
        body.className = "card-text";
        if (box.body.length > 100) {
            body.textContent = box.body.substring(0, 90) + "...";
        } else {
            body.textContent = box.body;
        }

        cardBody.appendChild(title);
        cardBody.appendChild(body);

        boxElement.appendChild(img);
        boxElement.appendChild(cardBody);

        col.appendChild(boxElement);

        boxRow.appendChild(col);

        // Add click event listener to each box
        boxElement.addEventListener("click", function() {
            openModal(i, boxes);
        });
    }
};

// Open modal with full content
function openModal(index, boxes) {
    const modalTitle = document.getElementById("boxModalLabel");
    const modalImage = document.getElementById("boxModalImage");
    const modalContent = document.getElementById("boxModalContent");

    modalTitle.textContent = boxes[index].title;
    modalImage.src = boxes[index].img_url;
    modalImage.alt = "Image " + (index + 1);
    modalContent.textContent = boxes[index].body;

    const boxModal = new bootstrap.Modal(document.getElementById("boxModal"));
    boxModal.show();
}

getCards();