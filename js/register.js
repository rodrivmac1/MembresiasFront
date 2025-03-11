
document.addEventListener("DOMContentLoaded", () => {
    const registerButton = document.getElementById("register");         //Maneja registro como const
    const countrySelect = document.getElementById("exampleSelectPais");
    const stateSelect = document.getElementById("exampleSelectEstado");

    //Checa si boton y datos existen
    if (registerButton) {
        registerButton.addEventListener("click", handleRegistration);
    }

    if (countrySelect && stateSelect) {
        countrySelect.addEventListener("change", handleCountryChange);
    }
});

//Manejo de registro
async function handleRegistration() {
    const datos = getFormData();

    if (!datos) return; // Fallo si no hay datos

    try {
        //API insert (Cambiar de acuerdo a manejo de consumo)
        const response = await fetch("php/register.php", {  
            method: "POST",
            body: datos
        });

        const result = await response.json();

        if (result.error) {
            alert("No se pudo registrar");
            return;
        }

        window.location.href = "https://lumacad.com.mx/membresias/login.html";      //Redirecciona a login
    } catch (error) {
        console.error("Error during registration:", error);
        alert("No se pudo registrar. Inténtalo de nuevo.");
    }
}

/**
 * Validacion de datos
 * @returns {datos|null} - Regresa o los datos o null.
 */
function getFormData() {
    //Consigue los datos del form
    const name = document.getElementById("exampleFirstName")?.value.trim();
    const lastName = document.getElementById("exampleLastName")?.value.trim();
    const genero = document.getElementById("exampleSelectGender")?.value;
    const email = document.getElementById("exampleInputEmail")?.value.trim();
    const pass = document.getElementById("exampleInputPassword")?.value;
    const pass2 = document.getElementById("exampleRepeatPassword")?.value;
    const universidad = document.getElementById("exampleSelectUni")?.value;
    const lineaInv = document.getElementById("exampleSelectLineaInv")?.value;
    const pais = document.getElementById("exampleSelectPais")?.value;
    const estado = document.getElementById("exampleSelectEstado")?.value;
    const tipoM = document.getElementById("exampleSelectMemb")?.value;
    const fotoPerfil = document.getElementById("exampleSelectFoto")?.files[0];
    const cv = document.getElementById("exampleSelectCV")?.files[0];

    // Validacion basica
    if (!name || !lastName || !email || !pass || !pass2) {
        alert("Por favor, completa todos los campos obligatorios.");
        return null;
    }

    //Verificacion de contraseñas
    if (pass !== pass2) {
        alert("Las contraseñas no coinciden.");
        return null;
    }

    //Anexado a FormData
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("genero", genero);
    formData.append("email", email);
    formData.append("password", pass);
    formData.append("universidad", universidad);
    formData.append("lineaInv", lineaInv);
    formData.append("pais", pais);
    formData.append("estado", estado);
    formData.append("tipoM", tipoM);


    //Foto de perfil
    if (fotoPerfil) {
        formData.append("fotoPerfil", fotoPerfil, `${name}_${lastName}_Foto.png`);
    }

    //Manejo de CV (Este esta a debatir)
    if (cv) {
        formData.append("cv", cv, `${name}_${lastName}_CV.pdf`);
    }

    return formData;
}

//Manejo al camiar de pais y estado
function handleCountryChange() {
    const countrySelect = document.getElementById("exampleSelectPais");
    const stateSelect = document.getElementById("exampleSelectEstado");

    if (countrySelect?.value === "14") { //Si no es el pais 14 no se puede acceder al estado (asumo que es Mexico)
        stateSelect.disabled = false;
    } else {
        stateSelect.disabled = true;
        stateSelect.value = "";
    }

}
