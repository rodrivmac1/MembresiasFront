


(function($) {
    "use strict"; // Start of use strict
      // Clic form
      
        $("#login").on('click',async function(e) {
            var email;
            var pass;
          
            email	= $("#exampleInputEmail").val();
            pass	= $("#exampleInputPassword").val();
            console.log(email,pass)
            const datos = new FormData();

            datos.append("email", email);
            datos.append("password", pass);
            console.log(datos);

            const response 		= await fetch("php/login.php", {method: "POST", body: datos});
            const arrayResponse = await response.json();

            if(arrayResponse.error) return alert("Email y/o contraseña incorrectos");
            
            localStorage.setItem('email',email)
            localStorage.setItem('password',pass)
            
            if(arrayResponse.respuesta == "admin")
                window.location.href = "https://lumacad.com.mx/membresias/";
            else if(arrayResponse.respuesta == "usuario")
                window.location.href = "https://lumacad.com.mx/membresias/perfil_usuario.php";
      });
  })(jQuery); // End of use strict
  
localStorage.clear();