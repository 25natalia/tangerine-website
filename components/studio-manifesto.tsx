'use client';

import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Reveal } from '@/components/templates/reveal';
import { FloatingElement } from '@/components/marketing/floating-element';

const kicker = 'font-display text-sm font-semibold tracking-wide text-(--text-brand) uppercase';

/**
 * Manifiesto — Volumen I, §06, condensado a su arco esencial (apertura →
 * tesis → dos líneas de énfasis que el propio texto ya destacaba
 * tipográficamente). Cada frase es una cita literal; se redujo cuántas se
 * incluyen, no se reescribió ninguna — sin cambios de contenido esta ronda,
 * solo se le agregó el marco visual.
 *
 * Las 4 ilustraciones son `FloatingElement` (mismo componente que ya usa el
 * Cierre del Home) — mismo mecanismo: reposo con loop ambiental, y un
 * desplazamiento con resorte al pasar el cursor cerca, "como si fueran
 * piezas físicas livianas". Posicionadas relativas al mismo wrapper
 * `max-w-2xl` que envuelve el texto (no la sección completa) y sin
 * z-index — un `position:relative` sin z explícito ya pinta después de los
 * hermanos `absolute z-0` anteriores en el DOM, mismo resultado visual sin
 * arriesgar colisión con el z-index reservado de la Navbar.
 */
export function StudioManifesto() {
	return (
		<section className='relative overflow-hidden'>
			<Container size='content' className='py-20 sm:py-28'>
				<div className='relative mx-auto max-w-2xl'>
					<FloatingElement
						className='absolute -top-10 -left-14 z-0 hidden w-9 sm:block sm:w-11'
						floatY={9}
						floatDuration={5}
						floatRotate={7}
						repelStrength={1.1}
					>
						<Image
							src='/illustrations/deco/star-yellow.svg'
							alt=''
							width={130}
							height={130}
							className='h-auto w-full'
						/>
					</FloatingElement>

					<FloatingElement
						className='absolute top-1/3 -right-16 z-0 hidden w-7 lg:block'
						floatY={11}
						floatDuration={4.5}
						floatRotate={-9}
						repelStrength={1.2}
					>
						<Image
							src='/illustrations/geometry/flor-orange.svg'
							alt=''
							width={153}
							height={160}
							className='h-auto w-full'
						/>
					</FloatingElement>

					<FloatingElement
						className='absolute bottom-6 -left-10 z-0 hidden w-8 sm:block'
						floatY={8}
						floatDuration={6}
						floatRotate={5}
						repelStrength={1}
					>
						<Image
							src='/illustrations/geometry/hoja-lime.svg'
							alt=''
							width={130}
							height={123}
							className='h-auto w-full'
						/>
					</FloatingElement>

					<FloatingElement
						className='absolute -bottom-8 right-0 z-0 hidden w-6 lg:block'
						floatY={10}
						floatDuration={4}
						floatRotate={-11}
						repelStrength={1.3}
					>
						<Image
							src='/illustrations/geometry/semillas-violet.svg'
							alt=''
							width={174}
							height={174}
							className='h-auto w-full'
						/>
					</FloatingElement>

					<Reveal className='relative flex flex-col gap-6'>
						<p className={kicker}>Manifiesto</p>
						<p className='font-display text-xl leading-snug font-semibold text-balance sm:text-2xl'>
							Hubo un tiempo, para cada persona que existe, en el que crear no pedía permiso.
						</p>
						<div className='font-reading flex flex-col gap-5 text-pretty text-(--text-secondary)'>
							<p>
								Tangerine no cree que la creatividad sea un talento reservado para pocos. Cree que es una memoria
								compartida por todos, y que el trabajo de un lugar como este consiste, antes que nada, en ayudar a
								recordarla.
							</p>
							<p className='font-display text-lg font-semibold text-(--text-primary)'>
								Construyamos algo que solo pueda existir contigo.{' '}
							</p>
							<p className='text-(--text-primary)'>
								Este es el punto exacto donde termina la reflexión y empieza el trabajo.
							</p>
						</div>
					</Reveal>
				</div>
			</Container>
		</section>
	);
}
