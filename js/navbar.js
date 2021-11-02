const btntoggle = document.getElementsByClassName('burger')[0] //primeiro-elemento
const linksMenu = document.getElementsByClassName('navbar-links')[0]

btntoggle.addEventListener('click', function () {
linksMenu.classList.toggle('active');
});

//classList permite a manipulação da classe de elementos do DOM

//toggle retorna cm