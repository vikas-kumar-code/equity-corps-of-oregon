document.getElementById("toggle-menu").addEventListener("click", () => {
  if (document.body.className.includes("sidebar-icon-only"))
    document.body.className = "whitetheme";
  else document.body.className = "whitetheme sidebar-icon-only";
});

let sidebar = document.getElementById("offcanvasSidebar");
let sidebarBackdrop = document.getElementById("sidebar-backdrop");
document.getElementById("sidebar-toggle-btn").addEventListener("click", () => {
  sidebar.classList.toggle("active");
  sidebarBackdrop.classList.toggle("active");
});

document.getElementById("sidebar-backdrop").addEventListener("click", () => {
  sidebar.classList.toggle("active");
  sidebarBackdrop.classList.toggle("active");
});

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    sidebarBackdrop.classList.toggle("active");
  })
});

window.onload = () => {
  /* let navigationMenu = document.querySelectorAll(".admin-panel-nav-item");
    console.log(navigationMenu)
    navigationMenu.forEach(menu => {
        menu.addEventListener('mouseover', (event) => {
            alert('vikas');
        });
    }) */
};
