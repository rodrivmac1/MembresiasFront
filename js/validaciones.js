// src/js/validaciones.js

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#miFormulario");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault(); 
        
        let valido = true;
        let mensajesError = [];
        
        const nombre = document.querySelector("#nombre");
        const email = document.querySelector("#email");
        const password = document.querySelector("#password");
        
    
        if (nombre.value.trim() === "") {
            valido = false;
            mensajesError.push("El nombre es obligatorio");
        }
        
        // Validar email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            valido = false;
            mensajesError.push("El email no es válido");
        }
        
        // Validar contraseña
        if (password.value.length < 8) {
            valido = false;
            mensajesError.push("La contraseña debe tener al menos 8 caracteres");
        }
        
        // Mostrar errores o enviar formulario
        if (!valido) {
            alert(mensajesError.join("\n"));
        } else {
            alert("Formulario enviado correctamente");
            formulario.submit();
        }
    });
});
