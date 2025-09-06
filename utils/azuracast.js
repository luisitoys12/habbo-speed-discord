const fetch = require('node-fetch');
const { azuracast_url } = require('../config.json');

let ultimoDJ = null;

async function getNowPlaying() {
  try {
    const res = await fetch(azuracast_url);
    const data = await res.json();
    return data.now_playing.song.artist || 'Desconocido';
  } catch (err) {
    console.error('Error al consultar AzuraCast:', err);
    return null;
  }
}

async function detectarCambioDJ() {
  const djActual = await getNowPlaying();
  if (!djActual || djActual === ultimoDJ) return null;

  const cambio = { anterior: ultimoDJ, nuevo: djActual };
  ultimoDJ = djActual;
  return cambio;
}

module.exports = { detectarCambioDJ };
