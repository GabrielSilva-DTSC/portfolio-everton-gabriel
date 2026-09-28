// Conteúdo baseado no briefing, nas respostas de Everton e nas fontes revisadas.
// A origem de cada evidência fica no controle editorial local. Ausência de URL não gera botão.
import { approvedMedia, type MediaId } from './media';
export const profile = {
  name: 'Everton Gabriel',
  degree: 'Ciência de Dados para Negócios',
  university: 'UFPB',
  city: 'João Pessoa, PB',
  description: 'Projetos de dados, pesquisa e comunicação de Everton Gabriel. Uma trajetória em Administração, Ciência de Dados e mobilização estudantil.',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/everton-gabriel-s-de-almeida-198320308/' },
    { label: 'GitHub', url: 'https://github.com/GabrielSilva-DTSC' },
    { label: 'AWS Builder Center', url: 'https://builder.aws.com/community/@evertondtsc' },
  ] as { label: string; url: string }[],
  email: 'everton.gabriel@academico.ufpb.br',
};

export const navigation = [
  { id: 'inicio', label: 'Início' },
  { id: 'trajetoria', label: 'Trajetória' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'comunidade', label: 'Comunidade' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

// Endereços enviados por Everton; parâmetros de compartilhamento removidos.
export const references = {
  gremio: 'https://www.instagram.com/gremio_serra_do_mar/',
  cacdn: 'https://www.instagram.com/cacdn.ufpb/',
  jornal: 'https://youtu.be/q6y0X02nLXM',
  powerDrinks: 'https://www.instagram.com/p0werdrinks/',
  forum: 'https://www.instagram.com/etec_novoolhar/',
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  theme: 'data' | 'admin' | 'research';
  role: string;
  context: string;
  period?: string;
  presentation?: string;
  evidenceNote?: string;
  gallery?: MediaId[];
  summary: string;
  links?: { label: string; url: string }[];
  sections: { title: string; text: string }[];
};

export const projects: Project[] = [
  {
    slug: 'ciape', number: '01', title: 'CIAPE',
    subtitle: 'Informação para permanecer.', category: 'Dados · Permanência estudantil', theme: 'data',
    role: 'Desenvolvimento do MVP', context: 'Análise de Dados · Ciência de Dados para Negócios · UFPB',
    gallery: ['ciape-consulta', 'ciape-inicio'],
    evidenceNote: 'O escopo descrito foi conferido na interface pública do CIAPE em 27 de setembro de 2026. Isso não equivale a uma auditoria da base de dados. O repositório e a documentação técnica serão acrescentados após a revisão dos materiais.',
    summary: 'Um MVP de consulta de informações sobre assistência e permanência estudantil. Tecnologia a partir de uma questão próxima: o acesso à universidade também precisa de caminhos para continuar nela.',
    links: [{ label: 'Explorar o MVP no Streamlit', url: 'https://ciapemvp.streamlit.app/' }],
    sections: [
      { title: 'O ponto de partida', text: 'O acesso a informações sobre assistência estudantil faz parte da experiência de permanência na universidade. O CIAPE parte desse tema para propor uma consulta orientada às necessidades dos estudantes.' },
      { title: 'Para quem e para quê', text: 'O projeto busca ajudar estudantes a identificar oportunidades de apoio conforme suas necessidades e o campus onde pretendem estudar. A apresentação do MVP considera tanto quem vem de outro estado, sem rede de apoio local, quanto quem reside na Paraíba e precisa de suporte para transporte e alimentação.' },
      { title: 'O escopo publicado', text: 'A versão consultada reúne informações dos editais unificados de apoio e permanência estudantil da UFPB, referentes a 2025 e 2026. A interface apresenta quatro campi e organiza as modalidades em cinco categorias funcionais de auxílio. O contexto acadêmico é a disciplina de Análise de Dados, no curso de Ciência de Dados para Negócios.' },
      { title: 'Interface e fonte dos dados', text: 'O MVP é publicado no Streamlit. A interface apresenta áreas de consulta, dashboard e relatório, além de acesso à base em CSV. A fonte declarada para os auxílios são os editais da PRAPE/UFPB; os microdados do Censo da Educação Superior do INEP são usados no dimensionamento da expansão do projeto.' },
      { title: 'Limites e próximos passos', text: 'A cobertura nacional é uma visão futura, não uma entrega concluída: o MVP começa pela UFPB. As informações do aplicativo não substituem os editais oficiais e seus prazos. A hospedagem gratuita pode colocar o aplicativo em repouso; nesse caso, o próprio Streamlit oferece a opção de reabri-lo.' },
    ],
  },
  {
    slug: 'bi-para-ong', number: '02', title: 'Dados a serviço de uma ONG',
    subtitle: 'Fluxo de caixa, informação e transparência.', category: 'Administração · Business Intelligence', theme: 'admin',
    role: 'Pesquisa, análise de dados e tutoriais', context: 'Formação técnica em Administração · ETEC',
    period: '2024', presentation: 'Protótipo de site com planilhas e BI',
    evidenceNote: 'Síntese baseada nos diários de bordo de 2024, nos roteiros de apresentação, nas análises e no protótipo de fluxo de caixa. O diário registra a participação individual, as ferramentas e a demonstração da proposta. Os dados financeiros, as avaliações entre integrantes e os documentos internos não são reproduzidos nesta página. O título acadêmico oficial e os materiais visuais autorizados ainda serão complementados.',
    summary: 'TCC sobre fluxo de caixa e prestação de contas em uma ONG de Cubatão. Contribuí com pesquisa, análise dos registros, integração de planilhas e Power BI aos modelos de site e produção de tutorial, em um trabalho construído em equipe.',
    sections: [
      { title: 'O problema de pesquisa', text: 'Como a organização das informações do fluxo de caixa pode contribuir para uma prestação de contas mais transparente? O TCC aproxima essa questão da realidade de uma ONG de Cubatão, conectando gestão financeira, acesso à informação e tomada de decisão.' },
      { title: 'Os objetivos do estudo', text: 'O grupo buscou identificar lacunas nos registros, examinar sua relevância para a organização das informações, conhecer a visão do público sobre prestação de contas e propor estratégias para estruturar o fluxo de caixa.' },
      { title: 'Da pesquisa aos registros', text: 'O estudo de caso combinou pesquisa bibliográfica e documental, entrevistas semiestruturadas e um questionário sobre a percepção do público. As análises discutem o detalhamento de entradas e saídas, datas, formas de movimentação e destinação de recursos como informações úteis para a gestão.' },
      { title: 'Minha contribuição na pesquisa', text: 'Trabalhei na redação da problemática e dos métodos de pesquisa. Também participei da elaboração do roteiro de entrevista e do cronograma, da primeira coleta de dados na organização e da transcrição das entrevistas. Na etapa de análise, dividi com uma colega a responsabilidade pelo fluxo de caixa, enquanto outros integrantes conduziram as análises das entrevistas e do questionário.' },
      { title: 'Um protótipo de fluxo de caixa', text: 'Entre os materiais produzidos está um protótipo de planilha, com abas mensais e campos para data, descrição, entrada, saída e saldo. A aba mais detalhada também apresenta forma de movimentação e totais diários de entradas e saídas. O protótipo representa uma proposta de organização dos registros, não uma comprovação de adoção pela entidade.' },
      { title: 'Das planilhas à visualização', text: 'A proposta de intervenção combinou planilhas, gráficos interativos em Power BI e modelos de site para apoiar a prestação de contas. Em colaboração com uma colega, trabalhei no layout dos sites e na integração das planilhas e do Power BI. O diário registra o nome Cash Flow para o site do grupo; o modelo destinado à organização também reunia visualizações e tutoriais.' },
      { title: 'Ferramentas e orientação de uso', text: 'Os registros de desenvolvimento citam Google Sheets, Excel e Power BI. Gravei um tutorial de Google Sheets como parte da proposta de orientar o uso das ferramentas. Wix também aparece na divisão de tarefas para a gravação de tutoriais. A produção dos conteúdos, a edição dos vídeos e a construção dos sites foram distribuídas entre os integrantes da equipe.' },
      { title: 'Apresentação e limites da entrega', text: 'Segundo o diário, em 27 de novembro de 2024 o grupo apresentou à organização o modelo de site com planilhas, gráficos interativos e tutoriais. A apresentação à banca final ocorreu em 4 de dezembro de 2024. Esses registros documentam a construção e a demonstração da proposta, sem comprovar adoção permanente pela entidade ou melhoria de resultados financeiros.' },
    ],
  },
  {
    slug: 'iniciacao-cientifica', number: '03', title: 'Pesquisar é aprender a observar',
    subtitle: 'Comunicação, perguntas e método.', category: 'Iniciação científica · Comunicação', theme: 'research',
    role: 'Estudante pesquisador no ensino médio', context: 'Educação científica · Unisantos',
    summary: 'Iniciação científica durante o ensino médio, no programa de educação científica da Universidade Católica de Santos, com pesquisa na área de Comunicação.',
    sections: [
      { title: 'Pesquisa desde o ensino médio', text: 'Desenvolvi pesquisa no programa de educação científica da Universidade Católica de Santos. Essa experiência aproximou minha formação da investigação em Comunicação.' },
      { title: 'As produções de pesquisa', text: 'A trajetória inclui pesquisa em Comunicação e um artigo técnico em coautoria. Os títulos oficiais, a modalidade e a autoria de cada produção serão apresentados conforme os respectivos documentos.' },
      { title: 'Um dos temas de investigação', text: 'O trabalho sobre Netflix e interação com clientes nas mídias sociais tem a empresa como objeto de pesquisa. Essa referência não representa parceria, apoio ou patrocínio.' },
      { title: 'Reconhecimentos', text: 'O relato da trajetória registra reconhecimentos de pesquisa destaque em Comunicação em 2023 e 2024. A denominação oficial e as datas serão conferidas nos certificados antes da inclusão dos documentos públicos.' },
    ],
  },
];

export const assetPolicy = {
  // Regras permanentes em MEDIA_POLICY.md. Originais e histórico de edição ficam privados.
  approvedMedia,
  backgroundRemoval: 'portrait-only',
  preservePeopleAndEnvironment: true,
  screenshotCropping: 'interface-and-outer-margins-only',
};
