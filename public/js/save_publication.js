const save = () => {
  document.getElementById('saveButton').addEventListener('click', () => {
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var imageURL = document.getElementById('imageURL').value;

    console.log(title);
    console.log(content);
    console.log(imageURL);

    fetch('http://localhost:3000/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        content: content,
        image: imageURL,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

save();
