import { JWT } from "google-auth-library";

// Helper para escribir una fila en la hoja de leads. Mismas variables de
// entorno que lib/actions/append-lead-to-sheet.ts (formulario de contacto),
// que se dejó intacto a propósito. Este archivo NO es "use server": se importa
// solo desde otros módulos del servidor, así que no queda expuesto al navegador.
//
// Por qué no usa `values:append`: la API de "append" adivina dónde empieza la
// tabla y, en esta hoja, ya desplazó filas a la derecha (las filas 2–3 de
// contacto quedaron desde la columna F). Acá se lee cuántas filas hay y se
// escribe explícitamente en A{n}:{última columna}{n}, siempre desde la A.

const LAST_COLUMN = "L";

async function getAccessToken() {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!serviceAccountEmail || !privateKey) {
    throw new Error("Google Sheets no está configurado — faltan GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.");
  }
  const auth = new JWT({
    email: serviceAccountEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const { access_token: accessToken } = await auth.authorize();
  if (!accessToken) throw new Error("Google no devolvió un token de acceso.");
  return accessToken;
}

export async function appendRowToSheet(sheet: string, row: string[]): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID;
  if (!sheetId) throw new Error("Google Sheets no está configurado — falta GOOGLE_SHEET_ID.");
  if (row.length > 12) throw new Error(`La fila tiene más columnas que A:${LAST_COLUMN}.`);

  const accessToken = await getAccessToken();
  const base = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values`;
  const headers = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

  const current = await fetch(`${base}/${encodeURIComponent(`${sheet}!A:${LAST_COLUMN}`)}`, { headers });
  if (!current.ok) throw new Error(`Google Sheets respondió ${current.status}: ${await current.text()}`);
  const nextRow = (((await current.json()) as { values?: unknown[] }).values?.length ?? 0) + 1;

  const range = `${sheet}!A${nextRow}:${LAST_COLUMN}${nextRow}`;
  const response = await fetch(`${base}/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ values: [row] }),
  });
  if (!response.ok) {
    throw new Error(`Google Sheets respondió ${response.status}: ${await response.text()}`);
  }
}
