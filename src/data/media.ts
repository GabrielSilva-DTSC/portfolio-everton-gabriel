import assets from '../../public/media/manifest.json';

type Caption = { alt: string; caption: string; credit: string; sourceUrl?: string };
const personal = 'Acervo de Everton Gabriel';
const gremio = { credit: 'Registro: Grêmio Serra do Mar', sourceUrl: 'https://www.instagram.com/gremio_serra_do_mar/' };

const descriptions = {
  'everton-perfil': { alt: 'Retrato de Everton Gabriel, de óculos redondos e camiseta cinza.', caption: 'Everton Gabriel', credit: personal },
  'everton-formal': { alt: 'Everton Gabriel com terno azul e gravata, diante de um arranjo de flores brancas.', caption: 'Um registro da minha trajetória.', credit: personal },
  'recepcao-curso': { alt: 'Participantes da recepção do curso reunidos junto à placa do CCSA da UFPB, ao anoitecer.', caption: 'Recepção de Ciência de Dados para Negócios · 2026.2. Encontro que organizei pelo centro acadêmico.', credit: personal },
  'recepcao-unificada': { alt: 'Selfie de Everton com estudantes reunidos em filas dentro de um ginásio.', caption: 'Recepções unificadas da UFPB · 2026. Participação na mobilização e no acolhimento dos estudantes.', credit: personal },
  'doacoes-ufpb': { alt: 'Alimentos, sacolas e outros itens arrecadados organizados sobre mesas em uma sala.', caption: 'Parte das doações reunidas nas ações coletivas das recepções de 2026.', credit: personal },
  'cracha-recepcao': { alt: 'Crachá de Everton Gabriel na recepção unificada da UFPB, com a função Organização.', caption: 'Registro da atuação na organização das recepções de 2026.', credit: personal },
  'ciape-consulta': { alt: 'Tela do CIAPE com filtros de auxílio, mapa dos campi da UFPB e detalhes de um programa de assistência estudantil.', caption: 'Consulta no MVP: filtros, campi e informações dos programas estudantis.', credit: 'Captura do projeto fornecida por Everton Gabriel', sourceUrl: 'https://ciapemvp.streamlit.app/' },
  'ciape-inicio': { alt: 'Tela de apresentação do CIAPE, com a proposta de reunir informações de apoio e permanência estudantil.', caption: 'Apresentação do CIAPE e do público atendido pelo MVP.', credit: 'Captura do projeto fornecida por Everton Gabriel' },
  'mural-etec': { alt: 'Muro com grafites na ETEC de Cubatão, com alambrado, árvores e céu ao fundo.', caption: 'Arte e convivência no espaço da ETEC de Cubatão.', credit: personal },
  'gremio-equipe': { alt: 'Grupo com estudantes de camiseta da ETEC de Cubatão em registro publicado pelo grêmio.', caption: 'Grêmio Serra do Mar: uma trajetória construída em equipe.', ...gremio },
  'gremio-fifa': { alt: 'Estudantes sentados diante de uma partida de futebol de videogame projetada na parede.', caption: 'FIFA na escola: uma das atividades de integração do grêmio.', ...gremio },
  'pedagio-social': { alt: 'Cartaz verde do Pedágio Social da ETEC de Cubatão com alimentos e produtos de higiene.', caption: 'Divulgação do Pedágio Social na ETEC de Cubatão.', ...gremio },
  'doacoes-gremio': { alt: 'Publicação do grêmio com fotografias de caixas de alimentos e a mensagem Mais de 100 kg em doações.', caption: 'Registro publicado pelo grêmio sobre a arrecadação coletiva.', ...gremio },
  'halloween-etec': { alt: 'Cartaz roxo da festa de Halloween da ETEC de Cubatão e do Grêmio Serra do Mar.', caption: 'Comunicação das atividades culturais do grêmio.', ...gremio },
  'curso-grafite': { alt: 'Cartaz de curso presencial de grafite na ETEC de Cubatão, com letras coloridas e informações da atividade.', caption: 'Divulgação do curso de grafite na ETEC de Cubatão.', credit: 'Acervo de Everton Gabriel · créditos dos organizadores no cartaz' },
  'power-drinks': { alt: 'Equipe preparando bebidas no estande do Power Drinks, com mesa decorada, utensílios e placa de caixa.', caption: 'Power Drinks: a equipe em ação durante o evento.', credit: 'Registro em vídeo: @maluoliveiraso · acervo de Everton Gabriel', sourceUrl: 'https://www.instagram.com/p0werdrinks/' },
  'power-prevenda': { alt: 'Publicações azuis do Power Drinks com a mensagem Tá liberada a PRÉ-VENDA.', caption: 'Comunicação da pré-venda que planejei para o Power Drinks.', credit: 'Registro: Power Drinks', sourceUrl: 'https://www.instagram.com/p0werdrinks/' },
  'forum-comunicacao': { alt: 'Publicações do projeto Novo Olhar à Sociedade com imagens e chamadas para discutir e combater o racismo.', caption: 'Comunicação do fórum: atuei nas mídias e na transmissão ao vivo.', credit: 'Registro: Novo Olhar à Sociedade', sourceUrl: 'https://www.instagram.com/etec_novoolhar/' },
  'capoeira': { alt: 'Grupo em um espaço de treino com tatame, reunido para uma fotografia.', caption: 'Esporte, convivência e aprendizado também fazem parte do caminho.', credit: personal },
  'fundacao-ca-assinatura': { alt: 'Everton assina a ata de fundação do centro acadêmico sobre uma mesa, durante a assembleia.', caption: 'Assinatura da ata de fundação do Centro Acadêmico de Ciência de Dados para Negócios.', credit: personal },
  'fundacao-ca-grupo': { alt: 'Participantes da assembleia de fundação do centro acadêmico reunidos em uma sala, segurando a ata.', caption: 'Assembleia de fundação que organizei, com participação presencial e on-line.', credit: personal },
} satisfies Record<string, Caption>;

export type MediaId = keyof typeof descriptions;
export function getMedia(id: MediaId) {
  const asset = assets[id];
  if (!asset) throw new Error(`Imagem sem arquivo preparado: ${id}`);
  if (asset.treatment === 'background-removed' && asset.kind !== 'portrait') {
    throw new Error(`A regra de negócio proíbe remover o fundo de registros documentais: ${id}`);
  }
  const caption: Caption = descriptions[id];
  return { id, ...asset, ...caption };
}

export const approvedMedia = (Object.keys(descriptions) as MediaId[]).map(getMedia);
