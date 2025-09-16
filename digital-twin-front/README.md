# Digital Twin App - Frontend (React Native)

Este diretório contém o código-fonte do aplicativo frontend para o projeto Digital Twin, construído com **React Native** e **Expo**. Ele é responsável por consumir a API do backend e exibir os dados dos sensores em uma interface móvel interativa.

## Tecnologias e Bibliotecas

- **React Native & Expo:** Plataforma para construção de aplicativos móveis multiplataforma.
- **TypeScript:** Superset de JavaScript que adiciona tipagem estática.
- **React Navigation:** Para gerenciamento de navegação e fluxo entre telas.
- **Victory Native & @shopify/react-native-skia:** Para a renderização de gráficos de alto desempenho.
- **AsyncStorage:** Para persistência de dados no dispositivo.
- **Context API:** Para gerenciamento de estado global (URL da API).

## Como Executar

### Pré-requisitos

- Node.js (versão LTS)
- npm ou yarn
- Expo CLI
- Emulador (Android/iOS) ou dispositivo físico com o app Expo Go.

### Passos

1.  **Navegue até a pasta do frontend:**
    ```bash
    cd digital-twin-front
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    expo start
    ```
    Use o QR Code no app Expo Go ou selecione uma das opções no terminal para abrir o app no seu emulador. Recomenda-se limpar o cache com `expo start -c` caso encontre problemas.

## Estrutura do Projeto

```
digital-twin-front/
├── assets/
│   └── fonts/
│       └── Roboto-Regular.ttf   # Fonte para os gráficos
├── src/
│   ├── context/
│   │   └── ApiUrlContext.tsx    # Contexto para a URL da API
│   ├── navigation/
│   │   └── AppNavigator.tsx     # Navegador principal
│   └── screens/
│       ├── ConfigScreen.tsx
│       ├── SensorDetailScreen.tsx
│       ├── SensorListScreen.tsx
│       └── SplashScreen.tsx
├── App.tsx                      # Ponto de entrada do app
├── package.json
└── README.md
```

## Funcionalidades

- **Tela de Splash e Configuração:** O app verifica se a URL da API está configurada. Caso não esteja, o usuário é direcionado para a tela de configuração para inseri-la.
- **Lista de Sensores:** A tela principal (`SensorListScreen`) busca e exibe uma lista de todos os sensores disponíveis no backend.
- **Detalhes do Sensor:** Ao selecionar um sensor, o usuário navega para a `SensorDetailScreen`, que mostra:
    - Informações detalhadas do sensor.
    - Um gráfico do histórico de leituras renderizado com `@shopify/react-native-skia`. O gráfico exibe as últimas 20 leituras para manter a visualização focada.
- **Registro de Leituras:** Um botão permite registrar uma nova leitura com um valor aleatório (mock) para o sensor selecionado. O gráfico é atualizado automaticamente.
- **Atualização Manual:** Um botão permite atualizar manualmente os dados do gráfico.

## Configuração da API no App

A comunicação com o backend depende da URL da API.

- **Emulador Android:** Use `http://10.0.2.2:8080/api` para se conectar a um backend rodando localmente.
- **Emulador iOS / Dispositivo Físico:** Use o endereço de IP da sua máquina na rede local (ex: `http://192.168.1.10:8080/api`).

A URL é salva no dispositivo para não precisar ser inserida novamente.