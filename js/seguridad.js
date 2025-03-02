if (!localStorage.getItem('usuario') && !localStorage.getItem('password')) {
    // Redirecciona al usuario al formulario de inicio de sesión
    window.location.href = 'https://lumacad.com.mx/membresias/login.php';
}