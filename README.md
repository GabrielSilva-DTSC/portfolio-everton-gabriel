# Everton Gabriel — portfólio

Site autoral em português sobre a trajetória de Everton Gabriel: Cubatão, Administração, iniciação científica, Ciência de Dados na UFPB e mobilização estudantil.

As fotos fornecidas por Everton estão integradas à abertura, às experiências da ETEC, à comunidade e à seção pessoal. O CIAPE tem capturas reais da interface. As galerias complementares podem ser abertas e cada imagem pode ser ampliada.

O posicionamento é aberto a diferentes programas de embaixadores, processos seletivos e entrevistas de empresas juniores. A apresentação destaca projetos, contribuições individuais e trabalho em equipe, sem direcionamento exclusivo a uma marca ou promessa de vínculo ainda não existente.

Primeira versão local. URL pública e repositório ainda não configurados. O escopo do CIAPE foi conferido na interface publicada em 27/09/2026. A apresentação do TCC foi complementada com os diários de bordo de 2024, roteiros, análises e protótipo fornecidos por Everton, incluindo sua participação na pesquisa e na integração de planilhas e Power BI aos modelos de site. Os documentos internos, as avaliações pessoais e os dados financeiros não são publicados. As demonstrações registradas não são tratadas como comprovação de adoção permanente ou de impacto financeiro. Os demais detalhes técnicos e as evidências aguardam revisão. O conteúdo vem do briefing, das respostas de Everton e dos materiais revisados, sem equivaler a uma auditoria independente dos resultados.

## Rodar

Requer Node.js 22.12 ou superior, em versão par suportada (Node 24 recomendado).

```bash
cd Site
npm install
npm run dev
```

Abrir o endereço exibido no terminal, normalmente `http://127.0.0.1:4321`. Se já estiver na pasta `Site`, não repetir o `cd`.

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

As regras de imagem estão em [MEDIA_POLICY.md](MEDIA_POLICY.md): preservar pessoas, ambientes e contexto; permitir remoção de fundo somente nos retratos; recortar nos prints as informações da tela. `src/data/media.ts` guarda legendas, descrições acessíveis e créditos. `MediaFigure.astro` reserva as dimensões e usa versões WebP responsivas. A abertura carrega com prioridade; os demais registros carregam sob demanda. `MediaGallery.astro` usa a abertura nativa de HTML, acessível por teclado e funcional sem JavaScript.

As cópias para ampliação preservam sem perdas os pixels da foto ou do recorte selecionado. As versões de carregamento usam compressão de alta qualidade. O retrato da abertura teve o fundo removido com a ferramenta de edição de imagens; os demais registros não receberam reconstrução ou retoques.

Os arquivos preparados já estão em `public/media/`; o build não precisa dos ZIPs ou das fotos originais. Para preparar novamente as imagens no ambiente com os originais, executar `node scripts/prepare-media.mjs`. A lista de origem e recortes fica no arquivo privado `evidencias-privadas/media-sources.json`; o script depende de `unzip` para ler fotos dos arquivos compactados.

Originais devem ficar em `evidencias-privadas/` ou fora do projeto. Essa pasta, o briefing, a referência visual e o controle editorial local estão no `.gitignore`. Nenhum arquivo entregue é publicado automaticamente.

Só copiar derivados autorizados para `public/media/`. `public/` é copiada para o site: não guardar originais ali. Fotografias têm `alt`, legenda, data/contexto quando conhecidos, crédito e dimensões. As fotos e os prints desta versão foram selecionados a pedido de Everton; os certificados e documentos originais não são publicados.

O arquivo local `CONTENT_CHECKLIST.md` reúne as pendências. Ao iniciar uma cópia nova a partir do futuro repositório público, criar um controle editorial local equivalente para os novos materiais.

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

Usar `Site/` como raiz de um repositório dedicado. Não fazer `git add .` no diretório superior: o Git encontrado durante o início do projeto pertence à pasta pessoal, não a este site.

O workflow `.github/workflows/deploy.yml` é manual durante a construção. Após revisar conteúdo, evidências, contato e licença, criar o repositório público dedicado e selecionar **Settings → Pages → Source → GitHub Actions**. Executar o workflow em **Actions**. A configuração obtém a conta e o nome do repositório de `GITHUB_REPOSITORY`; repositórios `<usuario>.github.io` usam a raiz, os demais usam `/<repositorio>/`. `SITE_URL` e `BASE_PATH` permitem configurações explícitas, inclusive domínio próprio (nesse caso, definir também `BASE_PATH=/`).

O workflow foi baseado na [documentação oficial do Astro para GitHub Pages](https://docs.astro.build/en/guides/deploy/github/). As versões instaladas estão fixadas no `package.json` e no `package-lock.json`.

Após publicar, registrar aqui a URL e conferir navegação, imagem social e contatos no endereço real. A publicação ainda depende da conta autenticada e da revisão do material.

## Créditos e licença

Conteúdo biográfico e acervo fotográfico fornecidos por Everton Gabriel. Registros de redes sociais mantêm a identificação da origem nas legendas e, quando disponível, no próprio conteúdo. Direção visual baseada no briefing e na referência local fornecida para o projeto. Imagem social composta apenas com tipografia e traço vetorial, sem foto ou marca de terceiro. Os documentos originais permanecem privados.

Licença do código: aguardando escolha do autor. As permissões sobre conteúdo, fotos, documentos e fontes são independentes da futura licença do código.
