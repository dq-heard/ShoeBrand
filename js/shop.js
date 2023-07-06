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
    title: "Nike Flex XP 9",
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
    title: "Nike Pegasus 37",
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

const carousel = document.querySelector(".carousel");
const wrapper = document.querySelector(".wrapper");

products.forEach(item => {
  const card = document.createElement("li");
  card.className = "card";

  const icons = document.createElement("div");
  icons.className = "icons";
  icons.innerHTML = `<a href="#" class="fas fa-heart"></a>
                      <a href="#" class="fas fa-share"></a>
                      <a href="#" class="fas fa-eye"></a>
                    `;

  const img = document.createElement("img");
  img.className = "product-img";
  img.src = item.img;
  img.alt = item.alt;
  img.setAttribute("draggable", "false");
  
  const title = document.createElement("h3");
  title.className = "title";
  title.textContent = item.title;

  const price = document.createElement("div");
  price.className = "price";
  price.textContent = item.price;

  const stars = document.createElement("div");
  stars.className = "stars";
  stars.setAttribute("aria-hidden", "true");
  stars.innerHTML = `<i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>`;

  const btn = document.createElement("a");
  btn.className = "btn";
  btn.textContent = "Add to Cart";

  card.appendChild(icons);
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(price);
  card.appendChild(stars);
  card.appendChild(btn);


  carousel.appendChild(card);
});

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let firstCardWidth = carousel.querySelector(".card").offsetWidth;

window.addEventListener('resize', () => {
  firstCardWidth = carousel.querySelector(".card").offsetWidth;
});

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth) + 1;
const carouselChildren = [...carousel.children];

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildren.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
const arrowBtns = document.querySelectorAll(".wrapper i");

let isButtonClicked = false;

arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    isButtonClicked = true;
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
  if(!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}
// Add event listener for scroll event on the carousel element
const infiniteScroll = carousel.addEventListener('scroll', () => {
  if (isButtonClicked) {
    isButtonClicked = false;
    return;
  }

  // Check if user has scrolled to the end of the carousel
  if (carousel.scrollLeft + carousel.offsetWidth + 10 >= carousel.scrollWidth) {
    // Scroll back to beginning of carousel
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // Check if user has scrolled to the beginning of the carousel
  else if (carousel.scrollLeft <= 0) {
    // Scroll back to end of carousel
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (firstCardWidth * cardPerView) - carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if(!wrapper.matches(":hover")) autoPlay();
});

   
const autoPlay = () => {
  if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Modal Section
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