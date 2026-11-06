/**
 * SILAS CONFECÇÕES E SERIGRAFIA — Plataforma de Captação e Gestão de Pedidos
 * Protótipo Interativo Completo (Pedidos/OPs, Clientes, Auditoria Imutável, Link do Responsável e Portal do Cliente)
 */

const STORAGE_KEY = 'silas_serigrafia_proto_v2';

const SIZES = ['2', '4', '6', '8', '10', '12', 'PP', 'P', 'M', 'G', 'GG', 'XGG', 'XXGG'];

// Equipe e Contas de Acesso (Apenas 2 perfis: Administrador e Responsável)
// O login do responsável vai no link do cliente (?login=kaue) para vincular automaticamente à conta dele
const INITIAL_USERS = [
  {
    id: 'usr_kaue',
    login: 'kaue',
    senha: '1234',
    nome: 'Kauê (Atendimento & Listas)',
    nomeCurto: 'Kauê',
    email: 'kaue@silasserigrafia.com.br',
    perfil: 'responsavel', // admin | responsavel
    setor: 'Atendimento & Listas',
    ativo: true,
    linkToken: 'kaue',
    cliquesLink: 148
  },
  {
    id: 'usr_silas',
    login: 'silas',
    senha: '1234',
    nome: 'Silas (Diretor / Administrador)',
    nomeCurto: 'Silas (Admin)',
    email: 'silas@silasserigrafia.com.br',
    perfil: 'admin',
    setor: 'Diretoria Geral',
    ativo: true,
    linkToken: 'silas',
    cliquesLink: 92
  },
  {
    id: 'usr_luiz',
    login: 'luiz',
    senha: '1234',
    nome: 'Luiz / David (Design & Arte)',
    nomeCurto: 'Luiz/David',
    email: 'arte@silasserigrafia.com.br',
    perfil: 'responsavel',
    setor: 'Arte & Layout',
    ativo: true,
    linkToken: 'luiz',
    cliquesLink: 64
  },
  {
    id: 'usr_dudu',
    login: 'dudu',
    senha: '1234',
    nome: 'Dudu (Gabarito & Plotter)',
    nomeCurto: 'Dudu',
    email: 'plotter@silasserigrafia.com.br',
    perfil: 'responsavel',
    setor: 'Gabarito & Plotter',
    ativo: true,
    linkToken: 'dudu',
    cliquesLink: 31
  },
  {
    id: 'usr_jonatan',
    login: 'jonatan',
    senha: '1234',
    nome: 'Jonatan (Costura, Prensagem & Qualidade)',
    nomeCurto: 'Jonatan',
    email: 'producao@silasserigrafia.com.br',
    perfil: 'responsavel',
    setor: 'Costura, Prensagem & Qualidade',
    ativo: true,
    linkToken: 'jonatan',
    cliquesLink: 19
  }
];

function createEmptyGridRow() {
  const row = {};
  SIZES.forEach(s => { row[s] = 0; });
  return row;
}

const INITIAL_CLIENTS = [
  {
    id: 'cli_01',
    nome: 'Colégio Estadual Dom Pedro II',
    email: 'diretoria@colegiodompedro.edu.br',
    telefone: '(11) 99812-3456',
    documento: '12.345.678/0001-90',
    criadoEm: '2026-02-10 09:15',
    consentimentoLgpd: true,
    dataConsentimento: '2026-02-10 09:15 (IP 189.44.12.90)'
  },
  {
    id: 'cli_02',
    nome: 'Atlética Engenharia UFABC (Grifo)',
    email: 'compras@atleticagrifo.com.br',
    telefone: '(11) 98765-4321',
    documento: '28.991.120/0001-45',
    criadoEm: '2026-03-04 14:22',
    consentimentoLgpd: true,
    dataConsentimento: '2026-03-04 14:22 (IP 201.17.88.14)'
  },
  {
    id: 'cli_03',
    nome: 'Rede Supermercados Bom Preço',
    email: 'rh@superbompreco.com.br',
    telefone: '(11) 99123-9876',
    documento: '45.112.890/0001-08',
    criadoEm: '2026-04-19 11:05',
    consentimentoLgpd: true,
    dataConsentimento: '2026-04-19 11:05 (IP 177.92.40.11)'
  },
  {
    id: 'cli_04',
    nome: 'Escola Técnica São Lucas',
    email: 'coordenacao@etcsaolucas.com.br',
    telefone: '(11) 97654-1122',
    documento: '61.400.219/0001-77',
    criadoEm: '2026-05-01 16:40',
    consentimentoLgpd: true,
    dataConsentimento: '2026-05-01 16:40 (IP 187.55.19.203)'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ped_101',
    numero: 'OP-2026-0041',
    clienteId: 'cli_01',
    responsavelId: 'usr_kaue',
    turmaResponsavel: 'Profª Carla — 3º Ano Ensino Médio (Terceirão)',
    status: 'em_andamento', // recebido | em_andamento | concluido
    subStatus: 'Etapa 3: Gabarito & Plotter',
    criadoEm: '2026-11-01 10:15',
    atualizadoEm: '2026-11-04 16:30',
    entregaPrevista: '2026-11-18',
    listaAprovada: true,
    consentimentoLgpd: true,
    especificacoes: {
      tipoGola: 'Redonda',
      modelagemCamisa: 'Padrão/Unissex + Baby Look',
      tecnicaImpressao: 'Sublimação Total',
      arteAprovada: true,
      gabaritoPlotter: true,
      malhaCamisaTipo: 'Dry Fit Sport UV 50+',
      malhaCamisaKg: '18.5',
      malhaShortTipo: 'Helanca Escolar Marinho',
      malhaShortKg: '12.0',
      golaPunho: 'Ribana Azul Royal c/ Listras Brancas',
      botoesQtd: '0',
      elasticoMm: '40mm',
      cadarco: 'Branco Chato 12m',
      observacoesArte: 'Frente azul marinho degradê dourado, escudo do colégio no peito esquerdo e nomes individuais nas costas.'
    },
    grade: {
      padrao: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 4, 'P': 12, 'M': 18, 'G': 10, 'GG': 4, 'XGG': 2, 'XXGG': 0 },
      babylook: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 6, 'P': 15, 'M': 10, 'G': 3, 'GG': 0, 'XGG': 0, 'XXGG': 0 }
    },
    listaNomes: '01. Gabriel (M - Nº 10)\n02. Beatriz (Baby P - Nº 07)\n03. Lucas (G - Nº 99)\n+ 81 alunos na planilha anexada no WhatsApp.',
    rotaOperacional: [
      { etapa: 1, nome: '1. Atendimento & Listas', responsavel: 'Kauê', atribuicao: 'Atendimento, organização de tamanhos/nomes e aprovação no ZAP.', data: '01/11', ok: true },
      { etapa: 2, nome: '2. Arte & Layout', responsavel: 'Luiz/David (Design)', atribuicao: 'Criação da arte visual e envio para aprovação final do cliente.', data: '02/11', ok: true },
      { etapa: 3, nome: '3. Gabarito & Plotter', responsavel: 'Dudu (Design)', atribuicao: 'Montagem dos gabaritos operacionais para rodar nas 2 plotters.', data: '04/11', ok: true },
      { etapa: 4, nome: '4. Papel, Kit & Costura', responsavel: 'Jonatan', atribuicao: 'Corte do papel impresso, separação de aviamentos e envio costura.', data: '', ok: false },
      { etapa: 5, nome: '5. Prensagem & Embalagem', responsavel: 'Jonatan', atribuicao: 'Prensagem térmica das peças e apoio na embalagem final.', data: '', ok: false }
    ],
    qualidadeFinal: {
      semManchas: false,
      conferido: false,
      prontaEntrega: false,
      conferenteAssinatura: '',
      dataConferencia: ''
    }
  },
  {
    id: 'ped_102',
    numero: 'OP-2026-0042',
    clienteId: 'cli_02',
    responsavelId: 'usr_kaue',
    turmaResponsavel: 'Diretoria de Esportes — Lote Jogos Universitários',
    status: 'recebido',
    subStatus: 'Aguardando Análise Técnica & Lista Final',
    criadoEm: '2026-11-05 07:45',
    atualizadoEm: '2026-11-05 07:45',
    entregaPrevista: '2026-11-25',
    listaAprovada: false,
    consentimentoLgpd: true,
    especificacoes: {
      tipoGola: 'V',
      modelagemCamisa: 'Regata',
      tecnicaImpressao: 'Sublimação Total',
      arteAprovada: false,
      gabaritoPlotter: false,
      malhaCamisaTipo: 'Dry Furadinho NBA',
      malhaCamisaKg: '14.0',
      malhaShortTipo: 'Tactel Pesado',
      malhaShortKg: '9.5',
      golaPunho: 'Viés Prórpio Preto/Vermelho',
      botoesQtd: '0',
      elasticoMm: '50mm',
      cadarco: 'Preto Roliço Ponteira',
      observacoesArte: 'Kit Basquete + Torcida: Vermelho rubro com mascote Grifo em marca d’água na frente.'
    },
    grade: {
      padrao: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 2, 'P': 10, 'M': 22, 'G': 16, 'GG': 8, 'XGG': 4, 'XXGG': 2 },
      babylook: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 5, 'P': 12, 'M': 8, 'G': 2, 'GG': 0, 'XGG': 0, 'XXGG': 0 }
    },
    listaNomes: 'Lista enviada via link rastreável #kaue-atend. Aguardando validação de 3 tamanhos XGG.',
    rotaOperacional: [
      { etapa: 1, nome: '1. Atendimento & Listas', responsavel: 'Kauê', atribuicao: 'Atendimento, organização de tamanhos/nomes e aprovação no ZAP.', data: '', ok: false },
      { etapa: 2, nome: '2. Arte & Layout', responsavel: 'Luiz/David (Design)', atribuicao: 'Criação da arte visual e envio para aprovação final do cliente.', data: '', ok: false },
      { etapa: 3, nome: '3. Gabarito & Plotter', responsavel: 'Dudu (Design)', atribuicao: 'Montagem dos gabaritos operacionais para rodar nas 2 plotters.', data: '', ok: false },
      { etapa: 4, nome: '4. Papel, Kit & Costura', responsavel: 'Jonatan', atribuicao: 'Corte do papel impresso, separação de aviamentos e envio costura.', data: '', ok: false },
      { etapa: 5, nome: '5. Prensagem & Embalagem', responsavel: 'Jonatan', atribuicao: 'Prensagem térmica das peças e apoio na embalagem final.', data: '', ok: false }
    ],
    qualidadeFinal: {
      semManchas: false,
      conferido: false,
      prontaEntrega: false,
      conferenteAssinatura: '',
      dataConferencia: ''
    }
  },
  {
    id: 'ped_103',
    numero: 'OP-2026-0039',
    clienteId: 'cli_03',
    responsavelId: 'usr_silas',
    turmaResponsavel: 'Patrícia (RH) — Uniforme Operadores de Caixa e Frente de Loja',
    status: 'concluido',
    subStatus: 'Entregue e Conferido',
    criadoEm: '2026-10-18 11:20',
    atualizadoEm: '2026-10-30 17:10',
    entregaPrevista: '2026-10-30',
    listaAprovada: true,
    consentimentoLgpd: true,
    especificacoes: {
      tipoGola: 'Polo',
      modelagemCamisa: 'Padrão/Unissex + Baby Look',
      tecnicaImpressao: 'Bordado',
      arteAprovada: true,
      gabaritoPlotter: true,
      malhaCamisaTipo: 'Piquet PA Premium Verde Escuro',
      malhaCamisaKg: '32.0',
      malhaShortTipo: 'Não possui',
      malhaShortKg: '0',
      golaPunho: 'Gola Polo Retilínea Verde c/ Friso Amarelo',
      botoesQtd: '360 (3 por peça)',
      elasticoMm: '-',
      cadarco: '-',
      observacoesArte: 'Bordado de alta definição no peito esquerdo (Logo Super Bom Preço) e bandeira nas mangas.'
    },
    grade: {
      padrao: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 0, 'P': 15, 'M': 30, 'G': 25, 'GG': 10, 'XGG': 5, 'XXGG': 0 },
      babylook: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 5, 'P': 12, 'M': 14, 'G': 4, 'GG': 0, 'XGG': 0, 'XXGG': 0 }
    },
    listaNomes: 'Uniforme corporativo padrão sem nomes individuais (Total: 120 camisas polo).',
    rotaOperacional: [
      { etapa: 1, nome: '1. Atendimento & Listas', responsavel: 'Kauê', atribuicao: 'Atendimento, organização de tamanhos/nomes e aprovação no ZAP.', data: '18/10', ok: true },
      { etapa: 2, nome: '2. Arte & Layout', responsavel: 'Luiz/David (Design)', atribuicao: 'Criação da arte visual e envio para aprovação final do cliente.', data: '19/10', ok: true },
      { etapa: 3, nome: '3. Gabarito & Plotter', responsavel: 'Dudu (Design)', atribuicao: 'Montagem dos gabaritos operacionais para rodar nas 2 plotters.', data: '21/10', ok: true },
      { etapa: 4, nome: '4. Papel, Kit & Costura', responsavel: 'Jonatan', atribuicao: 'Corte do papel impresso, separação de aviamentos e envio costura.', data: '26/10', ok: true },
      { etapa: 5, nome: '5. Prensagem & Embalagem', responsavel: 'Jonatan', atribuicao: 'Prensagem térmica das peças e apoio na embalagem final.', data: '30/10', ok: true }
    ],
    qualidadeFinal: {
      semManchas: true,
      conferido: true,
      prontaEntrega: true,
      conferenteAssinatura: 'Jonatan Silva (Conferente Chefe)',
      dataConferencia: '30/10/2026'
    }
  },
  {
    id: 'ped_104',
    numero: 'OP-2026-0043',
    clienteId: 'cli_04',
    responsavelId: 'usr_luiz',
    turmaResponsavel: 'Coord. Marcos — Curso Técnico em Enfermagem (Turma B)',
    status: 'em_andamento',
    subStatus: 'Etapa 2: Arte & Layout',
    criadoEm: '2026-11-03 14:10',
    atualizadoEm: '2026-11-04 11:25',
    entregaPrevista: '2026-11-20',
    listaAprovada: true,
    consentimentoLgpd: true,
    especificacoes: {
      tipoGola: 'Redonda',
      modelagemCamisa: 'Padrão/Unissex + Baby Look',
      tecnicaImpressao: 'DTF',
      arteAprovada: false,
      gabaritoPlotter: false,
      malhaCamisaTipo: 'Malha PV Anti-Pilling Branca',
      malhaCamisaKg: '15.2',
      malhaShortTipo: 'Não possui',
      malhaShortKg: '0',
      golaPunho: 'Ribana Branca Tradicional',
      botoesQtd: '0',
      elasticoMm: '-',
      cadarco: '-',
      observacoesArte: 'Brasão Enfermagem colorido em DTF no peito e identificação Estágio Supervisionado nas costas.'
    },
    grade: {
      padrao: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 0, 'P': 4, 'M': 8, 'G': 6, 'GG': 2, 'XGG': 0, 'XXGG': 0 },
      babylook: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 4, 'P': 14, 'M': 12, 'G': 6, 'GG': 2, 'XGG': 0, 'XXGG': 0 }
    },
    listaNomes: 'Grade fechada de 58 camisetas técnicas brancas.',
    rotaOperacional: [
      { etapa: 1, nome: '1. Atendimento & Listas', responsavel: 'Kauê', atribuicao: 'Atendimento, organização de tamanhos/nomes e aprovação no ZAP.', data: '03/11', ok: true },
      { etapa: 2, nome: '2. Arte & Layout', responsavel: 'Luiz/David (Design)', atribuicao: 'Criação da arte visual e envio para aprovação final do cliente.', data: '', ok: false },
      { etapa: 3, nome: '3. Gabarito & Plotter', responsavel: 'Dudu (Design)', atribuicao: 'Montagem dos gabaritos operacionais para rodar nas 2 plotters.', data: '', ok: false },
      { etapa: 4, nome: '4. Papel, Kit & Costura', responsavel: 'Jonatan', atribuicao: 'Corte do papel impresso, separação de aviamentos e envio costura.', data: '', ok: false },
      { etapa: 5, nome: '5. Prensagem & Embalagem', responsavel: 'Jonatan', atribuicao: 'Prensagem térmica das peças e apoio na embalagem final.', data: '', ok: false }
    ],
    qualidadeFinal: {
      semManchas: false,
      conferido: false,
      prontaEntrega: false,
      conferenteAssinatura: '',
      dataConferencia: ''
    }
  },
  {
    id: 'ped_105',
    numero: 'OP-2026-0044',
    clienteId: 'cli_01',
    responsavelId: 'usr_kaue',
    turmaResponsavel: 'Coord. Infantil — Reposição Uniforme Educação Física Infantil',
    status: 'recebido',
    subStatus: 'Recebido via Link Rastreável (Cliente Recorrente)',
    criadoEm: '2026-11-05 08:00',
    atualizadoEm: '2026-11-05 08:00',
    entregaPrevista: '2026-11-22',
    listaAprovada: true,
    consentimentoLgpd: true,
    especificacoes: {
      tipoGola: 'Redonda',
      modelagemCamisa: 'Infantil + Padrão',
      tecnicaImpressao: 'Sublimação Localizada',
      arteAprovada: true,
      gabaritoPlotter: false,
      malhaCamisaTipo: 'Malha PV Branca Escolar',
      malhaCamisaKg: '11.0',
      malhaShortTipo: 'Helanca Colegial Azul Royal',
      malhaShortKg: '8.5',
      golaPunho: 'Ribana Azul Royal',
      botoesQtd: '0',
      elasticoMm: '35mm',
      cadarco: 'Branco Escolar',
      observacoesArte: 'Mesma arte aprovada do pedido anterior do Colégio Dom Pedro II (vinculado automaticamente pelo CNPJ).'
    },
    grade: {
      padrao: { '2': 6, '4': 10, '6': 14, '8': 12, '10': 10, '12': 8, 'PP': 4, 'P': 2, 'M': 0, 'G': 0, 'GG': 0, 'XGG': 0, 'XXGG': 0 },
      babylook: { '2': 0, '4': 0, '6': 0, '8': 0, '10': 0, '12': 0, 'PP': 0, 'P': 0, 'M': 0, 'G': 0, 'GG': 0, 'XGG': 0, 'XXGG': 0 }
    },
    listaNomes: 'Reposição de estoque escolar infantil tamanhos 2 ao 12.',
    rotaOperacional: [
      { etapa: 1, nome: '1. Atendimento & Listas', responsavel: 'Kauê', atribuicao: 'Atendimento, organização de tamanhos/nomes e aprovação no ZAP.', data: '05/11', ok: true },
      { etapa: 2, nome: '2. Arte & Layout', responsavel: 'Luiz/David (Design)', atribuicao: 'Criação da arte visual e envio para aprovação final do cliente.', data: '', ok: false },
      { etapa: 3, nome: '3. Gabarito & Plotter', responsavel: 'Dudu (Design)', atribuicao: 'Montagem dos gabaritos operacionais para rodar nas 2 plotters.', data: '', ok: false },
      { etapa: 4, nome: '4. Papel, Kit & Costura', responsavel: 'Jonatan', atribuicao: 'Corte do papel impresso, separação de aviamentos e envio costura.', data: '', ok: false },
      { etapa: 5, nome: '5. Prensagem & Embalagem', responsavel: 'Jonatan', atribuicao: 'Prensagem térmica das peças e apoio na embalagem final.', data: '', ok: false }
    ],
    qualidadeFinal: {
      semManchas: false,
      conferido: false,
      prontaEntrega: false,
      conferenteAssinatura: '',
      dataConferencia: ''
    }
  }
];

