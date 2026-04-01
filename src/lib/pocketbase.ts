import PocketBase from 'pocketbase';

const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'https://eveline-dublan.pockethost.io';

const pb = new PocketBase(PB_URL);

// Desactivar auto-cancelación para evitar problemas con React
pb.autoCancellation(false);

export default pb;
