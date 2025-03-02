// const urlParams = new URLSearchParams(window.location.search);
//const greetingValue = urlParams.get('email');
// console.log(greetingValue); 

// var uri = window.location.toString();
// if (uri.indexOf("?") > 0) {
//     var clean_uri = uri.substring(0, uri.indexOf("?"));
//     window.history.replaceState({}, document.title, clean_uri);
// }

const datos = new FormData()
const email = localStorage.getItem('email')

datos.append("email",email)

fetch("php/perfil_usuario.php", {method: "POST", body: datos})
.then(arrayResponse => arrayResponse.json())
.then(arrayResponse => {
    document.querySelector("#inputNombre").value = arrayResponse.nombre
    document.querySelector("#inputApellidos").value = arrayResponse.apellidos
    document.querySelector("#inputGenero").value = arrayResponse.genero
    document.querySelector("#inputEmail").value = arrayResponse.email
    document.querySelector("#inputPassword").value = arrayResponse.password
    document.querySelector("#inputUniversidad").value = arrayResponse.universidad
    document.querySelector("#inputEstado").value = arrayResponse.estado
    document.querySelector("#inputPais").value = arrayResponse.pais
    document.querySelector("#inputLI").value = arrayResponse.lineaInv
});



const edit = document.querySelector('.info_perfil-btnEditar');
const satusInput = document.querySelectorAll('.statusInput');
const cancel = document.querySelector('.info_perfil-btnsEdit-cancelar');
const btnsEdit = document.querySelector('.info_perfil-btnsEdit');
const imgEdit = document.querySelector('.info_perfil_usuario-img-edit');

const inputPassword = document.querySelector("#inputPassword")

edit.addEventListener('click', () => {
    satusInput.forEach(element => element.removeAttribute('disabled'));
    btnsEdit.classList.remove("show");
    imgEdit.classList.remove("show");
    edit.classList.add("show");
    inputPassword.setAttribute('type','text')
});

cancel.addEventListener('click', () => {
    satusInput.forEach(element => element.setAttribute('disabled', ''));
    btnsEdit.classList.add("show");
    imgEdit.classList.add("show");
    edit.classList.remove("show");
    inputPassword.setAttribute('type','password')
});

const aceptarEdit = document.querySelector('.info_perfil-btnsEdit-aceptar');

aceptarEdit.addEventListener('click', () => {
    const nombre = document.querySelector("#inputNombre").value
    const apellidos = document.querySelector("#inputApellidos").value
    const genero = document.querySelector("#inputGenero").value
    const email = document.querySelector("#inputEmail").value
    const password = document.querySelector("#inputPassword").value
    const universidad = document.querySelector("#inputUniversidad").value
    const estado = document.querySelector("#inputEstado").value
    const pais = document.querySelector("#inputPais").value
    const li = document.querySelector("#inputLI").value
    
    const data = new FormData()
    
    data.append("nombre",nombre)
    data.append("apellidos",apellidos)
    data.append("genero",genero)
    data.append("email",email)
    data.append("password",password)
    data.append("universidad",universidad)
    data.append("li",li)
    data.append("estado",estado)
    data.append("pais",pais)
    
    fetch("php/editar_usuario.php", {method: "POST", body: data})
    .then(response => response.json())
    .then(response => location.reload())
})

const logout = document.querySelector('#logout-cont')
logout.addEventListener('click', () => {
     if (window.history.pushState) {
        window.history.pushState(null, null, '/membresias/login.php');
      }
    localStorage.clear()
    window.location.href = '/membresias/login.php'
})