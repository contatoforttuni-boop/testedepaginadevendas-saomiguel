# Liga do Católico Raiz — MVP

MVP mobile-first de uma competição de conhecimento católico, com quiz conectado ao Supabase e painel administrativo de métricas.

## Páginas

- `index.html`: apresentação do projeto
- `quiz.html`: quiz público conectado ao Supabase
- `admin.html`: painel administrativo

## Painel

O painel mostra:

- pessoas que iniciaram e concluíram;
- participantes ativos no momento;
- taxa de conclusão;
- média e maior pontuação;
- percentual de escolhas A, B, C e D;
- opção mais escolhida em cada pergunta;
- taxa de acerto por pergunta;
- participantes recentes por apelido.

## Publicação na Vercel

O arquivo `vercel.json` configura rotas limpas, cabeçalhos de segurança e bloqueio de indexação do painel.

Rotas principais:

- `/`
- `/quiz`
- `/admin`

## Configuração pendente

Atualizar em `config.js` antes de abrir as inscrições:

- `checkoutUrl`;
- `whatsappUrl`.

## Segurança

Os dados pessoais ficam protegidos no Supabase por RLS. O painel desta versão beta exibe somente estatísticas agregadas e apelidos. Antes da abertura pública em escala, a autenticação administrativa deve ser migrada para uma sessão validada no servidor.
