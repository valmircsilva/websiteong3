# websiteong3

## Descrição
Este projeto é uma experiência prática de desenvolvimento web para uma ONG, focando na criação de um site acessível, otimizado para produção e com um controle de versão robusto utilizando GitFlow. O site apresenta carregamento dinâmico de conteúdo para uma experiência de usuário fluida, validação de formulários e um menu de navegação responsivo.

## Funcionalidades

*   **Carregamento Dinâmico de Conteúdo:** O site utiliza JavaScript para carregar o conteúdo das páginas (`inicio.html`, `projetos.html`, `cadastro.html`) dinamicamente na seção `<main>` do `index.html`, proporcionando uma experiência de Single Page Application (SPA).
*   **Validação de Formulário:** O formulário de cadastro (`cadastro.html`) inclui validação robusta para campos como CPF, telefone e CEP, além de campos obrigatórios, com feedback visual para o usuário. Os dados são armazenados localmente no `localStorage`.
*   **Menu Hambúrguer Responsivo:** Um menu de navegação responsivo é implementado para dispositivos móveis, com um ícone de hambúrguer que alterna a visibilidade do menu.

## Acessibilidade (WCAG 2.1 Nível AA)

Foram implementadas diversas melhorias para garantir a acessibilidade do site, seguindo as diretrizes WCAG 2.1 Nível AA:

*   **Navegação por Teclado:**
    *   O menu hambúrguer agora é navegável por teclado, com `aria-label` e `aria-expanded` para indicar seu estado.
    *   O foco é gerenciado para o conteúdo dinamicamente carregado, garantindo que leitores de tela e usuários de teclado sejam direcionados para o novo conteúdo.
*   **Estrutura Semântica:** O HTML utiliza tags semânticas (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, etc.) para uma estrutura clara e compreensível por tecnologias assistivas.
*   **Contraste de Cores:** As cores dos links foram ajustadas para garantir um contraste mínimo de 4.5:1 em relação ao fundo branco, atendendo aos requisitos de acessibilidade.
*   **Suporte a Leitores de Tela:** Atributos ARIA foram adicionados onde necessário (ex: `aria-label` e `aria-expanded` no menu hambúrguer) para fornecer informações contextuais a leitores de tela.
*   **Temas Acessíveis (Alto Contraste e Modo Escuro):** Um seletor de tema foi implementado no cabeçalho, permitindo que os usuários alternem entre:
    *   **Tema Claro (Padrão):** O tema original do site.
    *   **Modo Escuro:** Um tema com cores escuras para reduzir o cansaço visual.
    *   **Alto Contraste:** Um tema com cores de alto contraste para usuários com deficiência visual.

## Otimização para Produção

O projeto foi configurado para otimização de desempenho em ambiente de produção:

*   **Minificação:**
    *   **CSS:** O arquivo `css/style.css` é minificado.
    *   **JavaScript:** O arquivo `js/main.js` é minificado.
    *   **HTML:** Todos os arquivos HTML (`index.html`, `cadastro.html`, `inicio.html`, `projetos.html`) são minificados.
*   **Compressão de Imagens:** As imagens na pasta `images/` são comprimidas para reduzir o tamanho do arquivo.
*   **Scripts de Build (npm):** Scripts foram adicionados ao `package.json` para automatizar as tarefas de minificação e compressão, facilitando a geração de uma versão otimizada do site.

## Controle de Versão (GitFlow)

A gestão do código-fonte segue a estratégia de branching GitFlow para um desenvolvimento organizado e releases controlados:

*   **Estratégia de Branching:** Utiliza as branches `main` (produção), `develop` (desenvolvimento), `feature/*` (novas funcionalidades), `release/*` (preparação de lançamento) e `hotfix/*` (correções urgentes).
*   **Histórico de Commits Semântico:** As mensagens de commit seguem um padrão semântico (`tipo(escopo): mensagem`), facilitando a compreensão do histórico do projeto.
*   **Versionamento Semântico (v1.0.0):** Um sistema de versionamento semântico foi implementado, e a primeira versão principal (`v1.0.0`) foi lançada e marcada no repositório.

## Como Executar o Projeto

Para visualizar e testar o projeto localmente:

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/valmircsilva/websiteong3.git
    cd websiteong3
    ```
2.  **Instale as dependências do Node.js:**
    ```bash
    npm install
    ```
3.  **Instale o http-server globalmente (se ainda não o fez):**
    ```bash
    npm install -g http-server
    ```

### Executando em Modo de Desenvolvimento

Para ver o site sem as otimizações de produção:

1.  **Abra o arquivo `index.html` diretamente no seu navegador.**
    *   *Nota:* Algumas funcionalidades JavaScript (como o carregamento dinâmico de conteúdo) podem ter restrições de segurança (CORS) ao abrir o arquivo diretamente. Para uma experiência completa, use um servidor HTTP local.

### Executando a Versão Otimizada (Produção)

Para ver o site com todas as otimizações aplicadas:

1.  **Gere a versão de produção:**
    ```bash
    npm run build
    ```
    Isso criará uma pasta `dist/` com todos os arquivos minificados e imagens comprimidas.
2.  **Navegue até o diretório `dist`:**
    ```bash
    cd dist
    ```
3.  **Inicie o servidor HTTP:**
    ```bash
    http-server
    ```
4.  **Acesse o site:** Abra seu navegador e vá para `http://localhost:8080` (ou a porta que o `http-server` indicar).

Para parar o servidor, pressione `Ctrl+C` no terminal.

## Entregáveis desta Fase

Os seguintes itens foram entregues nesta fase do projeto:

*   **Controle de Versão com Git/GitHub:**
    *   Implementação da estratégia de branching GitFlow (`main`, `develop`, `feature/*`, `release/*`, `hotfix/*`).
    *   Histórico de commits semântico e organizado.
    *   Desenvolvimento de sistema de releases com versionamento semântico (v1.0.0).
*   **Acessibilidade (WCAG 2.1 Nível AA):**
    *   Implementação de navegação por teclado em componentes interativos (menu hambúrguer).
    *   Criação de estrutura semântica adequada no HTML.
    *   Garantia de contraste mínimo de 4.5:1 para texto normal (ajuste de cores de links).
    *   Implementação de suporte completo para leitores de tela (atributos ARIA, gerenciamento de foco).
    *   Criação de versão de alto contraste e modo escuro acessível via seletor de tema.
*   **Otimização para Produção:**
    *   Implementação de minificação de CSS, JavaScript e HTML.
    *   Configuração de compressão de imagens.
    *   Criação de scripts `npm` para automatizar o processo de build.