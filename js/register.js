document.getElementById('register').addEventListener('click', async () => {
    
    const name = document.getElementById('exampleFirstName').value;
    const lastName = document.getElementById('exampleLastName').value;
    const genero = document.getElementById('exampleSelectGender').value;
    const email = document.getElementById('exampleInputEmail').value;
    const pass = document.getElementById('exampleInputPassword').value;
    const pass2 = document.getElementById('exampleRepeatPassword').value;
    const universidad = document.getElementById('exampleSelectUni').value;
    const lineaInv = document.getElementById('exampleSelectLineaInv').value;
    const pais = document.getElementById('exampleSelectPais').value;
    const estado = document.getElementById('exampleSelectEstado').value;
    const tipoM = document.getElementById('exampleSelectMemb').value;
    const fotoPerfil = document.getElementById('exampleSelectFoto').files[0];
    const cv = document.getElementById('exampleSelectCV').files[0];
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("lastName", lastName);
    formData.append("genero", genero);
    formData.append("email", email);
    formData.append("password", pass);
    formData.append("universidad", universidad);
    formData.append("lineaInv", lineaInv);
    formData.append("pais", pais);
    formData.append("estado", estado);
    formData.append("tipoM", tipoM);
    formData.append("fotoPerfil", fotoPerfil,`${name}_${lastName}_Foto.png`); //Tercer campo, nombre de archivo especificando
    formData.append("cv", cv,`${name}_${lastName}_CV.pdf`); //Tercer campo, nombre de archivo
    
    // console.log(formData);
    
    try{
        let options = {
            method: "POST", 
            body: formData
        }, 
        res = await fetch("php/register.php", options),
        json = await res.json();
        
        if(json.error) return alert("No se pudo registrar");
        
        window.location.href = "https://lumacad.com.mx/membresias/login.php";
    }catch (error){
        let message = error.statusText || "No se pudo registrar";
        alert(message)
    }
    
});



// (function($) { 
//   "use strict"; // Start of use strict
//       // Clic form
//   $("#register").on('click',async function(e) {
//     const name = $("#exampleFirstName").val();
//     const lastName = $("#exampleLastName").val();
//     const email = $("#exampleInputEmail").val();
//     const pass = $("#exampleInputPassword").val();
//     const pass2 = $("#exampleRepeatPassword").val();
//     const universidad = $("#exampleSelectUni").val();
//     const lineaInv = $("#exampleSelectLineaInv").val();
//     const pais = $("#exampleSelectPais").val();
//     const estado = $("#exampleSelectEstado").val();
//     const fotoPerfil = $("#exampleSelectFoto").prop('files');
//     const cv = $("#exampleSelectCV").prop('files');
    
//     if(pass != pass2) return alert("Las contraseñas no son iguales");
    
//     // if(pass.length <= 6) return alert("Las contraseñas debe ser mayor a 6 caracteres");

//     const datos = new FormData();
    
//     datos.append("name", name);
//     datos.append("lastName", lastName);
//     datos.append("email", email);
//     datos.append("password", pass);
//     datos.append("universidad", universidad);
//     datos.append("lineaInv", lineaInv);
//     datos.append("pais", pais);
//     datos.append("estado", estado);
//     datos.append("fotoPerfil", fotoPerfil); //Tercer campo, nombre de archivo especificando
//     datos.append("cv", cv); //Tercer campo, nombre de archivo

//     console.log(datos);

//     const response 		= await fetch("php/register.php", {method: "POST", body: datos});
//     const arrayResponse = await response.json();

//     if(arrayResponse.error) return alert("No se pudo registrar");
  
//     window.location.href = "https://luminisoft.com.mx/membresias/login.html";
//   });
// })(jQuery); // End of use strict


    const exampleSelectPais = document.getElementById('exampleSelectPais');
    const exampleSelectEstado = document.getElementById('exampleSelectEstado');


exampleSelectPais.addEventListener("change", () => {
    // console.log(exampleSelectPais.value);
    switch (exampleSelectPais.value) {
        case "14":
            exampleSelectEstado.disabled = false;
            break;
        default:
            exampleSelectEstado.disabled = true;
            exampleSelectEstado.value = null;
    }
});
  