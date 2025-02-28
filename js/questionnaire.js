document.addEventListener('DOMContentLoaded', function() {
    // Configuration Stripe
    const stripe = Stripe('pk_test_...votre_clé_publique_stripe...');
    const elements = stripe.elements();
    const card = elements.create('card', {
        style: {
            base: {
                color: '#ffffff',
                fontFamily: '"Poppins", sans-serif',
                fontSize: '16px',
                '::placeholder': {
                    color: '#aab7c4'
                },
            },
        }
    });
    card.mount('#card-element');

    // Gestion des étapes du formulaire
    let currentStep = 1;
    const form = document.getElementById('program-form');
    const steps = document.querySelectorAll('.step');
    
    // Afficher la première étape
    steps[0].classList.add('active');

    // Gestion des boutons "Suivant"
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            const currentStepElement = document.querySelector(`.step[data-step="${currentStep}"]`);
            if (validateStep(currentStepElement)) {
                currentStep++;
                updateSteps();
            }
        });
    });

    // Gestion des boutons "Précédent"
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            updateSteps();
        });
    });

    // Validation du formulaire et paiement
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Traitement en cours...';

        try {
            const { paymentMethod, error } = await stripe.createPaymentMethod({
                type: 'card',
                card: card,
            });

            if (error) {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = error.message;
                submitButton.disabled = false;
                submitButton.textContent = 'Payer et envoyer';
                return;
            }

            // Récupérer toutes les données du formulaire
            const formData = {
                name: form.querySelector('#name').value,
                age: form.querySelector('#age').value,
                email: form.querySelector('#email').value,
                mainGoal: form.querySelector('[name="main-goal"]').value,
                experience: form.querySelector('[name="experience"]').value,
                trainingLocation: form.querySelector('[name="training-location"]').value,
                sessionsPerWeek: form.querySelector('[name="sessions-per-week"]').value,
                paymentMethodId: paymentMethod.id
            };

            const response = await fetch('http://localhost:3000/process-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                window.location.href = '/confirmation.html';
            } else {
                throw new Error(result.message);
            }

        } catch (error) {
            console.error('Erreur:', error);
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = 'Une erreur est survenue. Veuillez réessayer.';
            submitButton.disabled = false;
            submitButton.textContent = 'Payer et envoyer';
        }
    });

    // Fonctions utilitaires
    function updateSteps() {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });
    }

    function validateStep(stepElement) {
        const inputs = stepElement.querySelectorAll('input, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });

        return isValid;
    }
}); 