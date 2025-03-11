
//Con DOM checa si el boton existe (debugging) y llama a funcion(codigo aparte)
document.addEventListener("DOMContentLoaded", () => {
    const btnElimUsuario = document.querySelector("#btnElimUsuario");

    if (!btnElimUsuario) {
        console.error("Button #btnElimUsuario not found.");
        return;
    }

    btnElimUsuario.addEventListener("click", handleDeleteRequest);
});

//Codigo de funcion separado en esta funcion
function handleDeleteRequest() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            cancelButton: "btn btn-danger",
            confirmButton: "btn btn-success"
        },
        buttonsStyling: false,
        allowOutsideClick: false
    });

    swalWithBootstrapButtons.fire({
        title: "¿Estás seguro que quieres cancelar esta solicitud?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, cancelar solicitud",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            showSuccessMessage();
        }
    });
}

//Funcion por separado de exito
function showSuccessMessage() {
    Swal.fire({
        icon: "success",
        title: "Solicitud cancelada",
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false
    });

    setTimeout(() => {
        location.href = "pendientes.html";
    }, 1600);
}

//Funcion de regresar
function regresar() {
    window.history.back();
}