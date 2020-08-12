let menu = document.querySelector('#hamburger_button');
let cross = document.querySelectorAll('#hamburger_button hr');
menu.addEventListener('click', () => {
    cross.forEach(crosshr => {
        crosshr.classList.toggle('cross');
    })
    document.querySelector('#menu').classList.toggle('cross');
})