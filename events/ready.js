const { detectarCambioDJ } = require('../utils/azuracast');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    const canalTexto = client.channels.cache.find(c => c.name === 'dj_actual' && c.isTextBased());
    if (!canalTexto) {
      console.warn('⚠️ Canal #dj_actual no encontrado.');
      return;
    }

    setInterval(async () => {
      const cambio = await detectarCambioDJ();
      if (cambio) {
        canalTexto.send(`🎙️ ¡Nuevo DJ en vivo! **${cambio.nuevo}** reemplaza a **${cambio.anterior || 'nadie'}**`);
      }
    }, 60000); // cada 60 segundos
  }
};
