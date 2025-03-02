const email = localStorage.getItem('email')
const fechaActual = new Date()


const datos = new FormData()
datos.append("email", email)

fetch("php/membresia.php", {method: "POST", body: datos})
.then (arrayResponse => arrayResponse.json())
.then (arrayResponse => {
    const fechaArray = arrayResponse.vigencia.split("-")
    const dia = fechaArray[2]
    const mes = fechaArray[1]
    const anio = fechaArray[0]
    
    // Formatear la fecha al formato "dd/MM/YYYY"
    const fechaFormateada = dia + "/" + mes + "/" + anio
    
    const partesFecha = fechaFormateada.split("/");
    const fechaVigencia = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
    document.querySelector('.info_solicitud_datos-status').innerText = arrayResponse.estatus;
    document.querySelector('.info_solicitud_datos-expira').innerText = fechaFormateada;
    
    if (fechaActual <= fechaVigencia) {
        if(arrayResponse.estatus == 'Aceptado'){
            document.querySelector('.info_solicitud_datos-status').style.backgroundColor = '#23b55d'
            document.querySelector('.info_solicitud_datos-expira').style.color = '#23b55d'
        }
        else if(arrayResponse.estatus == 'Pendiente'){
            document.querySelector('.info_solicitud_datos-status').style.backgroundColor = '#fb8500'
            document.querySelector('.info_solicitud_datos-expira').style.color = '#fb8500'
        }
        else {
            document.querySelector('.info_solicitud_datos-status').style.backgroundColor = '#e63946'
            document.querySelector('.info_solicitud_datos-expira').style.color = '#e63946'
        }
    }
    else {
            document.querySelector('.info_solicitud_datos-status').style.backgroundColor = '#e63946'
            document.querySelector('.info_solicitud_datos-expira').style.color = '#e63946'
    }
});

const logout = document.querySelector('#logout-cont')
logout.addEventListener('click', () => {
     if (window.history.pushState) {
        window.history.pushState(null, null, '/membresias/login.php');
      }
    localStorage.clear()
    window.location.href = '/membresias/login.php'
})


