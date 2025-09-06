const { SlashCommandBuilder } = require('@discordjs/builders');
const { getAgendaHoy } = require('../utils/agenda');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('horario')
    .setDescription('Muestra la programación de DJs para hoy'),
  async execute(interaction) {
    const mensaje = await getAgendaHoy();
    await interaction.reply(mensaje);
  }
};
