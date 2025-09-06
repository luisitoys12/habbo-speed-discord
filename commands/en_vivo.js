const { SlashCommandBuilder } = require('@discordjs/builders');
const { getDJEnVivo } = require('../utils/azuracast');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('en_vivo')
    .setDescription('Muestra quién está al aire en este momento'),
  async execute(interaction) {
    const mensaje = await getDJEnVivo();
    await interaction.reply(mensaje);
  }
};
