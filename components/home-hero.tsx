'use client';

import * as React from 'react';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { buttonVariants } from '@/components/ui/button';
import { MascotStage } from '@/components/marketing/mascot-stage';
import { CursorTrail } from '@/components/marketing/cursor-trail';
import { FloatingElement } from '@/components/marketing/floating-element';
import { usePrefersReducedMotion } from '@/lib/use-prefers-reduced-motion';
import { useLanguage } from '@/lib/i18n/language-context';
import { cn } from '@/lib/utils';

const EASE = [0.22, 1, 0.36, 1] as const;

// El mismo rango de acento que MascotStage usaba para su propio sparkle
// acotado al mascot — acá cubre todo el Hero, así que vive en este archivo
// en vez de importarse de allá.
const HERO_PARTICLE_COLORS = ['var(--purple-400)', 'var(--tangerine-400)', 'var(--lime-400)', 'var(--info-400)'];

const fadeUp: Variants = {
	hidden: { opacity: 0, y: 18 },
	show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Un poco más grandes que el size="lg" habitual (h-11) — este hero es el
// único lugar de la web donde el CTA necesita "más presencia, más aire"
// que el resto del sitio; el mismo ajuste puntual que el propio DS aplica
// en su Home Hero (ver components/marketing/home-hero.tsx allá).
const heroCtaSize = 'h-12 px-6 text-base sm:h-14 sm:px-8 sm:text-lg';

function PrimaryCTA({ href, children }: { href: string; children: ReactNode }) {
	return (
		<motion.div className='inline-block' whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.97 }}>
			<Link
				href={href}
				className={cn(
					buttonVariants({ size: 'lg' }),
					heroCtaSize,
					'group/cta gap-2 shadow-(--shadow-elevation-2) transition-shadow duration-(--duration-base) hover:shadow-(--shadow-elevation-4)',
				)}
			>
				{children}
				<ArrowRight
					className='size-4 transition-transform duration-(--duration-base) ease-(--ease-standard) group-hover/cta:translate-x-1'
					aria-hidden='true'
				/>
			</Link>
		</motion.div>
	);
}

function SecondaryCTA({ href, children }: { href: string; children: ReactNode }) {
	return (
		<motion.div className='inline-block' whileHover={{ y: -2 }} whileTap={{ y: 0, scale: 0.97 }}>
			<Link href={href} className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), heroCtaSize)}>
				{children}
			</Link>
		</motion.div>
	);
}

