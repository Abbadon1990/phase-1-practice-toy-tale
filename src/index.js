let addToy = false;

document.querySelector('.add-toy-form').addEventListener('submit', handleSubmit)

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function handleSubmit(e) {
  e.preventDefault();
  let toyObj = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes: 0
  }
  renderOneToy(toyObj)
  addOneToy(toyObj)
}

document.addEventListener("DOMContentLoaded", () => {
  getAllToys()
})

function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(data => data.forEach(toy => renderOneToy(toy)))
}

function renderOneToy(toys) {
  let card = document.createElement('div')
  card.className = 'card'
  card.innerHTML = `
      <h2>${toys.name}</h2>
      <img src="${toys.image}" class="toy-avatar" />
      <p>
        <span>${toys.likes}</span> Likes
      </p>
      <button class="like-btn" id="${toys.id}">Like</button> 
  `
  card.querySelector('.like-btn').addEventListener('click', () => {
    toys.likes+= 1
    card.querySelector('span').textContent = toys.likes
    updateLikes(toys)
  })

  document.querySelector('#toy-collection').appendChild(card)
}

function addOneToy(toyObj) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body:JSON.stringify(toyObj)
  })
  .then(res => res.json())
  .then(toy => console.log(toy))
}
function updateLikes(toyObj) {
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
  .then(res => res.json())
  
}