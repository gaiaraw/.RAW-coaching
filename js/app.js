const { createApp } = Vue

const app = createApp({
    data() {
        return {
            isScrolled: false,
            isMenuOpen: false,
            formLink: 'https://forms.google.com/votre-formulaire', // À remplacer par votre lien
            coaches: [
                {
                    name: 'Gaïa',
                    image: '/images/coach1.jpg',
                    description: 'Coach passionné spécialisé en musculation et course à pied. Mon approche combine force et endurance pour des résultats optimaux.',
                    specialties: [
                        'Musculation',
                        'Course à pied',
                        'Nutrition sportive'
                    ]
                },
                {
                    name: 'Seamoon',
                    image: '/images/coach2.jpg',
                    description: 'Expert en préparation physique, je vous accompagne dans l\'atteinte de vos objectifs avec des programmes sur mesure.',
                    specialties: [
                        'Préparation physique',
                        'Programmes hybrides',
                        'Planification nutritionnelle'
                    ]
                }
            ],
            heroTitle: "Course. Musculation. Hybride.",
            heroSubtitle: "Du brut à l'excellence, révélez votre véritable potentiel",
            services: [
                {
                    title: '.RAW Premium',
                    description: 'Programme personnalisé brut, sans artifices ni superflu',
                    icon: 'fas fa-file-alt',
                    features: [
                        'Programme musculation, course à pied ou hybride',
                        'Plan nutritionnel personnalisé',
                        'Instructions détaillées',
                        'Objectifs personnalisés',
                        'Programme unique et adapté'
                    ],
                    price: '59€',
                    type: 'unique'
                },
                {
                    title: '.RAW Elite',
                    description: 'L\'excellence à l\'état brut avec suivi personnalisé',
                    icon: 'fas fa-crown',
                    features: [
                        'Programme musculation, course à pied ou hybride',
                        'Plan nutritionnel personnalisé',
                        'Suivi et ajustements réguliers',
                        'Support continu',
                        'Accompagnement mensuel'
                    ],
                    price: '89€/mois',
                    type: 'mensuel'
                }
            ],
            socials: [
                {
                    name: 'Instagram',
                    icon: 'fab fa-instagram',
                    url: 'https://www.instagram.com/gaia.raw/'
                },
                {
                    name: 'Facebook',
                    icon: 'fab fa-facebook',
                    url: '#'
                }
            ],
            typingTexts: [
                'MUSCULATION',
                'COURSE À PIED',
                'HYBRIDE'
            ]
        }
    },
    computed: {
        currentYear() {
            return new Date().getFullYear()
        }
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        },
        handleScroll() {
            this.isScrolled = window.scrollY > 50
            this.handleScrollAnimation()
        },
        handleScrollAnimation() {
            const elements = document.querySelectorAll('.coach-card, .service-card')
            elements.forEach(element => {
                const position = element.getBoundingClientRect()
                if (position.top < window.innerHeight - 100) {
                    element.style.animation = 'fadeInUp 0.6s ease forwards'
                }
            })
        },
        initTyping() {
            new Typed('.typing-text', {
                strings: this.typingTexts,
                typeSpeed: 40,          // Un peu plus lent pour plus de lisibilité
                backSpeed: 40,
                backDelay: 2000,        // 2 secondes de pause sur chaque mot
                startDelay: 300,
                loop: true,
                showCursor: false,
                smartBackspace: false,
                loopCount: Infinity,    // Boucle infinie
                // Suppression des callbacks qui causaient des bugs
            })
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
        this.handleScrollAnimation()
        this.initTyping()
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleScroll)
    }
})

app.mount('#app') 