async function enviarAlerta(canal, mensaje, rol) {
  try {
    const contenido = rol ? `${rol} ${mensaje}` : mensaje;
    await canal.send(contenido);
  } catch (err) {
    console.error('Error al enviar alerta:', err);
  }
}

module.exports = { enviarAlerta };
