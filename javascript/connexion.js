document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Toggle Password Visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });

    // Validation Helpers
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const showError = (input, errorEl, msg) => {
        input.style.borderColor = 'var(--error)';
        errorEl.textContent = msg;
        errorEl.style.display = 'block';
    };
    const clearError = (input, errorEl) => {
        input.style.borderColor = 'var(--border)';
        errorEl.textContent = '';
        errorEl.style.display = 'none';
    };

    // Real-time validation on blur
    emailInput.addEventListener('blur', () => {
        if (!emailInput.value) showError(emailInput, emailError, "L'email est requis");
        else if (!validateEmail(emailInput.value)) showError(emailInput, emailError, "Email invalide");
        else clearError(emailInput, emailError);
    });

    passwordInput.addEventListener('blur', () => {
        if (!passwordInput.value) showError(passwordInput, passwordError, "Le mot de passe est requis");
        else if (passwordInput.value.length < 6) showError(passwordInput, passwordError, "Minimum 6 caractères");
        else clearError(passwordInput, passwordError);
    });

    // Clear errors on input
    emailInput.addEventListener('input', () => clearError(emailInput, emailError));
    passwordInput.addEventListener('input', () => clearError(passwordInput, passwordError));

    // Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (!emailInput.value || !validateEmail(emailInput.value)) {
            showError(emailInput, emailError, !emailInput.value ? "L'email est requis" : "Email invalide");
            isValid = false;
        }
        if (!passwordInput.value || passwordInput.value.length < 6) {
            showError(passwordInput, passwordError, !passwordInput.value ? "Mot de passe requis" : "Minimum 6 caractères");
            isValid = false;
        }

        if (isValid) {
            const btn = loginForm.querySelector('button[type="submit"]');
            btn.textContent = 'Connexion...'; btn.disabled = true;
            
            // Simulation d'appel API
            setTimeout(() => {
                alert('✅ Connexion réussie ! Bienvenue sur LIVRARIA.');
                btn.textContent = 'Se connecter'; btn.disabled = false;
                // window.location.href = 'index.html'; // Décommentez pour rediriger
            }, 1500);
        }
    });

    // Scroll to Top
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.opacity = '1'; scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0'; scrollTopBtn.style.pointerEvents = 'none';
        }
    });
});