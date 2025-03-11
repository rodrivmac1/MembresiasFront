document.addEventListener("DOMContentLoaded", async () => {

    const selectElement = document.getElementById("select");    //Cambiado de x

    if (!selectElement) {           // checa si algun elemento a sido seleccionado
        console.error("Elemento <select> no encontrado.");
        return;
    }

    try {
        // API (Modificar de acuerdo a manejo de consumo)
        const response = await fetch("php/getInfoMembresias.php", { method: "POST" });      //Aqui el metodo esta mal, deberia ser GET.
        const data = await response.json();

        if (!data || !data.respuesta || !Array.isArray(data.respuesta)) {
            throw new Error("La respuesta del servidor no es válida.");
        }

        // Popula select
        data.respuesta.forEach(({ id, nombre }) => {
            const option = new Option(nombre, id);
            selectElement.add(option);
        });

        // Defaault: Primera opcion
        if (data.respuesta.length > 0) {
            selectElement.value = data.respuesta[0].id;
        }

    } catch (error) {
        console.error("Error al obtener las membresías:", error);
    }
});
