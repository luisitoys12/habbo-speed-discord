const fetch = require('node-fetch');
const config = require('../config.json');

async function getDJEnVivo() {
  const res = await fetch(config.azuracast_url, {
    headers: { Authorization: `Bearer ${config.azuracast_token}` }
  });
  const data = await res.json();

  const dj = data.live.is_live ? data.live.streamer_name : 'AutoDJ';
  const programa = data.now_playing.song.title;

  return `🎧 **En vivo ahora:** ${dj} — *${programa}*`;
}

module.exports = { getDJEnVivo };
