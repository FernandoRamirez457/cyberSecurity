const bar = document.querySelector(".bar");
const nav = document.querySelector(".nav");

bar.addEventListener("click", () => nav.classList.toggle("active"));