// Home Section
const shoeContainer = document.getElementById("shoe-container");

function createShoeCard(color, imageSrc, textSrc, isActive) {
  const card = document.createElement("div");
  card.classList.add("slide-container");
  if (isActive) {
    card.classList.add("active");
  }

  const slide = document.createElement("div");
  slide.classList.add("slide");

  const content = document.createElement("div");
  content.classList.add("content");

  const colorSpan = document.createElement("span");
  colorSpan.textContent = color;
  content.appendChild(colorSpan);

  const h3 = document.createElement("h3");
  h3.textContent = "Nike Metcon Shoes";
  content.appendChild(h3);

  const p = document.createElement("p");
  p.textContent = `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
  Repellat maiores et eos eaque veritatis aut laboriosam earum dolorem iste.`;
  content.appendChild(p);

  const a = document.createElement("a");
  a.href = "#";
  a.classList.add("btn");
  a.textContent = "Add to Cart";
  content.appendChild(a);

  slide.appendChild(content);

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image");

  const shoeImage = document.createElement("img");
  shoeImage.src = imageSrc;
  shoeImage.alt = "Nike Metcon Shoes";
  shoeImage.classList.add("shoe");
  imageContainer.appendChild(shoeImage);

  const textImage = document.createElement("img");
  textImage.src = textSrc;
  textImage.alt = "";
  textImage.classList.add("text");
  textImage.setAttribute("aria-hidden", "true");
  imageContainer.appendChild(textImage);

  slide.appendChild(imageContainer);

  card.appendChild(slide);

  return card;
}

shoeContainer.appendChild(createShoeCard("Red Version", "images/home-shoe-1.png", "images/home-text-1.png", true));
shoeContainer.appendChild(createShoeCard("Blue Version", "images/home-shoe-2.png", "images/home-text-2.png", false));
shoeContainer.appendChild(createShoeCard("Yellow Version", "images/home-shoe-3.png", "images/home-text-3.png", false));

let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev() {
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
}

document.querySelectorAll('.featured-image-1').forEach(image_1 => {
  image_1.addEventListener('click', () => {
    var src = image_1.getAttribute('src');
    document.querySelector('.big-image-1').src = src;
  });
});

document.querySelectorAll('.featured-image-2').forEach(image_2 => {
  image_2.addEventListener('click', () => {
    var src = image_2.getAttribute('src');
    document.querySelector('.big-image-2').src = src;
  });
});

document.querySelectorAll('.featured-image-3').forEach(image_3 => {
  image_3.addEventListener('click', () => {
    var src = image_3.getAttribute('src');
    document.querySelector('.big-image-3').src = src;
  });
});

// Display Section
const features = [
  {
    id: 1,
    img: "images/shoe.jpg",
    alt: "Hand holding a pair of black and orange sneakers",
    title: "Lightweight.",
    desc: "Upper mesh material provides proper ventilation and reduction in the weight of the shoes.",
  },
  {
    id: 2,
    img: "images/shoe2.jpg",
    alt: "Side view of sneakers balanced on a single stair",
    title: "Stylish.",
    desc: "Eccentric, eyecatching designs made to grab attention from across the park, no matter its size.",
  },
  {
    id: 3,
    img: "images/shoe3.jpg",
    alt: "Olive green sneakers jumping out of puddle",
    title: "Durable.",
    desc: "All-terrain, climate resistant models to handle what life throws in your path to greatness.",
  },
];

const img = document.querySelector(".feature-img");
const alt = document.querySelector("alt");
const title = document.querySelector(".title");
const desc = document.querySelector(".desc");

let currentSlide = 0;

window.addEventListener("DOMContentLoaded", function () {
  const slide = features[currentSlide];
  img.src = slide.img;
  img.alt = slide.alt;
  title.textContent = slide.title;
  desc.textContent = slide.desc;
});

const displayContainer = document.querySelector(".display .box-container");

function showSlide(slide) {
  const item = features[slide];
  displayContainer.innerHTML = `
  <div class="box">
    <img class="feature-img" src="${item.img}" alt="${item.alt}">
    <div class="content">
      <h3 class="title">${item.title}</h3>
      <p class="desc">${item.desc}</p>
    </div>
  </div> `;
}

setInterval(e => {
  currentSlide++;
  if (currentSlide > features.length - 1) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}, 5000);