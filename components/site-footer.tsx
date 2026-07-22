import {
	Footer,
	FooterMascotShowcase,
	FooterMessage,
	FooterLinkGroup,
	FooterLink,
	FooterSocialLinks,
	FooterSocialLink,
	FooterTicker,
	FooterLegal,
} from '@/components/ui/footer';

// Las 7 capacidades reales del estudio (Brand OS, Volumen IV) — no una lista
// de servicios genérica.
const capabilities = [
	'Brand Systems',
	'Digital Experiences',
	'Product Design',
	'Creative Direction',
	'Content Systems',
	'Growth',
	'Automation',
];

export function SiteFooter() {
	return (
		<Footer variant='creative'>
			<FooterTicker items={capabilities} />

			<div className='mt-16 grid gap-12 lg:grid-cols-[auto_1fr]'>
				<div className='flex flex-col items-start gap-6'>
					<FooterMascotShowcase />
					<FooterMessage>Construyamos algo que solo pueda existir contigo. </FooterMessage>
				</div>

				<div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
					<FooterLinkGroup title='Estudio'>
						<FooterLink href='/studio'>Studio</FooterLink>
						<FooterLink href='/capabilities'>Capabilities</FooterLink>
					</FooterLinkGroup>
					<FooterLinkGroup title='Trabajo'>
						<FooterLink href='/work'>Work</FooterLink>
						<FooterLink href='/contact'>Contact</FooterLink>
					</FooterLinkGroup>
				</div>
			</div>

			{/*
        TODO (bloqueante antes de publicar, no antes de seguir desarrollando):
        Instagram/LinkedIn/Behance siguen en "#" — el propio README del
        Footer en el DS lo marca como lo que este componente existe para
        evitar. Reemplazar con las cuentas reales de Tangerine Studio;
        no son un dato que se pueda inventar acá.
      */}
			<FooterSocialLinks className='mt-12'>
				<FooterSocialLink label='Instagram' href='#' monogram='IG' />
				<FooterSocialLink label='LinkedIn' href='#' monogram='in' />
				<FooterSocialLink label='Behance' href='#' monogram='Bē' />
				<FooterSocialLink label='Email' href='mailto:hola@tangerine.studio' monogram='@' />
			</FooterSocialLinks>

			<FooterLegal className='mt-10'>
				<span>© {new Date().getFullYear()} Tangerine Studio.</span>
				<span>No vendemos diseño, construimos identidad.</span>
			</FooterLegal>
		</Footer>
	);
}
