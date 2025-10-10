class Menu {
  static openMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.add("show");
    document.getElementById("sideMenuOverlay").style.display = "block";
  }
  static closeMenu() {
    const menu = document.getElementById("sideMenu");
    menu.classList.remove("show");
    document.getElementById("sideMenuOverlay").style.display = "none";
  }
}
window.addEventListener('resize', Menu.closeMenu);
