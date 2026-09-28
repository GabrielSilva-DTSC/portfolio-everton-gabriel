# Regra de negócio: fotografias e registros visuais

As imagens devem preservar o contexto real e as características físicas das pessoas e dos ambientes. Esta regra foi definida por Everton durante a construção do portfólio e se aplica a futuras inclusões e edições.

- Fotos de eventos, grupos e ambientes: preservar rostos, corpos, expressões, objetos, textos, quantidade de pessoas, cenário, perspectiva e proporções. Não reconstruir detalhes, remover pessoas/objetos, substituir cenários ou gerar evidências.
- Fotos de perfil: é permitido remover o fundo. Preservar a aparência da pessoa, seus traços, roupa, expressão e proporções. Conferir o resultado com o original antes de usar.
- Prints: Everton autorizou recortar barras do celular, controles de aplicativos, abas do navegador e margens externas. O recorte deve preservar integralmente a foto ou o conteúdo selecionado, seus textos e créditos. Não remontar interfaces nem alterar valores exibidos.
- Qualidade: otimizar formato, tamanho e carregamento para a web. Correções de imagem só quando necessárias e sem mudar seu conteúdo. Baixa resolução não autoriza inventar detalhes; não ampliar artificialmente os arquivos.
- Apresentação: exibir as proporções originais, sem `object-fit: cover` nas fotos documentais. Incluir descrição acessível, legenda e origem. Datas do nome do arquivo indicam envio/captura, não necessariamente o evento.
- Preservação: guardar os originais e produzir derivados separados. Apenas as imagens selecionadas entram em `public/media/`. Remover metadados dos derivados.

## Aplicação técnica

`src/data/media.ts` reúne legendas e contexto; `src/components/MediaFigure.astro` exibe as fotos com tamanho reservado, fontes responsivas e ampliação. O componente rejeita remoção de fundo em registros que não sejam retratos.

`scripts/prepare-media.mjs` lê uma lista explícita em `evidencias-privadas/media-sources.json`. Aceita somente recortes de prints e preparação WebP. Preserva uma cópia do conteúdo selecionado sem perdas para ampliação e gera versões responsivas com compressão de alta qualidade para carregamento. Não faz retoques, filtros, preenchimento generativo ou aumento de resolução. Gera `public/media/manifest.json` e os arquivos WebP; o relatório de origem e tratamentos permanece privado. Os derivados já preparados permitem construir o site sem acesso aos originais.

Nesta edição, o retrato sem fundo foi preparado com a ferramenta de edição de imagens. As fotos documentais receberam apenas preparação técnica para a web; os prints foram recortados nas bordas da imagem/conteúdo.