const INITIAL_AUDIT_LOGS = [
  {
    id: 'aud_01',
    dataHora: '05/11/2026 08:00:12',
    usuarioId: 'usr_kaue',
    usuarioNome: 'Sistema (Link #kaue-atend)',
    pedidoId: 'ped_105',
    pedidoNumero: 'OP-2026-0044',
    campo: 'Captação Automática & Vínculo Cliente',
    valorAnterior: 'Novo Formulário Recebido',
    valorNovo: 'Vinculado ao CNPJ 12.345.678/0001-90 (Colégio Dom Pedro II) — Status: Recebido'
  },
  {
    id: 'aud_02',
    dataHora: '05/11/2026 07:45:30',
    usuarioId: 'usr_kaue',
    usuarioNome: 'Sistema (Link #kaue-atend)',
    pedidoId: 'ped_102',
    pedidoNumero: 'OP-2026-0042',
    campo: 'Criação de Pedido via Link Exclusivo',
    valorAnterior: '—',
    valorNovo: 'OP-2026-0042 criada e atribuída a Kauê (91 peças)'
  },
  {
    id: 'aud_03',
    dataHora: '04/11/2026 16:30:05',
    usuarioId: 'usr_dudu',
    usuarioNome: 'Dudu (Gabarito & Plotter)',
    pedidoId: 'ped_101',
    pedidoNumero: 'OP-2026-0041',
    campo: 'Rota Etapa 3 (Gabarito & Plotter)',
    valorAnterior: 'Pendente [ ]',
    valorNovo: 'Concluído [OK] em 04/11'
  },
  {
    id: 'aud_04',
    dataHora: '04/11/2026 11:25:44',
    usuarioId: 'usr_luiz',
    usuarioNome: 'Luiz/David (Design)',
    pedidoId: 'ped_104',
    pedidoNumero: 'OP-2026-0043',
    campo: 'Status do Pedido',
    valorAnterior: 'Recebido',
    valorNovo: 'Em Andamento (Etapa 2: Arte & Layout)'
  },
  {
    id: 'aud_05',
    dataHora: '02/11/2026 15:12:19',
    usuarioId: 'usr_kaue',
    usuarioNome: 'Kauê (Atendimento)',
    pedidoId: 'ped_101',
    pedidoNumero: 'OP-2026-0041',
    campo: 'Grade Padrão/Unissex (Tamanho M)',
    valorAnterior: '15 peças (Total: 81)',
    valorNovo: '18 peças (Total: 84)'
  },
  {
    id: 'aud_06',
    dataHora: '30/10/2026 17:10:00',
    usuarioId: 'usr_silas',
    usuarioNome: 'Silas (Admin)',
    pedidoId: 'ped_103',
    pedidoNumero: 'OP-2026-0039',
    campo: 'Status do Pedido & Qualidade Final',
    valorAnterior: 'Em Andamento',
    valorNovo: 'Concluído (Conferido por Jonatan Silva)'
  }
];

// Estado global em memória (sincronizado com localStorage)
let state = {
  currentUserId: 'usr_kaue',
  activeTab: 'pedidos',
  orderFilter: 'todos', // todos | recebido | em_andamento | concluido | meus
  orderViewMode: 'table', // table | kanban
  formSellerId: 'usr_kaue',
  users: [],
  clients: [],
  orders: [],
  auditLogs: []
};

let currentOpenOrderId = null;
let currentOpenClientId = null;

// ============================================================================
// INICIALIZAÇÃO E PERSISTÊNCIA
// ============================================================================
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state.users = parsed.users || structuredClone(INITIAL_USERS);
      state.clients = parsed.clients || structuredClone(INITIAL_CLIENTS);
      state.orders = parsed.orders || structuredClone(INITIAL_ORDERS);
      state.auditLogs = parsed.auditLogs || structuredClone(INITIAL_AUDIT_LOGS);
      state.currentUserId = parsed.currentUserId || 'usr_kaue';
      state.formSellerId = parsed.formSellerId || state.currentUserId;
    } else {
      resetToDefaults(false);
    }
  } catch (e) {
    console.error('Erro ao carregar estado:', e);
    resetToDefaults(false);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      users: state.users,
      clients: state.clients,
      orders: state.orders,
      auditLogs: state.auditLogs,
      currentUserId: state.currentUserId,
      formSellerId: state.formSellerId
    }));
  } catch (e) {
    console.error('Erro ao salvar estado:', e);
  }
}

function resetToDefaults(showNotification = true) {
  state.users = structuredClone(INITIAL_USERS);
  state.clients = structuredClone(INITIAL_CLIENTS);
  state.orders = structuredClone(INITIAL_ORDERS);
  state.auditLogs = structuredClone(INITIAL_AUDIT_LOGS);
  state.currentUserId = 'usr_kaue';
  state.formSellerId = 'usr_kaue';
  state.orderFilter = 'todos';
  saveState();
  renderAll();
  if (showNotification) {
    showToast('Dados de demonstração restaurados com sucesso!', 'info');
  }
}

function resetDemoData() {
  resetToDefaults(true);
}

// ============================================================================
// FUNÇÕES UTILITÁRIAS E PERMISSÕES
// ============================================================================
function getCurrentUser() {
  return state.users.find(u => u.id === state.currentUserId) || state.users[0];
}

function getUserById(id) {
  return state.users.find(u => u.id === id);
}

function getClientById(id) {
  return state.clients.find(c => c.id === id);
}

function getOrderById(id) {
  return state.orders.find(o => o.id === id);
}

function canEditOrder(order) {
  const user = getCurrentUser();
  if (!user || !order) return false;
  if (user.perfil === 'admin') return true;
  if (user.perfil === 'responsavel' && order.responsavelId === user.id) return true;
  return false;
}

function calculateRowTotal(rowObj) {
  if (!rowObj) return 0;
  return SIZES.reduce((sum, sz) => sum + (parseInt(rowObj[sz], 10) || 0), 0);
}

function calculateOrderTotalPieces(order) {
  if (!order || !order.grade) return 0;
  return calculateRowTotal(order.grade.padrao) + calculateRowTotal(order.grade.babylook);
}

function formatNowDateTime() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

function formatShortDayMonth() {
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${pad(now.getDate())}/${pad(now.getMonth() + 1)}`;
}

function formatDateBR(isoDate) {
  if (!isoDate) return '—';
  if (isoDate.includes('/')) return isoDate;
  const parts = isoDate.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return isoDate;
}

function addAuditLog(pedidoId, pedidoNumero, campo, valorAnterior, valorNovo, customUserName = null) {
  const user = getCurrentUser();
  const entry = {
    id: 'aud_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    dataHora: formatNowDateTime(),
    usuarioId: user.id,
    usuarioNome: customUserName || `${user.nomeCurto} (${getRoleLabel(user.perfil)})`,
    pedidoId: pedidoId,
    pedidoNumero: pedidoNumero,
    campo: campo,
    valorAnterior: String(valorAnterior ?? '—'),
    valorNovo: String(valorNovo ?? '—')
  };
  state.auditLogs.unshift(entry);
  saveState();
  updateNavBadges();
}

function getRoleLabel(perfil) {
  if (perfil === 'admin') return 'Administrador';
  return 'Responsável';
}

function getStatusBadgeHTML(status) {
  if (status === 'recebido') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
      <span class="w-2 h-2 rounded-full bg-amber-500"></span>Recebido
    </span>`;
  }
  if (status === 'em_andamento') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
      <span class="w-2 h-2 rounded-full bg-blue-600"></span>Em Andamento
    </span>`;
  }
  if (status === 'concluido') {
    return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
      <span class="w-2 h-2 rounded-full bg-emerald-600"></span>Concluído
    </span>`;
  }
  return `<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">${status}</span>`;
}

function getStatusLabelText(status) {
  if (status === 'recebido') return 'Recebido';
  if (status === 'em_andamento') return 'Em Andamento';
  if (status === 'concluido') return 'Concluído';
  return status;
}

// ============================================================================
// SISTEMA DE LOGIN E SESSÃO DO RESPONSÁVEL / ADMINISTRADOR
// ============================================================================
function renderTopUserSimulator() {
  const label = document.getElementById('top-logged-user-label');
  const badge = document.getElementById('current-user-role-badge');
  const currentUser = getCurrentUser();

  if (label) {
    label.textContent = `${currentUser.nomeCurto} (@${currentUser.login || currentUser.linkToken})`;
  }

  if (badge) {
    badge.textContent = getRoleLabel(currentUser.perfil);
    if (currentUser.perfil === 'admin') {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white';
    } else {
      badge.className = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white';
    }
  }
}

