# Engi-UFFS — Backend

API REST para gerenciamento de obras de engenheiros autônomos.

Trabalho Integrador — GEX613 Programação II (UFFS)

## Bibliotecas utilizadas

- **express** — servidor HTTP
- **sequelize** + **pg** — ORM e conexão com PostgreSQL
- **jsonwebtoken** — autenticação por token
- **bcrypt** — criptografia de senha
- **cors**, **dotenv** — configuração da API e variáveis de ambiente
- **multer** — upload de fotos no diário de obras (salva em `uploads/diarios/`)
- **nodemon** — reinício automático em desenvolvimento

## Pré-requisitos

- Node.js (v18 ou superior)
- PostgreSQL instalado e rodando

## Como executar

1. Clonar o repositório e instalar as dependências:

```bash
git clone https://github.com/dudurb17/engi-UFFS-backend.git
cd engi-UFFS-backend
npm install
```

2. Criar o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

Editar o `.env` com os dados do banco e uma chave para o JWT:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=engi_uffs
DB_USER=postgres
DB_PASS=sua_senha
JWT_SECRET=
JWT_EXPIRES_IN=15m
```

Para gerar o `JWT_SECRET`, rode:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copie o valor gerado e cole no `.env`.

3. Criar o banco, as tabelas e os dados iniciais:

```bash
createdb -h localhost -U postgres engi_uffs
npm run db:migrate
npm run db:seed
```

4. Iniciar o servidor:

```bash
npm run dev
```

A API fica disponível em `http://localhost:3000`.

## Banco de dados

Os scripts de criação das tabelas estão na pasta `migrations/`. Para aplicá-los:

```bash
npm run db:migrate
```

Os dados iniciais para teste ficam em `seeders/` e podem ser inseridos com:

```bash
npm run db:seed
```

O seeder cria usuários de exemplo, projetos, etapas e pagamentos. Senha padrão de todos: `123456`.

| E-mail | Perfil |
| --- | --- |
| `engenheiro@gmail.com` | ENGENHEIRO |
| `cliente@uffs.br` | CLIENTE |
| `bruno@uffs.br` | CLIENTE |

O sistema também aceita o perfil **PARCEIRO** (prestador/parceiro da obra), mas o seeder não cria nenhum usuário desse tipo. Dá para cadastrar pelo `POST /auth/register`.

Para recriar tudo do zero:

```bash
npm run db:reset
```

## Autenticação

Rotas protegidas exigem o header:

```
Authorization: Bearer <token>
```

O token é obtido em `POST /auth/login`. Os perfis são **ENGENHEIRO** (administrador), **CLIENTE** (contratante da obra) e **PARCEIRO** (prestador vinculado), cada um com permissões diferentes nas rotas.

## Testar no Insomnia

As requests de exemplo estão em:

```
insomnia/Insomnia_2026-07-05.yaml
```

Para importar: Insomnia → Import → selecionar o arquivo.

Ao fazer o `POST /auth/login`, o token é salvo automaticamente na variável `token`, e as demais rotas já usam `Authorization: Bearer {{token}}`.

Ordem sugerida:

1. `GET /health`
2. `POST /auth/login`
3. Demais rotas autenticadas

## Autor

Eduardo Robetti Bedin
