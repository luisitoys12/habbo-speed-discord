const { detectarCambioDJ } = require('../utils/azuracast');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    // Esperar a que la caché de canales esté lista
    await client.guilds.fetch();

    // Buscar el canal llamado "dj_actual"
    const canalTexto = client.channels.cache.find(
      c => c.name === 'dj_actual' && c.isTextBased()
    );

    if (!canalTexto) {
      console.warn('⚠️ Canal #dj_actual no encontrado. Verifica el nombre en Discord.');
      return;
    }

    // Iniciar el sistema automático de detección de DJ
    setInterval(async () => {
      try {
        const cambio = await detectarCambioDJ();
        if (cambio) {
          await canalTexto.send({
            content: `🎙️ **Nuevo DJ en vivo:** ${cambio.nuevo}\n📻 Reemplazando a: ${cambio.anterior || 'ninguno'}`,
          });
        }
      } catch (err) {
        console.error('❌ Error en el sistema automático de DJ:', err);
      }
    }, 60000); // cada 60 segundos
  }
};
