document.getElementById('toggle-menu').addEventListener('click', () => {
    if (document.body.className.includes('sidebar-icon-only'))
        document.body.className = 'whitetheme';
    else
        document.body.className = 'whitetheme sidebar-icon-only';
});

let sidebar = document.getElementById('offcanvasSidebar')
document.getElementById('btn-z').addEventListener('click', () => { 
    sidebar.classList.toggle('show');
    document.body.classList.toggle('overflow-hidden');
    document.body.classList.toggle('pe-0');
    sidebar.classList.toggle('visible');
    sidebar.classList.toggle('w-0');
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