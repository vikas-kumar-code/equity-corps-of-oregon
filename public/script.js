document.getElementById('toggle-menu').addEventListener('click', () => {
    if (document.body.className.includes('sidebar-icon-only'))
        document.body.className = 'whitetheme';
    else
        document.body.className = 'whitetheme sidebar-icon-only';
});

window.onload = () => {
    /* let navigationMenu = document.querySelectorAll(".admin-panel-nav-item");
    console.log(navigationMenu)
    navigationMenu.forEach(menu => {
        menu.addEventListener('mouseover', (event) => {
            alert('vikas');
        });
    }) */
}