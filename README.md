# Engi-UFFS — Backend

Backend de um sistema de gerenciamento de obras para engenheiros autônomos.

Disciplina: GEX613 — Programação II (UFFS) — Trabalho Integrador (Entrega I)

## Tecnologias

- Node.js + Express
- PostgreSQL + Sequelize
- JWT (autenticação)
- bcrypt (hash de senha)
- dotenv e cors

## Como rodar o projeto

1. Clonar e instalar as dependências:

```bash
git clone https://github.com/dudurb17/engi-UFFS-backend.git
cd engi-UFFS-backend
npm install
```

2. Criar o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

3. Preencher o `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=engi_uffs
DB_USER=postgres
DB_PASS=sua_senha
JWT_SECRET=
JWT_EXPIRES_IN=15m
```

Para gerar uma chave do `JWT_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

4. Criar o banco e rodar as migrations:

```bash
createdb -h localhost -U postgres engi_uffs
npm run db:migrate
```

5. Iniciar o servidor:

```bash
npm run dev
```

A API roda em `http://localhost:3000`.

## Autenticação

As rotas protegidas precisam do header:

```
Authorization: Bearer <token>
```

Perfis de usuário: `ENGENHEIRO`, `CLIENTE`, `PARCEIRO`.

Para usar a API: cadastrar em `POST /auth/register`, fazer login em `POST /auth/login` (que retorna o token) e enviar esse token nas demais requisições.

## Rotas

Rotas públicas: `GET /`, `GET /health`, `POST /auth/register`, `POST /auth/login`.

| Módulo      | Prefixo         | Métodos                                 | Acesso                                      |
| ----------- | --------------- | --------------------------------------- | ------------------------------------------- |
| Auth        | `/auth`         | POST register, POST login, GET perfil   | perfil: autenticado                         |
| Dashboard   | `/dashboard`    | GET                                     | ENGENHEIRO                                  |
| Portal      | `/portal`       | GET                                     | CLIENTE                                     |
| Projetos    | `/projetos`     | GET, POST, PUT, DELETE                  | escrita: ENGENHEIRO                         |
| Etapas      | `/etapas`       | GET, POST, PUT, DELETE                  | escrita: ENGENHEIRO                         |
| Diário      | `/diario-obras` | GET, POST, PUT, DELETE                  | POST: autenticado / PUT, DELETE: ENGENHEIRO |
| Aprovações  | `/aprovacoes`   | GET, POST, PUT, DELETE                  | POST, DELETE: ENGENHEIRO / PUT: CLIENTE     |
| Pagamentos  | `/pagamentos`   | GET, POST, PUT, DELETE                  | escrita: ENGENHEIRO                         |
| Agenda      | `/agenda`       | GET, POST, PUT, DELETE, POST /solicitar | escrita: ENGENHEIRO / solicitar: CLIENTE    |
| Imprevistos | `/imprevistos`  | GET, POST, PUT, DELETE                  | POST: autenticado / PUT, DELETE: ENGENHEIRO |

Nesta entrega a maioria das rotas retorna uma resposta simples (stub), sem a lógica de negócio completa.

## Requests de exemplo (Insomnia)

As requests de teste estão no arquivo exportado do Insomnia:

```
insomnia/Insomnia_2026-06-07.yaml
```

Para importar: Insomnia → Import → selecionar o arquivo.

O token é tratado automaticamente: ao fazer o `POST /auth/login`, um script salva o token retornado na variável de ambiente `token`, e as demais rotas já usam esse token no header `Authorization: Bearer {{token}}`. Não é preciso copiar o token em cada request.

Importante: antes de testar qualquer rota autenticada, faça o login primeiro, para que a variável `token` seja preenchida.

Ordem sugerida para testar:

1. `GET /health`
2. `POST /auth/register`
3. `POST /auth/login` (preenche a variável `token` automaticamente)
4. Demais rotas autenticadas (o token já é enviado automaticamente)

## Estrutura de diretórios

```
engi-UFFS/
├── config/          # configuração do banco (Sequelize)
├── migrations/      # criação das tabelas
├── models/          # models do Sequelize
├── src/
│   ├── controllers/ # recebe a requisição e devolve a resposta
│   ├── middlewares/ # autenticar, autorizar, tratamento de erros
│   ├── models/      # regras de negócio (ex: userModel)
│   ├── routes/      # definição das rotas
│   └── app.js       # configuração do Express
├── index.js         # inicialização do servidor
├── .env.example
└── package.json
```

## Autor

- Eduardo Robetti Bedin

Obs.: o levantamento de requisitos foi feito em grupo na disciplina de Engenharia de Software, mas meus colegas de grupo não cursam Programação II, então o desenvolvimento está sendo feito individualmente. Pelo escopo levantado, percebo que o trabalho talvez fique grande demais para ser concluído por uma única pessoa, mas pretendo desenvolver o máximo possível.
