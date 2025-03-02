(function($) {
    //"use strict"; // Start of use strict
      // Clic form
      
      
        $("#rechazar").on('click',async function(e) {
                const email = document.querySelector(".email").innerText
                const estatus = 'Rechazado'
                const datos = new FormData();

                datos.append("email", email);
                datos.append("estatus", estatus);

                const response 		= await fetch("php/estatusSolicitud.php", {method: "POST", body: datos});
                const arrayResponse = await response.json();

                if(arrayResponse.error) return alert("No se pudo modificar el estatus");
            
                return Swal.fire({
                                  title: 'Confirmacion',
                                  text: 'La membresia del usuario ha sido RECHAZADA',
                                }).then(function() {
                                    window.location = "pendientes.php";
                                });
      });
      
      
      
      $("#aceptar").on('click',async function(e) {
                const email = document.querySelector(".email").innerText;
                const nomComp = document.querySelector(".nom-comp").innerText;
                const pais = document.querySelector(".pais").innerText;
                const uni = document.querySelector(".uni").innerText;
                
          const generatePDF = async () => {
                // console.log(email, nomComp, pais, uni);
                const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib;
            
                const url = 'pdf/MembresiasRedmis.pdf'
                const existingPdfBytes = await fetch(url)
                    .then((res) => {
                        return res.arrayBuffer();
                    });
            
                const pdfDoc = await PDFDocument.load(existingPdfBytes);
            
                const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
            
            
                const pages = pdfDoc.getPages();
                const firstPage = pages[0];
                
            // 'Universidad Popular \nAutonoma del Estado de Puebla'
                firstPage.drawText(uni, {
                    x: 45,
                    y: 508,
                    size: 13,
                    font: helveticaFont,
                    color: rgb(0.95, 0.1, 0.1)
                })
                firstPage.drawText(nomComp, {
                    x: 96,
                    y: 179,
                    size: 7,
                    font: helveticaFont,
                    color: rgb(1, 1, 1)
                })
                firstPage.drawText('G-00010', {
                    x: 96,
                    y: 164,
                    size: 7,
                    font: helveticaFont,
                    color: rgb(1, 1, 1)
                })
                firstPage.drawText('G', {
                    x: 170,
                    y: 164,
                    size: 7,
                    font: helveticaFont,
                    color: rgb(1, 1, 1)
                })
                firstPage.drawText(pais, {
                    x: 207,
                    y: 164,
                    size: 7,
                    font: helveticaFont,
                    color: rgb(1, 1, 1)
                })
                firstPage.drawText(uni, {
                    x: 96,
                    y: 150,
                    size: 8,
                    font: helveticaFont,
                    color: rgb(1, 1, 1)
                })
            
                //  const uri = await pdfDoc.saveAsBase64({ dataUri: true });
            
                 const pdfBytes = await pdfDoc.save()
                 
                 const blobPdf = new Blob([pdfBytes]);
            
                //  document.querySelector('#myPDf').src = uri;
            
                // download(pdfBytes, `Membresia_${nomComp}.pdf`, "application/pdf");
                
                const estatus = 'Aceptado';
                const rutaPdf = `../membresiasPDF/Membresia_${nomComp}.pdf`;
                
                const datos = new FormData();
                
                
                // console.log(rutaPdf);

                datos.append("email", email);
                datos.append("estatus", estatus);
                datos.append("rutaPdf", `../membresiasPDF/Membresia_${nomComp}.pdf`);
                datos.append("membresia", blobPdf,`Membresia_${nomComp}.pdf`);
                

                const response2 		= await fetch("php/estatusSolicitud.php", {method: "POST", body: datos});
                const arrayResponse2 = await response2.json();
                

                if(arrayResponse2.error) return alert("No se pudo modificar el estatus");
            
                return Swal.fire({
                             title: 'Confirmacion',
                             text: 'La membresia del usuario ha sido ACEPTADA',
                         }).then(function () {
                             window.location = "pendientes.php";
                         })
                            
                                
            }
                generatePDF();
                
                
                
      });
      
  })(jQuery); // End of use strict



  