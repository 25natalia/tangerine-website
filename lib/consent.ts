// Clave de localStorage con la elección del aviso de cookies. Vive fuera de
// components/cookie-consent.tsx ("use client") porque el layout raíz (servidor)
// la necesita como string real para el script de Consent Mode.
export const CONSENT_KEY = "tangerine-cookie-consent";
