# 🧵 Silas Confecções & Serigrafia
### Plataforma de Captação e Gestão de Pedidos — Protótipo Interativo 2026

Protótipo completo desenvolvido para informatizar, centralizar e modernizar todo o fluxo de vendas e produção da **Silas Confecções e Serigrafia**. O sistema elimina pedidos soltos em papel, evita retrabalho e cadastros duplicados, e garante rastreabilidade total do atendimento até a entrega da peça.

O projeto foi construído com base fiel nos documentos operacionais da fábrica:
1. **Plataforma de Captação e Gestão de Pedidos** *(Documento de Requisitos e Arquitetura)*
2. **Ordem de Produção — OP MESTRA REESTRUTURADA 2026** *(Ficha Técnica Oficial do Chão de Fábrica)*

---

## 🚀 Como Executar o Protótipo

O protótipo é uma aplicação web moderna e independente (**Zero Dependências / Zero Instalações**). Não requer servidor ou banco de dados externo para ser testado.

1. Baixe ou clone esta pasta no seu computador.
2. Dê um **duplo clique no arquivo `index.html`** (ou abra-o em qualquer navegador moderno como Google Chrome, Microsoft Edge ou Mozilla Firefox).
3. Todas as alterações, novos pedidos e logs de auditoria ficam salvos automaticamente no armazenamento local do navegador (`localStorage`).

---

## 🎯 Principais Módulos do Sistema

### 1. Gestão de Pedidos & Ordens de Produção (OPs)
* **Filtros Rápidos:** *Todos*, *Recebido*, *Em Andamento*, *Concluído* e *Meus Pedidos* (pedidos do usuário logado).
* **Modos de Visualização:** Alternância com 1 clique entre **Visão Lista (Tabela)** e **Visão Kanban (Colunas de Produção)**.
* **Ciclo de Vida Automático:** O status geral da OP (*Recebido* → *Em Andamento* → *Concluído*) é atualizado sozinho conforme a equipe marca a conclusão de cada etapa da fábrica.
* **Folha de Impressão Oficial:** Botão **"Imprimir OP Mestra"** que gera a ficha técnica física em formato A4 idêntica ao modelo original da Silas Confecções.
* **Controle de Permissão por Perfil:**
  * **Administrador (`@silas`):** Acesso completo para editar qualquer pedido e reatribuir responsáveis.
  * **Responsável (`@kaue`, `@jonatan`):** Pode visualizar todas as OPs, mas só tem permissão de edição nas OPs vinculadas à sua própria conta.

### 2. Rota Operacional da Fábrica (Item 5 da OP Mestra)
Checklist interno da esteira de produção para saber em qual mão a camiseta está a qualquer momento:
1. **1. Atendimento & Listas:** Conferência de tamanhos e aprovação no WhatsApp.
2. **2. Arte & Layout:** Criação da arte visual pelos designers e envio para aprovação.
3. **3. Gabarito & Plotter:** Montagem do arquivo na medida e impressão nas plotters.
4. **4. Papel, Kit & Costura:** Corte do papel, separação de aviamentos e montagem das peças.
5. **5. Prensagem & Embalagem:** Transferência térmica, conferência final e embalagem.

### 3. Gestão de Clientes & Motor Anti-Duplicidade
* **Cadastro Único:** O sistema cruza **CPF/CNPJ, WhatsApp e E-mail** para impedir cadastros repetidos da mesma escola, empresa ou cliente.
* **Histórico Consolidado:** Cada cliente possui um painel com todos os pedidos já feitos ao longo do tempo.
* **Conformidade LGPD:** Registro de consentimento legal (Lei nº 13.709/2018) coletado no momento do envio do pedido.

