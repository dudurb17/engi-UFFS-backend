function usuarioPodeAcessarProjeto(usuario, projeto) {
  if (usuario.role === 'CLIENTE' && projeto.clienteId !== usuario.id) {
    return false;
  }

  if (usuario.role === 'ENGENHEIRO' && projeto.engenheiroId !== usuario.id) {
    return false;
  }

  return true;
}

module.exports = { usuarioPodeAcessarProjeto };
