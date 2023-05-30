let slides = document.querySelectorAll('.slide-container');
let index = 0;

function next(){
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

function prev(){
  slides[index].classList.remove('active');
  index = (index - 1 + slides.length) % slides.length;
  slides[index].classList.add('active');
}

document.querySelectorAll('.featured-image-1').forEach(image_1 =>{
  image_1.addEventListener('click', () =>{
    var src = image_1.getAttribute('src');
    document.querySelector('.big-image-1').src = src;
  });
});

document.querySelectorAll('.featured-image-2').forEach(image_2 =>{
  image_2.addEventListener('click', () =>{
    var src = image_2.getAttribute('src');
    document.querySelector('.big-image-2').src = src;
  });
});

document.querySelectorAll('.featured-image-3').forEach(image_3 =>{
  image_3.addEventListener('click', () =>{
    var src = image_3.getAttribute('src');
    document.querySelector('.big-image-3').src = src;
  });
});

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
    desc: "All-terrain, climate resistant models to handle whatever life throws in your path to greatness.",
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

function showSlide(slide) {
  const item = features[slide];
  img.src = item.img;
  img.alt = item.alt;
  title.textContent = item.title;
  desc.textContent = item.desc;
}

setInterval(e => {
  currentSlide++;
  if (currentSlide > features.length - 1) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}, 5000);