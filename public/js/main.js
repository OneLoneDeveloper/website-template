import { initNavbar } from "./components/navbar.js";
import { initModal } from "./components/modal.js";
import { initAccordion } from "./components/accordion.js";

initNavbar();
initModal();
initAccordion();

// Tell the CSS that JavaScript is available.
document.documentElement.classList.replace("no-js", "js");

const menuButton = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-navigation]");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("a");

    if (!clickedLink) {
      return;
    }

    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}