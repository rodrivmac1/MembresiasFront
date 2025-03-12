document.addEventListener("DOMContentLoaded", () => {
    //Elementos tipo const guardados en un array ya que se usan frecuentre en las diferentes funciones
    const elements = {
        inputs: document.querySelectorAll(".statusInput"),
        editButton: document.querySelector(".info_perfil-btnEditar"),
        saveButton: document.querySelector(".info_perfil-btnsEdit-aceptar"),
        cancelButton: document.querySelector(".info_perfil-btnsEdit-cancelar"),
        editContainer: document.querySelector(".info_perfil-btnsEdit"),
        logoutButton: document.getElementById("logout-cont"),
    };

    //Fetch from API    (Modificar dependiendo el manejo de consumo ya que perfil_usuario solo regresa email)
    async function fetchUserData() {
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User ID not found");
            
            const response = await fetch(`php/perfil_usuario.php?userId=${userId}`);       //Esto con teoria en GET, dicho eso perfilUsario solo esta configurado en POST
            if (!response.ok) throw new Error("Failed to fetch user data");
            
            const userData = await response.json();
            populateUserData(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }


    //Popula datos remplazando el fetch y la lista hecha (Dependiente del async fetchUserData y API):
    function populateUserData(data) {
        document.getElementById("inputNombre").value = data.nombre || "";
        document.getElementById("inputApellidos").value = data.apellido || "";
        document.getElementById("inputGenero").value = data.genero || "";
        document.getElementById("inputPais").value = data.pais || "";
        document.getElementById("inputEstado").value = data.estado || "";
        document.getElementById("inputUniversidad").value = data.universidad || "";
        document.getElementById("inputLI").value = data.lineaInvestigacion || "";
        document.getElementById("inputEmail").value = data.email || "";
    }


    //Función para mostrar o no los botones.
    function toggleEditMode(enable) {
        elements.inputs.forEach(input => {
            input.disabled = !enable;
            input.classList.toggle("editing", enable); 
        });
        elements.editButton.style.display = enable ? "none" : "inline-block";
        elements.editContainer.style.display = enable ? "flex" : "none";
    }

    async function saveUserData() {
        elements.saveButton.disabled = true;
        elements.saveButton.textContent = "Guardando...";
        try {
            // Modificado a conseguir data de userId
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User ID not found");
            
            //Guarda datos en un const
            const updatedData = {
                userId,
                nombre: document.getElementById("inputNombre").value,
                apellido: document.getElementById("inputApellidos").value,
                genero: document.getElementById("inputGenero").value,
                pais: document.getElementById("inputPais").value,
                estado: document.getElementById("inputEstado").value,
                universidad: document.getElementById("inputUniversidad").value,
                lineaInvestigacion: document.getElementById("inputLI").value,
                email: document.getElementById("inputEmail").value,
            };
            
            const response = await fetch("editarUsuario.php", {         //API (Modificar dependiendo del manejo de consumo)
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            
            //Manejo de fallo al guardar
            if (!response.ok){
                throw new Error("Error al guardar los datos");
            } 

            alert("Datos guardados correctamente");
            toggleEditMode(false); //Oculta la vista de Edicion

        } catch (error) {   //Manejo de error
            console.error("Error saving user data:", error);
            alert("Error al actualizar los datos");
        } finally {
            elements.saveButton.disabled = false;
            elements.saveButton.textContent = "Guardar";
        }
    }

    function logout() {         //Manejo de logout,cambio a redirección de login.html
        localStorage.clear();
        window.location.href = "login.html";
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm() {
        const nombre = document.getElementById("inputNombre").value.trim();
        const email = document.getElementById("inputEmail").value.trim();
    
        if (nombre === "" || email === "") {
            alert("El nombre y el email son obligatorios.");
            return false; // Prevent saving
        }

        if (!isValidEmail(email)) {
            alert("Por favor, introduce un correo electrónico válido.");
            return false;
        }
    
        return true;
    }

    // Event Listeners (Aqui se refencia todo)
    elements.editButton.addEventListener("click", () => toggleEditMode(true));
    elements.cancelButton.addEventListener("click", () => toggleEditMode(false));
    elements.saveButton.addEventListener("click", () => {
        if(validateForm()){
            saveUserData();
        }
    });
    elements.logoutButton.addEventListener("click", logout);
    
    // Inicializa el API y todo el proceso
    fetchUserData();

});
