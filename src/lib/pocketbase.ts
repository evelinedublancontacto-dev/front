import PocketBase from 'pocketbase';

// Cambia esta URL cuando tengas tu instancia de PocketBase desplegada
const PB_URL = import.meta.env.VITE_POCKETBASE_URL || 'http://127.0.0.1:8090';

const pb = new PocketBase(PB_URL);

// Desactivar auto-cancelación para evitar problemas con React
pb.autoCancellation(false);

export default pb;
