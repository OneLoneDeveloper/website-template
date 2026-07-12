/* =========================================
   Navbar Component

   Expected HTML:
   - Navbar container: .navbar or [data-navbar]
   - Toggle button: .navbar__toggle or [data-navbar-toggle]
   - Menu: .navbar__menu or [data-navbar-menu]
   - Toggle button should have aria-controls="menu-id"
   - Toggle button should have aria-expanded="false"
========================================= */

export function initNavbar(root = document) {
  const navbars = root.querySelectorAll("[data-navbar], .navbar");

  navbars.forEach((navbar) => {
    if (navbar.dataset.navbarInitialized === "true") return;

    const toggle = navbar.querySelector("[data-navbar-toggle], .navbar__toggle");

    if (!toggle) return;

    const menu = getNavbarMenu(navbar, toggle);

    if (!menu) return;

    navbar.dataset.navbarInitialized = "true";

    const isInitiallyOpen = toggle.getAttribute("aria-expanded") === "true";
    setNavbarState(toggle, menu, isInitiallyOpen);

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      setNavbarState(toggle, menu, !isOpen);
    });

    navbar.addEventListener("click", (event) => {
      const link = event.target.closest(".navbar__link, [data-navbar-link]");

      if (!link) return;

      closeNavbar(toggle, menu);
    });

    document.addEventListener("click", (event) => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      if (!isOpen) return;
      if (navbar.contains(event.target)) return;

      closeNavbar(toggle, menu);
    });

    document.addEventListener("keydown", (event) => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";

      if (!isOpen) return;
      if (event.key !== "Escape") return;

      closeNavbar(toggle, menu);
      toggle.focus();
    });
  });
}

function getNavbarMenu(navbar, toggle) {
  const menuId = toggle.getAttribute("aria-controls");

  if (menuId) {
    const controlledMenu = document.getElementById(menuId);

    if (controlledMenu) return controlledMenu;
  }

  return navbar.querySelector("[data-navbar-menu], .navbar__menu");
}

function openNavbar(toggle, menu) {
  setNavbarState(toggle, menu, true);
}

function closeNavbar(toggle, menu) {
  setNavbarState(toggle, menu, false);
}

function setNavbarState(toggle, menu, shouldOpen) {
  toggle.setAttribute("aria-expanded", String(shouldOpen));
  menu.dataset.open = String(shouldOpen);
}