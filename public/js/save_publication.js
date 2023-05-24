const save = () => {
  document.getElementById('saveButton').addEventListener('click', () => {
    var title = document.getElementById('title').value;
    var content = document.getElementById('content').value;
    var imageURL = document.getElementById('imageURL').value;

    console.log(title);
    console.log(content);
    console.log(imageURL);

    // Call the save function and pass the title, content
  });
};

save();
