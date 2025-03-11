
document.addEventListener("DOMContentLoaded", () => {
    const tdTipo = document.querySelectorAll("#tdTipo");
    const tdModif = document.querySelectorAll("#tdModif");
    const tdEmail = document.querySelectorAll(".tdEmail");

    // Function to create and append a button
    const createActionButton = (typeCell, modifCell, emailCell) => {
        const button = document.createElement("button");
        const isUser = typeCell.innerText === "USUARIO";            //Funcion que compara === "USUARIO"

        // Creacion de botones (Usando lamba e isUser en comparacion de Ifs)
        button.innerHTML = isUser ? "Convertir a Admin" : "Convertir a Usuario";
        button.value = isUser ? "agregar" : "eliminar";
        button.classList.add("btn", "btn-info");
        button.id = emailCell.innerText;

        modifCell.appendChild(button);

        button.addEventListener("click", async () => {
            const datos = new FormData();
            datos.append("email", button.id);
            datos.append("action", button.value);

            try {
                const response = await fetch("php/modifTipo.php", {
                    method: "POST",
                    body: datos
                });

                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error("Error en la solicitud:", error);
            }
        });
    };

    // Itera y crea botones
    tdTipo.forEach((typeCell, index) => {
        createActionButton(typeCell, tdModif[index], tdEmail[index]);
    });

    // Funcionalidad de boton Logout
    document.querySelector("#logout-cont").addEventListener("click", () => {
        if (window.history.pushState) {
            window.history.pushState(null, null, "/membresias/login.html");
        }
        localStorage.clear();
        window.location.href = "/membresias/login.html";
    });
});
