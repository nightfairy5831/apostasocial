Ola, tudo bem?

Li o escopo do projeto com atencao e entendo exatamente o que voces querem: uma plataforma social de apostas entre amigos que seja divertida, simples e confiavel, com foco em usabilidade mobile e transparencia na distribuicao dos premios.

Antes de enviar uma proposta teorica, eu ja construi um demo funcional completo:

**Demo:** https://github.com/nightfairy5831/apostasocial

## O Que o Demo Inclui

Todas as funcionalidades essenciais do MVP ja estao implementadas:

### Criacao e Entrada em Apostas
- **Wizard de 4 etapas** — Detalhes (titulo, categoria, tipo objetivo/subjetivo), opcoes dinamicas, regras (valor max R$1000, ate 100 participantes, prazo, privacidade), e revisao com calculo automatico do pote e taxa de 10%
- **6 apostas funcionais** — Futebol (Champions), Reality Show (BBB), Politica, Desafio Pessoal (5km), F1, Entretenimento (Oscar) com participantes, opcoes e odds
- **Explorar apostas** — Listagem publica com filtros por categoria, status e busca

### Carteira Digital
- **Saldo, extrato e historico** — 12 transacoes mock (depositos, entradas, premios, saques) com valores em BRL
- **Deposito via Pix e Cartao** — Interface completa com selecao de metodo de pagamento
- **Solicitacao de saque** — Formulario com dados bancarios (nome, CPF, chave Pix) e prazo de 1 dia util
- **Resumo financeiro** — Total depositado, total em premios, total apostado

### Sistema de Apuracao e Distribuicao
- **Apostas objetivas** — Integracao prevista com API de resultados esportivos
- **Apostas subjetivas** — Sistema de votacao entre participantes (status "Em Votacao")
- **Distribuicao automatica** — Premio calculado com retencao de 10%, exibido na revisao e no detalhe da aposta

### Chat e Interacao Social
- **Chat interno por aposta** — Mensagens em tempo real entre participantes, com nota "Chat ativo ate 2h apos encerramento"
- **Compartilhamento** — Botao de compartilhar com link copiavel para convite via WhatsApp, email ou link direto

### Ranking e Gamificacao
- **Leaderboard completo** — 4 views: Geral, Mais Vitorias, Maior Win Rate, Mais Apostas
- **Podio top 3** — Cards destacados com coroa/ouro/prata/bronze
- **Badges** — Veterano, Rei do Futebol, Sortudo, Rainha do BBB, Apostador de Elite, Lider de Liga

### Ligas Privadas
- **3 ligas funcionais** — Bolao dos Amigos, Liga do Escritorio, Desafio Fitness
- **Ranking por liga** — Pontos, vitorias, total de apostas por membro
- **Codigo de convite** — Sistema de entrada por codigo
- **Criacao de ligas** — Modal para criar nova liga com nome e descricao

### Painel de Acompanhamento
- **Dashboard do usuario** — KPIs (saldo, apostas ativas, vitorias, win rate), apostas em andamento, transacoes recentes, badges, acoes rapidas
- **Perfil completo** — Historico de apostas agrupado por status, badges ganhos e proximos, estatisticas por categoria com graficos

## Stack Tecnico

- **Frontend:** Next.js com TypeScript
- **Styling:** Tailwind CSS v3.4.4 (roxo/verde/amber — divertido e social)
- **Mock Data:** 6 usuarios, 6 apostas, 3 ligas, 12 transacoes, badges e rankings completos
- **Performance:** 13 paginas, zero erros de compilacao

## Plano de Implementacao

**Fase 1 — Cadastro e Apostas (Semanas 1-2)**
- Sistema de autenticacao (email + social login)
- CRUD de apostas com regras de negocio (limite R$1000, max 100 participantes)
- Selecao de opcoes e entrada na "caixinha"

**Fase 2 — Pagamento e Carteira (Semanas 3-4)**
- Gateway de pagamento (Pix + cartao)
- Carteira digital com saldo, extrato e saque
- Distribuicao automatica com retencao de 10%

**Fase 3 — Apuracao e Social (Semanas 4-5)**
- Integracao com API de resultados esportivos
- Sistema de votacao para apostas subjetivas
- Chat em tempo real por aposta
- Convite por link/WhatsApp/email

**Fase 4 — Gamificacao e Launch (Semanas 5-6)**
- Ranking com badges por categoria
- Ligas privadas com codigo de convite
- Otimizacao mobile-first
- Testes e deploy

## Por Que Eu?

- **Demo funcional pronto.** 13 paginas, 5,453 linhas de codigo, zero erros. A caixinha, a carteira, o chat, os badges — tudo funcionando.
- **Entendo apostas sociais.** O demo tem apostas objetivas E subjetivas, votacao, odds, distribuicao com taxa — nao e um template generico.
- **Mobile-first obsession.** Cada componente e responsivo porque sei que 90% dos usuarios vao usar pelo celular.
- **Gamificacao real.** Badges, rankings, ligas, streaks — o demo ja mostra como manter os usuarios engajados e voltando.

## Orcamento e Prazo

- **MVP:** 5-6 semanas
- **Abordagem:** Entregas semanais com demos para feedback

O demo mostra que eu entendo o produto e sei executar. Confira o repositorio!

Abraco
