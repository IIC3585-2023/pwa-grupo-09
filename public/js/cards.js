const getCards = async () => {
  const boxes = [
    {
      image: 'https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg',
      title: 'Title 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor urna euismod lectus maximus pellentesque.',
    },
    {
      image: 'https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg',
      title: 'Title 2',
      content:
        'Nulla nec tincidunt quam. In feugiat diam eget lobortis facilisis. Suspendisse bibendum malesuada felis vitae consequat.',
    },
    {
      image: 'https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg',
      title: 'Title 3',
      content:
        'Sed fermentum tellus vel quam posuere, nec interdum neque consectetur. Maecenas sed mattis lectus, eu iaculis leo.',
    },
    {
      image: 'https://okdiario.com/img/2022/11/22/libros-4-635x358.jpg',
      title: 'Title 4',
      content:
        'Etiam finibus risus a felis condimentum, ac dictum dui lacinia. Phasellus id felis a purus fringilla molestie.',
    },
  ];
  // const response = await fetch('http://localhost:3000/posts');
  // console.log(response);
  // const boxes = await response.json();

  // Generate boxes dynamically
  const boxRow = document.getElementById('boxRow');
  for (let i = 0; i < boxes.length; i++) {
    const box = boxes[i];

    const col = document.createElement('div');
    col.className = 'col-sm-6 col-md-4';

    const boxElement = document.createElement('div');
    boxElement.className = 'box card m-2';

    const img = document.createElement('img');
    img.src = box.image;
    img.className = 'card-img-top';
    img.alt = 'Image ' + (i + 1);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = box.title;

    const content = document.createElement('p');
    content.className = 'card-text';
    if (box.content.length > 100) {
      content.textContent = box.content.substring(0, 90) + '...';
    } else {
      content.textContent = box.content;
    }

    cardBody.appendChild(title);
    cardBody.appendChild(content);

    boxElement.appendChild(img);
    boxElement.appendChild(cardBody);

    col.appendChild(boxElement);

    boxRow.appendChild(col);

    // Add click event listener to each box
    boxElement.addEventListener('click', function () {
      openModal(i, boxes);
    });
  }
};

// Open modal with full content
function openModal(index, boxes) {
  const modalTitle = document.getElementById('boxModalLabel');
  const modalImage = document.getElementById('boxModalImage');
  const modalContent = document.getElementById('boxModalContent');

  modalTitle.textContent = boxes[index].title;
  modalImage.src = boxes[index].image;
  modalImage.alt = 'Image ' + (index + 1);
  modalContent.textContent = boxes[index].content;

  const boxModal = new bootstrap.Modal(document.getElementById('boxModal'));
  boxModal.show();
}

getCards();
