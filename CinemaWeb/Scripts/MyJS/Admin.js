var overlay = document.querySelector('.overlay');
var links = document.querySelectorAll('.link');
var viewDetail = document.querySelector('.partialview-detail');
var errorLine = document.querySelector('.error');
var viewContent = document.querySelector('.view-content');
eventRow();
function eventRow() {
    var rows = document.querySelectorAll('.tb-row.detail');
    rows.forEach(r => r.addEventListener("dblclick", function (e) {
        var id = r.getAttribute("id");
        var xhr = new XMLHttpRequest();
        overlay.style.display = "block";
    
        // Xác định URL của hành động trong controller và phương thức GET
        viewDetail.style.display = "flex";
        xhr.open("GET", "/Film/Detail/" + id, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Thay thế nội dung của div "view-detail" bằng nội dung của PartialView
                viewDetail.innerHTML = xhr.responseText;
                eventFormDetail(viewDetail);
            }
        };
        xhr.send();
    }))

    rows.forEach(r => r.addEventListener("click", function () {
        rows.forEach(r => r.classList.remove('active'));
        r.classList.add('active')
    }))
}
function eventFormDetail(View) {
    var btnEnable = View.querySelector(".enable-edit");
    var btnConfirm = View.querySelector(".confirm-edit");
    var inputs = View.querySelectorAll(".form-input");
    var hiddens = View.querySelectorAll(".hidden");
    var fileInput = View.querySelector(".file-input");
    var imageContent = View.querySelector(".image");
    var titleFilm = View.querySelector(".title-film");
    fileInput.addEventListener("change", function (e) {
        var reader = new FileReader();
        reader.onload = function (file) {
            console.log(file);
            imageContent.src = file.target.result;
        }
        console.log(e.target.files);
        reader.readAsDataURL(e.target.files[0]);
    })
    btnEnable.addEventListener("click", function () {
    inputs.forEach(i => {
        if (i.hasAttribute("readonly"))
        {
            i.classList.remove("disabled-edit")
            i.removeAttribute("readonly");
        }
    })
        hiddens.forEach(element => element.classList.remove("hidden"))
        btnEnable.style.display = "none";
        btnConfirm.style.display = "block";
        titleFilm.style.display = "none";
    })
}


links.forEach(link => 
    link.addEventListener('click', function (e) {
        links.forEach(element => 
            element.classList.remove('active'))
        e.target.classList.add('active')
    })
)
function turnoff(e) {
    var form = e.parentElement;
    overlay.style.display = 'none';
    form.style.display = "none";
}
function turnon() {
    var formAdd = document.querySelector('.form-add');
    overlay.style.display = 'block';
    formAdd.style.display = 'flex';
}
function DeleteFilm() {
    var table = document.querySelector('.body-content');
    var rowSelected = table.querySelector('.active');
    if (!rowSelected) {
        errorLine.style.display = "inline-block";
    }
    else {
        var MaPhim = rowSelected.getAttribute('id');
        var request = new XMLHttpRequest();
        request.open("post", "/Film/Delete/" + MaPhim, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200)
                {
                    viewContent.innerHTML = request.responseText;
                    eventRow();
                }
                else {
                }
            }
        }
        request.send();
    }
}
