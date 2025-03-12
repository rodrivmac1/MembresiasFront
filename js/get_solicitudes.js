
document.addEventListener("DOMContentLoaded", () => {
    // Delega cartas 
    document.body.addEventListener("click", (event) => {
        const cardBody = event.target.closest(".card-body");
        if (cardBody) {
            const textElement = cardBody.parentNode.querySelector(".text-primary");
            if (textElement) {
                try {
                    localStorage.setItem("nombre", textElement.id);
                    window.location.href = "usuario.html";
                } catch (error) {
                    console.error("Error saving to localStorage:", error);
                }        
            }
        }
    });

    // Funcion Logout
    const logoutButton = document.querySelector("#logout-cont");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            if (window.history.pushState) {
                window.history.pushState(null, null, "/membresias/login.html");
            }
            localStorage.clear();
            window.location.href = "/membresias/login.html";
        });
    }
});
