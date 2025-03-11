

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const email = params.get("email");
    
    //Checar si email fue dado
    if (!email) return console.error("No email provided in URL");

    // Abre Try para manejo de error
    try {
        const formData = new FormData();
        formData.append("email", email);

        // API (Cambiar de acuerdo al manejo seleccionado)
        const response = await fetch("php/perfil_usuario.php", { method: "POST", body: formData });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        //En caso de que no haya respuesta
        if (!data) throw new Error("Empty response from server");

        // Llama a funcion en vez de mandar variables manual
        populateProfileForm(data);
    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
});

function populateProfileForm(data) {
    const fields = {
        inputNombre: data.nombre,
        inputapellidos: data.apellidos,
        inputGenero: data.genero,
        inputEmail: data.email,
        inputPassword: data.password,
        inputUniversidad: data.universidad,
        inputEstado: data.estado,
        inputPais: data.pais,
        inputLI: data.lineaInv,
    };

    //itera por fields para asignar valores
    Object.entries(fields).forEach(([id, value]) => {
        const element = document.querySelector(`#${id}`);
        if (element) element.value = value;
    });

    const imgElement = document.querySelector("#inputImg");
    if (imgElement) imgElement.src = data.img;

    // Comentado del codigo original
    // const cvElement = document.querySelector("#inputCV");
    // if (cvElement) cvElement.value = data.cv;
}
