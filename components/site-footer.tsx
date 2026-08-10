'use client';

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
import { useLanguage } from '@/lib/i18n/language-context';

// Las 7 capacidades reales del estudio (Brand OS, Volumen IV) — no una lista
// de servicios genérica. Ya están en inglés en la copia en español del
// sitio, así que no cambian entre idiomas.
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
	const { t } = useLanguage();
	const navLabel = (href: string) => t.nav.links.find((link) => link.href === href)?.label ?? href;

	return (
		<Footer variant='creative'>
			<FooterTicker items={capabilities} />

			<div className='mt-16 grid gap-12 lg:grid-cols-[auto_1fr]'>
				<div className='flex flex-col items-start gap-6'>
					<FooterMascotShowcase />
					<FooterMessage>{t.footer.message}</FooterMessage>
				</div>

				<div className='grid grid-cols-2 gap-8 sm:grid-cols-3'>
					<FooterLinkGroup title={t.footer.groups.studio}>
						<FooterLink href='/studio'>{navLabel('/studio')}</FooterLink>
					</FooterLinkGroup>
					<FooterLinkGroup title={t.footer.groups.work}>
						<FooterLink href='/work'>{navLabel('/work')}</FooterLink>
						<FooterLink href='/contact'>{navLabel('/contact')}</FooterLink>
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
				<span>{t.footer.legal}</span>
			</FooterLegal>
		</Footer>
	);
}
