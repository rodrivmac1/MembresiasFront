const x = document.getElementById("select");


fetch("php/getInfoMembresias.php", {method: "POST"})
    .then(arrayResponse => arrayResponse.json())
    .then(arrayResponse => {
        // console.log(arrayResponse);
        arrayResponse.respuesta.forEach((element) => {
            console.log(element)
            const option = document.createElement("option");
            option.text = element.nombre;
            x.add(option); 
            x.value = element.id;
        });
    })



