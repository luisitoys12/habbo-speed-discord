const { SlashCommandBuilder } = require('discord.js');
const { enviarAlerta } = require('../utils/notificaciones');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('notificar')
    .setDescription('Envía una alerta a un canal o rol')
    .addStringOption(option =>
      option.setName('mensaje')
        .setDescription('Mensaje de la alerta')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Canal donde se enviará la alerta')
        .setRequired(false))
    .addRoleOption(option =>
      option.setName('rol')
        .setDescription('Rol que será mencionado')
        .setRequired(false)),
  async execute(interaction) {
    const mensaje = interaction.options.getString('mensaje');
    const canal = interaction.options.getChannel('canal') || interaction.channel;
    const rol = interaction.options.getRole('rol');

    await enviarAlerta(canal, mensaje, rol);
    await interaction.reply({ content: '✅ Alerta enviada.', ephemeral: true });
  }
};
