document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const form = document.getElementById('signupForm');
    const prenom = document.getElementById('prenom');
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const telephone = document.getElementById('telephone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const conditions = document.getElementById('conditions');
    const togglePass = document.getElementById('togglePassword');
    const toggleConfirmPass = document.getElementById('toggleConfirmPassword');
    const strengthBar = document.getElementById('strengthBar');
    const strengthText = document.getElementById('strengthText');
    const scrollTopBtn = document.getElementById('scrollTop');

    // Helpers de validation
    const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    const isPhoneValid = (val) => !val || /^[\d\s\+\-\(\)]{10,}$/.test(val);

    // Gestion de l'affichage des erreurs
    const showError = (input, errorId, msg) => {
        input.style.borderColor = 'var(--error)';
        const errEl = document.getElementById(errorId);
        if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
    };
    const clearError = (input, errorId) => {
        input.style.borderColor = 'var(--border)';
        const errEl = document.getElementById(errorId);
        if (errEl) { errEl.textContent = ''; errEl.style.display = 'none'; }
    };

    // Toggle visibilité mot de passe
    const setupToggle = (toggleEl, inputEl) => {
        toggleEl.addEventListener('click', () => {
            const type = inputEl.getAttribute('type') === 'password' ? 'text' : 'password';
            inputEl.setAttribute('type', type);
            toggleEl.classList.toggle('fa-eye');
            toggleEl.classList.toggle('fa-eye-slash');
        });
    };
    setupToggle(togglePass, password);
    setupToggle(toggleConfirmPass, confirmPassword);

    // Indicateur de force du mot de passe
    password.addEventListener('input', () => {
        const val = password.value;
        if (!val) {
            strengthBar.className = 'strength-bar';
            strengthText.textContent = '';
            return;
        }
        let score = 0;
        if (val.length >= 8) score++;
        if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
        if (/\d/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        strengthBar.className = 'strength-bar';
        strengthText.textContent = '';

        if (score <= 1) {
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Faible';
            strengthText.style.color = 'var(--error)';
        } else if (score === 2 || score === 3) {
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Moyen';
            strengthText.style.color = '#ffa500';
        } else {
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Fort';
            strengthText.style.color = 'var(--success)';
        }
    });

    // Validation en temps réel (blur)
    prenom.addEventListener('blur', () => prenom.value.trim().length < 2 ? showError(prenom, 'prenomError', 'Minimum 2 caractères') : clearError(prenom, 'prenomError'));
    nom.addEventListener('blur', () => nom.value.trim().length < 2 ? showError(nom, 'nomError', 'Minimum 2 caractères') : clearError(nom, 'nomError'));
    email.addEventListener('blur', () => !isEmailValid(email.value) ? showError(email, 'emailError', 'Email invalide') : clearError(email, 'emailError'));
    telephone.addEventListener('blur', () => !isPhoneValid(telephone.value) ? showError(telephone, 'telephoneError', 'Numéro invalide') : clearError(telephone, 'telephoneError'));
    password.addEventListener('blur', () => password.value.length < 8 ? showError(password, 'passwordError', 'Minimum 8 caractères') : clearError(password, 'passwordError'));
    confirmPassword.addEventListener('blur', () => {
        if (!confirmPassword.value) showError(confirmPassword, 'confirmPasswordError', 'Confirmez votre mot de passe');
        else if (confirmPassword.value !== password.value) showError(confirmPassword, 'confirmPasswordError', 'Les mots de passe ne correspondent pas');
        else clearError(confirmPassword, 'confirmPasswordError');
    });

    // Nettoyage des erreurs à la saisie
    [prenom, nom, email, telephone, password, confirmPassword].forEach(input => {
        input.addEventListener('input', () => clearError(input, input.id + 'Error'));
    });

    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (prenom.value.trim().length < 2) { showError(prenom, 'prenomError', 'Prénom requis'); isValid = false; }
        if (nom.value.trim().length < 2) { showError(nom, 'nomError', 'Nom requis'); isValid = false; }
        if (!isEmailValid(email.value)) { showError(email, 'emailError', 'Email invalide'); isValid = false; }
        if (!isPhoneValid(telephone.value)) { showError(telephone, 'telephoneError', 'Téléphone invalide'); isValid = false; }
        if (password.value.length < 8) { showError(password, 'passwordError', 'Minimum 8 caractères'); isValid = false; }
        if (confirmPassword.value !== password.value) { showError(confirmPassword, 'confirmPasswordError', 'Mots de passe différents'); isValid = false; }
        if (!conditions.checked) { showError(conditions, 'conditionsError', 'Acceptez les conditions'); isValid = false; }

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Création en cours...';
            submitBtn.disabled = true;

            setTimeout(() => {
                const successDiv = document.createElement('div');
                successDiv.className = 'success-message';
                successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Compte créé avec succès ! Redirection...';
                form.insertBefore(successDiv, form.firstChild);

                localStorage.setItem('livraria_user', JSON.stringify({ name: prenom.value, email: email.value }));
                setTimeout(() => window.location.href = 'connexion.html', 2000);
            }, 1500);
        }
    });

    // Boutons sociaux (simulation)
    document.querySelectorAll('.btn-social').forEach(btn => {
        btn.addEventListener('click', () => alert(`Connexion via ${btn.textContent.trim()} bientôt disponible.`));
    });

    // Bouton retour en haut
    window.addEventListener('scroll', () => {
        window.scrollY > 300 ? scrollTopBtn.classList.add('visible') : scrollTopBtn.classList.remove('visible');
    });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});