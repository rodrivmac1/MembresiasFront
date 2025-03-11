document.addEventListener("DOMContentLoaded", () => {
      

    //Manejo de estatus
    const updateStatus = async (email, estatus, additionalData = {}) => {
        try {
            const datos = new FormData();
            datos.append("email", email);
            datos.append("estatus", estatus);

            //(Esto es un placeholder para manejo de PDFs)
            Object.entries(additionalData).forEach(([key, value]) => {
                datos.append(key, value);
            });

            // API (modificar dependiendo de manejo de consumo)
            const response = await fetch("php/estatusSolicitud.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            if (result.error) throw new Error("No se pudo modificar el estatus");

            return Swal.fire({
                title: "Confirmación",
                text: `La membresía del usuario ha sido ${estatus.toUpperCase()}`,  // Estatus modificado por funciones de abajo
            }).then(() => {
                window.location = "pendientes.html";            //Factorizado a html
            });

        } catch (error) {
            alert(error.message);
        }

    };
      
    // Membresia rechazada
    document.getElementById("rechazar")?.addEventListener("click", async () => {
        const email = document.querySelector(".email")?.innerText;
        if (email) await updateStatus(email, "Rechazado");
    });

    //Membresia aceptada y generacion de PDF
    //Nota: La generacion de PDF se quitara o mantendra dependiendo de si este estara en front o back-end
      
      
    document.getElementById("aceptar")?.addEventListener("click", async () => {
        try {
            const email = document.querySelector(".email")?.innerText;
            const nomComp = document.querySelector(".nom-comp")?.innerText;
            const pais = document.querySelector(".pais")?.innerText;
            const uni = document.querySelector(".uni")?.innerText;

            if (!email || !nomComp || !pais || !uni) {
                throw new Error("Faltan datos del usuario.");
            }

            // Carga PDF y modifica
            const { PDFDocument, rgb, StandardFonts } = PDFLib;
            const existingPdfBytes = await fetch("pdf/MembresiasRedmis.pdf").then(res => res.arrayBuffer());
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
            const page = pdfDoc.getPages()[0];

            page.drawText(uni, { x: 45, y: 508, size: 13, font: helveticaFont, color: rgb(0.95, 0.1, 0.1) });
            page.drawText(nomComp, { x: 96, y: 179, size: 7, font: helveticaFont, color: rgb(1, 1, 1) });
            page.drawText(pais, { x: 207, y: 164, size: 7, font: helveticaFont, color: rgb(1, 1, 1) });
            page.drawText(uni, { x: 96, y: 150, size: 8, font: helveticaFont, color: rgb(1, 1, 1) });

            const pdfBytes = await pdfDoc.save();
            // Guarda PDF en Blob para mandar a carpeta
            const blobPdf = new Blob([pdfBytes], { type: "application/pdf" });
            const rutaPdf = `../membresiasPDF/Membresia_${nomComp}.pdf`;

            await updateStatus(email, "Aceptado", {
                rutaPdf,
                membresia: blobPdf,
            });

        } catch (error) {
            alert("Error al generar el PDF: " + error.message);
        }
    });
      
  });


  