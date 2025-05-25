# Digital Twin App - Frontend (React Native)

Este diretório contém o código-fonte do aplicativo frontend, construído com React Native.

## Pré-requisitos

Certifique-se de ter o ambiente de desenvolvimento React Native configurado em sua máquina. Isso inclui:

- Node.js (versão LTS recomendada)
- npm
- React Native CLI
- Xcode e CocoaPods (para iOS) ou Android Studio (para Android)

Consulte a [documentação oficial do React Native](https://reactnative.dev/docs/environment-setup) para obter instruções detalhadas sobre a configuração do ambiente.

## Como Executar

Siga estas etapas para executar o aplicativo frontend:

1.  **Navegue até o diretório do projeto:**

    cd digital-twin-front

2.  **Instale as dependências:**

    npm install

3.  **Execute o aplicativo**

    npx expo start -c

## Estrutura do Projeto

Aqui está uma visão geral da estrutura de pastas principal:

digital-twin-front/
├── App.tsx # Ponto de entrada principal do aplicativo
├── navigation/ # Configuração da navegação (React Navigation)
├── screens/ # Componentes de tela (vistas principais)
├── components/ # Componentes reutilizáveis
├── context/ # Contexto para gerenciamento de estado global (ex: URL da API)
├── ...
├── package.json # Arquivo de manifesto do projeto
├── metro.config.js # Configuração do bundler Metro
└── ...

## Configuração da API

A URL base da API do backend pode ser configurada na tela de "Configurações da API" dentro do aplicativo. Esta URL é armazenada localmente usando `AsyncStorage`.
