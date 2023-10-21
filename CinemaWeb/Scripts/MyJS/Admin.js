var overlay = document.querySelector('.overlay');
var formadd = document.querySelector('.form-add');
var links = document.querySelectorAll('.link');
links.forEach(link => {
    link.addEventListener('click', function (e) {
        links.forEach(element => {
            element.classList.remove('active');
        })
        e.target.classList.add('active');
    })
});
function turnoff() {
    overlay.style.display = 'none';
    formadd.style.display = 'none';
}
function turnon() {
    overlay.style.display = 'block';
    formadd.style.display = 'block';
}