function openLoginModal() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;
  const currentUser = getCurrentUser();
  document.getElementById('login-username-input').value = currentUser.login || '';
  document.getElementById('login-password-input').value = '1234';
  document.getElementById('login-error-msg').classList.add('hidden');

  const quickList = document.getElementById('quick-login-accounts-list');
  if (quickList) {
    quickList.innerHTML = state.users.map(u => {
      const isCurrent = u.id === currentUser.id;
      const myCount = state.orders.filter(o => o.responsavelId === u.id).length;
      return `
        <button type="button" onclick="loginAsUser('${u.id}')" class="w-full p-2.5 rounded-xl border ${isCurrent ? 'border-blue-500 bg-blue-50/80' : 'border-slate-200 hover:bg-slate-50'} flex items-center justify-between text-left transition">
          <div>
            <div class="flex items-center gap-1.5">
              <span class="font-bold text-xs text-slate-900">${u.nome}</span>
              ${isCurrent ? `<span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-600 text-white">Ativo</span>` : ''}
            </div>
            <div class="text-[11px] font-mono-code text-slate-500">Login: <strong>@${u.login}</strong> • Senha: 1234 • ${myCount} pedido(s)</div>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase ${u.perfil === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
            ${getRoleLabel(u.perfil)}
          </span>
        </button>
      `;
    }).join('');
  }

  modal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeLoginModal() {
  document.getElementById('login-modal')?.classList.add('hidden');
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const rawLogin = (document.getElementById('login-username-input')?.value || '').trim().toLowerCase().replace(/^@/, '');
  const rawPass = (document.getElementById('login-password-input')?.value || '').trim();

  const foundUser = state.users.find(u =>
    (u.login && u.login.toLowerCase() === rawLogin) ||
    (u.email && u.email.toLowerCase() === rawLogin) ||
    (u.linkToken && u.linkToken.toLowerCase() === rawLogin)
  );

  if (!foundUser || (foundUser.senha && foundUser.senha !== rawPass)) {
    const err = document.getElementById('login-error-msg');
    err.classList.remove('hidden');
    return;
  }

  loginAsUser(foundUser.id);
}

function loginAsUser(userId) {
  state.currentUserId = userId;
  state.formSellerId = userId;
  saveState();
  closeLoginModal();
  renderAll();
  const u = getCurrentUser();
  showToast(`Login realizado na conta @${u.login} (${u.nomeCurto} — ${getRoleLabel(u.perfil)})`, 'success');
}

function changeCurrentUser(userId) {
  loginAsUser(userId);
}

function switchTab(tabId) {
  state.activeTab = tabId;
  document.querySelectorAll('.tab-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(`tab-${tabId}`);
  if (target) target.classList.remove('hidden');

  // Destacar botão ativo
  const tabs = ['pedidos', 'clientes', 'auditoria', 'usuario', 'cliente-portal'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (!btn) return;
    if (t === tabId) {
      if (t === 'cliente-portal') {
        btn.className = 'nav-tab-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap bg-emerald-600 text-white shadow-xs';
      } else {
        btn.className = 'nav-tab-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-bold transition whitespace-nowrap bg-silas-900 text-white shadow-xs';
      }
    } else {
      if (t === 'cliente-portal') {
        btn.className = 'nav-tab-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap border border-emerald-200 bg-emerald-50/70 text-emerald-800 hover:bg-emerald-100';
      } else {
        btn.className = 'nav-tab-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100';
      }
    }
  });

  renderAll();
  if (window.lucide) lucide.createIcons();
}

function updateNavBadges() {
  document.getElementById('nav-badge-pedidos').textContent = state.orders.length;
  document.getElementById('nav-badge-clientes').textContent = state.clients.length;
  document.getElementById('nav-badge-auditoria').textContent = state.auditLogs.length;
}

// ============================================================================
// ABA 1: PEDIDOS E ORDENS DE PRODUÇÃO (OPs) + FILTROS
// ============================================================================
function setOrderFilter(filterName) {
  state.orderFilter = filterName;
  renderOrders();
}

function setOrderViewMode(mode) {
  state.orderViewMode = mode;
  const btnTable = document.getElementById('view-mode-table');
  const btnKanban = document.getElementById('view-mode-kanban');
  const tableContainer = document.getElementById('orders-table-container');
  const kanbanContainer = document.getElementById('orders-kanban-container');

  if (mode === 'table') {
    btnTable.className = 'px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 bg-white shadow-xs text-slate-800';
    btnKanban.className = 'px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 text-slate-500 hover:text-slate-800';
    tableContainer.classList.remove('hidden');
    kanbanContainer.classList.add('hidden');
  } else {
    btnKanban.className = 'px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 bg-white shadow-xs text-slate-800';
    btnTable.className = 'px-2.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1 text-slate-500 hover:text-slate-800';
    tableContainer.classList.add('hidden');
    kanbanContainer.classList.remove('hidden');
  }
  renderOrders();
}

function renderOrders() {
  const currentUser = getCurrentUser();
  const searchQuery = (document.getElementById('order-search-input')?.value || '').trim().toLowerCase();

  // Contagens para os filtros: Todos, Recebido, Em Andamento, Concluído e Meus
  const counts = {
    todos: state.orders.length,
    recebido: state.orders.filter(o => o.status === 'recebido').length,
    em_andamento: state.orders.filter(o => o.status === 'em_andamento').length,
    concluido: state.orders.filter(o => o.status === 'concluido').length,
    meus: state.orders.filter(o => o.responsavelId === currentUser.id).length
  };

  Object.keys(counts).forEach(key => {
    const badge = document.getElementById(`count-filter-${key}`);
    if (badge) badge.textContent = counts[key];
  });

  // Estilizar botões de filtro
  document.querySelectorAll('.order-filter-btn').forEach(btn => {
    const f = btn.getAttribute('data-filter');
    const isActive = f === state.orderFilter;
    if (isActive) {
      btn.className = 'order-filter-btn px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-1.5 bg-silas-900 text-white shadow-xs';
    } else {
      btn.className = 'order-filter-btn px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700';
    }
  });

  // Renderizar KPIs no topo da aba de Pedidos
  const totalPecasGeral = state.orders.reduce((acc, o) => acc + calculateOrderTotalPieces(o), 0);
  const kpiContainer = document.getElementById('pedidos-kpi-cards');
  kpiContainer.innerHTML = `
    <div onclick="setOrderFilter('todos')" class="cursor-pointer bg-white rounded-xl p-4 border ${state.orderFilter === 'todos' ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'} shadow-xs hover:border-blue-300 transition">
      <div class="flex items-center justify-between text-xs font-semibold text-slate-500">
        <span>Total de Pedidos (OPs)</span>
        <i data-lucide="layers" class="w-4 h-4 text-slate-400"></i>
      </div>
      <div class="text-2xl font-extrabold text-slate-900 mt-1">${counts.todos}</div>
      <div class="text-[11px] text-slate-500 mt-1">${totalPecasGeral} peças somadas na grade</div>
    </div>

    <div onclick="setOrderFilter('recebido')" class="cursor-pointer bg-white rounded-xl p-4 border ${state.orderFilter === 'recebido' ? 'border-amber-500 ring-2 ring-amber-100' : 'border-slate-200'} shadow-xs hover:border-amber-300 transition">
      <div class="flex items-center justify-between text-xs font-semibold text-amber-700">
        <span>Recebidos (Novos)</span>
        <i data-lucide="inbox" class="w-4 h-4 text-amber-500"></i>
      </div>
      <div class="text-2xl font-extrabold text-amber-600 mt-1">${counts.recebido}</div>
      <div class="text-[11px] text-slate-500 mt-1">Captados via link aguardando início</div>
    </div>

    <div onclick="setOrderFilter('em_andamento')" class="cursor-pointer bg-white rounded-xl p-4 border ${state.orderFilter === 'em_andamento' ? 'border-blue-600 ring-2 ring-blue-100' : 'border-slate-200'} shadow-xs hover:border-blue-300 transition">
      <div class="flex items-center justify-between text-xs font-semibold text-blue-700">
        <span>Em Andamento</span>
        <i data-lucide="hammer" class="w-4 h-4 text-blue-600"></i>
      </div>
      <div class="text-2xl font-extrabold text-blue-600 mt-1">${counts.em_andamento}</div>
      <div class="text-[11px] text-slate-500 mt-1">Arte, Plotter, Costura ou Prensagem</div>
    </div>

    <div onclick="setOrderFilter('concluido')" class="cursor-pointer bg-white rounded-xl p-4 border ${state.orderFilter === 'concluido' ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200'} shadow-xs hover:border-emerald-300 transition">
      <div class="flex items-center justify-between text-xs font-semibold text-emerald-700">
        <span>Concluídos</span>
        <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
      </div>
      <div class="text-2xl font-extrabold text-emerald-600 mt-1">${counts.concluido}</div>
      <div class="text-[11px] text-slate-500 mt-1">Qualidade conferida & prontos</div>
    </div>

    <div onclick="setOrderFilter('meus')" class="cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border ${state.orderFilter === 'meus' ? 'border-blue-600 ring-2 ring-blue-200' : 'border-blue-200'} shadow-xs hover:border-blue-400 transition col-span-2 sm:col-span-1">
      <div class="flex items-center justify-between text-xs font-bold text-blue-900">
        <span>Meus Pedidos (${currentUser.nomeCurto})</span>
        <i data-lucide="user-check" class="w-4 h-4 text-blue-600"></i>
      </div>
      <div class="text-2xl font-extrabold text-blue-900 mt-1">${counts.meus}</div>
      <div class="text-[11px] text-blue-700 mt-1">Atribuídos ao seu link rastreável</div>
    </div>
  `;

  // Descrições de filtro e permissão
  const filterDesc = document.getElementById('active-filter-description');
  const filterNames = {
    todos: 'Exibindo <strong>Todos os Pedidos</strong> da fábrica.',
    recebido: 'Filtro ativo: <strong>Recebido</strong> (pedidos recém-chegados pelo formulário do cliente).',
    em_andamento: 'Filtro ativo: <strong>Em Andamento</strong> (pedidos percorrendo as 5 etapas da OP Mestra).',
    concluido: 'Filtro ativo: <strong>Concluído</strong> (pedidos finalizados e conferidos).',
    meus: `Filtro ativo: <strong>Meus Pedidos</strong> (apenas pedidos vinculados ao responsável <strong>${currentUser.nome}</strong>).`
  };
  filterDesc.innerHTML = `<i data-lucide="filter" class="w-3.5 h-3.5 text-blue-600"></i><span>${filterNames[state.orderFilter] || ''}</span>`;

  const permBanner = document.getElementById('permission-hint-banner');
  if (currentUser.perfil === 'admin') {
    permBanner.innerHTML = `<span class="text-purple-700 font-bold">Conta Administrador (@${currentUser.login}):</span> Acesso total liberado para editar pedidos próprios, de outros responsáveis e gerenciar contas.`;
  } else {
    permBanner.innerHTML = `<span class="text-blue-700 font-bold">Conta Responsável (@${currentUser.login}):</span> Você pode editar os pedidos vinculados ao seu login e apenas visualizar os de outros responsáveis.`;
  }

  // Filtrar lista de pedidos
  const filteredOrders = state.orders.filter(order => {
    if (state.orderFilter === 'recebido' && order.status !== 'recebido') return false;
    if (state.orderFilter === 'em_andamento' && order.status !== 'em_andamento') return false;
    if (state.orderFilter === 'concluido' && order.status !== 'concluido') return false;
    if (state.orderFilter === 'meus' && order.responsavelId !== currentUser.id) return false;

    if (searchQuery) {
      const client = getClientById(order.clienteId);
      const seller = getUserById(order.responsavelId);
      const haystack = [
        order.numero,
        order.turmaResponsavel,
        order.subStatus,
        order.especificacoes?.tipoGola,
        order.especificacoes?.tecnicaImpressao,
        client?.nome,
        client?.documento,
        seller?.nome
      ].join(' ').toLowerCase();
      if (!haystack.includes(searchQuery)) return false;
    }
    return true;
  });

  // Renderizar na Tabela
  const tableContainer = document.getElementById('orders-table-container');
  if (filteredOrders.length === 0) {
    tableContainer.innerHTML = `
      <div class="p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <i data-lucide="search-x" class="w-6 h-6"></i>
        </div>
        <div class="text-base font-bold text-slate-800">Nenhum pedido encontrado neste filtro</div>
        <p class="text-xs text-slate-500 max-w-md mx-auto">
          Experimente mudar o filtro acima para "Todos" ou clique em "Simular Envio de Cliente" para gerar um novo pedido rastreável.
        </p>
      </div>
    `;
  } else {
    tableContainer.innerHTML = `
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th class="py-3.5 px-4">Nº OP / Data</th>
              <th class="py-3.5 px-4">Cliente / Escola & Turma</th>
              <th class="py-3.5 px-4">Especificações & Grade</th>
              <th class="py-3.5 px-4">Responsável (Link)</th>
              <th class="py-3.5 px-4">Status & Progresso OP</th>
              <th class="py-3.5 px-4">Entrega Prev.</th>
              <th class="py-3.5 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 text-sm">
            ${filteredOrders.map(order => {
              const client = getClientById(order.clienteId);
              const seller = getUserById(order.responsavelId);
              const totalPecas = calculateOrderTotalPieces(order);
              const stepsDone = order.rotaOperacional.filter(r => r.ok).length;
              const isMine = order.responsavelId === currentUser.id;
              const editable = canEditOrder(order);

              return `
                <tr class="hover:bg-slate-50/90 transition group">
                  <td class="py-3.5 px-4 align-top">
                    <div class="flex items-center gap-1.5">
                      <span onclick="openOrderModal('${order.id}')" class="font-mono-code font-bold text-blue-700 hover:underline cursor-pointer">${order.numero}</span>
                      ${isMine ? `<span class="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Meu</span>` : ''}
                    </div>
                    <div class="text-[11px] text-slate-400 mt-0.5">${order.criadoEm}</div>
                  </td>

                  <td class="py-3.5 px-4 align-top">
                    <div onclick="openClientModal('${client?.id}')" class="font-bold text-slate-900 hover:text-blue-600 cursor-pointer flex items-center gap-1">
                      <span>${client ? client.nome : 'Cliente não encontrado'}</span>
                    </div>
                    <div class="text-xs text-slate-500 mt-0.5">${order.turmaResponsavel}</div>
                    <div class="text-[11px] text-slate-400 font-mono-code mt-0.5">${client?.documento || ''} • ${client?.telefone || ''}</div>
                  </td>

                  <td class="py-3.5 px-4 align-top">
                    <div class="flex flex-wrap items-center gap-1">
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">${order.especificacoes.tecnicaImpressao}</span>
                      <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs">Gola ${order.especificacoes.tipoGola}</span>
                    </div>
                    <div class="text-xs font-bold text-slate-800 mt-1.5">
                      Grade Total: <span class="text-blue-700 font-mono-code">${totalPecas} peças</span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 align-top">
                    <div class="font-semibold text-slate-800 text-xs">${seller ? seller.nomeCurto : '—'}</div>
                    <div class="text-[11px] font-mono-code text-blue-600 font-semibold">@${seller ? (seller.login || seller.linkToken) : ''}</div>
                  </td>

                  <td class="py-3.5 px-4 align-top">
                    <div class="flex flex-col gap-1.5">
                      <div>${getStatusBadgeHTML(order.status)}</div>
                      <div class="text-[11px] text-slate-600 font-medium">${order.subStatus || ''}</div>
                      <div class="w-36 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-blue-600 h-full rounded-full" style="width: ${(stepsDone / 5) * 100}%"></div>
                      </div>
                      <div class="text-[10px] text-slate-400">${stepsDone}/5 etapas da OP concluídas</div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 align-top">
                    <div class="text-xs font-bold text-slate-800">${formatDateBR(order.entregaPrevista)}</div>
                    <div class="text-[11px] ${order.listaAprovada ? 'text-emerald-600' : 'text-amber-600'} font-medium mt-0.5">
                      ${order.listaAprovada ? '✓ Lista Aprovada' : '⏳ Lista Pendente'}
                    </div>
                  </td>

                  <td class="py-3.5 px-4 align-top text-right whitespace-nowrap">
                    <div class="inline-flex items-center gap-1.5">
                      <button onclick="openOrderModal('${order.id}')" class="px-3 py-1.5 rounded-lg ${editable ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} text-xs font-semibold transition inline-flex items-center gap-1">
                        <i data-lucide="${editable ? 'sliders-horizontal' : 'eye'}" class="w-3.5 h-3.5"></i>
                        <span>${editable ? 'Gerenciar OP' : 'Visualizar'}</span>
                      </button>
                      <button onclick="openPrintableOPModal('${order.id}')" class="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition" title="Imprimir Folha OP Mestra">
                        <i data-lucide="printer" class="w-4 h-4"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Renderizar Visão Kanban
  renderKanbanBoard(filteredOrders);

  if (window.lucide) lucide.createIcons();
}

function renderKanbanBoard(filteredOrders) {
  const kanbanContainer = document.getElementById('orders-kanban-container');
  if (!kanbanContainer) return;

  const columns = [
    { key: 'recebido', title: '1. Recebido (Novos)', badgeClass: 'bg-amber-100 text-amber-800', borderClass: 'border-t-4 border-t-amber-500' },
    { key: 'em_andamento', title: '2. Em Andamento (Produção)', badgeClass: 'bg-blue-100 text-blue-800', borderClass: 'border-t-4 border-t-blue-600' },
    { key: 'concluido', title: '3. Concluído (Pronto)', badgeClass: 'bg-emerald-100 text-emerald-800', borderClass: 'border-t-4 border-t-emerald-600' },
    { key: 'meus_destaque', title: `Atribuídos a ${getCurrentUser().nomeCurto}`, badgeClass: 'bg-purple-100 text-purple-800', borderClass: 'border-t-4 border-t-purple-600' }
  ];

  kanbanContainer.innerHTML = columns.map(col => {
    const items = col.key === 'meus_destaque'
      ? filteredOrders.filter(o => o.responsavelId === state.currentUserId)
      : filteredOrders.filter(o => o.status === col.key);

    return `
      <div class="bg-slate-100/90 rounded-xl border border-slate-200 ${col.borderClass} p-3 space-y-3">
        <div class="flex items-center justify-between px-1">
          <h4 class="text-xs font-extrabold uppercase tracking-wider text-slate-700">${col.title}</h4>
          <span class="px-2 py-0.5 rounded-full text-xs font-bold ${col.badgeClass}">${items.length}</span>
        </div>
        <div class="space-y-2.5">
          ${items.length === 0 ? `<div class="text-xs text-slate-400 text-center py-6 bg-white/50 rounded-lg border border-dashed border-slate-200">Sem pedidos nesta coluna</div>` : items.map(order => {
            const client = getClientById(order.clienteId);
            const totalPecas = calculateOrderTotalPieces(order);
            const stepsDone = order.rotaOperacional.filter(r => r.ok).length;
            return `
              <div onclick="openOrderModal('${order.id}')" class="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 cursor-pointer transition space-y-2">
                <div class="flex items-center justify-between">
                  <span class="font-mono-code font-bold text-xs text-blue-700">${order.numero}</span>
                  <span class="text-[11px] font-semibold text-slate-500">${totalPecas} pçs</span>
                </div>
                <div class="font-bold text-sm text-slate-900 leading-snug">${client?.nome || ''}</div>
                <div class="text-xs text-slate-500 line-clamp-1">${order.turmaResponsavel}</div>
                <div class="pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                  <span>Etapas: ${stepsDone}/5</span>
                  <span>Entrega: ${formatDateBR(order.entregaPrevista)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// MODAL DE DETALHES E EDIÇÃO DA ORDEM DE PRODUÇÃO (OP) + AUDITORIA AUTOMÁTICA
// ============================================================================
function openOrderModal(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;
  currentOpenOrderId = orderId;

  const client = getClientById(order.clienteId);
  const seller = getUserById(order.responsavelId);
  const editable = canEditOrder(order);
  const currentUser = getCurrentUser();

  document.getElementById('modal-op-number').textContent = order.numero;
  document.getElementById('modal-client-name').textContent = `${client?.nome || ''} — ${order.turmaResponsavel}`;
  document.getElementById('modal-client-sub').textContent = `Conta Responsável pelo Link: ${seller?.nome || ''} (Login: @${seller?.login || seller?.linkToken || ''}) • Criado em ${order.criadoEm}`;

  const totalPadrao = calculateRowTotal(order.grade.padrao);
  const totalBabylook = calculateRowTotal(order.grade.babylook);
  const totalGeral = totalPadrao + totalBabylook;

  // Filtrar logs de auditoria deste pedido específico
  const orderLogs = state.auditLogs.filter(l => l.pedidoId === order.id);

  const body = document.getElementById('order-detail-modal-body');
  body.innerHTML = `
    <!-- Aviso de Permissão no topo do Modal -->
    <div class="rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs ${editable ? 'bg-blue-50 border border-blue-200 text-blue-900' : 'bg-amber-50 border border-amber-200 text-amber-900'}">
      <div class="flex items-center gap-2">
        <i data-lucide="${editable ? 'unlock' : 'lock'}" class="w-4 h-4 ${editable ? 'text-blue-600' : 'text-amber-600'}"></i>
        <span>
          ${editable
            ? `<strong>Edição Liberada para sua Conta (@${currentUser.login} — ${getRoleLabel(currentUser.perfil)}):</strong> Qualquer alteração neste pedido registrará automaticamente Quem, Quando, Valor Anterior e Valor Novo na <strong>Auditoria Imutável</strong>.`
            : `<strong>Edição Bloqueada por Restrição de Conta:</strong> Você está logado como <strong>@${currentUser.login}</strong> (${getRoleLabel(currentUser.perfil)}), mas este pedido pertence ao login <strong>@${seller?.login || ''}</strong>. Sua conta só permite editar seus próprios pedidos.`
          }
        </span>
      </div>
      ${!editable ? `
        <button onclick="closeOrderModal(); openLoginModal();" class="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shrink-0">
          Fazer Login como @${seller?.login || 'silas'}
        </button>
      ` : ''}
    </div>

    <!-- BLOCO 1: STATUS AUTOMÁTICO DO CICLO DE VIDA E PREVISÃO DE ENTREGA -->
    <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Status do Pedido (Automático)</label>
        <div class="flex flex-col gap-1 pt-0.5">
          <div>${getStatusBadgeHTML(order.status)}</div>
          <span class="text-[11px] text-slate-500 font-medium">
            ${order.rotaOperacional.filter(s => s.ok).length}/5 etapas concluídas no item 5
          </span>
        </div>
      </div>

      <div>
        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Previsão de Entrega</label>
        <input type="date" id="edit-order-entrega" value="${order.entregaPrevista}" ${!editable ? 'disabled' : ''} onchange="updateOrderField('${order.id}', 'entregaPrevista', 'Previsão de Entrega', this.value)" class="w-full px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg" />
      </div>

      <div>
        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Responsável Vinculado</label>
        <select id="edit-order-seller" ${currentUser.perfil !== 'admin' ? 'disabled' : ''} onchange="updateOrderSeller('${order.id}', this.value)" class="w-full px-3 py-2 text-sm font-semibold bg-white border border-slate-300 rounded-lg">
          ${state.users.map(u => `<option value="${u.id}" ${u.id === order.responsavelId ? 'selected' : ''}>${u.nomeCurto} (${getRoleLabel(u.perfil)})</option>`).join('')}
        </select>
      </div>

      <div class="flex flex-col justify-center">
        <label class="block text-[11px] font-bold uppercase text-slate-500 mb-1">Status da Lista no WhatsApp</label>
        <label class="inline-flex items-center gap-2 cursor-pointer mt-1">
          <input type="checkbox" ${order.listaAprovada ? 'checked' : ''} ${!editable ? 'disabled' : ''} onchange="updateOrderField('${order.id}', 'listaAprovada', 'Lista Aprovada no WhatsApp', this.checked)" class="w-4 h-4 text-blue-600 rounded" />
          <span class="text-sm font-semibold text-slate-800">Lista de Tamanhos Aprovada</span>
        </label>
      </div>
    </div>

    <!-- BLOCO 2: ESPECIFICAÇÕES TÉCNICAS DA OP MESTRA (SILAS CONFECÇÕES) -->
    <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <h4 class="text-sm font-extrabold uppercase tracking-wider text-silas-900 flex items-center gap-2">
          <i data-lucide="shirt" class="w-4 h-4 text-blue-600"></i>
          Especificações de Malha, Aviamentos e Impressão (OP Mestra)
        </h4>
        <span class="text-xs text-slate-400">Altere qualquer campo para registrar na auditoria</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Tipo de Gola</label>
          <select ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'tipoGola', 'Tipo de Gola', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg">
            ${['Polo', 'Redonda', 'V', 'Personalizada'].map(g => `<option value="${g}" ${order.especificacoes.tipoGola === g ? 'selected' : ''}>${g}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Modelagem Camisa</label>
          <input type="text" value="${order.especificacoes.modelagemCamisa}" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'modelagemCamisa', 'Modelagem Camisa', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Técnica / Impressão</label>
          <select ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'tecnicaImpressao', 'Técnica / Impressão', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg">
            ${['Sublimação Total', 'Sublimação Localizada', 'Bordado', 'DTF', 'Serigrafia / Silk + Bordado'].map(t => `<option value="${t}" ${order.especificacoes.tecnicaImpressao === t ? 'selected' : ''}>${t}</option>`).join('')}
          </select>
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Malha da Camisa (Tipo)</label>
          <input type="text" value="${order.especificacoes.malhaCamisaTipo}" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'malhaCamisaTipo', 'Malha da Camisa (Tipo)', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Qtd Malha Camisa (Kg)</label>
          <input type="text" value="${order.especificacoes.malhaCamisaKg}" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'malhaCamisaKg', 'Malha da Camisa (Kg)', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg font-mono-code" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Malha do Short (Tipo e Kg)</label>
          <input type="text" value="${order.especificacoes.malhaShortTipo} (${order.especificacoes.malhaShortKg} Kg)" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'malhaShortTipo', 'Malha do Short', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Aviamentos / Gola / Punho</label>
          <input type="text" value="${order.especificacoes.golaPunho}" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'golaPunho', 'Aviamentos Gola/Punho', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg" />
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Elástico / Cadarço / Botões</label>
          <input type="text" value="Elástico: ${order.especificacoes.elasticoMm} | Botões: ${order.especificacoes.botoesQtd}" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'elasticoMm', 'Logística Costura', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg" />
        </div>
      </div>

      <div>
        <label class="block text-xs font-semibold text-slate-600 mb-1">Observações da Arte & Detalhes do Pedido</label>
        <input type="text" value="${order.especificacoes.observacoesArte || ''}" ${!editable ? 'disabled' : ''} onchange="updateOrderSpec('${order.id}', 'observacoesArte', 'Observações da Arte', this.value)" class="w-full px-3 py-1.5 text-sm border border-slate-300 rounded-lg" />
      </div>
    </div>

    <!-- BLOCO 3: ITEM 4 DA OP — GRADE DE QUANTIDADES POR MODELAGEM -->
    <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h4 class="text-sm font-extrabold uppercase tracking-wider text-silas-900 flex items-center gap-2">
          <i data-lucide="grid" class="w-4 h-4 text-blue-600"></i>
          4. Grade de Quantidades por Modelagem (Tamanhos e Quadradinhos de Qtd)
        </h4>
        <span class="px-3 py-1 rounded-lg bg-silas-900 text-white text-xs font-mono-code font-bold">
          TOTAL GERAL DA OP: ${totalGeral} PEÇAS
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs border-collapse op-table-grid">
          <thead>
            <tr class="bg-silas-900 text-white font-bold">
              <th class="py-2 px-2 text-left">Modelagem</th>
              ${SIZES.map(sz => `<th class="py-2 px-1">${sz}</th>`).join('')}
              <th class="py-2 px-2 bg-blue-800">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white">
              <td class="py-2 px-2 font-bold text-left text-slate-800">Padrão / Unissex</td>
              ${SIZES.map(sz => `
                <td class="p-1">
                  <input type="number" min="0" value="${order.grade.padrao[sz] || 0}" ${!editable ? 'disabled' : ''}
                    onchange="updateOrderGridSize('${order.id}', 'padrao', '${sz}', this.value)"
                    class="w-11 text-center font-mono-code font-semibold py-1 rounded border border-slate-200 focus:border-blue-500 focus:outline-none ${order.grade.padrao[sz] > 0 ? 'bg-blue-50 text-blue-900 font-bold' : 'text-slate-400'}" />
                </td>
              `).join('')}
              <td class="py-2 px-2 font-mono-code font-extrabold text-blue-900 bg-blue-50">${totalPadrao}</td>
            </tr>
            <tr class="bg-slate-50/60">
              <td class="py-2 px-2 font-bold text-left text-slate-800">Baby Look (Feminina)</td>
              ${SIZES.map(sz => `
                <td class="p-1">
                  <input type="number" min="0" value="${order.grade.babylook[sz] || 0}" ${!editable ? 'disabled' : ''}
                    onchange="updateOrderGridSize('${order.id}', 'babylook', '${sz}', this.value)"
                    class="w-11 text-center font-mono-code font-semibold py-1 rounded border border-slate-200 focus:border-blue-500 focus:outline-none ${order.grade.babylook[sz] > 0 ? 'bg-pink-50 text-pink-900 font-bold' : 'text-slate-400'}" />
                </td>
              `).join('')}
              <td class="py-2 px-2 font-mono-code font-extrabold text-pink-900 bg-pink-50">${totalBabylook}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- BLOCO 4: ITEM 5 DA OP — ROTA DE CONFERÊNCIA E SEQUÊNCIA OPERACIONAL INTERNA -->
    <div class="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-sm font-extrabold uppercase tracking-wider text-silas-900 flex items-center gap-2">
          <i data-lucide="check-square" class="w-4 h-4 text-blue-600"></i>
          5. Rota de Conferência e Sequência Operacional Interna
        </h4>
        <span class="text-xs text-slate-500">Marque [OK] conforme cada setor conclui sua etapa</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-xs text-left border-collapse">
          <thead>
            <tr class="bg-silas-900 text-white font-bold uppercase">
              <th class="py-2.5 px-3">Etapa / Processo</th>
              <th class="py-2.5 px-3">Responsável Setor</th>
              <th class="py-2.5 px-3">Atribuição Específica da Etapa</th>
              <th class="py-2.5 px-3 text-right">Visto / Status [OK]</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200">
            ${order.rotaOperacional.map((step, idx) => `
              <tr class="${step.ok ? 'bg-emerald-50/50' : 'bg-white'}">
                <td class="py-2.5 px-3 font-bold text-slate-900">${step.nome}</td>
                <td class="py-2.5 px-3 font-semibold text-slate-700">${step.responsavel}</td>
                <td class="py-2.5 px-3 text-slate-600">${step.atribuicao}</td>
                <td class="py-2.5 px-3 text-right whitespace-nowrap">
                  <label class="inline-flex items-center gap-2 cursor-pointer select-none">
                    <span class="text-[11px] font-mono-code text-slate-500">Data: ${step.data || '__/__'}</span>
                    <input type="checkbox" ${step.ok ? 'checked' : ''} ${!editable ? 'disabled' : ''}
                      onchange="toggleOrderRouteStep('${order.id}', ${idx}, this.checked)"
                      class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                    <span class="px-2 py-0.5 rounded font-bold ${step.ok ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}">
                      ${step.ok ? 'OK' : 'Pendente'}
                    </span>
                  </label>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- BLOCO 5: AUDITORIA ESPECÍFICA DESTE PEDIDO -->
    <div class="bg-slate-900 text-white rounded-xl p-5 space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <i data-lucide="history" class="w-4 h-4 text-amber-400"></i>
          <h4 class="text-sm font-bold">Histórico de Auditoria deste Pedido (${order.numero})</h4>
        </div>
        <span class="text-[11px] text-slate-400">${orderLogs.length} alterações registradas</span>
      </div>

      <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
        ${orderLogs.length === 0 ? `<div class="text-xs text-slate-400">Nenhuma alteração registrada ainda para este pedido.</div>` : orderLogs.map(log => `
          <div class="bg-slate-800/90 border border-slate-700 rounded-lg p-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span class="font-mono-code text-amber-300 font-semibold">[${log.dataHora}]</span>
              <span class="font-bold text-white ml-1">${log.usuarioNome}</span>
              <span class="text-slate-300"> alterou </span>
              <span class="font-semibold text-blue-300">${log.campo}</span>
            </div>
            <div class="flex items-center gap-1.5 font-mono-code text-[11px]">
              <span class="px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/60 line-through">${log.valorAnterior}</span>
              <span class="text-slate-400">→</span>
              <span class="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-bold">${log.valorNovo}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  document.getElementById('order-detail-modal').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeOrderModal() {
  document.getElementById('order-detail-modal').classList.add('hidden');
  currentOpenOrderId = null;
}

// Funções de edição de Pedido que disparam registros na Trilha de Auditoria
function updateOrderStatusQuick(orderId, newStatus) {
  const order = getOrderById(orderId);
  if (!order || !canEditOrder(order)) return;

  const oldLabel = getStatusLabelText(order.status);
  const newLabel = getStatusLabelText(newStatus);
  if (order.status === newStatus) return;

  order.status = newStatus;
  if (newStatus === 'recebido') order.subStatus = 'Em Análise Inicial';
  if (newStatus === 'em_andamento') order.subStatus = 'Em Produção na Fábrica';
  if (newStatus === 'concluido') order.subStatus = 'Concluído e Pronto para Entrega';
  order.atualizadoEm = formatNowDateTime();

  addAuditLog(order.id, order.numero, 'Status do Pedido', oldLabel, newLabel);
  saveState();
  openOrderModal(orderId);
  renderAll();
  showToast(`Status da ${order.numero} atualizado e registrado na Auditoria!`, 'success');
}

function updateOrderField(orderId, fieldKey, fieldLabel, newValue) {
  const order = getOrderById(orderId);
  if (!order || !canEditOrder(order)) return;

  const oldVal = order[fieldKey];
  if (oldVal === newValue) return;

  const formatVal = v => typeof v === 'boolean' ? (v ? 'Sim (Aprovada)' : 'Não (Pendente)') : formatDateBR(String(v));
  order[fieldKey] = newValue;
  order.atualizadoEm = formatNowDateTime();

  addAuditLog(order.id, order.numero, fieldLabel, formatVal(oldVal), formatVal(newValue));
  saveState();
  openOrderModal(orderId);
  renderAll();
  showToast(`${fieldLabel} atualizado e auditado!`, 'success');
}

function updateOrderSeller(orderId, newSellerId) {
  const order = getOrderById(orderId);
  if (!order) return;
  const oldSeller = getUserById(order.responsavelId)?.nomeCurto || order.responsavelId;
  const newSeller = getUserById(newSellerId)?.nomeCurto || newSellerId;
  if (order.responsavelId === newSellerId) return;

  order.responsavelId = newSellerId;
  order.atualizadoEm = formatNowDateTime();

  addAuditLog(order.id, order.numero, 'Responsável Atribuído', oldSeller, newSeller);
  saveState();
  openOrderModal(orderId);
  renderAll();
  showToast(`Responsável da ${order.numero} alterado para ${newSeller}`, 'success');
}

function updateOrderSpec(orderId, specKey, specLabel, newValue) {
  const order = getOrderById(orderId);
  if (!order || !canEditOrder(order)) return;

  const oldVal = order.especificacoes[specKey] || '—';
  if (oldVal === newValue) return;

  order.especificacoes[specKey] = newValue;
  order.atualizadoEm = formatNowDateTime();

  addAuditLog(order.id, order.numero, specLabel, oldVal, newValue);
  saveState();
  openOrderModal(orderId);
  renderAll();
  showToast(`${specLabel} registrado na Auditoria!`, 'success');
}

function updateOrderGridSize(orderId, modelType, sizeKey, newQtyStr) {
  const order = getOrderById(orderId);
  if (!order || !canEditOrder(order)) return;

  const newQty = Math.max(0, parseInt(newQtyStr, 10) || 0);
  const oldQty = order.grade[modelType][sizeKey] || 0;
  if (oldQty === newQty) return;

  const oldTotal = calculateOrderTotalPieces(order);
  order.grade[modelType][sizeKey] = newQty;
  const newTotal = calculateOrderTotalPieces(order);
  order.atualizadoEm = formatNowDateTime();

  const modelLabel = modelType === 'padrao' ? 'Grade Padrão/Unissex' : 'Grade Baby Look';
  addAuditLog(
    order.id,
    order.numero,
    `${modelLabel} (Tam ${sizeKey})`,
    `${oldQty} pçs (Total OP: ${oldTotal})`,
    `${newQty} pçs (Total OP: ${newTotal})`
  );

  saveState();
  openOrderModal(orderId);
  renderAll();
  showToast(`Grade tamanho ${sizeKey} alterada (${oldQty} → ${newQty}) e registrada na Auditoria!`, 'success');
}

function toggleOrderRouteStep(orderId, stepIdx, isOk) {
  const order = getOrderById(orderId);
  if (!order || !canEditOrder(order)) return;

  const step = order.rotaOperacional[stepIdx];
  if (!step) return;

  const oldStatus = order.status;
  const oldState = step.ok ? `OK (${step.data})` : 'Pendente [ ]';
  step.ok = isOk;
  step.data = isOk ? formatShortDayMonth() : '';

  const doneCount = order.rotaOperacional.filter(s => s.ok).length;
  if (doneCount === 5) {
    order.status = 'concluido';
    order.subStatus = 'Todas as 5 Etapas Concluídas';
  } else if (doneCount > 0) {
    order.status = 'em_andamento';
    const nextPending = order.rotaOperacional.find(s => !s.ok);
    order.subStatus = nextPending ? `Em: ${nextPending.nome}` : 'Em Produção';
  } else {
    order.status = 'recebido';
    order.subStatus = 'Aguardando Início (1. Atendimento & Listas)';
  }

  const newState = step.ok ? `OK [Concluído em ${step.data}]` : 'Pendente [ ]';
  order.atualizadoEm = formatNowDateTime();

  addAuditLog(order.id, order.numero, `Rota ${step.nome}`, oldState, newState);
  if (oldStatus !== order.status) {
    addAuditLog(
      order.id,
      order.numero,
      'Status do Pedido (Automático pelas Etapas)',
      getStatusLabel(oldStatus),
      getStatusLabel(order.status)
    );
  }
  saveState();
  openOrderModal(orderId);
  renderAll();
  showToast(`${step.nome} atualizada e registrada na Auditoria!`, 'success');
}

// ============================================================================
// FOLHA DE IMPRESSÃO FIEL À "OP MESTRA REESTRUTURADA" (SILAS CONFECÇÕES PDF)
// ============================================================================
function openPrintableOPModal(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;
  const client = getClientById(order.clienteId);
  const seller = getUserById(order.responsavelId);
  const totalPadrao = calculateRowTotal(order.grade.padrao);
  const totalBaby = calculateRowTotal(order.grade.babylook);
  const totalGeral = totalPadrao + totalBaby;

  const chk = cond => cond ? '[ X ]' : '[ &nbsp; ]';

  const container = document.getElementById('op-print-sheet-content');
  container.innerHTML = `
    <div class="op-print-sheet p-6 space-y-5 text-xs">
      <!-- Banner Superior Azul Marinho idêntico ao PDF -->
      <div class="op-header-banner p-4 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div class="text-lg font-extrabold tracking-wide">SILAS CONFECÇÕES E SERIGRAFIA</div>
          <div class="text-xs text-slate-200 font-medium">ORDEM DE PRODUÇÃO (OP MESTRA REESTRUTURADA)</div>
        </div>
        <div class="text-base font-mono-code font-bold border-b-2 border-white pb-0.5">
          OP Nº: ${order.numero}
        </div>
      </div>

      <!-- Cabeçalho 1: Dados do Cliente e Datas -->
      <div class="bg-slate-50 p-3.5 rounded border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div><strong>Cliente / Escola:</strong> <span class="underline">${client?.nome || ''}</span></div>
        <div><strong>Data Pedido:</strong> <span class="font-mono-code underline">${order.criadoEm.split(' ')[0]}</span></div>
        <div><strong>Responsável/Turma:</strong> <span class="underline">${order.turmaResponsavel}</span></div>
        <div><strong>Entrega Prev.:</strong> <span class="font-mono-code font-bold underline">${formatDateBR(order.entregaPrevista)}</span></div>
        <div><strong>WhatsApp (Contato):</strong> <span class="font-mono-code underline">${client?.telefone || ''}</span></div>
        <div><strong>Atendimento:</strong> <span class="font-semibold">${seller?.nomeCurto || 'Kauê'}</span> &nbsp; ${chk(order.listaAprovada)} Lista Aprovada</div>
      </div>

      <!-- Bloco 2: Tipo de Gola, Modelagem, Técnica e Arte -->
      <div class="bg-slate-50 p-3.5 rounded border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <strong>Tipo de Gola:</strong>
          ${chk(order.especificacoes.tipoGola === 'Polo')} Polo &nbsp;
          ${chk(order.especificacoes.tipoGola === 'Redonda')} Redonda &nbsp;
          ${chk(order.especificacoes.tipoGola === 'V')} V &nbsp;
          ${chk(order.especificacoes.tipoGola === 'Personalizada')} Personalizada
        </div>
        <div>
          <strong>Modelagem Camisa:</strong>
          ${chk(order.especificacoes.modelagemCamisa.includes('Padrão'))} Padrão/Unissex &nbsp;
          ${chk(order.especificacoes.modelagemCamisa.includes('Baby Look'))} Baby Look &nbsp;
          ${chk(order.especificacoes.modelagemCamisa.includes('Infantil'))} Infantil &nbsp;
          ${chk(order.especificacoes.modelagemCamisa.includes('Regata'))} Regata
        </div>
        <div>
          <strong>Técnica / Impressão:</strong>
          ${chk(order.especificacoes.tecnicaImpressao.includes('Sublimação'))} Sublimação Total / Localizada &nbsp;
          ${chk(order.especificacoes.tecnicaImpressao.includes('Bordado'))} Bordado &nbsp;
          ${chk(order.especificacoes.tecnicaImpressao.includes('DTF'))} DTF
        </div>
        <div>
          <strong>Arte & Gabarito:</strong>
          ${chk(order.especificacoes.arteAprovada || order.rotaOperacional[1]?.ok)} Arte Aprovada (Luiz/David) &nbsp;
          ${chk(order.especificacoes.gabaritoPlotter || order.rotaOperacional[2]?.ok)} Gabarito Plotter (Dudu)
        </div>
      </div>

      <!-- Bloco 3: Malhas e Aviamentos -->
      <div class="bg-slate-50 p-3.5 rounded border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div><strong>Malha da Camisa:</strong> Tipo: <span class="underline">${order.especificacoes.malhaCamisaTipo}</span> &nbsp;|&nbsp; Qtd: <span class="font-mono-code underline">${order.especificacoes.malhaCamisaKg} Kg</span></div>
        <div><strong>Malha do Short:</strong> Tipo: <span class="underline">${order.especificacoes.malhaShortTipo}</span> &nbsp;|&nbsp; Qtd: <span class="font-mono-code underline">${order.especificacoes.malhaShortKg} Kg</span></div>
        <div><strong>Aviamentos / Kit:</strong> Gola/Punho: <span class="underline">${order.especificacoes.golaPunho}</span> &nbsp;|&nbsp; Botões: <span class="underline">${order.especificacoes.botoesQtd}</span></div>
        <div><strong>Logística Costura:</strong> Elástico: <span class="underline">${order.especificacoes.elasticoMm}</span> &nbsp;|&nbsp; Cadarço: <span class="underline">${order.especificacoes.cadarco}</span></div>
      </div>

      <!-- Bloco 4: GRADE DE QUANTIDADES POR MODELAGEM -->
      <div class="space-y-1.5">
        <div class="font-extrabold uppercase text-silas-900">4. GRADE DE QUANTIDADES POR MODELAGEM (TAMANHOS E QUADRADINHOS DE QTD)</div>
        <table class="w-full border-collapse op-table-grid text-[11px]">
          <thead>
            <tr class="op-header-banner font-bold">
              <th class="py-1.5 px-2 text-left">Modelagem</th>
              ${SIZES.map(s => `<th class="py-1.5 px-1">${s}</th>`).join('')}
              <th class="py-1.5 px-2">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="py-2 px-2 font-bold text-left">Padrão / Unissex</td>
              ${SIZES.map(s => `<td class="py-2 px-1 font-mono-code ${order.grade.padrao[s] > 0 ? 'font-extrabold text-slate-900 bg-slate-100' : 'text-slate-400'}">[ ${order.grade.padrao[s] || 0} ]</td>`).join('')}
              <td class="py-2 px-2 font-mono-code font-extrabold bg-slate-100">${totalPadrao}</td>
            </tr>
            <tr>
              <td class="py-2 px-2 font-bold text-left">Baby Look (Feminina)</td>
              ${SIZES.map(s => `<td class="py-2 px-1 font-mono-code ${order.grade.babylook[s] > 0 ? 'font-extrabold text-slate-900 bg-slate-100' : 'text-slate-400'}">[ ${order.grade.babylook[s] || 0} ]</td>`).join('')}
              <td class="py-2 px-2 font-mono-code font-extrabold bg-slate-100">${totalBaby}</td>
            </tr>
          </tbody>
        </table>
        <div class="text-right font-bold text-xs pt-1">TOTAL GERAL DA ORDEM DE PRODUÇÃO: ${totalGeral} PEÇAS</div>
      </div>

      <!-- Bloco 5: ROTA DE CONFERÊNCIA E SEQUÊNCIA OPERACIONAL INTERNA -->
      <div class="space-y-1.5">
        <div class="font-extrabold uppercase text-silas-900">5. ROTA DE CONFERÊNCIA E SEQUÊNCIA OPERACIONAL INTERNA</div>
        <table class="w-full border-collapse text-[11px]">
          <thead>
            <tr class="op-header-banner text-left">
              <th class="py-1.5 px-2">Etapa / Processo</th>
              <th class="py-1.5 px-2">Responsável</th>
              <th class="py-1.5 px-2">Atribuição Específica da Etapa</th>
              <th class="py-1.5 px-2 text-right">Visto / Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-300 border border-slate-300">
            ${order.rotaOperacional.map(st => `
              <tr>
                <td class="py-2 px-2 font-bold">${st.nome}</td>
                <td class="py-2 px-2">${st.responsavel}</td>
                <td class="py-2 px-2">${st.atribuicao}</td>
                <td class="py-2 px-2 text-right font-mono-code">Data: ${st.data || '___/___'} &nbsp; ${st.ok ? '[ X ] OK' : '[ &nbsp; ] OK'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Bloco 6: ESPAÇO PARA ANEXAR / IMPRIMIR A ARTE APROVADA E QUALIDADE FINAL -->
      <div class="space-y-2">
        <div class="font-extrabold uppercase text-silas-900">6. ESPAÇO PARA ANEXAR / IMPRIMIR A ARTE APROVADA E QUALIDADE FINAL</div>
        <div class="border-2 border-dashed border-slate-300 rounded p-5 text-center bg-slate-50">
          <div class="text-slate-500 font-semibold">[ MINIATURA / ESPECIFICAÇÃO DA ARTE APROVADA DO PEDIDO ]</div>
          <div class="text-slate-800 font-medium mt-1">${order.especificacoes.observacoesArte || 'Arte vinculada ao pedido digital.'}</div>
          <div class="text-[11px] text-slate-500 mt-1">${order.listaNomes || ''}</div>
        </div>
        <div class="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <strong>Controle de Qualidade Final (Jonatan):</strong>
            ${chk(order.status === 'concluido')} Sem manchas &nbsp;
            ${chk(order.status === 'concluido')} Conferido &nbsp;
            ${chk(order.status === 'concluido')} Pronta para entrega
          </div>
          <div>
            <strong>Assinatura do Conferente Final:</strong> ___________________________ &nbsp; <strong>Data:</strong> ____/____/2026
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('op-print-modal').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closePrintableOPModal() {
  document.getElementById('op-print-modal').classList.add('hidden');
}

// ============================================================================
// ABA 2: CLIENTES (GESTÃO CONSOLIDADA, ANTI-DUPLICIDADE E LGPD)
// ============================================================================
function renderClients() {
  const container = document.getElementById('clients-list-container');
  if (!container) return;

  const query = (document.getElementById('client-search-input')?.value || '').trim().toLowerCase();

  const filtered = state.clients.filter(c => {
    if (!query) return true;
    return [c.nome, c.documento, c.email, c.telefone].join(' ').toLowerCase().includes(query);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-2 bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500">
        Nenhum cliente encontrado com esse termo de busca.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(client => {
    const clientOrders = state.orders.filter(o => o.clienteId === client.id);
    const totalPecasCliente = clientOrders.reduce((acc, o) => acc + calculateOrderTotalPieces(o), 0);

    return `
      <div class="bg-white rounded-xl border border-slate-200 p-5 shadow-xs hover:border-blue-300 transition flex flex-col justify-between gap-4">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-slate-900">${client.nome}</h3>
                ${clientOrders.length > 1 ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Recorrente (${clientOrders.length} OPs)</span>` : ''}
              </div>
              <div class="text-xs font-mono-code text-slate-500 mt-0.5">CPF/CNPJ: ${client.documento}</div>
            </div>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <i data-lucide="shield-check" class="w-3 h-3"></i>
              LGPD Ativo
            </span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <div class="flex items-center gap-1.5">
              <i data-lucide="phone" class="w-3.5 h-3.5 text-slate-400"></i>
              <span>${client.telefone}</span>
            </div>
            <div class="flex items-center gap-1.5 truncate">
              <i data-lucide="mail" class="w-3.5 h-3.5 text-slate-400"></i>
              <span class="truncate">${client.email}</span>
            </div>
          </div>

          <!-- Lista rápida das OPs vinculadas a este cliente -->
          <div class="space-y-1.5">
            <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Histórico Consolidado (${clientOrders.length} pedido(s) • ${totalPecasCliente} peças)
            </div>
            <div class="flex flex-wrap gap-1.5">
              ${clientOrders.length === 0 ? `<span class="text-xs text-slate-400">Sem pedidos ainda</span>` : clientOrders.map(o => `
                <button onclick="openOrderModal('${o.id}')" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono-code font-semibold bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 border border-slate-200 transition">
                  <span>${o.numero}</span>
                  <span class="w-2 h-2 rounded-full ${o.status === 'concluido' ? 'bg-emerald-500' : o.status === 'em_andamento' ? 'bg-blue-500' : 'bg-amber-500'}"></span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-slate-400">Cliente desde ${client.criadoEm.split(' ')[0]}</span>
          <button onclick="openClientModal('${client.id}')" class="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800">
            <span>Ficha Completa, Histórico & LGPD</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

function openClientModal(clientId) {
  const client = getClientById(clientId);
  if (!client) return;
  currentOpenClientId = clientId;

  const clientOrders = state.orders.filter(o => o.clienteId === client.id);
  document.getElementById('client-modal-title').textContent = client.nome;

  const body = document.getElementById('client-detail-modal-body');
  body.innerHTML = `
    <!-- Dados Cadastrais Editáveis -->
    <div class="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
      <div class="flex items-center justify-between">
        <h4 class="text-xs font-bold uppercase tracking-wider text-slate-500">Dados Cadastrais (Chaves Anti-Duplicidade)</h4>
        <span class="text-[11px] text-emerald-700 font-semibold">✓ Cadastro Único Verificado</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Nome / Escola / Empresa</label>
          <input type="text" value="${client.nome}" onchange="updateClientField('${client.id}', 'nome', 'Nome do Cliente', this.value)" class="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">CPF / CNPJ (Chave Única)</label>
          <input type="text" value="${client.documento}" onchange="updateClientField('${client.id}', 'documento', 'CPF/CNPJ do Cliente', this.value)" class="w-full px-3 py-1.5 text-sm font-mono-code bg-white border border-slate-300 rounded-lg" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">WhatsApp / Telefone</label>
          <input type="text" value="${client.telefone}" onchange="updateClientField('${client.id}', 'telefone', 'WhatsApp do Cliente', this.value)" class="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg" />
        </div>
        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">E-mail</label>
          <input type="email" value="${client.email}" onchange="updateClientField('${client.id}', 'email', 'E-mail do Cliente', this.value)" class="w-full px-3 py-1.5 text-sm bg-white border border-slate-300 rounded-lg" />
        </div>
      </div>
    </div>

    <!-- Histórico Consolidado de Pedidos do Cliente -->
    <div class="space-y-3">
      <h4 class="text-sm font-bold text-slate-900 flex items-center gap-2">
        <i data-lucide="folder-clock" class="w-4 h-4 text-blue-600"></i>
        Histórico Consolidado de Pedidos (${clientOrders.length})
      </h4>
      <div class="space-y-2">
        ${clientOrders.map(o => {
          const seller = getUserById(o.responsavelId);
          return `
            <div class="p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50">
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-mono-code font-bold text-sm text-blue-700">${o.numero}</span>
                  ${getStatusBadgeHTML(o.status)}
                  <span class="text-xs font-semibold text-slate-600">${calculateOrderTotalPieces(o)} peças</span>
                </div>
                <div class="text-xs text-slate-600 mt-1">${o.turmaResponsavel}</div>
                <div class="text-[11px] text-slate-400">Responsável: ${seller?.nomeCurto || ''} • Criado em ${o.criadoEm}</div>
              </div>
              <button onclick="closeClientModal(); openOrderModal('${o.id}');" class="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold self-start sm:self-center">
                Abrir OP
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Painel de Conformidade LGPD (Direitos do Titular) -->
    <div class="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-emerald-900 font-bold text-xs">
          <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
          Conformidade LGPD — Registro de Consentimento e Direitos do Titular
        </div>
        <span class="text-[11px] font-mono-code text-emerald-700">${client.dataConsentimento}</span>
      </div>
      <p class="text-xs text-emerald-800">
        O titular consentiu com o uso dos dados no envio do formulário. Caso solicite consulta, correção ou anonimização, utilize os controles abaixo:
      </p>
      <div class="flex flex-wrap gap-2 pt-1">
        <button onclick="showToast('Relatório de dados pessoais (LGPD) exportado para o titular!', 'success')" class="px-3 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold hover:bg-emerald-100">
          Exportar Ficha LGPD (Consulta do Titular)
        </button>
      </div>
    </div>
  `;

  document.getElementById('client-detail-modal').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeClientModal() {
  document.getElementById('client-detail-modal').classList.add('hidden');
  currentOpenClientId = null;
}

function updateClientField(clientId, key, label, newValue) {
  const client = getClientById(clientId);
  if (!client) return;
  const oldVal = client[key];
  if (oldVal === newValue) return;
  client[key] = newValue;

  addAuditLog(clientId, `CLIENTE (${client.nome})`, label, oldVal, newValue);
  saveState();
  renderAll();
  showToast(`${label} atualizado e registrado na Auditoria!`, 'success');
}

function openNewClientModal() {
  document.getElementById('new-client-modal').classList.remove('hidden');
}

function closeNewClientModal() {
  document.getElementById('new-client-modal').classList.add('hidden');
}

function saveNewManualClient(e) {
  e.preventDefault();
  const nome = document.getElementById('nc-nome').value.trim();
  const documento = document.getElementById('nc-documento').value.trim();
  const telefone = document.getElementById('nc-telefone').value.trim();
  const email = document.getElementById('nc-email').value.trim();

  // Verificar duplicidade
  const duplicate = findExistingClient(documento, email, telefone);
  if (duplicate) {
    showToast(`Cliente já cadastrado (${duplicate.nome})! Evitando duplicidade.`, 'info');
    closeNewClientModal();
    openClientModal(duplicate.id);
    return;
  }

  const newClient = {
    id: 'cli_' + Date.now(),
    nome,
    documento,
    telefone,
    email,
    criadoEm: formatNowDateTime(),
    consentimentoLgpd: true,
    dataConsentimento: `${formatNowDateTime()} (Cadastro Interno)`
  };

  state.clients.unshift(newClient);
  addAuditLog(newClient.id, `CLIENTE (${newClient.nome})`, 'Novo Cadastro de Cliente', '—', `${nome} (${documento})`);
  saveState();
  closeNewClientModal();
  renderAll();
  showToast(`Cliente ${nome} cadastrado com sucesso!`, 'success');
}

// ============================================================================
// ABA 3: AUDITORIA (TRILHA IMUTÁVEL DE ALTERAÇÕES)
// ============================================================================
function renderAuditLogs() {
  const tbody = document.getElementById('audit-table-body');
  if (!tbody) return;

  document.getElementById('audit-total-counter').textContent = state.auditLogs.length;

  // Popular selects de filtro da auditoria mantendo seleção atual
  const userSelect = document.getElementById('audit-user-filter');
  const orderSelect = document.getElementById('audit-order-filter');
  const selectedUser = userSelect.value || 'todos';
  const selectedOrder = orderSelect.value || 'todos';

  userSelect.innerHTML = `<option value="todos">Todos os Responsáveis / Usuários</option>` +
    state.users.map(u => `<option value="${u.id}" ${u.id === selectedUser ? 'selected' : ''}>${u.nome}</option>`).join('');

  orderSelect.innerHTML = `<option value="todos">Todos os Pedidos (OPs)</option>` +
    state.orders.map(o => `<option value="${o.id}" ${o.id === selectedOrder ? 'selected' : ''}>${o.numero}</option>`).join('');

  const query = (document.getElementById('audit-search-input')?.value || '').trim().toLowerCase();

  const filteredLogs = state.auditLogs.filter(log => {
    if (selectedUser !== 'todos' && log.usuarioId !== selectedUser) return false;
    if (selectedOrder !== 'todos' && log.pedidoId !== selectedOrder) return false;
    if (query) {
      const text = [log.pedidoNumero, log.usuarioNome, log.campo, log.valorAnterior, log.valorNovo, log.dataHora].join(' ').toLowerCase();
      if (!text.includes(query)) return false;
    }
    return true;
  });

  tbody.innerHTML = filteredLogs.map(log => {
    const isOrder = log.pedidoId && log.pedidoId.startsWith('ped_');
    return `
      <tr class="hover:bg-slate-50 transition">
        <td class="py-3.5 px-4 font-mono-code text-xs text-slate-600 whitespace-nowrap">
          ${log.dataHora}
        </td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-slate-900 text-xs">${log.usuarioNome}</div>
        </td>
        <td class="py-3.5 px-4 whitespace-nowrap">
          ${isOrder
            ? `<button onclick="openOrderModal('${log.pedidoId}')" class="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono-code font-bold text-xs border border-blue-200 transition">${log.pedidoNumero}</button>`
            : `<span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono-code font-semibold text-xs">${log.pedidoNumero}</span>`
          }
        </td>
        <td class="py-3.5 px-4 font-semibold text-slate-800 text-xs">
          ${log.campo}
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-block px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 font-mono-code text-xs">
            ${log.valorAnterior}
          </span>
        </td>
        <td class="py-3.5 px-4">
          <span class="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono-code font-bold text-xs">
            ${log.valorNovo}
          </span>
        </td>
        <td class="py-3.5 px-4 text-right whitespace-nowrap">
          <span class="inline-flex items-center gap-1 text-[11px] font-mono-code text-slate-400" title="Registro criptografado e imutável">
            <i data-lucide="lock" class="w-3 h-3"></i>
            Imutável
          </span>
        </td>
      </tr>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

// ============================================================================
// ABA 4: USUÁRIO, LOGIN DA CONTA & MEU LINK DE CAPTAÇÃO RASTREÁVEL
// ============================================================================
function renderUserLinkTab() {
  const currentUser = getCurrentUser();
  const userLogin = currentUser.login || currentUser.linkToken;
  const shareUrl = `https://pedidos.silasserigrafia.com.br/formulario?login=${userLogin}`;

  document.getElementById('seller-link-title').textContent = `Link Exclusivo da Conta de ${currentUser.nomeCurto}`;
  document.getElementById('seller-token-badge').textContent = `@${userLogin}`;
  document.getElementById('seller-shareable-link').value = shareUrl;
  document.getElementById('qr-token-label').textContent = `?login=${userLogin}`;
  document.getElementById('qr-seller-name').textContent = `${currentUser.nomeCurto} (@${userLogin})`;

  // Box explicando as permissões e restrições da conta logada atual
  const permBox = document.getElementById('logged-account-permissions-box');
  if (permBox) {
    if (currentUser.perfil === 'admin') {
      permBox.className = 'rounded-xl p-4 border bg-purple-50/70 border-purple-200 text-xs text-purple-950 space-y-1.5';
      permBox.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-sm flex items-center gap-1.5 text-purple-900">
            <i data-lucide="shield-check" class="w-4 h-4 text-purple-700"></i>
            Conta Logada: ${currentUser.nome} — Login: <code class="font-mono-code bg-purple-100 px-1.5 py-0.5 rounded">@${userLogin}</code>
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-600 text-white uppercase">Administrador</span>
        </div>
        <p class="text-purple-800">
          <strong>Permissões da sua conta:</strong> Como Administrador, você tem acesso irrestrito para editar pedidos de qualquer responsável, transferir pedidos entre contas e cadastrar novos responsáveis na equipe.
        </p>
      `;
    } else {
      permBox.className = 'rounded-xl p-4 border bg-blue-50/70 border-blue-200 text-xs text-blue-950 space-y-1.5';
      permBox.innerHTML = `
        <div class="flex items-center justify-between">
          <span class="font-extrabold text-sm flex items-center gap-1.5 text-blue-900">
            <i data-lucide="user-check" class="w-4 h-4 text-blue-700"></i>
            Conta Logada: ${currentUser.nome} — Login: <code class="font-mono-code bg-blue-100 px-1.5 py-0.5 rounded">@${userLogin}</code>
          </span>
          <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white uppercase">Responsável</span>
        </div>
        <p class="text-blue-800">
          <strong>Restrições da sua conta:</strong> Quando o cliente abre seu link (<code class="font-mono-code font-bold">?login=${userLogin}</code>), o sistema sabe que deve vincular o pedido à sua conta <strong>@${userLogin}</strong>. Você só pode editar os pedidos da sua conta; os pedidos de outros responsáveis ficam bloqueados contra edição.
        </p>
      `;
    }
  }

  // Resumo lateral da sessão da conta
  const sidebarAccount = document.getElementById('sidebar-account-summary');
  if (sidebarAccount) {
    sidebarAccount.innerHTML = `
      <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-slate-500">Usuário Logado:</span>
          <span class="font-bold text-slate-900">${currentUser.nomeCurto}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-500">Login do Link:</span>
          <span class="font-mono-code font-bold text-blue-700">@${userLogin}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-500">Nível de Acesso:</span>
          <span class="font-bold ${currentUser.perfil === 'admin' ? 'text-purple-700' : 'text-blue-700'}">${getRoleLabel(currentUser.perfil)}</span>
        </div>
      </div>
      <button onclick="openLoginModal()" class="w-full py-2 px-3 rounded-xl bg-silas-900 hover:bg-silas-800 text-white font-bold text-xs transition flex items-center justify-center gap-1.5">
        <i data-lucide="log-in" class="w-3.5 h-3.5"></i>
        <span>Entrar com Outro Login</span>
      </button>
    `;
  }

  // Botão de Adicionar Novo Responsável (Restrito a Administrador)
  const adminBtnContainer = document.getElementById('admin-Only-add-user-btn');
  if (adminBtnContainer) {
    if (currentUser.perfil === 'admin') {
      adminBtnContainer.innerHTML = `
        <button onclick="openNewUserModal()" class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs transition">
          <i data-lucide="user-plus" class="w-4 h-4"></i>
          <span>Novo Responsável</span>
        </button>
      `;
    } else {
      adminBtnContainer.innerHTML = `
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-xs font-semibold border border-slate-200" title="Apenas o Administrador pode criar novas contas">
          <i data-lucide="lock" class="w-3.5 h-3.5 text-slate-400"></i>
          <span>Criar Conta (Restrito ao Admin)</span>
        </span>
      `;
    }
  }

  const myOrders = state.orders.filter(o => o.responsavelId === currentUser.id);
  const myPieces = myOrders.reduce((acc, o) => acc + calculateOrderTotalPieces(o), 0);

  document.getElementById('seller-metrics-cards').innerHTML = `
    <div class="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
      <div class="text-xs text-slate-500">Acessos no Link (@${userLogin})</div>
      <div class="text-xl font-extrabold text-slate-900 font-mono-code mt-0.5">${currentUser.cliquesLink || 45}</div>
    </div>
    <div class="bg-blue-50/70 rounded-xl p-3.5 border border-blue-200">
      <div class="text-xs text-blue-800 font-semibold">Pedidos na Conta @${userLogin}</div>
      <div class="text-xl font-extrabold text-blue-900 font-mono-code mt-0.5">${myOrders.length} OPs</div>
    </div>
    <div class="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200">
      <div class="text-xs text-emerald-800 font-semibold">Volume Captado</div>
      <div class="text-xl font-extrabold text-emerald-900 font-mono-code mt-0.5">${myPieces} pçs</div>
    </div>
  `;

  // Tabela de todas as contas de responsáveis
  const tbody = document.getElementById('team-users-table-body');
  tbody.innerHTML = state.users.map(u => {
    const countOrders = state.orders.filter(o => o.responsavelId === u.id).length;
    const isCurrent = u.id === currentUser.id;
    const uLogin = u.login || u.linkToken;
    return `
      <tr class="${isCurrent ? 'bg-blue-50/50' : 'hover:bg-slate-50'}">
        <td class="py-3 px-3">
          <div class="font-bold text-slate-900 flex items-center gap-1.5">
            <span>${u.nome}</span>
            ${isCurrent ? `<span class="px-1.5 py-0.5 rounded text-[10px] bg-emerald-600 text-white font-bold">Conta Logada</span>` : ''}
          </div>
          <div class="text-xs text-slate-400">${u.email}</div>
        </td>
        <td class="py-3 px-3 font-mono-code text-xs">
          <span class="px-2 py-1 rounded bg-slate-100 text-slate-800 font-bold border border-slate-200">@${uLogin}</span>
          <div class="text-[10px] text-slate-400 mt-0.5">?login=${uLogin}</div>
        </td>
        <td class="py-3 px-3">
          <span class="px-2 py-0.5 rounded text-xs font-bold ${u.perfil === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}">
            ${getRoleLabel(u.perfil)}
          </span>
          <div class="text-[10px] text-slate-500 mt-0.5">
            ${u.perfil === 'admin' ? 'Edita todos os pedidos' : 'Edita apenas pedidos próprios'}
          </div>
        </td>
        <td class="py-3 px-3 text-center font-mono-code font-bold text-slate-800">
          ${countOrders}
        </td>
        <td class="py-3 px-3 text-right whitespace-nowrap space-x-1">
          ${!isCurrent ? `
            <button onclick="loginAsUser('${u.id}')" class="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
              Logar Conta
            </button>
          ` : ''}
          <button onclick="openClientFormForSeller('${u.id}')" class="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition">
            Testar Link do Cliente
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function openNewUserModal() {
  const currentUser = getCurrentUser();
  if (currentUser.perfil !== 'admin') {
    showToast('Restrição de Conta: Apenas o Administrador pode cadastrar novos responsáveis!', 'error');
    return;
  }
  document.getElementById('new-user-modal')?.classList.remove('hidden');
}

function closeNewUserModal() {
  document.getElementById('new-user-modal')?.classList.add('hidden');
}

function saveNewResponsibleUser(e) {
  e.preventDefault();
  const currentUser = getCurrentUser();
  if (currentUser.perfil !== 'admin') return;

  const nome = document.getElementById('nu-nome').value.trim();
  const login = document.getElementById('nu-login').value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const senha = document.getElementById('nu-senha').value.trim() || '1234';
  const email = document.getElementById('nu-email').value.trim();
  const perfil = document.getElementById('nu-perfil').value;

  if (!login) {
    showToast('Informe um login válido!', 'error');
    return;
  }

  if (state.users.some(u => (u.login || u.linkToken) === login)) {
    showToast(`O login @${login} já existe! Escolha outro.`, 'error');
    return;
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    login,
    senha,
    nome,
    nomeCurto: nome.split(' ')[0],
    email,
    perfil,
    setor: nome,
    ativo: true,
    linkToken: login,
    cliquesLink: 0
  };

  state.users.push(newUser);
  addAuditLog(newUser.id, `CONTA (@${login})`, 'Criação de Conta de Responsável', '—', `${nome} (Login: @${login} • Perfil: ${getRoleLabel(perfil)})`);
  saveState();
  closeNewUserModal();
  renderAll();
  showToast(`Conta @${login} criada com sucesso! Link gerado: ?login=${login}`, 'success');
}

function copySellerLink() {
  const input = document.getElementById('seller-shareable-link');
  input.select();
  navigator.clipboard?.writeText(input.value);

  const msg = document.getElementById('copy-feedback-msg');
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 4000);
  showToast('Link exclusivo copiado! Envie para o cliente.', 'success');
}

function shareLinkWhatsApp() {
  const currentUser = getCurrentUser();
  const link = document.getElementById('seller-shareable-link').value;
  showToast(`Simulando envio no WhatsApp de ${currentUser.nomeCurto}: "${link}"`, 'info');
}

function openClientFormWithCurrentSeller() {
  state.formSellerId = state.currentUserId;
  currentIdentifiedClientId = null;
  clientActiveSubtab = 'none';
  switchTab('cliente-portal');
}

function openClientFormForSeller(sellerId) {
  state.formSellerId = sellerId;
  currentIdentifiedClientId = null;
  clientActiveSubtab = 'none';
  switchTab('cliente-portal');
  const seller = getUserById(sellerId);
  showToast(`Link do cliente aberto conectado ao login @${seller.login || seller.linkToken} (${seller.nomeCurto})!`, 'info');
}

// ============================================================================
// ABA 5: ÁREA DO CLIENTE (PASSO 1: IDENTIFICAÇÃO -> PASSO 2: CRIAR OU ACOMPANHAR)
// ============================================================================
let currentIdentifiedClientId = null; // null | 'NEW_CLIENT' | client.id
let clientTypedCredential = '';
let clientActiveSubtab = 'none'; // 'none' | 'form' | 'track'

function renderClientPortal() {
  const seller = getUserById(state.formSellerId) || getCurrentUser();
  const sLogin = seller.login || seller.linkToken;
  document.getElementById('form-seller-name').textContent = seller.nome;
  document.getElementById('form-seller-token').textContent = `Login: @${sLogin}`;
  document.getElementById('form-seller-avatar').textContent = seller.nomeCurto.substring(0, 2).toUpperCase();

  const overrideSelect = document.getElementById('form-seller-override');
  if (overrideSelect) {
    overrideSelect.innerHTML = state.users.map(u => `
      <option value="${u.id}" ${u.id === seller.id ? 'selected' : ''}>${u.nomeCurto} (@${u.login || u.linkToken})</option>
    `).join('');
  }

  // Renderizar botões de simulação rápida na tela de Identificação
  const quickSimContainer = document.getElementById('client-quick-sim-buttons');
  if (quickSimContainer) {
    const c1 = state.clients[0]; // Colégio Dom Pedro II
    const c4 = state.clients[3] || state.clients[1]; // Escola Técnica São Lucas (arte pendente)
    quickSimContainer.innerHTML = `
      <button type="button" onclick="simulateIdentifyExistingClient('${c1?.id || ''}')" class="p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100 text-left transition group">
        <div class="flex items-center justify-between text-[11px] font-bold text-emerald-700">
          <span>CLIENTE RECORRENTE</span>
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        </div>
        <div class="font-bold text-xs text-slate-900 mt-0.5 truncate">${c1?.nome || 'Colégio Dom Pedro II'}</div>
        <div class="text-[11px] font-mono-code text-slate-500">${c1?.documento || ''} • 2 Pedidos</div>
      </button>

      <button type="button" onclick="simulateIdentifyExistingClient('${c4?.id || ''}')" class="p-3 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100 text-left transition group">
        <div class="flex items-center justify-between text-[11px] font-bold text-amber-800">
          <span>PEDIDO EM ANDAMENTO</span>
          <i data-lucide="clock" class="w-3.5 h-3.5"></i>
        </div>
        <div class="font-bold text-xs text-slate-900 mt-0.5 truncate">${c4?.nome || 'Escola Técnica São Lucas'}</div>
        <div class="text-[11px] font-mono-code text-slate-500">${c4?.documento || ''} • Ver Detalhes</div>
      </button>

      <button type="button" onclick="simulateIdentifyNewClient()" class="p-3 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-left transition group">
        <div class="flex items-center justify-between text-[11px] font-bold text-blue-700">
          <span>CLIENTE NOVO (1ª VEZ)</span>
          <i data-lucide="user-plus" class="w-3.5 h-3.5"></i>
        </div>
        <div class="font-bold text-xs text-slate-900 mt-0.5 truncate">Construtora Horizonte</div>
        <div class="text-[11px] font-mono-code text-slate-500">CNPJ Novo • Cadastrar & Pedir</div>
      </button>
    `;
  }

  // Inicializar tabela da Grade no formulário se estiver vazia
  const tbody = document.getElementById('cf-grade-tbody');
  if (tbody && tbody.children.length === 0) {
    buildClientFormGrid();
  }

  // Definir data padrão de entrega se vazio
  const entregaInput = document.getElementById('cf-entrega');
  if (entregaInput && !entregaInput.value) {
    entregaInput.value = '2026-11-28';
  }

  // Controlar exibição entre Passo 1 (Login Duplo), Passo 1.5 (Cadastro Cliente Novo) e Passo 2 (Hub de Escolha / Pedido)
  const stepIdentify = document.getElementById('client-step-identify');
  const stepRegister = document.getElementById('client-step-register');
  const stepHub = document.getElementById('client-step-hub');

  if (!currentIdentifiedClientId) {
    stepIdentify?.classList.remove('hidden');
    stepRegister?.classList.add('hidden');
    stepHub?.classList.add('hidden');
  } else if (currentIdentifiedClientId === 'REGISTERING_NEW') {
    stepIdentify?.classList.add('hidden');
    stepRegister?.classList.remove('hidden');
    stepHub?.classList.add('hidden');
  } else {
    stepIdentify?.classList.add('hidden');
    stepRegister?.classList.add('hidden');
    stepHub?.classList.remove('hidden');
    renderIdentifiedClientHub();
  }

  if (window.lucide) lucide.createIcons();
}

function handleClientIdentificationSubmit(e) {
  e.preventDefault();
  const rawInput = (document.getElementById('client-identify-input')?.value || '').trim();
  if (!rawInput) return;

  const notFoundAlert = document.getElementById('login-not-found-alert');

  const found = findExistingClient(rawInput, rawInput, rawInput) ||
    state.clients.find(c => c.nome.toLowerCase().includes(rawInput.toLowerCase()));

  if (found) {
    notFoundAlert?.classList.add('hidden');
    currentIdentifiedClientId = found.id;
    clientTypedCredential = '';
    clientActiveSubtab = 'none'; // Mostra os 2 botões grandes primeiro para o cliente escolher!
    renderClientPortal();
    showToast(`Bem-vindo de volta, ${found.nome}! Escolha entre Criar Pedido ou Acompanhar Meus Pedidos.`, 'success');
  } else {
    clientTypedCredential = rawInput;
    notFoundAlert?.classList.remove('hidden');
    showToast('Cadastro não encontrado! Se for sua primeira vez, clique em "Cadastrar & Criar Meu 1º Pedido".', 'info');
  }
}

function openNewClientRegistrationStep(useTypedCredential = false) {
  const notFoundAlert = document.getElementById('login-not-found-alert');
  notFoundAlert?.classList.add('hidden');

  currentIdentifiedClientId = 'REGISTERING_NEW';
  renderClientPortal();

  const form = document.getElementById('new-client-register-form');
  form?.reset();
  document.getElementById('register-duplicate-alert')?.classList.add('hidden');

  if (useTypedCredential && clientTypedCredential) {
    const raw = clientTypedCredential.trim();
    if (raw.includes('@')) {
      const emailEl = document.getElementById('reg-email');
      if (emailEl) emailEl.value = raw;
    } else {
      const docEl = document.getElementById('reg-documento');
      if (docEl) docEl.value = raw;
    }
  }
}

function checkDuplicateOnRegistrationInput() {
  const doc = document.getElementById('reg-documento')?.value || '';
  const phone = document.getElementById('reg-telefone')?.value || '';
  const email = document.getElementById('reg-email')?.value || '';
  const alertBox = document.getElementById('register-duplicate-alert');
  const alertText = document.getElementById('register-duplicate-alert-text');
  const btnSwitch = document.getElementById('btn-switch-to-existing-client');
  if (!alertBox || !alertText) return;

  const found = findExistingClient(doc, email, phone);
  if (found) {
    alertBox.classList.remove('hidden');
    alertText.innerHTML = `
      <strong>Você já possui cadastro na Silas Confecções (${found.nome})!</strong><br/>
      Identificamos seu registro pelo documento/contato (${found.documento}). Não é necessário cadastrar novamente.
    `;
    if (btnSwitch) {
      btnSwitch.onclick = () => simulateIdentifyExistingClient(found.id);
    }
  } else {
    alertBox.classList.add('hidden');
  }
}

function fillDemoNewClientRegistration() {
  const docEl = document.getElementById('reg-documento');
  const nomeEl = document.getElementById('reg-nome');
  const telEl = document.getElementById('reg-telefone');
  const mailEl = document.getElementById('reg-email');

  if (docEl) docEl.value = '77.888.999/0001-55';
  if (nomeEl) nomeEl.value = 'Construtora Horizonte Engenharia';
  if (telEl) telEl.value = '(11) 99444-5566';
  if (mailEl) mailEl.value = 'suprimentos@construtorahorizonte.com.br';
  checkDuplicateOnRegistrationInput();
  showToast('Dados de exemplo preenchidos! Clique em "Salvar Cadastro e Ir para Criar Pedido".', 'info');
}

function handleNewClientRegistrationSubmit(e) {
  e.preventDefault();
  const doc = (document.getElementById('reg-documento')?.value || '').trim();
  const nome = (document.getElementById('reg-nome')?.value || '').trim();
  const telefone = (document.getElementById('reg-telefone')?.value || '').trim();
  const email = (document.getElementById('reg-email')?.value || '').trim();

  if (!doc || !nome || !telefone || !email) return;

  // Verificar anti-duplicidade antes de criar
  let client = findExistingClient(doc, email, telefone);
  if (!client) {
    client = {
      id: 'cli_' + Date.now(),
      nome,
      documento: doc,
      telefone,
      email,
      criadoEm: formatNowDateTime(),
      consentimentoLgpd: true,
      dataConsentimento: `${formatNowDateTime()} (Cadastro Portal do Cliente)`
    };
    state.clients.unshift(client);
    saveState();
  }

  // Autentica o cliente recém-cadastrado e leva direto para a tela de Criar Pedido!
  currentIdentifiedClientId = client.id;
  clientTypedCredential = '';
  clientActiveSubtab = 'form';

  renderAll();
  prefillExistingClientForm(client);

  // Preparar grade limpa para o 1º pedido do cliente novo
  const solEl = document.getElementById('cf-solicitante');
  const turmaEl = document.getElementById('cf-turma');
  if (solEl && !solEl.value) solEl.value = '';
  if (turmaEl && !turmaEl.value) turmaEl.value = '';
  onChangeClientModelagem();
  buildClientFormGrid(false);

  showToast(`Cadastro de "${client.nome}" concluído! Agora preencha os detalhes do seu 1º pedido abaixo.`, 'success');
}

function simulateIdentifyExistingClient(clientId) {
  const client = getClientById(clientId) || state.clients[0];
  if (!client) return;
  const input = document.getElementById('client-identify-input');
  if (input) input.value = client.documento;
  document.getElementById('login-not-found-alert')?.classList.add('hidden');
  currentIdentifiedClientId = client.id;
  clientTypedCredential = '';
  clientActiveSubtab = 'none'; // Exibe a tela com as 2 opções claramente!
  renderClientPortal();
  showToast(`Cadastro identificado: ${client.nome}! Escolha Criar Pedido ou Acompanhar Meus Pedidos.`, 'success');
}

function simulateIdentifyNewClient() {
  openNewClientRegistrationStep(false);
  fillDemoNewClientRegistration();
}

function logoutIdentifiedClient() {
  currentIdentifiedClientId = null;
  clientTypedCredential = '';
  clientActiveSubtab = 'none';
  const input = document.getElementById('client-identify-input');
  if (input) input.value = '';
  document.getElementById('login-not-found-alert')?.classList.add('hidden');
  renderClientPortal();
}

function renderIdentifiedClientHub() {
  const banner = document.getElementById('identified-client-banner');
  const btnChoiceNew = document.getElementById('btn-choice-new-order');
  const btnChoiceTrack = document.getElementById('btn-choice-track-orders');
  const badgeTrack = document.getElementById('badge-choice-track');
  const repeatBox = document.getElementById('repeat-previous-order-box');

  {
    const client = getClientById(currentIdentifiedClientId);
    const clientOrders = state.orders.filter(o => o.clienteId === client?.id);
    const readyCount = clientOrders.filter(o => o.status === 'concluido').length;
    const inProgressCount = clientOrders.filter(o => o.status === 'em_andamento').length;

    banner.innerHTML = `
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-lg shrink-0 shadow-xs">
          <i data-lucide="building-2" class="w-6 h-6"></i>
        </div>
        <div>
          <div class="flex flex-wrap items-center gap-1.5">
            <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">✓ CLIENTE IDENTIFICADO</span>
            <span class="text-xs font-mono-code text-slate-500">${client?.documento || ''}</span>
          </div>
          <h3 class="text-base sm:text-xl font-extrabold text-slate-900 mt-0.5">Olá, ${client?.nome || ''}!</h3>
          <p class="text-xs text-slate-600">
            WhatsApp: <strong>${client?.telefone || ''}</strong> • E-mail: <strong>${client?.email || ''}</strong> • <strong>${clientOrders.length} pedido(s)</strong> no seu histórico.
          </p>
        </div>
      </div>
      <button type="button" onclick="logoutIdentifiedClient()" class="px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs font-bold transition shrink-0 self-start sm:self-center inline-flex items-center gap-1.5">
        <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
        <span>Trocar Cliente</span>
      </button>
    `;

    if (badgeTrack) {
      if (readyCount > 0) {
        badgeTrack.textContent = `${clientOrders.length} pedido(s) • ${readyCount} pronto(s)!`;
        badgeTrack.className = 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300';
      } else if (inProgressCount > 0) {
        badgeTrack.textContent = `${clientOrders.length} pedido(s) • Em andamento`;
        badgeTrack.className = 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300';
      } else {
        badgeTrack.textContent = `${clientOrders.length} pedido(s)`;
        badgeTrack.className = 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800';
      }
    }

    // Preencher automaticamente os dados do cliente identificado no formulário de Novo Pedido
    prefillExistingClientForm(client);

    // Mostrar caixa de "Repetir Pedido Anterior" se ele já tiver pedidos
    if (repeatBox && clientOrders.length > 0) {
      repeatBox.classList.remove('hidden');
      repeatBox.innerHTML = `
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div class="flex items-center gap-2 text-indigo-950 text-xs">
            <i data-lucide="repeat" class="w-4 h-4 text-indigo-600 shrink-0"></i>
            <span><strong>Cliente Recorrente — Recompra Rápida:</strong> Quer usar o mesmo modelo de gola, tecido e estampa de um pedido anterior?</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            ${clientOrders.map(o => `
              <button type="button" onclick="repeatPreviousOrderSpecs('${o.id}')" class="px-3 py-1.5 rounded-lg bg-white hover:bg-indigo-100 text-indigo-800 border border-indigo-300 text-xs font-bold transition">
                Copiar Modelo da ${o.numero} (${o.especificacoes.tecnicaImpressao})
              </button>
            `).join('')}
          </div>
        </div>
      `;
    } else if (repeatBox) {
      repeatBox.classList.add('hidden');
    }
  }

  // Destacar card ativo (Opção 1 vs Opção 2)
  const formDiv = document.getElementById('client-subtab-form');
  const trackDiv = document.getElementById('client-subtab-track');

  if (clientActiveSubtab === 'form') {
    formDiv?.classList.remove('hidden');
    trackDiv?.classList.add('hidden');
    if (btnChoiceNew) btnChoiceNew.className = 'text-left p-5 rounded-2xl border-2 border-emerald-600 bg-emerald-50/50 ring-4 ring-emerald-100 transition flex items-start gap-4';
    if (btnChoiceTrack) btnChoiceTrack.className = 'text-left p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-blue-300 transition flex items-start gap-4';
  } else if (clientActiveSubtab === 'track') {
    formDiv?.classList.add('hidden');
    trackDiv?.classList.remove('hidden');
    if (btnChoiceTrack) btnChoiceTrack.className = 'text-left p-5 rounded-2xl border-2 border-blue-600 bg-blue-50/50 ring-4 ring-blue-100 transition flex items-start gap-4';
    if (btnChoiceNew) btnChoiceNew.className = 'text-left p-5 rounded-2xl border-2 border-slate-200 bg-white hover:border-emerald-300 transition flex items-start gap-4';
    renderClientTrackerTab();
  } else {
    // Estado inicial pós-identificação: mostra os 2 cards de escolha em destaque aguardando o clique do cliente
    formDiv?.classList.add('hidden');
    trackDiv?.classList.add('hidden');
    if (btnChoiceNew) btnChoiceNew.className = 'text-left p-5 rounded-2xl border-2 border-emerald-500 bg-white hover:bg-emerald-50/40 shadow-sm transition flex items-start gap-4';
    if (btnChoiceTrack) btnChoiceTrack.className = 'text-left p-5 rounded-2xl border-2 border-blue-500 bg-white hover:bg-blue-50/40 shadow-sm transition flex items-start gap-4';
  }
}

function switchClientSubtab(sub) {
  clientActiveSubtab = sub;
  renderIdentifiedClientHub();
  if (window.lucide) lucide.createIcons();
}

function prefillExistingClientForm(client) {
  if (!client) return;
  const docEl = document.getElementById('cf-documento');
  const nomeEl = document.getElementById('cf-nome');
  const telEl = document.getElementById('cf-telefone');
  const mailEl = document.getElementById('cf-email');

  if (docEl) docEl.value = client.documento;
  if (nomeEl) nomeEl.value = client.nome;
  if (telEl) telEl.value = client.telefone;
  if (mailEl) mailEl.value = client.email;

  // Atualizar o card compacto do cliente recorrente
  const recName = document.getElementById('rec-client-name');
  const recDoc = document.getElementById('rec-client-doc');
  const recContact = document.getElementById('rec-client-contact');
  const recCard = document.getElementById('recurrent-client-card');
  const fullFields = document.getElementById('full-client-fields-container');

  if (recName) recName.textContent = client.nome;
  if (recDoc) recDoc.textContent = `CPF/CNPJ: ${client.documento}`;
  if (recContact) recContact.textContent = `${client.email} | ${client.telefone}`;

  // Oculta os inputs repetitivos e mostra apenas o card compacto!
  if (recCard) recCard.classList.remove('hidden');
  if (fullFields) fullFields.classList.add('hidden');
}

function toggleEditClientFields() {
  const fullFields = document.getElementById('full-client-fields-container');
  if (fullFields) {
    fullFields.classList.toggle('hidden');
  }
}

const CHILD_SIZES = ['2', '4', '6', '8', '10', '12'];
const ADULT_SIZES = ['PP', 'P', 'M', 'G', 'GG', 'XGG', 'XXGG'];

let clientGridDraft = {
  padrao: createEmptyGridRow(),
  babylook: createEmptyGridRow()
};

function getDynamicRowLabels(modelagem, gola) {
  if (modelagem === 'Colete Dupla Face') {
    return {
      padrao: 'Colete Dupla Face (Unissex)',
      babylook: 'Colete Baby Look'
    };
  }
  if (modelagem === 'Regata') {
    return {
      padrao: 'Regata Masculina / Unissex',
      babylook: 'Regata Feminina (Baby Look)'
    };
  }
  if (gola === 'Polo') {
    return {
      padrao: 'Polo Padrão / Unissex',
      babylook: 'Polo Baby Look (Feminina)'
    };
  }
  return {
    padrao: 'Padrão / Unissex',
    babylook: 'Baby Look (Feminina)'
  };
}

function onChangeClientModelagem() {
  const modelagem = document.getElementById('cf-modelagem')?.value || 'Padrão/Unissex + Baby Look';
  const gola = document.getElementById('cf-gola')?.value || 'Redonda';
  const checkPadrao = document.getElementById('cf-check-padrao');
  const checkBabylook = document.getElementById('cf-check-babylook');
  const checkInfantil = document.getElementById('cf-check-infantil');
  const wrapBabylook = document.getElementById('cf-toggle-babylook-wrap');

  const labels = getDynamicRowLabels(modelagem, gola);
  const lblPadrao = document.getElementById('cf-label-check-padrao');
  const lblBabylook = document.getElementById('cf-label-check-babylook');
  if (lblPadrao) lblPadrao.textContent = labels.padrao;
  if (lblBabylook) lblBabylook.textContent = labels.babylook;

  if (modelagem === 'Colete Dupla Face') {
    if (checkPadrao) checkPadrao.checked = true;
    if (checkBabylook) checkBabylook.checked = false;
    wrapBabylook?.classList.add('hidden');
  } else {
    wrapBabylook?.classList.remove('hidden');
    if (modelagem === 'Padrão/Unissex') {
      if (checkPadrao) checkPadrao.checked = true;
      if (checkBabylook) checkBabylook.checked = false;
    } else if (modelagem === 'Baby Look') {
      if (checkPadrao) checkPadrao.checked = false;
      if (checkBabylook) checkBabylook.checked = true;
    } else if (modelagem === 'Infantil + Padrão') {
      if (checkPadrao) checkPadrao.checked = true;
      if (checkBabylook) checkBabylook.checked = true;
      if (checkInfantil) checkInfantil.checked = true;
    } else {
      // Padrão/Unissex + Baby Look ou Regata
      if (checkPadrao) checkPadrao.checked = true;
      if (checkBabylook) checkBabylook.checked = true;
    }
  }

  buildClientFormGrid(true);
}

function onToggleGradeCheckboxes() {
  const checkPadrao = document.getElementById('cf-check-padrao');
  const checkBabylook = document.getElementById('cf-check-babylook');
  const modelagemEl = document.getElementById('cf-modelagem');

  // Garante que pelo menos 1 linha fique ativa na grade
  if (checkPadrao && checkBabylook && !checkPadrao.checked && !checkBabylook.checked) {
    checkPadrao.checked = true;
  }

  // Sincroniza o select superior se não for Regata nem Colete
  if (modelagemEl && modelagemEl.value !== 'Regata' && modelagemEl.value !== 'Colete Dupla Face') {
    const infChecked = document.getElementById('cf-check-infantil')?.checked;
    if (infChecked && checkPadrao?.checked) {
      modelagemEl.value = 'Infantil + Padrão';
    } else if (checkPadrao?.checked && checkBabylook?.checked) {
      modelagemEl.value = 'Padrão/Unissex + Baby Look';
    } else if (checkPadrao?.checked && !checkBabylook?.checked) {
      modelagemEl.value = 'Padrão/Unissex';
    } else if (!checkPadrao?.checked && checkBabylook?.checked) {
      modelagemEl.value = 'Baby Look';
    }
  }

  buildClientFormGrid(true);
}

function onInputClientGridCell(rowKey, sizeKey, rawVal) {
  const val = Math.max(0, parseInt(rawVal, 10) || 0);
  if (clientGridDraft[rowKey]) {
    clientGridDraft[rowKey][sizeKey] = val;
  }
  recalcClientFormGrid();
}

function prefillNewClientForm(rawCredential) {
  document.getElementById('client-order-form')?.reset();
  const checkPadrao = document.getElementById('cf-check-padrao');
  const checkBabylook = document.getElementById('cf-check-babylook');
  const checkInfantil = document.getElementById('cf-check-infantil');
  if (checkPadrao) checkPadrao.checked = true;
  if (checkBabylook) checkBabylook.checked = true;
  if (checkInfantil) checkInfantil.checked = false;

  onChangeClientModelagem();
  buildClientFormGrid(false);
  recalcClientFormGrid();

  // Para cliente novo, garante que os campos cadastrais estejam abertos e visíveis
  const recCard = document.getElementById('recurrent-client-card');
  const fullFields = document.getElementById('full-client-fields-container');
  if (recCard) recCard.classList.add('hidden');
  if (fullFields) fullFields.classList.remove('hidden');

  if (rawCredential.includes('@')) {
    document.getElementById('cf-email').value = rawCredential;
  } else {
    document.getElementById('cf-documento').value = rawCredential;
  }
  document.getElementById('cf-entrega').value = '2026-11-30';
}

function repeatPreviousOrderSpecs(orderId) {
  const prevOrder = getOrderById(orderId);
  if (!prevOrder) return;

  document.getElementById('cf-gola').value = prevOrder.especificacoes.tipoGola || 'Redonda';
  document.getElementById('cf-modelagem').value = prevOrder.especificacoes.modelagemCamisa || 'Padrão/Unissex + Baby Look';
  document.getElementById('cf-tecnica').value = prevOrder.especificacoes.tecnicaImpressao || 'Sublimação Total';
  document.getElementById('cf-malha-pref').value = prevOrder.especificacoes.malhaCamisaTipo || '';
  document.getElementById('cf-observacoes').value = `[REPOSIÇÃO / MESMA ARTE DA ${prevOrder.numero}] ${prevOrder.especificacoes.observacoesArte || ''}`;

  const parts = (prevOrder.turmaResponsavel || '').split('—').map(s => s.trim());
  const solicitanteEl = document.getElementById('cf-solicitante');
  if (solicitanteEl) solicitanteEl.value = parts[0] || 'Prof. Responsável';
  document.getElementById('cf-turma').value = `Reposição — ${parts[1] || prevOrder.turmaResponsavel}`;

  // Copiar grade para o rascunho
  clientGridDraft = {
    padrao: { ...createEmptyGridRow(), ...(prevOrder.grade?.padrao || {}) },
    babylook: { ...createEmptyGridRow(), ...(prevOrder.grade?.babylook || {}) }
  };

  // Detectar se o pedido anterior tinha tamanhos infantis ou baby look
  const hasInfantil = CHILD_SIZES.some(sz => (clientGridDraft.padrao[sz] || 0) > 0 || (clientGridDraft.babylook[sz] || 0) > 0);
  const hasPadrao = SIZES.some(sz => (clientGridDraft.padrao[sz] || 0) > 0);
  const hasBabylook = SIZES.some(sz => (clientGridDraft.babylook[sz] || 0) > 0);

  onChangeClientModelagem();
  const checkInfantil = document.getElementById('cf-check-infantil');
  const checkPadrao = document.getElementById('cf-check-padrao');
  const checkBabylook = document.getElementById('cf-check-babylook');
  if (checkInfantil) checkInfantil.checked = hasInfantil;
  if (checkPadrao) checkPadrao.checked = hasPadrao || !hasBabylook;
  if (checkBabylook && prevOrder.especificacoes.modelagemCamisa !== 'Colete Dupla Face') {
    checkBabylook.checked = hasBabylook;
  }

  buildClientFormGrid(true);
  recalcClientFormGrid();
  showToast(`Especificações e arte da ${prevOrder.numero} copiadas! Ajuste apenas as quantidades se desejar.`, 'success');
}

function changeFormSellerToken(newSellerId) {
  state.formSellerId = newSellerId;
  saveState();
  renderClientPortal();
}

function buildClientFormGrid(preserveValues = false) {
  const thead = document.getElementById('cf-grade-thead');
  const tbody = document.getElementById('cf-grade-tbody');
  if (!tbody) return;

  if (!preserveValues) {
    clientGridDraft = {
      padrao: createEmptyGridRow(),
      babylook: createEmptyGridRow()
    };
  }

  const modelagem = document.getElementById('cf-modelagem')?.value || 'Padrão/Unissex + Baby Look';
  const gola = document.getElementById('cf-gola')?.value || 'Redonda';
  const labels = getDynamicRowLabels(modelagem, gola);

  const showPadrao = document.getElementById('cf-check-padrao')?.checked ?? true;
  const showBabylook = document.getElementById('cf-check-babylook')?.checked ?? true;
  const showInfantil = document.getElementById('cf-check-infantil')?.checked ?? false;

  const visibleSizes = showInfantil ? SIZES : ADULT_SIZES;

  if (thead) {
    thead.innerHTML = `
      <tr class="bg-silas-900 text-white font-bold">
        <th class="py-2.5 px-3 text-left min-w-[160px]">Modelagem</th>
        ${visibleSizes.map(sz => {
          const isChild = CHILD_SIZES.includes(sz);
          return `<th class="py-2 px-1.5 text-center ${isChild ? 'bg-amber-900/60 text-amber-200' : ''}" title="${isChild ? 'Tamanho Infantil' : 'Tamanho Adulto'}">${sz}</th>`;
        }).join('')}
        <th class="py-2.5 px-3 bg-blue-800 text-center">SUBTOTAL</th>
      </tr>
    `;
  }

  const activeRows = [];
  if (showPadrao) {
    activeRows.push({
      key: 'padrao',
      label: labels.padrao,
      badgeClass: 'bg-blue-50 text-blue-900',
      rowClass: 'bg-white'
    });
  }
  if (showBabylook && modelagem !== 'Colete Dupla Face') {
    activeRows.push({
      key: 'babylook',
      label: labels.babylook,
      badgeClass: 'bg-pink-50 text-pink-900',
      rowClass: 'bg-slate-50/60'
    });
  }

  tbody.innerHTML = activeRows.map(r => `
    <tr class="${r.rowClass}">
      <td class="py-2.5 px-3 font-bold text-left text-slate-800">${r.label}</td>
      ${visibleSizes.map(sz => {
        const val = clientGridDraft[r.key][sz] || 0;
        return `
          <td class="p-1.5 text-center">
            <input type="number" min="0" value="${val}" id="cf-grid-${r.key}-${sz}"
              oninput="onInputClientGridCell('${r.key}', '${sz}', this.value)"
              class="w-12 text-center font-mono-code text-xs py-1.5 rounded-lg border ${val > 0 ? 'border-blue-500 bg-blue-50/50 font-bold text-slate-900' : 'border-slate-200 text-slate-600'} focus:border-blue-600 focus:outline-none" />
          </td>
        `;
      }).join('')}
      <td id="cf-row-total-${r.key}" class="py-2.5 px-3 font-mono-code font-extrabold text-center ${r.badgeClass}">0 pçs</td>
    </tr>
  `).join('');

  recalcClientFormGrid();
}

function recalcClientFormGrid() {
  const showPadrao = document.getElementById('cf-check-padrao')?.checked ?? true;
  const showBabylook = document.getElementById('cf-check-babylook')?.checked ?? true;
  const showInfantil = document.getElementById('cf-check-infantil')?.checked ?? false;
  const visibleSizes = showInfantil ? SIZES : ADULT_SIZES;

  let totalAll = 0;
  [
    { key: 'padrao', active: showPadrao },
    { key: 'babylook', active: showBabylook }
  ].forEach(({ key, active }) => {
    if (!active) return;
    let rowSum = 0;
    visibleSizes.forEach(sz => {
      const val = Math.max(0, parseInt(clientGridDraft[key]?.[sz], 10) || 0);
      rowSum += val;
    });
    const rowCell = document.getElementById(`cf-row-total-${key}`);
    if (rowCell) rowCell.textContent = `${rowSum} pçs`;
    totalAll += rowSum;
  });

  const badge = document.getElementById('cf-grade-total-badge');
  if (badge) badge.textContent = `${totalAll} pçs`;
  return totalAll;
}

function findExistingClient(documento, email, telefone) {
  const cleanDoc = (documento || '').replace(/\D/g, '');
  const cleanPhone = (telefone || '').replace(/\D/g, '');
  const cleanEmail = (email || '').trim().toLowerCase();

  return state.clients.find(c => {
    const cDoc = c.documento.replace(/\D/g, '');
    const cPhone = c.telefone.replace(/\D/g, '');
    const cMail = c.email.trim().toLowerCase();
    if (cleanDoc && cleanDoc.length >= 8 && cDoc === cleanDoc) return true;
    if (cleanEmail && cleanEmail.length >= 5 && cMail === cleanEmail) return true;
    if (cleanPhone && cleanPhone.length >= 8 && cPhone === cleanPhone) return true;
    return false;
  });
}

function checkExistingClientOnInput() {
  const doc = document.getElementById('cf-documento')?.value || '';
  const email = document.getElementById('cf-email')?.value || '';
  const phone = document.getElementById('cf-telefone')?.value || '';
  const alertBox = document.getElementById('existing-client-alert');
  const alertText = document.getElementById('existing-client-alert-text');
  if (!alertBox || !alertText) return;

  const found = findExistingClient(doc, email, phone);
  if (found) {
    alertBox.classList.remove('hidden');
    alertText.innerHTML = `
      <strong>Cadastro Único Confirmado (${found.nome}):</strong>
      Este novo pedido será vinculado automaticamente ao seu CPF/CNPJ (${found.documento}) sem gerar duplicidade.
    `;
  } else {
    alertBox.classList.add('hidden');
  }
}

function fillDemoNewClientInForm() {
  const existingClient = getClientById(currentIdentifiedClientId);
  if (!existingClient) {
    document.getElementById('cf-documento').value = '77.888.999/0001-55';
    document.getElementById('cf-nome').value = 'Construtora Horizonte Engenharia';
    document.getElementById('cf-telefone').value = '(11) 99444-5566';
    document.getElementById('cf-email').value = 'suprimentos@construtorahorizonte.com.br';
  }
  const solEl = document.getElementById('cf-solicitante');
  if (solEl) solEl.value = 'Eng. Marcos (11) 99444-5566';
  document.getElementById('cf-turma').value = 'Lote Obras Residencial Parque';
  document.getElementById('cf-entrega').value = '2026-12-05';
  document.getElementById('cf-gola').value = 'Polo';
  document.getElementById('cf-modelagem').value = 'Padrão/Unissex';
  document.getElementById('cf-tecnica').value = 'Bordado';
  document.getElementById('cf-malha-pref').value = 'Piquet PA Cinza Mescla';
  document.getElementById('cf-observacoes').value = 'Camisa Polo Cinza Mescla com logo bordado no peito e faixa refletiva.';
  document.getElementById('cf-lista-nomes').value = 'Lote corporativo engenheiros e mestres de obras (50 peças).';

  clientGridDraft = {
    padrao: { ...createEmptyGridRow(), P: 6, M: 20, G: 16, GG: 8 },
    babylook: createEmptyGridRow()
  };
  const checkInfantil = document.getElementById('cf-check-infantil');
  if (checkInfantil) checkInfantil.checked = false;
  onChangeClientModelagem();
  recalcClientFormGrid();
  checkExistingClientOnInput();
  showToast('Exemplo de pedido preenchido! Clique em "Enviar Pedido e Gerar Nº da OP".', 'info');
}

function submitClientOrderForm(e) {
  e.preventDefault();

  const totalPecas = recalcClientFormGrid();
  if (totalPecas <= 0) {
    showToast('Informe pelo menos 1 peça na Grade de Quantidades (Etapa 3)!', 'error');
    return;
  }

  const doc = document.getElementById('cf-documento').value.trim();
  const nome = document.getElementById('cf-nome').value.trim();
  const solicitante = (document.getElementById('cf-solicitante')?.value || '').trim();
  const turmaRaw = (document.getElementById('cf-turma')?.value || '').trim();
  const turma = (solicitante && turmaRaw)
    ? `${solicitante} — ${turmaRaw}`
    : (solicitante || turmaRaw || 'Pedido Geral');
  const telefone = document.getElementById('cf-telefone').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const entrega = document.getElementById('cf-entrega').value;
  const gola = document.getElementById('cf-gola').value;
  const modelagem = document.getElementById('cf-modelagem').value;
  const tecnica = document.getElementById('cf-tecnica').value;
  const malhaPref = document.getElementById('cf-malha-pref').value.trim() || 'A definir pela produção';
  const obs = document.getElementById('cf-observacoes').value.trim();
  const listaNomes = document.getElementById('cf-lista-nomes').value.trim();

  const seller = getUserById(state.formSellerId) || getCurrentUser();
  const sellerLogin = seller.login || seller.linkToken;

  // 1. Verificar se cliente já existe (Anti-duplicidade)
  let client = findExistingClient(doc, email, telefone);
  let wasExistingClient = false;

  if (client) {
    wasExistingClient = true;
  } else {
    client = {
      id: 'cli_' + Date.now(),
      nome,
      documento: doc,
      telefone,
      email,
      criadoEm: formatNowDateTime(),
      consentimentoLgpd: true,
      dataConsentimento: `${formatNowDateTime()} (Formulário Web)`
    };
    state.clients.unshift(client);
  }

  // 2. Montar grade considerando apenas os cortes e tamanhos ativos
  const showPadrao = document.getElementById('cf-check-padrao')?.checked ?? true;
  const showBabylook = document.getElementById('cf-check-babylook')?.checked ?? true;
  const showInfantil = document.getElementById('cf-check-infantil')?.checked ?? false;
  const visibleSizes = showInfantil ? SIZES : ADULT_SIZES;

  const grade = {
    padrao: createEmptyGridRow(),
    babylook: createEmptyGridRow()
  };
  visibleSizes.forEach(sz => {
    if (showPadrao) {
      grade.padrao[sz] = Math.max(0, parseInt(clientGridDraft.padrao?.[sz], 10) || 0);
    }
    if (showBabylook && modelagem !== 'Colete Dupla Face') {
      grade.babylook[sz] = Math.max(0, parseInt(clientGridDraft.babylook?.[sz], 10) || 0);
    }
  });

  // 3. Gerar número único da OP
  const nextNumber = 45 + state.orders.length - 4;
  const opNumero = `OP-2026-00${nextNumber}`;

  const newOrder = {
    id: 'ped_' + Date.now(),
    numero: opNumero,
    clienteId: client.id,
    responsavelId: seller.id,
    turmaResponsavel: turma,
    status: 'recebido',
    subStatus: wasExistingClient
      ? `Recebido via Link ?login=${sellerLogin} (Cliente Recorrente)`
      : `Recebido via Link ?login=${sellerLogin} (Novo Cliente)`,
    criadoEm: formatNowDateTime().slice(0, 16),
    atualizadoEm: formatNowDateTime().slice(0, 16),
    entregaPrevista: entrega,
    listaAprovada: false,
    consentimentoLgpd: true,
    especificacoes: {
      tipoGola: gola,
      modelagemCamisa: modelagem,
      tecnicaImpressao: tecnica,
      arteAprovada: false,
      gabaritoPlotter: false,
      malhaCamisaTipo: malhaPref,
      malhaCamisaKg: (totalPecas * 0.22).toFixed(1),
      malhaShortTipo: 'A definir',
      malhaShortKg: '0',
      golaPunho: `Padrão ${gola}`,
      botoesQtd: gola === 'Polo' ? `${totalPecas * 3}` : '0',
      elasticoMm: '-',
      cadarco: '-',
      observacoesArte: obs
    },
    grade,
    listaNomes,
    rotaOperacional: [
      { etapa: 1, nome: '1. Atendimento & Listas', responsavel: 'Kauê', atribuicao: 'Atendimento, organização de tamanhos/nomes e aprovação no ZAP.', data: '', ok: false },
      { etapa: 2, nome: '2. Arte & Layout', responsavel: 'Luiz/David (Design)', atribuicao: 'Criação da arte visual e envio para aprovação final do cliente.', data: '', ok: false },
      { etapa: 3, nome: '3. Gabarito & Plotter', responsavel: 'Dudu (Design)', atribuicao: 'Montagem dos gabaritos operacionais para rodar nas 2 plotters.', data: '', ok: false },
      { etapa: 4, nome: '4. Papel, Kit & Costura', responsavel: 'Jonatan', atribuicao: 'Corte do papel impresso, separação de aviamentos e envio costura.', data: '', ok: false },
      { etapa: 5, nome: '5. Prensagem & Embalagem', responsavel: 'Jonatan', atribuicao: 'Prensagem térmica das peças e apoio na embalagem final.', data: '', ok: false }
    ],
    qualidadeFinal: {
      semManchas: false,
      conferido: false,
      prontaEntrega: false,
      conferenteAssinatura: '',
      dataConferencia: ''
    }
  };

  state.orders.unshift(newOrder);
  seller.cliquesLink = (seller.cliquesLink || 0) + 1;

  // Manter o cliente logado/identificado na sessão do Portal do Cliente
  currentIdentifiedClientId = client.id;

  // 4. Registrar na Auditoria Imutável
  addAuditLog(
    newOrder.id,
    newOrder.numero,
    'Captação via Link Rastreável',
    'Formulário Público Enviado',
    `Atribuído à conta @${sellerLogin} (${seller.nomeCurto}) • ${totalPecas} pçs • ${wasExistingClient ? 'Vinculado ao cliente existente ' + client.nome : 'Novo cliente cadastrado ' + client.nome}`,
    `Cliente (${client.nome})`
  );

  saveState();
  renderAll();

  // Mudar para a opção "Acompanhar Meus Pedidos" mostrando a OP recém-criada!
  switchClientSubtab('track');
  const select = document.getElementById('client-track-order-select');
  if (select) select.value = newOrder.id;
  renderClientOrderTracker(newOrder.id);

  showToast(`Pedido ${opNumero} gerado com sucesso e vinculado à conta @${sellerLogin}!`, 'success');
}

// ============================================================================
// OPÇÃO 2 DO CLIENTE: ACOMPANHAR MEUS PEDIDOS (DETALHES ENVIADOS + STATUS DE PRONTIDÃO)
// ============================================================================
function renderClientTrackerTab() {
  const select = document.getElementById('client-track-order-select');
  if (!select) return;

  // Filtrar apenas os pedidos do cliente identificado (ou todos se não houver cliente específico)
  const clientOrders = (currentIdentifiedClientId && currentIdentifiedClientId !== 'NEW_CLIENT')
    ? state.orders.filter(o => o.clienteId === currentIdentifiedClientId)
    : state.orders;

  if (clientOrders.length === 0) {
    select.innerHTML = `<option value="">Nenhum pedido encontrado</option>`;
    document.getElementById('client-tracker-content').innerHTML = `
      <div class="p-8 text-center text-slate-500 text-sm">
        Você ainda não possui pedidos registrados. Clique em <strong>"Criar Novo Pedido"</strong> acima para enviar seu primeiro formulário!
      </div>
    `;
    return;
  }

  const currentVal = clientOrders.some(o => o.id === select.value) ? select.value : clientOrders[0].id;
  select.innerHTML = clientOrders.map(o => {
    const statusLabel = o.status === 'concluido' ? '✓ PRONTO' : o.status === 'em_andamento' ? '⏳ EM ANDAMENTO' : '📥 RECEBIDO';
    return `
      <option value="${o.id}" ${o.id === currentVal ? 'selected' : ''}>
        ${o.numero} [${statusLabel}] — ${o.turmaResponsavel} (${calculateOrderTotalPieces(o)} pçs)
      </option>
    `;
  }).join('');

  renderClientOrderTracker(currentVal);
}

function renderClientOrderTracker(orderId) {
  const container = document.getElementById('client-tracker-content');
  if (!container) return;
  const order = getOrderById(orderId);
  if (!order) return;

  const client = getClientById(order.clienteId);
  const seller = getUserById(order.responsavelId);
  const totalPecas = calculateOrderTotalPieces(order);
  const totalPadrao = calculateRowTotal(order.grade.padrao);
  const totalBabylook = calculateRowTotal(order.grade.babylook);
  const labels = getDynamicRowLabels(order.especificacoes.modelagemCamisa, order.especificacoes.tipoGola);

  // Definir banner de situação principal (Recebido, Em Andamento ou Pronto)
  let statusBannerHTML = '';
  if (order.status === 'concluido') {
    statusBannerHTML = `
      <div class="rounded-2xl p-5 bg-emerald-50 border-2 border-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <i data-lucide="check-circle-2" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
              PEDIDO PRONTO / CONCLUÍDO
            </span>
            <h4 class="text-base sm:text-lg font-extrabold text-emerald-950 mt-1">
              Seu pedido já está pronto para retirada / entrega!
            </h4>
            <p class="text-xs text-emerald-800 mt-0.5">
              Todas as etapas de produção e conferência foram finalizadas. Entre em contato pelo WhatsApp com seu consultor para alinhar a retirada/entrega.
            </p>
          </div>
        </div>
      </div>
    `;
  } else if (order.status === 'em_andamento') {
    statusBannerHTML = `
      <div class="rounded-2xl p-5 bg-amber-50/90 border-2 border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <i data-lucide="loader" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
              EM ANDAMENTO NA PRODUÇÃO
            </span>
            <h4 class="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
              Seu pedido está sendo produzido pela nossa equipe
            </h4>
            <p class="text-xs text-slate-600 mt-0.5">
              Etapa atual: <strong>${order.subStatus || 'Em produção na fábrica'}</strong> • Previsão de entrega: <strong>${formatDateBR(order.entregaPrevista)}</strong>.
            </p>
          </div>
        </div>
      </div>
    `;
  } else {
    statusBannerHTML = `
      <div class="rounded-2xl p-5 bg-blue-50/90 border-2 border-blue-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3.5">
          <div class="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <i data-lucide="inbox" class="w-6 h-6"></i>
          </div>
          <div>
            <span class="inline-block text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-200 text-blue-900">
              PEDIDO RECEBIDO
            </span>
            <h4 class="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
              Recebemos os dados do seu pedido!
            </h4>
            <p class="text-xs text-slate-600 mt-0.5">
              O envio e aprovação da arte são feitos diretamente pelo <strong>WhatsApp</strong> com seu consultor responsável (<strong>${seller?.nomeCurto || 'Atendimento'}</strong>).
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // Montar pílulas dos tamanhos pedidos em cada linha
  const padraoItems = SIZES.filter(sz => (order.grade.padrao[sz] || 0) > 0)
    .map(sz => `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-mono-code text-xs font-bold">Tam ${sz}: ${order.grade.padrao[sz]}</span>`)
    .join('');

  const babylookItems = SIZES.filter(sz => (order.grade.babylook[sz] || 0) > 0)
    .map(sz => `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 border border-pink-200 text-pink-900 font-mono-code text-xs font-bold">Tam ${sz}: ${order.grade.babylook[sz]}</span>`)
    .join('');

  container.innerHTML = `
    <div class="space-y-6">
      <!-- 1. BANNER DE STATUS PRINCIPAL (PRONTO OU EM ANDAMENTO) -->
      ${statusBannerHTML}

      <!-- 2. BARRA SIMPLES DE SITUAÇÃO (3 MARCOS PRINCIPAIS) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div class="p-3.5 rounded-xl border ${order.status === 'recebido' ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-100' : 'bg-emerald-50/60 border-emerald-200'} flex items-center gap-3">
          <div class="w-8 h-8 rounded-full ${order.status === 'recebido' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'} font-bold text-xs flex items-center justify-center shrink-0">1</div>
          <div>
            <div class="text-xs font-extrabold text-slate-900">1. Pedido Recebido</div>
            <div class="text-[11px] text-slate-500">Registrado em ${order.criadoEm}</div>
          </div>
        </div>

        <div class="p-3.5 rounded-xl border ${order.status === 'em_andamento' ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-100' : order.status === 'concluido' ? 'bg-emerald-50/60 border-emerald-200' : 'bg-white border-slate-200 opacity-60'} flex items-center gap-3">
          <div class="w-8 h-8 rounded-full ${order.status === 'em_andamento' ? 'bg-amber-500 text-white' : order.status === 'concluido' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'} font-bold text-xs flex items-center justify-center shrink-0">2</div>
          <div>
            <div class="text-xs font-extrabold text-slate-900">2. Em Andamento</div>
            <div class="text-[11px] text-slate-500">Corte, Estamparia e Costura</div>
          </div>
        </div>

        <div class="p-3.5 rounded-xl border ${order.status === 'concluido' ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-100' : 'bg-white border-slate-200 opacity-60'} flex items-center gap-3">
          <div class="w-8 h-8 rounded-full ${order.status === 'concluido' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'} font-bold text-xs flex items-center justify-center shrink-0">3</div>
          <div>
            <div class="text-xs font-extrabold text-slate-900">3. Pedido Pronto</div>
            <div class="text-[11px] text-slate-500">${order.status === 'concluido' ? 'Liberado para entrega!' : `Previsão: ${formatDateBR(order.entregaPrevista)}`}</div>
          </div>
        </div>
      </div>

      <!-- 3. DETALHES COMPLETOS DO PEDIDO ENVIADO NO FORMULÁRIO -->
      <div class="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-5">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div class="space-y-1">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-lg bg-silas-900 text-white font-mono-code font-bold text-sm">${order.numero}</span>
              ${getStatusBadgeHTML(order.status)}
              <span class="text-xs text-slate-500 font-mono-code">Enviado em ${order.criadoEm}</span>
            </div>
            <h4 class="text-lg font-bold text-slate-900 pt-1">${order.turmaResponsavel}</h4>
            <p class="text-xs text-slate-600">
              Cliente: <strong>${client?.nome || ''}</strong> • Consultor Responsável: <strong>${seller?.nome || ''}</strong>
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-right">
              <div class="text-[11px] text-slate-400 uppercase font-bold">Total do Pedido</div>
              <div class="text-base font-extrabold text-slate-900 font-mono-code">${totalPecas} peças</div>
            </div>
            <div class="bg-white px-4 py-2.5 rounded-xl border border-slate-200 text-right">
              <div class="text-[11px] text-slate-400 uppercase font-bold">Data Prevista</div>
              <div class="text-base font-extrabold text-blue-700 font-mono-code">${formatDateBR(order.entregaPrevista)}</div>
            </div>
          </div>
        </div>

        <!-- Especificações escolhidas no formulário -->
        <div>
          <h5 class="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">Especificações Enviadas no Formulário</h5>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] text-slate-400 font-bold uppercase">Modelagem</div>
              <div class="text-xs font-bold text-slate-900 mt-0.5">${order.especificacoes.modelagemCamisa}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] text-slate-400 font-bold uppercase">Tipo de Gola</div>
              <div class="text-xs font-bold text-slate-900 mt-0.5">Gola ${order.especificacoes.tipoGola}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] text-slate-400 font-bold uppercase">Técnica / Impressão</div>
              <div class="text-xs font-bold text-slate-900 mt-0.5">${order.especificacoes.tecnicaImpressao}</div>
            </div>
            <div class="bg-white p-3 rounded-xl border border-slate-200">
              <div class="text-[11px] text-slate-400 font-bold uppercase">Tecido / Malha</div>
              <div class="text-xs font-bold text-slate-900 mt-0.5">${order.especificacoes.malhaCamisaTipo || 'A definir'}</div>
            </div>
          </div>
          ${order.especificacoes.observacoesArte ? `
            <div class="mt-3 bg-white p-3.5 rounded-xl border border-slate-200">
              <div class="text-[11px] text-slate-400 font-bold uppercase">Cores Principais e Observações do Pedido</div>
              <div class="text-xs text-slate-800 mt-0.5">${order.especificacoes.observacoesArte}</div>
            </div>
          ` : ''}
        </div>

        <!-- Grade de Tamanhos Enviada -->
        <div class="space-y-2.5">
          <h5 class="text-xs font-extrabold uppercase tracking-wider text-slate-500">Grade de Quantidades e Tamanhos Solicitados</h5>
          <div class="space-y-2">
            ${totalPadrao > 0 ? `
              <div class="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span class="text-xs font-extrabold text-slate-900">${labels.padrao}</span>
                  <div class="flex flex-wrap gap-1.5 mt-2">${padraoItems}</div>
                </div>
                <div class="text-right shrink-0">
                  <span class="px-3 py-1 rounded-lg bg-blue-100 text-blue-900 font-mono-code text-xs font-extrabold">Subtotal: ${totalPadrao} pçs</span>
                </div>
              </div>
            ` : ''}

            ${totalBabylook > 0 ? `
              <div class="bg-white p-3.5 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span class="text-xs font-extrabold text-slate-900">${labels.babylook}</span>
                  <div class="flex flex-wrap gap-1.5 mt-2">${babylookItems}</div>
                </div>
                <div class="text-right shrink-0">
                  <span class="px-3 py-1 rounded-lg bg-pink-100 text-pink-900 font-mono-code text-xs font-extrabold">Subtotal: ${totalBabylook} pçs</span>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Lista de Nomes/Números (se enviada) -->
        ${order.listaNomes ? `
          <div>
            <h5 class="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">Lista de Nomes / Números Enviada</h5>
            <div class="bg-white p-3.5 rounded-xl border border-slate-200 font-mono-code text-xs text-slate-700 whitespace-pre-line">${order.listaNomes}</div>
          </div>
        ` : ''}

        <!-- Aviso de Atendimento e Aprovação de Arte via WhatsApp + Recompra -->
        <div class="pt-2 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs text-slate-600">
            <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600 shrink-0"></i>
            <span>O envio da arte, ajustes e aprovação final são realizados diretamente pelo <strong>WhatsApp</strong> com seu consultor (<strong>${seller?.nomeCurto || 'Silas Confecções'}</strong>).</span>
          </div>
          <button
            type="button"
            onclick="switchClientSubtab('form'); repeatPreviousOrderSpecs('${order.id}')"
            class="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold transition"
          >
            <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            <span>Usar como Base p/ Novo Pedido</span>
          </button>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// ============================================================================
// TOAST NOTIFICATIONS E RENDER GERAL
// ============================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const bgColors = {
    success: 'bg-emerald-900 border-emerald-700 text-white',
    error: 'bg-rose-900 border-rose-700 text-white',
    info: 'bg-silas-900 border-slate-700 text-white'
  };

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg text-xs font-semibold animate-fade-in ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : type === 'error' ? 'bg-rose-400' : 'bg-blue-400'} shrink-0"></span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.25s ease';
    setTimeout(() => toast.remove(), 260);
  }, 3800);
}

function renderAll() {
  renderTopUserSimulator();
  updateNavBadges();
  renderOrders();
  renderClients();
  renderAuditLogs();
  renderUserLinkTab();
  renderClientPortal();
  if (window.lucide) lucide.createIcons();
}

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  buildClientFormGrid();

  // Se o cliente abrir o link contendo ?login=kaue (ou ?responsavel=kaue), identifica a conta automaticamente
  const params = new URLSearchParams(window.location.search);
  const loginParam = (params.get('login') || params.get('responsavel') || '').trim().toLowerCase().replace(/^@/, '');
  if (loginParam) {
    const matchedUser = state.users.find(u =>
      (u.login && u.login.toLowerCase() === loginParam) ||
      (u.linkToken && u.linkToken.toLowerCase() === loginParam)
    );
    if (matchedUser) {
      state.formSellerId = matchedUser.id;
      saveState();
      switchTab('cliente-portal');
      switchClientSubtab('form');
      showToast(`Link identificado! Formulário conectado automaticamente à conta @${matchedUser.login} (${matchedUser.nomeCurto}).`, 'success');
      return;
    }
  }

  switchTab('pedidos');
});
