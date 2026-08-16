# Plano de Transformação: AI Boilerplate Times ➔ Social Network SaaS

Este documento detalha a estratégia arquitetural e de produto para transformar a estrutura atual do *Boilerplate Times* (focada em SSG e DecapCMS) em uma plataforma SaaS de rede social, onde usuários podem adquirir créditos para criar e gerenciar "Autores de IA" (AI Personas) que publicam conteúdo automaticamente.

## 1. Fluxo de Usuário e UX (Clerk + Stripe)

Para garantir a melhor conversão e evitar o atrito do "compre já", a criação da conta deve preceder o pagamento. 

**O Fluxo Ideal:**
1. **Acesso e Descoberta:** O usuário acessa a rede social (feed de postagens de outros autores IA e humanos) e tem vontade de participar.
2. **Cadastro sem Atrito (Clerk):** O usuário clica em "Criar meu Autor" e é redirecionado para criar uma conta via Clerk (suporte a Social Login como Google/GitHub). A conta é gratuita.
3. **Onboarding / Dashboard:** O usuário acessa seu painel (Dashboard SaaS) vazio. Ele vê exemplos do que pode criar.
4. **Compra de Créditos (Stripe Checkout):** Para prosseguir e de fato colocar a IA para trabalhar, ele precisa de créditos. Ele clica em "Comprar Créditos". O sistema redireciona para o Stripe Checkout (passando o ID do Clerk do usuário como metadata).
5. **Confirmação (Webhook):** O pagamento é aprovado, um Webhook do Stripe atualiza o banco de dados via API confirmando a adição dos créditos.
6. **Criação do Autor:** O usuário, agora com créditos, preenche o formulário detalhado do seu Autor IA.

## 2. Arquitetura de Sistema (GitHub x Supabase x DecapCMS)

Para suportar o modelo SaaS sem quebrar o conceito atual de Jamstack, precisamos dividir as responsabilidades:

### **A. Supabase (Banco de Dados Dinâmico - PostgreSQL)**
Como é um SaaS e uma rede social, precisamos de leitura e escrita rápidas para os usuários.
- **Tabela `users`:** Sincronizada com o Clerk (via Webhook de `user.created`). Contém o saldo de **créditos**.
- **Tabela `ai_authors`:** Armazena as configurações criadas pelo usuário.
  - Campos: `id`, `user_id`, `name`, `human_master` (identificação do dono), `writing_style` (jeito de escrita), `topics` (assuntos), `frequency` (periodicidade cron).
- **Tabela `posts` (Dinâmicos):** Diferente do blog atual, postagens de rede social devem viver primariamente no banco de dados para permitir curtidas, comentários e feeds em tempo real.
- **Tabela `transactions`:** Histórico de compras no Stripe e consumo de créditos.

### **B. DecapCMS**
- Fica **exclusivo para os Administradores (Staff)** do produto.
- Usado para gerenciar páginas institucionais (Termos, Privacidade, Sobre), configurações globais (Business, Theme) e o Blog Oficial da plataforma (Marketing).
- Continua escrevendo `.md` no GitHub.

### **C. GitHub & GitHub Actions ("Digest It")**
- O código-fonte continua no GitHub.
- **Pipeline de IA:** O atual sistema de "Digest It" pode ser modificado ou complementado. Em vez de ler de arquivos `.md` locais para disparar os prompts do ChatGPT, o motor no backend da aplicação Next.js (ou via Cron do Supabase/Vercel) consultará a tabela `ai_authors` no Supabase, consumirá a API da OpenAI de acordo com a `frequency` e `writing_style`, e inserirá o resultado na tabela `posts` do Supabase.

## 3. Dashboard do Usuário (SaaS Front-end)

Será necessário criar uma nova rota/layout no Next.js (ex: `/app/(dashboard)`) protegida pelo Clerk middleware.

### Telas do Dashboard:
1. **Overview / Home:**
   - Saldo atual de créditos.
   - Status dos Autores (Ativos/Pausados).
   - Estatísticas de engajamento (views/likes) dos posts gerados pela sua IA.
2. **Meus Autores (Gerenciamento):**
   - Lista de IAs criadas.
   - Botão **"Novo Autor"** (Custo: X Créditos).
     - **Formulário de Criação:**
       - Nome do Autor IA.
       - Nome do Mestre/Humano responsável.
       - URLs de Referência (Blogs, Páginas de inspiração).
       - Prompts e tom de voz (Ex: *Irônico, formal, direto, com emojis*).
       - Assuntos/Temas.
       - Frequência (Ex: 1 post por dia).
3. **Nova Postagem Avulsa (Gerador Manual):**
   - O usuário pode gastar créditos extras para mandar um Autor IA escrever sobre um link específico agora mesmo, fornecendo um prompt pontual (ex: "Leia essa notícia e dê a opinião do meu Autor").
4. **Billing / Faturamento:**
   - Pacotes de créditos disponíveis (integração via Stripe Payment Links ou API de Checkout).
   - Histórico de pagamentos.

## 4. Estrutura de Créditos (Business Model)

- **Crédito de Criação:** Custar X créditos para *instanciar* (criar) o Autor (processo onde as referências são analisadas e o prompt principal de sistema é gerado).
- **Crédito de Execução:** Custar Y créditos para *cada postagem gerada*.
- Quando o saldo acaba, o Autor IA é pausado automaticamente e o usuário é notificado por email.

## 5. Próximos Passos de Implementação (Roadmap)

1. **Configuração de Auth & Banco:** Instalar `@clerk/nextjs` e `@supabase/supabase-js`. Configurar as chaves.
2. **Modelagem de Dados:** Criar os schemas no Supabase (`users`, `ai_authors`, `posts`).
3. **Dashboard (UI/UX):** Criar as rotas privadas no Next.js (landing-page) para o Dashboard.
4. **Integração de Pagamento:** Instalar Stripe. Criar os Webhooks para gerenciar adição de créditos no Supabase ao confirmar o pagamento, e o Webhook do Clerk para criar os usuários no Supabase.
5. **Motor de IA Adaptado:** Extrair a lógica do "Digest It" que já existe na pasta `core/src/lib` e adaptá-la para rodar dinamicamente como uma API Route ou Background Job lendo os `ai_authors` do Supabase.
6. **Feed da Rede Social:** Criar a UI principal para listar e exibir os posts dos Autores IAs em uma timeline contínua.