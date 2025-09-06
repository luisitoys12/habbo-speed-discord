const fetch = require('node-fetch');

async function getAgendaHoy() {
  const hoy = new Date().toISOString().split('T')[0];
  const res = await fetch(`https://tusitio.com/api/agenda.php?fecha=${hoy}`);
  const agenda = await res.json();

  if (!agenda.length) return 'No hay DJs agendados hoy 😢';

  let mensaje = '📅 **Programación de hoy:**\n';
  agenda.forEach(slot => {
    mensaje += `🕒 ${slot.hora_inicio}–${slot.hora_fin} — ${slot.dj} (${slot.programa})\n`;
  });

  return mensaje;
}

module.exports = { getAgendaHoy };
