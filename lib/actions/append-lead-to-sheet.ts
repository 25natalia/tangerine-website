'use server';

import { JWT } from 'google-auth-library';

// Registro estructurado de leads, independiente del envío de correo —
// "no quiero almacenar datos únicamente por correo". Usa la API REST de
// Google Sheets directamente (un solo `fetch`, autenticado con
// `google-auth-library`) en vez de la librería `googleapis` completa: acá
// solo hace falta `spreadsheets.values.append`, así que traer el SDK entero
// sería una dependencia mucho más pesada de lo que este único endpoint
// necesita.
//
// Requiere una Service Account de Google Cloud con la Sheets API habilitada,
// compartida como Editor sobre la hoja de destino — no OAuth de usuario,
// porque este envío corre en el servidor sin que haya un usuario logueado
// que pueda autorizar nada. Setup completo en README del repo /
// DESIGN_SYSTEM_SYNC.md.
export interface Lead {
	date: string;
	name: string;
	company: string;
	email: string;
	phone: string;
	budget: string;
	message: string;
	pageUrl: string;
	utm: string;
}

const SHEET_RANGE = 'Leads!A:I';

/**
 * Nunca finge éxito sin las credenciales — mismo criterio que
 * `sendContactEmail` con `RESEND_API_KEY`. El caller decide si esto debe
 * bloquear el envío completo o solo registrarse como un fallo parcial.
 */
export async function appendLeadToSheet(lead: Lead): Promise<void> {
	const sheetId = process.env.GOOGLE_SHEET_ID;
	const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
	// Las claves privadas de Google vienen con saltos de línea reales; la
	// mayoría de plataformas de hosting solo aceptan env vars de una sola
	// línea, así que se guardan con "\n" literal y se revierte acá.
	const rawPrivateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
	const privateKey = rawPrivateKey?.replace(/\\n/g, '\n');

	if (!sheetId || !serviceAccountEmail || !privateKey) {
		throw new Error(
			'Google Sheets no está configurado — faltan GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY en el entorno.',
		);
	}

	const auth = new JWT({
		email: serviceAccountEmail,
		key: privateKey,
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	});
	const { access_token: accessToken } = await auth.authorize();

	const row = [
		lead.date,
		lead.name,
		lead.company,
		lead.email,
		lead.phone,
		lead.budget,
		lead.message,
		lead.pageUrl,
		lead.utm,
	];

	const response = await fetch(
		`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(SHEET_RANGE)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
		{
			method: 'POST',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ values: [row] }),
		},
	);

	if (!response.ok) {
		const body = await response.text();
		throw new Error(`Google Sheets respondió ${response.status}: ${body}`);
	}
}
