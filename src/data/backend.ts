// Base URL of the EyeCheck backend. Set PUBLIC_BACKEND_URL in the build environment (see .env.example);
// the fallback is the production backend so a build without it still works.
export const BACKEND_URL: string = import.meta.env.PUBLIC_BACKEND_URL || 'https://monkfish-app-lnjjx.ondigitalocean.app';