### 4. Trilha de Auditoria Imutável (Compliance)
* Todas as alterações feitas dentro de qualquer pedido (mudança de status, alteração de data de entrega, troca de tecido, acréscimo de peças na grade ou seen nas etapas) geram uma trilha à prova de fraudes:
  * **Quando:** Data e hora exatas com carimbo de tempo.
  * **Responsável:** Quem fez a alteração (usuário logado).
  * **Identificação:** Número da OP alterada.
  * **Campo Alterado:** Qual campo foi modificado.
  * **Histórico:** Valor anterior vs. Valor novo destacados visualmente.

### 5. Links Rastreáveis dos Vendedores
* Cada colaborador possui um link rastreável exclusivo (ex: `https://silasconfeccoes.com.br/pedido?login=kaue`).
* Ao enviar esse link para o cliente no WhatsApp, os pedidos enviados são creditados automaticamente na conta daquele vendedor.
* Acompanha botões de compartilhamento direto para o WhatsApp e gerador de QR Code.

### 6. Área do Cliente (Portal Web sem Senha)
Uma experiência pensada para evitar o atrito de senhas que os clientes esquecem:
* **Entrada Dupla:**
  * **🔑 Já sou Cliente:** O cliente digita seu CPF, CNPJ ou WhatsApp e acessa instantaneamente seu histórico de pedidos e a opção de recompra rápida.
  * **✨ Sou Cliente Novo:** O cliente faz um cadastro simples de 1 minuto (com verificação anti-duplicidade em tempo real) e vai direto para a tela de fazer seu primeiro pedido.
* **Acompanhamento Transparente:** O cliente consulta em tempo real se seu pedido está *Recebido*, *Em Andamento* ou *Pronto para Retirada*, além de ver o resumo de todos os tamanhos pedidos.
* **Grade Dinâmica e Inteligente:**
  * Adapta-se ao produto escolhido (Padrão Unissex, Baby Look, Regata, Polo ou Colete Dupla Face).
  * Filtro opcional de **Grade Infantil (2 ao 12)** vs **Adulto (PP ao XXGG)** para manter a tela limpa e rápida de preencher no celular.

---

## 👥 Contas de Acesso Configuradas (Para Testes)

No simulador do topo da página, você pode alternar entre as contas abaixo com 1 clique para testar as permissões:

| Login | Nome | Perfil | Permissão |
| :--- | :--- | :--- | :--- |
| `@silas` | Silas (Diretoria & Admin) | Administrador | Acesso total a todas as funções e pedidos |
| `@kaue` | Kauê (Atendimento & Vendas) | Responsável | Edita apenas pedidos vinculados ao seu login |
| `@jonatan` | Jonatan (Produção & Costura) | Responsável | Edita apenas pedidos vinculados ao seu login |

---

## 📁 Estrutura de Arquivos

```text
cerigrafia/
├── index.html        # Estrutura completa do portal (Admin, Fábrica e Área do Cliente)
├── styles.css        # Folha de estilos, fontes, animações e layout de impressão da OP
├── app.js            # Lógica de negócio, auditoria, motor de grade e persistência
└── README.md         # Documentação e guia de apresentação do sistema
```

---

## 🎤 Roteiro Sugerido para Apresentação ao Cliente

1. **Abertura:** Mostre o painel inicial com os filtros de status e a visão Kanban, demonstrando a facilidade de ver quantas peças estão em produção.
2. **Folha da OP:** Abra um pedido e clique em **"Imprimir OP Mestra"** para mostrar que o sistema gera o mesmo documento que ele já usa hoje, só que preenchido digitalmente sem rasuras.
3. **Auditoria:** Altere uma quantidade na grade e mostre a aba **Auditoria**, explicando que ninguém pode alterar um pedido sem deixar registrado quem alterou e quando.
4. **Link do Vendedor:** Mostre a aba **Link do Responsável**, copie o link e mostre como o vendedor envia pelo WhatsApp.
5. **Área do Cliente:** Abra a **Área do Cliente**, simule a entrada de um cliente antigo e mostre como é fácil para a escola ver se o pedido já está pronto para entrega.
