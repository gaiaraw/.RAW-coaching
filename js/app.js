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
                    description: `**Titulaire d'une licence en biologie santé et d'un master en bioinformatique**, j'ai acquis une solide compréhension du corps humain et de la nutrition.

Ma **passion pour le sport** m'a poussé à y consacrer toute mon énergie, adoptant une **approche holistique** qui considère le corps et l'esprit comme un tout.

Il y a 5 ans, j'ai débuté la **musculation**, explorant diverses disciplines comme le bodybuilding, le powerlifting et le streetlifting. Cette exploration m'a permis de développer une **méthode globale**, intégrant sport, nutrition et bien-être mental.

Aujourd'hui, je possède les clés pour atteindre un **physique esthétique** et un **esprit équilibré**, presque sans effort.

Récemment, je me suis lancé dans la **course à pied**, participant à quatre courses dont un **semi-marathon** dès mes premiers mois d'entraînement. Je me prépare actuellement pour le **marathon de Paris**, poursuivant mon objectif d'apprentissage continu et d'application concrète sur le terrain, tout en maintenant l'harmonie entre corps et esprit.`,
                    specialties: [
                        'Musculation',
                        'Nutrition sportive'
                    ]
                },
                {
                    name: 'Seamoon',
                    image: '/images/coach2.jpg',
                    description: `à remplir`,
                    specialties: [
                        'Musculation',
                        'Course à pied'
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
                    price: 'à partir de 59€',
                    type: 'unique'
                },
                {
                    title: '.RAW Elite',
                    description: 'L\'excellence à l\'état brut avec suivi personnalisé',
                    icon: 'fas fa-crown',
                    features: [
                        'Programme musculation, course à pied ou hybride',
                        'Plan nutritionnel personnalisé',
                        'Support continu par WhatsApp (24/7)',
                        'Point mensuel en visio ou téléphone',
                        'Ajustements et adaptations en temps réel',
                        'Programme évolutif selon vos progrès'
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
                'RUNNING',
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
        },
        renderMarkdown(text) {
            return marked.parse(text)
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