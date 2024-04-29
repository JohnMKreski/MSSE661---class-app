const doMenu = function(e) {
    const menu = document.querySelector('.flexSubMenu');
    menu.classList.toggle('open');
    console.log("Opened Menu.");

    const header = document.getElementById('header');
    header.classList.toggle('open');

};


