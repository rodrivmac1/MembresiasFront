document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("email");
    const fechaActual = new Date();
    
    if (!email) {
        console.warn("No email found in localStorage. User might not be logged in.");
        return;
    }

    const datos = new FormData();
    datos.append("email", email);

    fetch("php/membresia.php", { method: "POST", body: datos })
        .then(response => response.ok ? response.json() : Promise.reject("Invalid response"))
        .then(updateMembershipStatus)       //En vez de escribir todo el codigo, se llama auna funcion
        .catch(error => console.error("Error fetching membership data:", error));

    function updateMembershipStatus(data) {
        if (!data || !data.vigencia) {
            console.warn("No membership data received:", data);
            return;
        }

        const [anio, mes, dia] = data.vigencia.split("-").map(Number);      //Datos de fecha
        const fechaVigencia = new Date(anio, mes - 1, dia);
        
        const formattedDate = fechaVigencia.toLocaleDateString("es-ES"); // formateado a dd//MM//YYYY
        const statusElement = document.querySelector(".info_solicitud_datos-status");
        const expiraElement = document.querySelector(".info_solicitud_datos-expira");

        if (!statusElement || !expiraElement) return;

        statusElement.innerText = data.estatus;
        expiraElement.innerText = formattedDate;

        //Color se cambio a checar estatus y fecha (Se vio que color de texto y fondo se compartian, esto se recomienda cambiar añadiendo otra variable de color o dejando fondo fijo)
        let color;
        if (fechaActual <= fechaVigencia) {
            color = data.estatus === "Aceptado" ? "#23b55d"
                  : data.estatus === "Pendiente" ? "#fb8500"
                  : "#e63946";
        } else {
            color = "#e63946";
        }

        //Aplica color
        statusElement.style.backgroundColor = color;
        expiraElement.style.color = color;
    }

    // Logout 
    document.querySelector("#logout-cont")?.addEventListener("click", () => {
        window.history.pushState?.(null, null, "/membresias/login.html");
        localStorage.clear();
        window.location.href = "/membresias/login.html";
    });
});


