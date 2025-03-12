// Se obtiene la referencia al formulario en el DOM
const form = document.getElementById('userForm');

// Se añade un listener al evento 'submit' del formulario para capturar los datos sin recargar la página
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevenir la acción por defecto del formulario (recarga de página)

  // Se obtienen los valores ingresados en el formulario
  const name = document.getElementById('name').value;
  const surname = document.getElementById('surname').value;
  const email = document.getElementById('email').value;

  // Se llama a la función que genera la constancia con los datos ingresados
  generateCertificate(name, surname, email);
});

/**
 * Función que genera la constancia en base a los datos del usuario.
 * Crea dinámicamente un elemento HTML con estilo de constancia y lo inyecta en el DOM.
 *
 * @param {string} name - Nombre del usuario.
 * @param {string} surname - Apellidos del usuario.
 * @param {string} email - Correo electrónico del usuario.
 */
function generateCertificate(name, surname, email) {
  // Se obtiene el contenedor donde se mostrará la constancia
  const container = document.getElementById('certificateContainer');

  // Se limpia el contenedor por si ya hay una constancia previa
  container.innerHTML = '';

  // Se crea un elemento <div> para la constancia
  const certificate = document.createElement('div');
  certificate.classList.add('certificate'); // Se añade la clase para aplicar estilos

  // Se obtiene la fecha actual y se formatea (por ejemplo, "15/03/2025")
  const currentDate = new Date().toLocaleDateString();

  // Se define el contenido HTML de la constancia, incluyendo los datos del usuario y la fecha
  certificate.innerHTML = `
    <img src="img/loginredmis.png" alt="Logo" style="max-width: 150px; margin-bottom: 20px;">
    <h2>Constancia de Registro</h2>
    <br>
    <p>Se certifica que <strong>${name} ${surname}</strong> (<em>${email}</em>) ha completado el proceso de registro.</p>
    <p>Fecha de emisión: ${currentDate}</p>
    <br>
    <p>Esta constancia se ha generado de forma local y no se almacena en la base de datos.</p>
  `;

  // Se elimina la clase 'hidden' para hacer visible el contenedor de la constancia
  container.classList.remove('hidden');
  // Se inserta la constancia en el contenedor
  container.appendChild(certificate);

  // Se muestra el botón para descargar el PDF (si está oculto)
  const downloadBtn = document.getElementById('downloadPDF');
  downloadBtn.classList.remove('hidden');
}

// Se añade un listener al botón de "Descargar como PDF" para generar el PDF de la constancia
const downloadBtn = document.getElementById('downloadPDF');
downloadBtn.addEventListener('click', function() {
  // Se obtiene el elemento que contiene la constancia
  const certificateElement = document.getElementById('certificateContainer');

  // Opciones de configuración para html2pdf
  const opt = {
    margin:       1,
    filename:     'constancia.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  // Se utiliza html2pdf para generar y descargar el PDF a partir del contenido del contenedor
  html2pdf().set(opt).from(certificateElement).save();
});