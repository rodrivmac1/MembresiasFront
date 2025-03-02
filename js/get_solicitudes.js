const solicitud = document.querySelectorAll(".card-body")

solicitud.forEach( (item) => {
    item.addEventListener("click", () => {
        const nom = item.parentNode.querySelector(".text-primary").id;
        // Guardamos los valores en localStorage
        localStorage.setItem("nombre", nom);

        window.location.href = "usuario.php";
    } )
})

const logout = document.querySelector('#logout-cont')
logout.addEventListener('click', () => {
     if (window.history.pushState) {
        window.history.pushState(null, null, '/membresias/login.php');
      }
    localStorage.clear()
    window.location.href = '/membresias/login.php'
})