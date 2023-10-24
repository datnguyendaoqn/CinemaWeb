var overlay = document.querySelector('.overlay');
var formadd = document.querySelector('.form-add');
var links = document.querySelectorAll('.link');
var rows = document.querySelectorAll('.tb-row.detail');
var viewdetail = document.querySelector('.partialview-detail');
rows.forEach(r => r.addEventListener("click", function (e) {
    var id = r.getAttribute("id");
    var xhr = new XMLHttpRequest();
    console.log(id);
    // Xác định URL của hành động trong controller và phương thức GET
    document.querySelector(".partialview-detail").style.display = "flex";
    xhr.open("GET","/User/Detail/" + id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Thay thế nội dung của div "view-detail" bằng nội dung của PartialView
            viewdetail.innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}))
links.forEach(link => {
    link.addEventListener('click', function (e) {
        links.forEach(element => {
            element.classList.remove('active');
        })
        e.target.classList.add('active');
    })
});
function turnoff(e) {
    var form = e.parentElement;
    overlay.style.display = 'none';
    form.style.display = "none";
}
function turnon(e) {
    overlay.style.display = 'block';
    formadd.style.display = 'flex';
}
