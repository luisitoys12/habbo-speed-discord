const { detectarCambioDJ } = require('../utils/azuracast');
const fetch = require('node-fetch');
const { cms_agenda_url } = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    // Esperar a que la caché esté lista
    await client.guilds.fetch();

    // Buscar canal llamado "dj_actual"
    const canalTexto = client.channels.cache.find(
      c => c.name === 'dj_actual' && c.isTextBased()
    );

    if (!canalTexto) {
      console.warn('⚠️ Canal #dj_actual no encontrado.');
      return;
    }

    // Iniciar monitoreo de DJ cada minuto
    setInterval(async () => {
      try {
        const cambio = await detectarCambioDJ();
        if (!cambio) return;

        // Consultar perfil del nuevo DJ desde tu CMS
        const res = await fetch(`${cms_agenda_url}?dj=${encodeURIComponent(cambio.nuevo)}`);
        const perfil = await res.json();

        // Construir mensaje con avatar, estilo y emojis
        const embed = {
          title: `🎙️ ¡Nuevo DJ en vivo!`,
          description: `**${perfil.nombre || cambio.nuevo}** ha tomado el control de la cabina.`,
          thumbnail: { url: perfil.avatar || 'https://www.habbo.com/habbo-imaging/avatarimage?user=DJKusito&action=std&direction=2&head_direction=2&size=l' },
          fields: [
            { name: '🎵 Estilo musical', value: perfil.estilo || 'Desconocido', inline: true },
            { name: '🕒 Horario', value: perfil.horario || 'No definido', inline: true }
          ],
          color: 0xff66cc,
          footer: { text: `Reemplazando a: ${cambio.anterior || 'ninguno'}` }
        };

        await canalTexto.send({ embeds: [embed] });
      } catch (err) {
        console.error('❌ Error al anunciar DJ:', err);
      }
    }, 60000); // cada 60 segundos
  }
};
