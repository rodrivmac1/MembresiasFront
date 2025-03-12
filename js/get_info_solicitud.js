document.addEventListener("DOMContentLoaded", async () => {

    const nombre = localStorage.getItem("nombre")       // Consigue nombre del localStorage

    if (!nombre) {
        console.error("No se encontró el nombre en localStorage");
        return;
    }

    try{
        const datos = new FormData();
        datos.append("nombre", nombre)
        localStorage.removeItem("nombre")

        // Fetch from API (modificar de acuerdo a manejo de consumo)
        const response = await fetch("php/getInfoSolicitud.php", {
            method: "POST",
            body: datos
        });

        const userInfo = await response.json();         //Cambiado de arrayResponse
        console.log(userInfo); //Debugging en caso de info. erronea

        // checar si hay datos suficientes
        if (!userInfo || !userInfo.nombre) {
            throw new Error("No se encontraron datos del usuario.");
        }

        // Mapeado de datos (Sustituye la asignacion de valores individual)
        const fieldMap = {
            ".nom-comp": `${userInfo.nombre} ${userInfo.apellidos}`,
            ".genero": userInfo.genero,
            ".li": userInfo.lineaInv,
            ".pais": userInfo.pais,
            ".estado": userInfo.estado,
            ".uni": userInfo.universidad,
            ".email": userInfo.email,
        };

        //Itera por cada atributo para modificar HTML
        Object.entries(fieldMap).forEach(([selector, value]) => {
            const element = document.querySelector(selector);
            if (element) element.innerHTML = value;
        });

        const errorContainer = document.querySelector(".error-message");
        if (errorContainer) errorContainer.textContent = "No se pudo cargar la información.";

        // CV Link configuracion
        const downloadCv = document.getElementById("cv");
        if (downloadCv && userInfo.cv) {
            downloadCv.href = `https://www.lumacad.com.mx/membresias/pdf/${userInfo.cv}`;
            downloadCv.download = `CV ${userInfo.nombre} ${userInfo.apellidos}`;
        }

    } catch (error) {
        console.error("Error al obtener la información de la solicitud:", error);
    }
    
});


