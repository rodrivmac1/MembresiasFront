


document.addEventListener("DOMContentLoaded", () => {       //Cambio de funcion a DOM
    const loginButton = document.getElementById("login");
    if (!loginButton) return; 

    loginButton.addEventListener ("click", async () => {
            const email = document.getElementById("exampleInputEmail").value.trim();   //Sustituye el  email	= $("#exampleInputEmail").val();
            const password = document.getElementById("exampleInputPassword").value.trim();   //Sustituye el  pass	= $("#exampleInputPassword").val();
          
    
            console.log(email,password)     // Eliminar al final pero muestra que datos se pasan para debugeo

            // En caso de que falte email o contraseña se manda este mensaje:
            if (!email || !password) {
              alert("Por favor, ingresa tu correo y contraseña.");
              return;
            }

            try {                   //Try añadido para manejo de errores
              const datos = new FormData();            
              datos.append("email", email);
              datos.append("password", password);
              console.log(datos);                          // Log los datos para debugueo, eliminar linea al final

              const response 		= await fetch("php/login.php", {      //Fetch igual
                method: "POST", 
                body: datos
              });

              const result = await response.json();             //cambiado a result para nombre mas corto
              
              if(result.error){
                return alert("Email y/o contraseña incorrectos");   // Envia si no coinciden email y contraseña
              } 
              
              sessionStorage.setItem('email', email);       //Cambiado a ssesionStorage para mejor seguridad
             
              
              if (!result || !result.respuesta) {
                alert("Respuesta inesperada del servidor.");
                return;
            }

              if(result.respuesta == "admin"){            // Nota: No encontre en el intermediario algo llamado "respuesta" o "rol" por lo que se recomienda checar est if despues.
                window.location.href = "https://lumacad.com.mx/membresias/"; 
              } else if(result.respuesta == "usuario") {
                window.location.href = "https://lumacad.com.mx/membresias/perfil_usuario.php";
              }
            }catch (error){
              console.error("Error en el login:", error);
              alert("Hubo un problema al iniciar sesión. Intenta de nuevo.");
            }    
      });
  })
   // strict eliminado (DOM lo contiene por default) y clear eliminado (redundante con el setItem)