// Diccionario ES — idioma por defecto del sitio. Es la fuente de verdad
// tipográfica para `Dictionary` (ver `en.ts`, que debe calzar exactamente
// esta forma). Organizado por sección/componente, no por tipo de dato —
// cada namespace corresponde 1:1 a la parte del sitio que lo consume.

export const es = {
	common: {
		breadcrumbHome: 'Home',
		ctaBuildTogether: 'Construyamos algo juntos',
		close: 'Cerrar',
		scroll: 'Scroll',
	},

	nav: {
		links: [
			{ href: '/', label: 'Inicio' },
			{ href: '/studio', label: 'Sobre nosotras' },
			{ href: '/work', label: 'Nuestro trabajo' },
			{ href: '/contact', label: 'Contáctanos' },
		],
	},

	footer: {
		message: 'Construyamos algo que solo pueda existir contigo.',
		groups: {
			studio: 'Estudio',
			work: 'Trabajo',
		},
		legal: 'No vendemos diseño, construimos identidad.',
	},

	home: {
		hero: {
			eyebrow: 'Ey, somos Tangerine',
			title: 'Hacemos que las buenas ideas cobren vida.',
			subtitle:
				'Somos un estudio creativo que transforma ideas en marcas, productos y experiencias que conectan con las personas.',
			body: 'Nos gusta trabajar de cerca, explorar posibilidades y cuidar cada detalle para crear cosas que realmente nos den ganas de compartir con el mundo.',
			primaryCta: 'Conoce lo que hacemos',
			secondaryCta: 'Cuéntanos tu idea',
		},
		ticker: {
			items: ['Pensar', 'Crear', 'Probar', 'Explorar', 'Imaginar', 'Conectar', 'Experimentar', 'Descubrir'],
		},
		whatWeCreate: {
			eyebrow: 'Qué hacemos',
			title: '¿Qué podemos crear juntas?',
			body: 'Hoy trabajamos en estos tipos de proyectos, sin encerrarnos en ellos para siempre.',
			categories: [
				{
					slug: 'brands',
					title: 'Marcas',
					description: 'Identidad, estrategia y comunicación.',
				},
				{
					slug: 'digital-products',
					title: 'Productos digitales',
					description: 'UX/UI, webs y experiencias digitales.',
				},
				{
					slug: 'content',
					title: 'Contenido',
					description: 'Ideas, campañas y contenido para conectar.',
				},
				{
					slug: 'strategy',
					title: 'Estrategia',
					description: 'Encontramos oportunidades y les damos forma.',
				},
				{
					slug: 'experiences',
					title: 'Experiencias',
					description: 'Creamos momentos que las personas recuerdan.',
				},
			],
			unknown: {
				title: 'Cosas que todavía no sabemos nombrar.',
				description: 'Porque algunas de las mejores ideas empiezan así.',
			},
		},
		whyExists: {
			eyebrow: 'Por qué lo hacemos',
			title: 'Todos tenemos algo creativo adentro. Pocas veces le damos el espacio que necesita.',
			body: 'Para nosotras, eso empieza con curiosidad: probar, conversar, equivocarnos y volver a intentarlo. La tecnología puede ayudarnos a crear más rápido, pero la sensibilidad y el criterio siguen siendo profundamente humanos. Así trabajamos en cada proyecto, y así queremos seguir construyendo lo que venga después.',
		},
		philosophy: {
			eyebrow: 'Filosofía',
			title: 'Las restricciones no limitan, revelan.',
			body: 'Un límite real, mirado de frente en vez de evitado, casi siempre esconde la mejor respuesta posible. Seis creencias sostienen esa idea.',
			ariaLabel: 'Creencias de Tangerine Studio',
			cardLabel: 'Creencia',
			beliefs: [
				{ id: 'creativity-learned', text: 'La creatividad se aprende.' },
				{ id: 'identity-over-trend', text: 'La identidad vale más que la tendencia.' },
				{ id: 'curiosity-innovation', text: 'La curiosidad precede a la innovación.' },
				{ id: 'process-matters', text: 'El proceso importa tanto como el resultado.' },
				{ id: 'fear-of-mistakes', text: 'El miedo a equivocarse cuesta más que el error mismo.' },
				{ id: 'true-over-perfect', text: 'Nadie recuerda lo perfecto; recuerda lo verdadero.' },
			],
		},
		process: {
			eyebrow: 'Cómo trabajamos',
			title: 'Un mismo criterio, aplicado paso a paso en cada proyecto.',
		},
		faq: {
			eyebrow: 'Preguntas frecuentes',
			title: 'Antes de escribirnos, esto puede ahorrarte una vuelta.',
			items: [
				{
					id: 'project-types',
					question: '¿Qué tipo de proyectos desarrollan?',
					answer:
						'Desde sistemas de marca completos hasta productos y experiencias digitales: Brand Systems, Digital Experiences, Product Design, Creative Direction, Content Systems, Growth y Automation son las siete formas en las que aplicamos la misma manera de pensar a un problema distinto.',
				},
				{
					id: 'company-size',
					question: '¿Trabajan con startups o con empresas grandes?',
					answer:
						'Con ambas. No buscamos un tamaño de empresa específico, sino que haya una identidad real detrás para trabajar: el tamaño cambia el alcance del proyecto, no el criterio con el que lo encaramos.',
				},
				{
					id: 'tools',
					question: '¿Qué herramientas utilizan?',
					answer:
						'Las que mejor se adapten a cada proyecto: priorizamos el resultado sobre el apego a una herramienta en particular. Lo que sí se mantiene siempre igual es el criterio: investigar antes de proponer, documentar las decisiones, y dejarte un sistema que tu equipo pueda sostener sin depender de nosotros.',
				},
				{
					id: 'duration',
					question: '¿Cuánto dura un proyecto?',
					answer:
						'Depende directamente del alcance: un sistema de marca completo no dura lo mismo que una pieza puntual. Antes de arrancar definimos un cronograma real para ese proyecto específico, no una estimación genérica.',
				},
				{
					id: 'pricing',
					question: '¿Cómo funcionan los precios y las cotizaciones?',
					answer:
						'Cada cotización se arma después de entender tu proyecto, no antes. Por eso no tenemos una tarifa fija publicada. Nos escribís por el formulario de contacto con el contexto de lo que necesitás, y desde ahí coordinamos la conversación que define el alcance y la propuesta.',
				},
			],
		},
		closing: {
			title: 'La posibilidad de construir algo que nadie más podría haber construido de esa forma exacta.',
			ctaWork: 'Ver el trabajo',
			ctaContact: 'Contacto',
		},
	},

	studio: {
		intro: {
			kicker: 'Sobre nosotras',
			title: 'Dos personas que notaron algo que a nadie más parecía molestarle.',
			imageAlt: 'Natalia García y Emy Dorado, fundadoras de Tangerine Studio',
		},
		origin: {
			kicker: 'Origen',
			imageAlt: 'Natalia García y Emy Dorado, fundadoras de Tangerine Studio',
			intro:
				'Natalia García y Emy Dorado se conocieron en la universidad, estudiando Diseño de Medios Interactivos. Entre proyectos, entregas y muchas conversaciones sobre diseño, empezaron a darse cuenta de algo que compartían: les interesaba mucho más que las cosas simplemente se vieran bien. Querían entender por qué existían, para quién estaban hechas y qué podían provocar en las personas.',
			emphasis: 'De ahí nació Tangerine.',
			paragraphs: [
				'Empezamos con una intuición bastante sencilla: creemos que la creatividad es una capacidad que se puede desarrollar y que, en un mundo donde cada vez es más fácil producir cosas con inteligencia artificial, herramientas y plantillas, lo humano se vuelve todavía más importante. La curiosidad, la sensibilidad, las ideas, las conversaciones y el tiempo que dedicamos a construir algo siguen teniendo un valor enorme.',
				'Por eso queremos construir Tangerine alrededor de la creatividad y de las personas. Hoy trabajamos junto a marcas y organizaciones para convertir ideas en experiencias, identidades y soluciones que tengan sentido para quienes las viven. También estamos construyendo una comunidad alrededor de la creatividad, compartiendo lo que aprendemos, nuestros procesos, nuestras preguntas y el día a día detrás de lo que hacemos.',
				'No sabemos exactamente hasta dónde va a llegar Tangerine, y nos gusta que sea así. Queremos seguir explorando nuevas formas de crear, aprender y compartir, desde proyectos para otras personas hasta productos, contenido, educación y cualquier idea que nos permita acercar la creatividad a más personas.',
				'Porque para nosotras la creatividad no es solamente una herramienta para hacer mejores cosas. Es una forma de mirar el mundo, hacerse preguntas y encontrar nuevas posibilidades.',
			],
		},
		manifesto: {
			kicker: 'Manifiesto',
			lead: 'Crear sigue siendo una de las cosas más humanas que tenemos.',
			body: [
				'Vivimos rodeados de herramientas capaces de hacer más, más rápido y cada vez mejor. Pero crear nunca ha sido solamente producir algo que funciona. También es observar, hacerse preguntas, probar, equivocarse, conectar ideas y encontrar algo que antes no existía.',
				'En Tangerine creemos que la creatividad no es un talento con el que algunas personas nacen. Es una capacidad que todos podemos desarrollar cuando tenemos el espacio para explorar, la curiosidad para cuestionar y el tiempo para hacer las cosas con intención.',
				'Por eso nos gusta trabajar cerca de las personas. Escuchar sus ideas, entender lo que quieren construir y descubrir juntos posibilidades que quizás todavía no habían imaginado.',
			],
			emphasis: [
				'Porque hacer algo bien importa.',
				'Pero hacer algo que tenga sentido, que conecte y que solo pudiera haber nacido de ese proceso, importa mucho más.',
			],
			closing:
				'Tangerine existe para seguir creando con curiosidad, con humanidad y con ganas de hacer cosas que valga la pena compartir.',
		},
		values: {
			kicker: 'Valores',
			title: 'Lo que guía cada decisión, grande o pequeña.',
			ariaLabel: 'Valores de Tangerine Studio',
			items: [
				{
					id: 'honesty',
					name: 'Honestidad',
					meaning: 'Decir lo que se piensa, incluso cuando cuesta, en el momento en que hace falta decirlo.',
				},
				{
					id: 'curiosity',
					name: 'Curiosidad',
					meaning: 'El impulso genuino de entender algo antes de opinar sobre eso.',
				},
				{
					id: 'empathy',
					name: 'Empatía',
					meaning: 'Diseñar para alguien real, no para un público abstracto ni para el propio gusto.',
				},
				{
					id: 'care',
					name: 'Cuidado',
					meaning: 'La atención puesta en cada decisión, sin importar cuántas se tomen a la vez.',
				},
				{
					id: 'courage',
					name: 'Coraje',
					meaning: 'Sostener una idea propia incluso cuando la opción segura sería más fácil de defender.',
				},
				{
					id: 'community',
					name: 'Comunidad',
					meaning: 'Entender que ningún resultado importante se construye completamente solo.',
				},
			],
		},
	},

	process: {
		steps: [
			{
				slug: 'discover',
				title: 'Descubrimos antes de diseñar',
				description:
					'Entendemos el problema real antes de proponer una sola pantalla: quién lo vive, por qué existe, qué se ha intentado antes.',
			},
			{
				slug: 'design',
				title: 'Diseñamos con intención',
				description: 'Cada decisión visual responde a una razón concreta. Si no podemos explicarla, no la usamos.',
			},
			{
				slug: 'build',
				title: 'Construimos en colaboración',
				description: 'El trabajo avanza junto a quien lo va a vivir después, no en aislamiento hasta el final.',
			},
			{
				slug: 'test',
				title: 'Probamos con usuarios',
				description:
					'Antes de dar algo por terminado, lo ponemos frente a personas reales y ajustamos con lo que vemos.',
			},
			{
				slug: 'iterate',
				title: 'Iteramos continuamente',
				description: 'Ninguna primera versión es la definitiva. Mejoramos con lo que aprendemos en el camino.',
			},
			{
				slug: 'deliver',
				title: 'Entregamos sistemas, no pantallas',
				description: 'Lo que dejamos atrás sigue funcionando sin nosotros: reglas y criterio, no un archivo cerrado.',
			},
		],
	},

	contact: {
		hero: {
			kicker: 'Contáctanos',
			breadcrumbCurrent: 'Contacto',
			title: 'Construyamos algo con criterio.',
			body: 'Antes de proponer una solución, queremos entender tu proyecto. Contanos qué estás construyendo y te respondemos con los próximos pasos, no con un formulario genérico.',
			cta: 'Completá el formulario',
		},
		sidebar: {
			responseTimeTitle: 'Tiempo de respuesta',
			responseTimeBody: 'Respondemos cada mensaje en menos de 24 horas hábiles.',
			responseTimeBadge: '< 24 horas hábiles',
			processTitle: 'Nuestro proceso',
			whyTitle: 'Por qué Tangerine',
			steps: [
				{ title: 'Conversación inicial', description: 'Escuchamos el proyecto antes de proponer nada.' },
				{ title: 'Propuesta a medida', description: 'Alcance, tiempos y presupuesto claros, por escrito.' },
				{ title: 'Kickoff', description: 'Arrancamos con el equipo completo, no con un solo diseñador.' },
				{ title: 'Entregas y seguimiento', description: 'Avances visibles, sin sorpresas al final.' },
			],
			benefits: [
				{ title: 'Un solo equipo, de principio a fin', icon: 'users' },
				{ title: 'Procesos claros, sin sorpresas', icon: 'shield' },
				{ title: 'Diseño con criterio, no solo estética', icon: 'lightbulb' },
			],
		},
		form: {
			sectionBasic: 'Información básica',
			nameLabel: 'Nombre',
			namePlaceholder: 'Tu nombre completo',
			nameError: 'Contanos cómo te llamás.',
			companyLabel: 'Empresa',
			companyPlaceholder: 'Nombre de tu empresa o proyecto',
			companyError: 'Este campo es obligatorio.',
			emailLabel: 'Correo electrónico',
			emailPlaceholder: 'Nombre@correo.com',
			emailErrorRequired: 'Necesitamos un correo para responderte.',
			emailErrorInvalid: 'Ese correo no parece válido.',
			phoneLabel: 'Teléfono',
			phonePlaceholder: '+57 300 1234567',
			phoneDescription: 'Opcional, útil si preferís que te escribamos por WhatsApp.',
			websiteLabel: 'Sitio web',
			websitePlaceholder: 'https://tuempresa.com',
			websiteDescription: 'Opcional.',
			linkedinLabel: 'LinkedIn',
			linkedinPlaceholder: 'https://linkedin.com/in/vos',
			linkedinDescription: 'Opcional, nos ayuda a conocerte antes de la primera llamada.',
			sectionProject: 'Tu proyecto',
			projectTypeLabel: '¿Qué tipo de proyecto es?',
			projectTypeError: 'Elegí la opción que más se acerque.',
			sectionBudget: 'Presupuesto y tiempos',
			budgetLabel: 'Presupuesto estimado',
			budgetTooltipAriaLabel: 'Por qué preguntamos esto',
			budgetTooltip: 'Nos ayuda a proponer el alcance correcto desde el principio.',
			budgetError: 'Elegí el rango más cercano, se puede ajustar después.',
			timelineLabel: 'Tiempo estimado',
			sectionMore: 'Contanos más',
			messageLabel: 'Contanos sobre tu proyecto',
			messagePlaceholder: '¿Qué problema estás tratando de resolver? ¿Qué existe hoy, si es que existe algo?',
			messageError: 'Contanos aunque sea un poco, con eso alcanza para empezar.',
			referralLabel: '¿Cómo nos conociste?',
			referralPlaceholder: 'Elegí una opción',
			acceptLabel: 'Acepto ser contactado por Tangerine Studio para conversar sobre este proyecto.',
			acceptError: 'Necesitamos tu autorización antes de escribirte.',
			submitCta: 'Demos el primer paso',
			submitError: 'No pudimos enviar tu mensaje. Probá de nuevo en un momento.',
			disclaimerNoCommitment: 'Sin compromiso: la primera conversación es siempre gratuita.',
			successThanksNamed: (name: string) => `Gracias, ${name}.`,
			successThanksGeneric: 'Gracias por escribirnos.',
			successBody:
				'Ya recibimos tu mensaje. Lo vamos a leer con calma y te respondemos en menos de 24 horas hábiles con los próximos pasos.',
			successCta: 'Enviar otro mensaje',
			projectTypeOptions: [
				{ value: 'branding', label: 'Branding e identidad', icon: 'palette' },
				{ value: 'landing', label: 'Landing page', icon: 'layout' },
				{ value: 'product', label: 'Producto digital', icon: 'smartphone' },
				{ value: 'design-system', label: 'Design system', icon: 'component' },
				{ value: 'ecommerce', label: 'E-commerce', icon: 'cart' },
				{ value: 'ux-ui', label: 'UX / UI', icon: 'pen' },
				{ value: 'other', label: 'Otro', icon: 'sparkles' },
			],
			budgetOptions: [
				{ value: '1-3m', label: '> $1.000.000 – $3.000.000 COP ', description: 'Proyecto acotado, alcance definido.' },
				{
					value: '3-8m',
					label: '$3.000.000 – $8.000.000 COP ',
					description: 'El rango más frecuente para un proyecto completo.',
				},
				{ value: '8-15m', label: '$8.000.000 – $15.000.000 COP ', description: 'Alcance amplio, varios entregables.' },
				{ value: '15m-plus', label: '< $15.000.000 COP ', description: 'Proyecto integral o de largo plazo.' },
				{
					value: 'not-sure',
					label: 'Aún no estoy seguro',
					description: 'Podemos definirlo juntos en la primera charla.',
				},
			],
			timelineOptions: [
				{ value: 'asap', label: 'Lo antes posible' },
				{ value: '1-month', label: 'En el próximo mes' },
				{ value: '2-3-months', label: 'En 2–3 meses' },
				{ value: 'flexible', label: 'Soy flexible con los tiempos' },
			],
			referralOptions: [
				{ value: 'instagram', label: 'Instagram' },
				{ value: 'linkedin', label: 'LinkedIn' },
				{ value: 'referral', label: 'Recomendación de alguien' },
				{ value: 'search', label: 'Google / búsqueda' },
				{ value: 'portfolio', label: 'Otro estudio o portfolio' },
				{ value: 'event', label: 'Un evento o charla' },
				{ value: 'other', label: 'Otro' },
			],
		},
		faq: {
			title: 'Preguntas frecuentes',
			items: [
				{
					question: '¿Cuánto tarda un proyecto?',
					answer:
						'Depende del alcance: una landing page puede tomar 2–3 semanas; un design system completo, varios meses. En la propuesta inicial definimos un cronograma real, no una estimación genérica.',
				},
				{
					question: '¿Cómo trabajan?',
					answer:
						'En ciclos cortos con entregas visibles: nunca desaparecemos varias semanas para volver con un resultado inesperado. Cada etapa tiene un punto de revisión antes de seguir a la siguiente.',
				},
				{
					question: '¿Cómo son los pagos?',
					answer:
						'Un anticipo para arrancar y el resto dividido en hitos asociados a entregables concretos: nunca 100% por adelantado, nunca 100% al final.',
				},
				{
					question: '¿Trabajan internacionalmente?',
					answer:
						'Sí, trabajamos de forma remota con clientes en distintas zonas horarias, coordinando horarios de sincronización que funcionen para ambos equipos.',
				},
			],
		},
	},

	portfolio: {
		breadcrumbHome: 'Home',
		gallery: {
			searchPlaceholder: 'Buscar proyectos…',
			allLabel: 'Todos',
			emptyTitle: 'Ningún proyecto coincide.',
			emptyDescription: 'Probá con otro término, o quitá el filtro de categoría activo.',
			clearFiltersLabel: 'Limpiar filtros',
			viewCaseStudyLabel: 'View Case Study',
		},
		featured: {
			exploreProjectLabel: 'Explore Project',
		},
		timeline: {
			kicker: 'Timeline',
			title: 'Proyectos por año',
		},
	},

	caseStudy: {
		breadcrumbHome: 'Home',
		breadcrumbWork: 'Work',
		servicesLabel: 'Servicios',
		durationLabel: 'Duración',
		visitProjectCta: 'Visitar el proyecto',
		objectives: { eyebrow: 'Objetivos', title: 'Lo que este proyecto tenía que lograr' },
		process: { eyebrow: 'Cómo trabajamos', title: 'Proceso' },
		research: { eyebrow: 'Research', title: 'Lo que encontramos' },
		principles: { eyebrow: 'Design Principles', title: 'Los principios que guiaron cada decisión' },
		visualIdentity: { eyebrow: 'Visual Identity', title: 'El sistema visual' },
		gallery: { eyebrow: 'Gallery', title: 'El trabajo, a resolución real' },
		mockups: {
			eyebrow: 'Aplicaciones',
			title: 'El sistema, en contexto real',
			labels: {
				desktop: 'Desktop',
				tablet: 'Tablet',
				mobile: 'Mobile',
				branding: 'Tarjeta',
				merch: 'Merch',
				packaging: 'Packaging',
			},
		},
		components: { eyebrow: 'Components', title: 'Las mismas piezas, en producción' },
		beforeAfter: { eyebrow: 'Before / After', title: 'Lo que cambió' },
		impact: { eyebrow: 'Impact', title: 'El resultado, en números' },
		learnings: { eyebrow: 'Learnings', title: 'Qué aprendimos' },
		liveSiteEyebrow: 'Sitio web en producción',
		liveSiteCta: 'Explora el sitio en vivo',
		nextProjectCta: 'Ver más',
	},

	notFound: {
		title: 'Esta página se perdió. Nosotros ya encontramos el camino.',
		body: 'Puede que el link esté roto, o quizás buscabas algo que todavía no existe. Mientras tanto, hay bastante para explorar por acá.',
		mascotAriaLabel: 'Mascota de Tangerine Studio, hacé clic para un pequeño saludo',
		mascotAlt: 'Mascota de Tangerine Studio',
		ctas: {
			home: 'Volver al inicio',
			work: 'Ver el trabajo',
			studio: 'Conocer el estudio',
		},
	},
};

export type Dictionary = typeof es;
