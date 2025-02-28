const { createApp } = Vue

const app = createApp({
    data() {
        return {
            isScrolled: false,
            isMenuOpen: false,
            coaches: [
                {
                    name: 'Gaïa',
                    image: '/images/coach1.jpg',
                    description: `Titulaire d'une **licence en biologie santé** et d'un **master en bioinformatique**, j'ai acquis une solide compréhension du corps humain et de la nutrition.

Ma **passion pour le sport** m'a poussé à y consacrer toute mon énergie, adoptant une **approche holistique** qui considère le corps et l'esprit comme un tout.

Il y a 5 ans, j'ai débuté la **musculation**, explorant diverses disciplines comme le bodybuilding, le powerlifting et le streetlifting. Grâce à ça, j'ai développé de réelles compétences acquises sur **le terrain**.

Aujourd'hui, je possède les clés pour atteindre un **physique esthétique** presque sans effort.

Récemment, je me suis lancé dans la **course à pied**, participant à quatre courses dont un **semi-marathon** dès mes premiers mois d'entraînement. Je me prépare actuellement pour le **marathon de Paris**, poursuivant mon objectif d'apprentissage continu et d'application concrète sur le terrain.`,
                    specialties: [
                        'Musculation',
                        'Nutrition sportive'
                    ]
                },
                {
                    name: 'Seamoon',
                    image: '/images/coach2.jpg',
                    description: `**Doctorant en biochimie**, je suis passionné par la compréhension du vivant et du corps humain. Mon parcours m'a doté d'une **approche scientifique rigoureuse** que j'applique au sport.

Pratiquant la **musculation depuis 2016**, j'ai développé une expertise approfondie dans ce domaine. Parallèlement, ma passion pour la **course à pied** m'a accompagné pendant des années, me permettant d'accumuler une expérience significative. Aujourd'hui, je me prépare pour mon **premier marathon**.

Au fil du temps, j'ai allié mes **connaissances théoriques** à la pratique. Cette synergie m'a permis de tester et d'affiner diverses méthodes d'entraînement et de nutrition, d'abord sur moi-même, puis sur mes proches.

Ma démarche consiste à appliquer les **principes scientifiques** les plus récents aux défis concrets de l'entrainement.`,
                    specialties: [
                        'Musculation',
                        'Course à pied'
                    ]
                }
            ],
            coachingMission: `Notre mission est de **simplifier ta vie** en te proposant des solutions sur mesure. Grâce à notre expérience, nous concevons des programmes d'entraînement et des plans nutritionnels adaptés, te permettant de te concentrer uniquement sur le passage à **l'action** et **l'atteinte de tes objectifs**.`,
            services: [
                {
                    title: '.RAW Basic',
                    description: 'Programmes prédéfinis pour débuter ta transformation',
                    icon: 'fas fa-dumbbell',
                    features: [
                        'Programmes prêts à l\'emploi',
                        'Choix entre musculation ou running',
                        'Instructions détaillées',
                        'Guide nutritionnel de base',
                        'Idéal pour débuter'
                    ],
                    price: '29€',
                    type: 'unique',
                    formLink: 'https://forms.google.com/basic'
                },
                {
                    title: '.RAW Premium',
                    description: 'Programme personnalisé sans suivi',
                    icon: 'fas fa-file-alt',
                    features: [
                        'Programme musculation, course à pied ou hybride',
                        'Plan nutritionnel personnalisé',
                        'Instructions détaillées',
                        'Objectifs personnalisés',
                        'Programme unique et adapté'
                    ],
                    price: '49€',
                    type: 'unique',
                    formLink: './legal/questionnaire.html'
                },
                {
                    title: '.RAW Elite',
                    description: 'Programme personnalisé avec suivi',
                    icon: 'fas fa-crown',
                    features: [
                        'Programme musculation, course à pied ou hybride',
                        'Plan nutritionnel personnalisé',
                        'Support continu par WhatsApp (24/7)',
                        'Point mensuel en visio ou téléphone',
                        'Ajustements et adaptations en temps réel',
                        'Programme évolutif selon tes progrès'
                    ],
                    price: '89€',
                    type: 'mensuel',
                    formLink: 'https://forms.gle/UdCq3ANW4oMRKtLr9'
                }
            ],
            socials: [
                {
                    name: 'Instagram',
                    icon: 'fab fa-instagram',
                    url: 'https://www.instagram.com/gaia.raw/'
                },

            ],
            heroTitle: "Ton programme",
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