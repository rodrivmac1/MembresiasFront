import loginService from './API/services/login.js';
import membersService from './API/services/members.js';

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const elements = {
        // Authentication elements
        username: document.getElementById('username'),
        password: document.getElementById('password'),
        loginBtn: document.getElementById('login-btn'),
        logoutBtn: document.getElementById('logout-btn'),
        
        // Member query elements
        getMembersBtn: document.getElementById('get-members-btn'),
        getMemberByIdBtn: document.getElementById('get-member-by-id-btn'),
        memberId: document.getElementById('member-id'),
        
        // Member create elements
        newNombre: document.getElementById('new-nombre'),
        newApellidos: document.getElementById('new-apellidos'),
        newGenero: document.getElementById('new-genero'),
        newUniversidad: document.getElementById('new-universidad'),
        newEstado: document.getElementById('new-estado'),
        newPaises: document.getElementById('new-paises'),
        newEmail: document.getElementById('new-email'),
        newPassword: document.getElementById('new-password'),
        addMemberBtn: document.getElementById('add-member-btn'),
        
        // Member update elements
        updateId: document.getElementById('update-id'),
        updateNombre: document.getElementById('update-nombre'),
        updateApellidos: document.getElementById('update-apellidos'),
        updateGenero: document.getElementById('update-genero'),
        updateUniversidad: document.getElementById('update-universidad'),
        updateEstado: document.getElementById('update-estado'),
        updatePaises: document.getElementById('update-paises'),
        updateEmail: document.getElementById('update-email'),
        updatePassword: document.getElementById('update-password'),
        updateMemberBtn: document.getElementById('update-member-btn'),
        
        // Member delete elements
        deleteId: document.getElementById('delete-id'),
        deleteMemberBtn: document.getElementById('delete-member-btn'),
        
        // Display elements
        results: document.getElementById('results'),
        authStatus: document.getElementById('auth-status'),
        authInfo: document.getElementById('auth-info'),
        
        // Tab elements
        tabs: document.querySelectorAll('.tab'),
        tabContents: document.querySelectorAll('.tab-content')
    };

    // Initialize the app
    init();

    // Auth event listeners
    elements.loginBtn.addEventListener('click', handleLogin);
    elements.logoutBtn.addEventListener('click', handleLogout);

    // Members query event listeners
    elements.getMembersBtn.addEventListener('click', handleGetAllMembers);
    elements.getMemberByIdBtn.addEventListener('click', handleGetMemberById);
    
    // Members create event listener
    elements.addMemberBtn.addEventListener('click', handleAddMember);
    
    // Members update event listener
    elements.updateMemberBtn.addEventListener('click', handleUpdateMember);
    
    // Members delete event listener
    elements.deleteMemberBtn.addEventListener('click', handleDeleteMember);
    
    // Tab switching event listeners
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            elements.tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab contents
            elements.tabContents.forEach(content => content.classList.remove('active'));
            
            // Show corresponding tab content
            const tabId = tab.dataset.tab;
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });

    // Global error handler for API errors
    document.addEventListener('api:error', handleApiError);

    // Initialize application state
    function init() {
        updateAuthStatus();
    }

    // Authentication functions
    async function handleLogin() {
        try {
            const credentials = {
                username: elements.username.value,
                password: elements.password.value
            };

            // Validation
            if (!credentials.username || !credentials.password) {
                displayMessage('Por favor, complete todos los campos', 'error');
                return;
            }

            displayMessage('Iniciando sesión...', 'info');
            console.log('Attempting login with credentials:', {
                email: credentials.username,
                password: '********' // Don't log actual password
            });
            
            const response = await loginService.login(credentials);
            
            console.log('Login response:', response);
            displayResult('Login successful', response);
            displayMessage('Sesión iniciada correctamente', 'success');
            updateAuthStatus();
            
        } catch (error) {
            const errorMsg = getErrorMessage(error);
            displayMessage(`Error de inicio de sesión: ${errorMsg}`, 'error');
            console.error('Login error:', error);
            displayResult('Login Error Details', {
                status: error.status,
                statusText: error.statusText,
                message: error.data?.message || errorMsg,
                details: error.data
            });
        }
    }

    async function handleLogout() {
        try {
            displayMessage('Cerrando sesión...', 'info');
            await loginService.logout();
            displayMessage('Sesión cerrada correctamente', 'success');
            updateAuthStatus();
            displayResult('Logout successful', { status: 'logged out' });
        } catch (error) {
            displayMessage(`Error al cerrar sesión: ${getErrorMessage(error)}`, 'error');
            console.error('Logout error:', error);
        }
    }

    // Members query functions
    async function handleGetAllMembers() {
        try {
            displayMessage('Obteniendo miembros...', 'info');
            const members = await membersService.get();
            displayResult('All members', members);
            displayMessage(`${members.length || 0} miembros obtenidos`, 'success');
        } catch (error) {
            displayMessage(`Error al obtener miembros: ${getErrorMessage(error)}`, 'error');
        }
    }

    async function handleGetMemberById() {
        const id = elements.memberId.value;
        if (!id) {
            displayMessage('Ingrese un ID de miembro válido', 'error');
            return;
        }

        try {
            displayMessage(`Obteniendo miembro con ID ${id}...`, 'info');
            const member = await membersService.getbyID(id);
            displayResult(`Member with ID ${id}`, member);
            displayMessage('Miembro obtenido correctamente', 'success');
        } catch (error) {
            displayMessage(`Error al obtener miembro: ${getErrorMessage(error)}`, 'error');
        }
    }
    
    // Member create function
    async function handleAddMember() {
        try {
            const newMember = {
                nombre: elements.newNombre.value,
                apellidos: elements.newApellidos.value,
                genero: elements.newGenero.value,
                universidad: parseInt(elements.newUniversidad.value),
                estado: parseInt(elements.newEstado.value),
                paises: parseInt(elements.newPaises.value),
                email: elements.newEmail.value,
                password: elements.newPassword.value
            };
            
            displayMessage('Agregando nuevo miembro...', 'info');
            console.log('Adding new member:', { ...newMember, password: '********' });
            
            const response = await membersService.addMember(newMember);
            displayResult('Member added', response);
            displayMessage('Miembro agregado correctamente', 'success');
        } catch (error) {
            displayMessage(`Error al agregar miembro: ${getErrorMessage(error)}`, 'error');
            console.error('Add member error:', error);
        }
    }
    
    // Member update function
    async function handleUpdateMember() {
        const id = elements.updateId.value;
        if (!id) {
            displayMessage('Ingrese un ID de miembro válido', 'error');
            return;
        }
        
        // Only include fields that have values
        const updateData = {};
        if (elements.updateNombre.value) updateData.nombre = elements.updateNombre.value;
        if (elements.updateApellidos.value) updateData.apellidos = elements.updateApellidos.value;
        if (elements.updateGenero.value) updateData.genero = elements.updateGenero.value;
        if (elements.updateUniversidad.value) updateData.universidad = parseInt(elements.updateUniversidad.value);
        if (elements.updateEstado.value) updateData.estado = parseInt(elements.updateEstado.value);
        if (elements.updatePaises.value) updateData.paises = parseInt(elements.updatePaises.value);
        if (elements.updateEmail.value) updateData.email = elements.updateEmail.value;
        if (elements.updatePassword.value) updateData.password = elements.updatePassword.value;
        
        if (Object.keys(updateData).length === 0) {
            displayMessage('No hay datos para actualizar', 'error');
            return;
        }
        
        try {
            displayMessage(`Actualizando miembro con ID ${id}...`, 'info');
            console.log('Updating member:', { ...updateData, password: updateData.password ? '********' : undefined });
            
            const response = await membersService.updateMember(id, updateData);
            displayResult(`Member with ID ${id} updated`, response);
            displayMessage('Miembro actualizado correctamente', 'success');
        } catch (error) {
            displayMessage(`Error al actualizar miembro: ${getErrorMessage(error)}`, 'error');
            console.error('Update member error:', error);
        }
    }
    
    // Member delete function
    async function handleDeleteMember() {
        const id = elements.deleteId.value;
        if (!id) {
            displayMessage('Ingrese un ID de miembro válido', 'error');
            return;
        }
        
        try {
            displayMessage(`Eliminando miembro con ID ${id}...`, 'info');
            await membersService.deleteMember(id);
            displayResult(`Member with ID ${id} deleted`, { success: true });
            displayMessage('Miembro eliminado correctamente', 'success');
        } catch (error) {
            displayMessage(`Error al eliminar miembro: ${getErrorMessage(error)}`, 'error');
            console.error('Delete member error:', error);
        }
    }

    // Utility functions
    function updateAuthStatus() {
        const isAuthenticated = loginService.isAuthenticated();
        const userData = loginService.getUserData();
        
        elements.authStatus.textContent = isAuthenticated ? 
            'Autenticado' : 'No autenticado';
        elements.authStatus.className = 'status ' + (isAuthenticated ? 'success' : 'error');
        
        elements.authInfo.innerHTML = '';
        
        if (isAuthenticated) {
            const token = loginService.getToken();
            const tokenPreview = token.substring(0, 15) + '...';
            
            elements.authInfo.innerHTML = `
                <p><strong>Estado:</strong> Autenticado</p>
                <p><strong>User ID:</strong> ${userData?.userId || 'No disponible'}</p>
                <p><strong>Token:</strong> ${tokenPreview}</p>
            `;
        } else {
            elements.authInfo.innerHTML = '<p>No autenticado</p>';
        }
    }

    function displayResult(title, data) {
        elements.results.innerHTML = `<strong>${title}:</strong>\n${JSON.stringify(data, null, 2)}`;
    }

    function displayMessage(message, type = 'info') {
        elements.authStatus.textContent = message;
        elements.authStatus.className = 'status ' + type;
    }

    function handleApiError(event) {
        const error = event.detail;
        displayMessage(`API Error: ${getErrorMessage(error)}`, 'error');
    }

    function getErrorMessage(error) {
        if (typeof error === 'string') return error;
        if (error.message) return error.message;
        if (error.data && error.data.message) return error.data.message;
        if (error.statusText) return `${error.status} - ${error.statusText}`;
        return 'Error desconocido';
    }
});
