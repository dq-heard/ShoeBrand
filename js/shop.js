const products = [
  {
    id: 1,
    img: "images/product-1.png",
    alt: "Gray and green Nike Venture sneakers",
    title: "Nike Venture",
    price: "$54.99",
  },
  {
    id: 2,
    img: "images/product-2.png",
    alt: "Black white and yellow Nike Flex Experience sneakers",
    title: "Nike Flex Experience 9",
    price: "$69.99",
  },
  {
    id: 3,
    img: "images/product-3.png",
    alt: "White black and yellow Nike Flex Control sneakers",
    title: "Nike Flex Control 4",
    price: "$47.99",
  },
  {
    id: 4,
    img: "images/product-4.png",
    alt: "Black blue and red Nike Air Zoom Pegasus sneakers",
    title: "Nike Air Zoom Pegasus 37",
    price: "$64.99",
  },
  {
    id: 5,
    img: "images/product-5.png",
    alt: "Black white and red Nike Quest sneakers",
    title: "Nike Quest 3",
    price: "$40.99",
  },
  {
    id: 6,
    img: "images/product-6.png",
    alt: "Blue and white Nike Renew Rival sneakers",
    title: "Nike Renew Rival 2",
    price: "$56.99",
  },
];

const img = document.querySelector(".product-img");
const alt = document.querySelector("alt");
const title = document.querySelector(".title");
const price = document.querySelector(".price");

let currentSlide = 0;

window.addEventListener("DOMContentLoaded", function () {
  const slide = products[currentSlide];
  img.src = slide.img;
  img.alt = slide.alt;
  title.textContent = slide.title;
  price.textContent = slide.price;
});

function showSlide(slide) {
  const item = products[slide];
  img.src = item.img;
  img.alt = item.alt;
  title.textContent = item.title;
  price.textContent = item.price;
}

function next(){
  currentSlide++;
  if (currentSlide > products.length - 1) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
}

function prev(){
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = products.length - 1;
  }
  showSlide(currentSlide);
}

const modal = document.querySelector('.modal');
const modalBtn = document.querySelector('#modal-btn');
const closeBtn = document.querySelector('.close-btn');

modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

function openModal() {
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}