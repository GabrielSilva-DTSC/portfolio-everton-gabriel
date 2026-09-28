# Everton Gabriel — portfólio

Sou Everton Gabriel, estudante de Ciência de Dados para Negócios na UFPB. Neste portfólio reúno projetos de dados, pesquisa e comunicação, além de experiências em Administração e mobilização estudantil.

Incluí fotos da minha trajetória na ETEC e na UFPB e capturas reais do CIAPE. As galerias podem ser abertas para ver cada registro em tamanho maior.

Versão pública: [gabrielsilva-dtsc.github.io/portfolio-everton-gabriel/](https://gabrielsilva-dtsc.github.io/portfolio-everton-gabriel/).

## Rodar

Requer Node.js 22.12 ou superior, em versão par suportada (Node 24 recomendado).

```bash
npm install
npm run dev
```

Executar os comandos na raiz deste repositório (`Site/`, na pasta de trabalho original). Abrir o endereço exibido no terminal, normalmente `http://127.0.0.1:4321`.

```bash
npm run build
npm run preview
```

O build verifica os tipos, gera a imagem social tipográfica e produz o site estático em `dist/`.

## Arquitetura

O Astro transforma componentes em HTML no build. O navegador recebe páginas prontas, CSS e um script pequeno para o menu e a indicação de seção ativa. Não há banco de dados, login, formulário, cookies ou analytics.

```text
src/data/portfolio.ts  → textos, contatos e informações dos projetos
src/components/       → navegação e rodapé compartilhados
src/layouts/          → estrutura HTML, metadados e fontes
src/pages/            → início, três casos e página 404
src/styles/           → cores, tipografia, layout e movimento reduzido
src/utils/paths.ts    → links compatíveis com o subcaminho do GitHub Pages
public/media/         → somente imagens e capturas revisadas
public/og/            → imagem social gerada no build
scripts/              → geração da arte tipográfica de compartilhamento
tests/                → responsividade, teclado, links e acessibilidade
```

Para alterar textos de projeto ou incluir contatos, editar `src/data/portfolio.ts`. Cada projeto pode ter ano (`period`, no formato `AAAA`), tipo de apresentação (`presentation`) e nota sobre suas fontes (`evidenceNote`), além dos textos e links. A página compartilhada apresenta esses campos somente quando informados. As referências privadas ficam no controle editorial, não no conteúdo enviado ao navegador. As seções narrativas estão em `src/pages/index.astro`. Para incluir uma página de projeto, acrescentar um registro em `projects`; a rota é criada automaticamente a partir de `slug`.

Os temas compartilham fontes e medidas. As classes `theme-admin`, `theme-research` e `theme-data` alteram as cores por capítulo. As fontes Newsreader e Manrope são servidas localmente; suas licenças acompanham os respectivos pacotes. A composição não usa fotos fictícias, logos de empresas ou imagens de banco.

## Materiais e privacidade

Defini as regras de imagem em [MEDIA_POLICY.md](MEDIA_POLICY.md): preservar pessoas, ambientes e contexto; permitir remoção de fundo somente nos retratos; recortar nos prints as informações da tela. `src/data/media.ts` guarda legendas, descrições acessíveis e créditos. `MediaFigure.astro` reserva as dimensões e usa versões WebP responsivas. A abertura carrega com prioridade; os demais registros carregam sob demanda. `MediaGallery.astro` usa a abertura nativa de HTML, acessível por teclado e funcional sem JavaScript.

As cópias para ampliação preservam sem perdas os pixels da foto ou do recorte selecionado. As versões de carregamento usam compressão de alta qualidade. O retrato da abertura teve o fundo removido com a ferramenta de edição de imagens; os demais registros não receberam reconstrução ou retoques.

Os arquivos preparados já estão em `public/media/`; o build não precisa dos ZIPs ou das fotos originais. Para preparar novamente as imagens no ambiente com os originais, executar `node scripts/prepare-media.mjs`. A lista de origem e recortes fica no arquivo privado `evidencias-privadas/media-sources.json`; o script depende de `unzip` para ler fotos dos arquivos compactados.

Originais devem ficar em `evidencias-privadas/` ou fora do projeto. Essa pasta, o briefing, a referência visual e o controle editorial local estão no `.gitignore`. Nenhum arquivo entregue é publicado automaticamente.

Só copiar derivados autorizados para `public/media/`. `public/` é copiada para o site: não guardar originais ali. Fotografias têm `alt`, legenda, data/contexto quando conhecidos, crédito e dimensões. Selecionei as fotos e os prints desta versão; meus certificados e documentos originais não estão publicados.

O arquivo local `CONTENT_CHECKLIST.md` reúne as pendências. Ao clonar este repositório, criar um controle editorial local equivalente para os novos materiais.

## Verificação

```bash
npx playwright install chromium
npm run build
npm test
```

Os testes verificam cinco páginas em 320, 390, 768 e 1440 px, acessibilidade com axe, navegação móvel por teclado, conteúdo sem JavaScript, movimento reduzido e links internos. A suíte de imagens também abre galerias por teclado, confere o carregamento e as proporções das fotos e avalia a acessibilidade com os registros expandidos. Os testes automáticos não substituem revisão humana de texto alternativo, clareza editorial e uso com leitor de tela.

Validação inicial em 27/09/2026: build sem erros, 12 testes aprovados na raiz e 12 aprovados com base `/portfolio-teste/`. As capturas também foram revisadas visualmente em computador e celular. A suíte usa a porta 4331 para não conflitar com a prévia local em 4321.

Integração das imagens em 28/09/2026: build sem erros; 12 testes gerais e 3 testes de fotos/galerias aprovados na raiz. A revisão visual das fotos foi feita em 390 e 1440 px. As 21 cópias para ampliação foram comparadas com o conteúdo selecionado dos arquivos de origem, preservando os pixels; para o retrato sem fundo, a referência dessa comparação foi o PNG editado. O original do retrato foi conferido visualmente.

Para verificar uma publicação em subpasta:

```bash
SITE_URL=https://example.org BASE_PATH=/portfolio-teste/ npm run build
BASE_PATH=/portfolio-teste/ npm test
npm run build
```

O domínio do exemplo serve apenas para o teste local. O último comando restaura o build local na raiz.

## Publicação

Este repositório usa o conteúdo de `Site/` como raiz. Na minha pasta de trabalho original, o Git do diretório superior pertence à pasta pessoal, não a este projeto.

Publiquei o site em [GitHub Pages](https://gabrielsilva-dtsc.github.io/portfolio-everton-gabriel/) a partir do repositório [GabrielSilva-DTSC/portfolio-everton-gabriel](https://github.com/GabrielSilva-DTSC/portfolio-everton-gabriel). O GitHub Pages usa **GitHub Actions** como fonte. O workflow `.github/workflows/deploy.yml` é manual: depois de enviar alterações para `main`, executá-lo na aba **Actions** para atualizar o site. A configuração obtém a conta e o nome do repositório de `GITHUB_REPOSITORY`; repositórios `<usuario>.github.io` usam a raiz, os demais usam `/<repositorio>/`. `SITE_URL` e `BASE_PATH` permitem configurações explícitas, inclusive domínio próprio (nesse caso, definir também `BASE_PATH=/`).

O workflow foi baseado na [documentação oficial do Astro para GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). As versões instaladas estão fixadas no `package.json` e no `package-lock.json`.

Publicação inicial em 28/09/2026. A página inicial, a rota do CIAPE e uma imagem responderam com HTTP 200 no endereço público. Conteúdo, evidências, contato e licença seguem sujeitos a revisão editorial antes de futuras atualizações.

## Créditos e licença

Forneci as informações sobre minha trajetória e as fotos do meu acervo. Os registros de redes sociais mantêm a identificação da origem nas legendas e, quando disponível, no próprio conteúdo. A direção visual parte do briefing e da referência que compartilhei. A imagem de compartilhamento usa apenas tipografia e traço vetorial, sem foto ou marca de terceiros. Meus documentos originais permanecem privados.

Licença do código: a definir
