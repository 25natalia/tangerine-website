'use server';

import { Resend } from 'resend';
import { budgetOptions } from '@/lib/templates/contact-data';
import { appendLeadToSheet } from '@/lib/actions/append-lead-to-sheet';

const CONTACT_INBOX = process.env.CONTACT_INBOX ?? 'tangerinestudio.col@gmail.com';

function getField(data: FormData, key: string): string {
	return String(data.get(key) ?? '').trim();
}

/** Extrae utm_* de la URL completa que el cliente adjuntó (ver site-contact-form.tsx). */
function extractUtm(pageUrl: string): Record<string, string> {
	try {
		const url = new URL(pageUrl);
		const utm: Record<string, string> = {};
		for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
			const value = url.searchParams.get(key);
			if (value) utm[key] = value;
		}
		return utm;
	} catch {
		return {};
	}
}

/**
 * Server Action real — no simulada. Requiere RESEND_API_KEY en el entorno;
 * sin esa variable, falla explícitamente (nunca finge éxito) para que
 * ContactForm muestre su estado de error real en vez de una confirmación
 * falsa. Ver DESIGN_SYSTEM_SYNC.md para el porqué de esta arquitectura.
 *
 * Envía el correo Y registra el lead en Google Sheets en paralelo
 * (`Promise.allSettled`, no secuencial — uno no debería esperar al otro
 * para saber si falló). Cada canal es independiente: si uno de los dos
 * falla, el otro igual se intenta y el envío se considera exitoso mientras
 * al menos uno haya funcionado — "no quiero almacenar datos únicamente por
 * correo" corta en las dos direcciones, ni el correo depende de la hoja ni
 * la hoja depende del correo. Solo si ambos fallan, el visitante ve el
 * estado de error real.
 */
export async function sendContactEmail(data: FormData): Promise<void> {
	const name = getField(data, 'name');
	const company = getField(data, 'company');
	const email = getField(data, 'email');
	const phone = getField(data, 'phone');
	const website = getField(data, 'website');
	const linkedin = getField(data, 'linkedin');
	const projectType = getField(data, 'projectType');
	const budget = getField(data, 'budget');
	const budgetLabel = budgetOptions.find((o) => o.value === budget)?.label ?? budget;
	const timeline = getField(data, 'timeline');
	const message = getField(data, 'message');
	const referral = getField(data, 'referral');

	// Captura de origen — adjuntada por site-contact-form.tsx, no por un
	// script de terceros. Ver Volumen de arquitectura §12 (Analytics).
	const referrer = getField(data, '_referrer');
	const pageUrl = getField(data, '_page');
	const utm = pageUrl ? extractUtm(pageUrl) : {};
	const utmText = Object.entries(utm)
		.map(([key, value]) => `${key}=${value}`)
		.join(', ');

	if (!name || !email || !message) {
		throw new Error('Faltan campos obligatorios.');
	}

	const [emailResult, sheetResult] = await Promise.allSettled([
		sendEmail({
			name,
			company,
			email,
			phone,
			website,
			linkedin,
			projectType,
			budgetLabel,
			timeline,
			message,
			referral,
			referrer,
			pageUrl,
			utm,
		}),
		appendLeadToSheet({
			date: new Date().toISOString(),
			name,
			company,
			email,
			phone,
			budget: budgetLabel,
			message,
			pageUrl,
			utm: utmText,
		}),
	]);

	if (emailResult.status === 'rejected') {
		console.error('sendContactEmail: no se pudo enviar el correo.', emailResult.reason);
	}
	if (sheetResult.status === 'rejected') {
		console.error('sendContactEmail: no se pudo registrar el lead en Google Sheets.', sheetResult.reason);
	}

	// Ambos canales fallaron — ahí sí es un fallo real que el visitante debe
	// ver (ContactForm cae a su estado de error y conserva lo que escribió).
	if (emailResult.status === 'rejected' && sheetResult.status === 'rejected') {
		throw emailResult.reason instanceof Error ? emailResult.reason : new Error('No pudimos registrar tu mensaje.');
	}
}

async function sendEmail(fields: {
	name: string;
	company: string;
	email: string;
	phone: string;
	website: string;
	linkedin: string;
	projectType: string;
	budgetLabel: string;
	timeline: string;
	message: string;
	referral: string;
	referrer: string;
	pageUrl: string;
	utm: Record<string, string>;
}): Promise<void> {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error('El envío de correo no está configurado — falta RESEND_API_KEY en el entorno.');
	}

	const resend = new Resend(apiKey);

	const lines = [
		`Nombre: ${fields.name}`,
		`Empresa: ${fields.company || '—'}`,
		`Email: ${fields.email}`,
		fields.phone ? `Teléfono: ${fields.phone}` : null,
		fields.website ? `Sitio web: ${fields.website}` : null,
		fields.linkedin ? `LinkedIn: ${fields.linkedin}` : null,
		`Tipo de proyecto: ${fields.projectType || '—'}`,
		`Presupuesto: ${fields.budgetLabel || '—'}`,
		fields.timeline ? `Tiempo estimado: ${fields.timeline}` : null,
		fields.referral ? `Cómo nos conoció: ${fields.referral}` : null,
		'',
		'Mensaje:',
		fields.message,
		'',
		'— Origen —',
		fields.referrer ? `Referrer: ${fields.referrer}` : null,
		fields.pageUrl ? `Página: ${fields.pageUrl}` : null,
		...Object.entries(fields.utm).map(([key, value]) => `${key}: ${value}`),
	].filter((line): line is string => line !== null);

	const { error } = await resend.emails.send({
		// Remitente de sandbox de Resend — reemplazar por una dirección del
		// dominio propio (ej. "Tangerine Studio <hola@tangerine.studio>") una
		// vez que tangerine.studio esté verificado en la cuenta de Resend.
		from: 'Tangerine Studio <onboarding@resend.dev>',
		to: CONTACT_INBOX,
		replyTo: fields.email,
		subject: `Nuevo contacto — ${fields.company || fields.name}`,
		text: lines.join('\n'),
	});

	if (error) {
		throw new Error(error.message);
	}
}
