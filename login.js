/**
 * ==========================================================================
 * PORTAL ADMINISTRATIVO - UNIVERSIDAD NORBERT WIENER
 * login.js (Controlador de Acceso Ficticio Administrador - PROTOTIPO)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const btnSubmit = document.getElementById('btnSubmit');
  const btnSubmitText = document.getElementById('btnSubmitText');
  const btnSpinner = document.getElementById('btnSpinner');
  const togglePasswordBtn = document.getElementById('togglePassword');
  const btnDemoQuick = document.getElementById('btnDemoQuick');

  // Destino post-login según requerimiento: Rectificación de Notas
  const DESTINATION_URL = 'rectificacion-nota.html';

  /**
   * 1. Alternar visualización de contraseña (Ojo)
   */
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = passwordInput.type === 'password';
      passwordInput.type = isPassword ? 'text' : 'password';

      // Actualizar el icono SVG
      togglePasswordBtn.setAttribute(
        'aria-label',
        isPassword ? 'Ocultar contraseña' : 'Ver contraseña'
      );

      togglePasswordBtn.innerHTML = isPassword
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
             <line x1="1" y1="1" x2="23" y2="23"></line>
           </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
             <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
             <circle cx="12" cy="12" r="3"></circle>
           </svg>`;
    });
  }

  /**
   * 2. Función para procesar el ingreso y redirigir
   */
  function executeLogin() {
    // Feedback visual en el botón
    if (btnSubmit) {
      btnSubmit.disabled = true;
      if (btnSubmitText) btnSubmitText.textContent = 'Ingresando al prototipo...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
    }

    // Guardar estado de sesión ficticia en sessionStorage para el prototipo
    try {
      sessionStorage.setItem('uwiener_admin_session', JSON.stringify({
        isPrototype: true,
        role: 'Administrador / RRAA',
        user: usernameInput ? usernameInput.value.trim() : 'admin.rraa@uwiener.edu.pe',
        timestamp: new Date().toISOString()
      }));
    } catch (e) {
      console.warn('sessionStorage no disponible', e);
    }

    // Redirección inmediata a Rectificación de Notas
    setTimeout(() => {
      window.location.href = DESTINATION_URL;
    }, 250);
  }

  /**
   * 3. Manejo del envío del formulario
   */
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      executeLogin();
    });
  }

  /**
   * 4. Botón de ingreso rápido del banner demo
   */
  if (btnDemoQuick) {
    btnDemoQuick.addEventListener('click', (e) => {
      e.preventDefault();
      executeLogin();
    });
  }
});