export function HomeHero() {
	const reduceMotion = usePrefersReducedMotion();
	const sectionRef = React.useRef<HTMLElement>(null);
	const { t } = useLanguage();
	const copy = t.home.hero;

	return (
		<section ref={sectionRef} className='relative overflow-hidden'>
			<CursorTrail
				targetRef={sectionRef}
				colors={HERO_PARTICLE_COLORS}
				size={[4, 16]}
				blurPx={1}
				lifetimeMs={[1200, 2400]}
				spawnIntervalMs={35}
				organic
			/>

			<Container
				size='wide'
				className='relative grid items-center gap-y-14 pt-10 pb-24 sm:pt-14 sm:pb-28 lg:pt-20 lg:pb-32 md:grid-cols-[1fr_1.1fr] md:gap-x-10 lg:gap-x-16'
			>
				<motion.div
					initial={reduceMotion ? false : 'hidden'}
					animate='show'
					transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
					className='flex flex-col items-start text-left'
				>
					{/* Eyebrow — un pequeño saludo, chico y sin emoji. Mismo tratamiento
					   que cualquier otro eyebrow del sitio (POR QUÉ EXISTE, FILOSOFÍA…),
					   sin micro-interacción propia: no compite por atención con el H1. */}
					<motion.div variants={fadeUp}>
						<p className='font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase'>
							{copy.eyebrow}
						</p>
					</motion.div>

					<motion.div variants={fadeUp} className='mt-6'>
						<h1 className='font-display text-4xl leading-[1.08] font-bold text-balance sm:text-5xl lg:text-6xl'>
							{copy.title}
						</h1>
					</motion.div>

					<motion.div variants={fadeUp} className='mt-6'>
						<p className='text-body-lg max-w-xl text-pretty text-(--text-secondary)'>
							{copy.subtitle}
						</p>
					</motion.div>

					{/* Supporting copy — un escalón por debajo del subtítulo a
					   propósito (`text-body-sm` en vez de heredar el tamaño base):
					   la jerarquía debe leerse H1 → subtítulo → esta línea, no
					   competir con la segunda. */}
					<motion.div variants={fadeUp} className='mt-3'>
						<p className='text-body-sm max-w-xl text-pretty text-(--text-secondary)'>{copy.body}</p>
					</motion.div>

					<motion.div variants={fadeUp} className='mt-10'>
						<div className='flex flex-col gap-3 sm:flex-row'>
							<PrimaryCTA href='#que-creamos'>{copy.primaryCta}</PrimaryCTA>
							<SecondaryCTA href='/contact'>{copy.secondaryCta}</SecondaryCTA>
						</div>
					</motion.div>
				</motion.div>

				<motion.div
					initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
					className='relative flex justify-center md:justify-end'
				>
					{/* Bento reorganizado: mismas 6 geometrías de siempre, más grandes y
					   más cerca de la mascota — un anillo con relación real al centro
					   de la composición en vez de puntos sueltos en las esquinas de
					   un espacio vacío. Arrancan en `lg:` (antes `xl:`), así que un
					   laptop común (1024-1279px) ya no se queda sin ninguna. Dos
					   piezas más chicas y más internas (semillas-orange, leaf) se
					   suman recién en `xl:`, donde hay aire de sobra para sostener
					   seis en vez de cuatro sin sentirse apretado.

					   Paleta rebalanceada — antes 3 de las 6 usaban violeta; ahora
					   quedan solo 2 (lima/naranja/violeta/verde: 2/2/1/1), y ninguna
					   comparte color con la más cercana. `star-violet` → `star-green`
					   y `leaf-violet` → `leaf-lime` son el mismo asset shape, solo
					   la variante de color que ya existe en `public/illustrations/`
					   (nunca un archivo nuevo).

					   `hoverScale` (nuevo prop opcional de FloatingElement, off por
					   default en cualquier otro uso del componente en el sitio) le
					   suma un leve scale-up al hover — encima del repel-desde-cursor
					   que estas piezas ya tenían. Cada una con un valor propio
					   (1.12-1.2) para que el gesto no se sienta idéntico entre todas.

					   `hoja-orange`, `destello-violet` y `leaf-lime` llevan `z-[1]` en
					   vez del `z-0` de las otras tres: sus posiciones caen dentro del
					   bounding box de la propia mascota, que se renderiza después en
					   el DOM sin z-index explícito — sin este bump, la mascota gana el
					   hit-test en esa zona y bloquea el mousemove/hover antes de que
					   llegue a la geometría de abajo (confirmado con
					   `elementFromPoint`). No mueve nada de posición, solo gana la
					   prioridad de puntero ahí donde se superponen. */}
					<FloatingElement
						className='absolute top-[10%] left-[10%] z-0 hidden w-10 lg:block xl:w-12'
						floatY={9}
						floatDuration={5.5}
						floatRotate={5}
						repelStrength={1}
						hoverScale={1.15}
					>
						<Image
							src='/illustrations/geometry/flor-lime.svg'
							alt=''
							width={153}
							height={160}
							className='h-auto w-full'
						/>
					</FloatingElement>
					<FloatingElement
						className='absolute bottom-[12%] left-[2%] z-0 hidden w-8 lg:block xl:w-9'
						floatY={11}
						floatDuration={4.5}
						floatRotate={-8}
						repelStrength={1.2}
						hoverScale={1.2}
					>
						<Image
							src='/illustrations/deco/star-green.svg'
							alt=''
							width={130}
							height={130}
							className='h-auto w-full'
						/>
					</FloatingElement>
					<FloatingElement
						className='absolute top-[6%] right-[4%] z-[1] hidden w-9 lg:block xl:w-11'
						floatY={10}
						floatDuration={5}
						floatRotate={7}
						repelStrength={1}
						hoverScale={1.12}
					>
						<Image
							src='/illustrations/geometry/hoja-orange.svg'
							alt=''
							width={130}
							height={123}
							className='h-auto w-full'
						/>
					</FloatingElement>
					<FloatingElement
						className='absolute right-[12%] bottom-[6%] z-[1] hidden w-8 lg:block xl:w-10'
						floatY={8}
						floatDuration={6}
						floatRotate={-6}
						repelStrength={1.1}
						hoverScale={1.18}
					>
						<Image
							src='/illustrations/geometry/destello-violet.svg'
							alt=''
							width={180}
							height={180}
							className='h-auto w-full'
						/>
					</FloatingElement>
					<FloatingElement
						className='absolute top-[32%] left-0 z-0 hidden w-5 xl:block'
						floatY={7}
						floatDuration={4.8}
						floatRotate={10}
						repelStrength={1.3}
						hoverScale={1.2}
					>
						<Image
							src='/illustrations/geometry/semillas-orange.svg'
							alt=''
							width={174}
							height={174}
							className='h-auto w-full'
						/>
					</FloatingElement>
					<FloatingElement
						className='absolute bottom-[2%] left-[32%] z-[1] hidden w-6 xl:block'
						floatY={9}
						floatDuration={5.2}
						floatRotate={-9}
						repelStrength={1.2}
						hoverScale={1.2}
					>
						<Image
							src='/illustrations/geometry/leaf-lime.svg'
							alt=''
							width={80}
							height={80}
							className='h-auto w-full'
						/>
					</FloatingElement>

					<MascotStage size='lg' glow={false} />
				</motion.div>
			</Container>

			{/* Indicador de scroll — ahora clickeable: hunde a la sección
			   siguiente (`nextElementSibling` del propio `<section>` del Hero,
			   sea cual sea — no depende de un id fijo en HomeWhyExists ni de
			   ninguna otra sección, así que sigue funcionando aunque cambie el
			   orden de secciones del Home). Centrado sobre todo el ancho de la
			   sección para no depender de en cuál de las dos columnas caiga.
			   Vive fuera del Container así no hereda su padding horizontal y
			   puede centrarse con `inset-x-0`. Sin z-index explícito a
			   propósito — Tailwind's z-10 coincide con el `--z-sticky` (10)
			   reservado del Navbar; al ser el último hijo de la sección ya pinta
			   después de todo lo anterior en el mismo nivel, sin arriesgar esa
			   colisión. El texto visible ("Scroll") es el nombre accesible del
			   botón — el ícono de abajo queda aria-hidden por ser puramente
			   decorativo. El mismo loop chico (traslado + vuelta) que ya usan
			   otras piezas del sitio, mucho más sutil que el float de las
			   geometrías (5px, no 8-11px) para que se lea como una sugerencia,
			   no como un elemento más compitiendo por atención — sin `whileHover`/
			   `whileTap` de Framer acá a propósito, para no pelear con ese mismo
			   loop de `animate` sobre la misma `y`; el affordance de hover es
			   CSS puro (`hover:opacity-70`). */}
			<motion.button
				type='button'
				onClick={() => sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
				className='absolute inset-x-0 bottom-4 flex cursor-pointer flex-col items-center gap-1 opacity-100 transition-opacity duration-(--duration-base) hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--border-focus) sm:bottom-6'
				animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
				transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
			>
				<span className='font-display text-[10px] font-semibold tracking-wider text-(--text-tertiary) uppercase'>
					{t.common.scroll}
				</span>
				<ChevronDown className='size-4 text-(--text-tertiary)' aria-hidden='true' />
			</motion.button>
		</section>
	);
}
