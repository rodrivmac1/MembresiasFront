
  
  document.addEventListener("DOMContentLoaded", () => {
    const passButton = document.querySelector("#pass");     // Crea boton antes
    const emailInput = document.querySelector("#exampleInputEmail");    //Checa si hay un input

    if (!passButton || !emailInput) {     //Error en caso de que no hay boton o input
        console.error("Required elements not found in the DOM.");
        return;
    }

    passButton.addEventListener("click", async () => {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            alert("Por favor, ingresa un correo electrónico.");     // En caso de que no haya un correo
            return;
        }

        
        if (!emailPattern.test(email)) {
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        //Abre try para manejo de errores
        try {
            const response = await fetchPassword(email);
            if (response.error) {
                alert("El email que ingresaste no está registrado.");
            } else {
                alert("Tu contraseña es: " + response.respuesta);
            }
        } catch (error) {
            console.error("Error retrieving password:", error);
            alert("Hubo un error al recuperar la contraseña. Inténtalo de nuevo.");
        }
    });
});

/**
 * Peticion de contraseña
 * @param {string} email -Correo (parametro)
 *
 */

//Funcion
async function fetchPassword(email) {
    const formData = new FormData();
    formData.append("email", email);

    const response = await fetch("php/rcp_pass.php", { method: "POST", body: formData });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
}