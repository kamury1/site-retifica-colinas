const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

menuToggle.addEventListener("click", () => {
    menu.classList.toggle("ativo");
});

const linksMenu = menu.querySelectorAll("a");

linksMenu.forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");
    });
});