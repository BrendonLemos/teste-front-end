# Teste Front-End Econverse

Aplicação de vitrine de produtos desenvolvida como teste técnico para a vaga de Desenvolvedor Front-End da Econverse.

## Tecnologias utilizadas

- React 19
- TypeScript 5.9
- Vite 8
- Sass 1.107
- ESLint 10

## Pré-requisitos

- Node.js 20.19 ou superior da série 20, ou Node.js 22.12 ou superior.
- npm, incluído na instalação do Node.js.

Essas versões do Node.js atendem aos requisitos do Vite utilizado neste projeto.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone git@github.com:BrendonLemos/teste-front-end.git
cd teste-front-end
npm install
```

## Como executar

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente `http://localhost:5173/`.

## Build de produção

Gere a versão de produção:

```bash
npm run build
```

O comando executa a verificação de tipos do TypeScript e compila a aplicação. Os arquivos gerados ficam na pasta `dist/`.

## Preview da versão de produção

Depois de gerar o build, visualize localmente os arquivos compilados:

```bash
npm run preview
```

O Vite exibirá no terminal o endereço local do preview.

## Verificação de código

Execute o ESLint para verificar problemas de qualidade e padronização do código:

```bash
npm run lint
```

## Integração com a API

Os produtos são obtidos da API:

[https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json)

A aplicação consulta o endpoint local `/api/produtos`. Durante o desenvolvimento, o proxy `server.proxy` configurado no Vite encaminha essa chamada ao domínio da Econverse e reescreve o caminho para o arquivo JSON, evitando a restrição de CORS no navegador.

Esse proxy funciona no servidor de desenvolvimento do Vite. Ele não é aplicado automaticamente ao build de produção. Para obter os dados em produção, o ambiente publicado deverá disponibilizar um proxy equivalente ou a API deverá permitir as requisições por meio de CORS.

## Funcionalidades

- Exibição de vitrines com produtos carregados da API, incluindo estados de carregamento, lista vazia e erro.
- Apresentação do nome, descrição, imagem e preço dos produtos. O valor da parcela exibido nos cards é calculado a partir do preço recebido.
- Abertura de um modal com os dados do produto selecionado.
- Ajuste da quantidade no modal e fechamento pelo botão, pela tecla Escape ou clicando fora do conteúdo.
- Navegação por links internos entre a página inicial, as vitrines, as categorias e a Newsletter.

Os controles de busca, compra e cadastro da Newsletter não estão conectados a serviços ou ações nesta versão.
