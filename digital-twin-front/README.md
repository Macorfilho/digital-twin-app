Digital Twin App - Frontend (React Native)
---
Este diretório contém o código-fonte do aplicativo frontend para o projeto Digital Twin, construído com **React Native**. Ele é responsável por consumir a API do backend Spring Boot e exibir os dados em uma interface de usuário móvel.

### Pré-requisitos
---
Para configurar e executar o aplicativo frontend em sua máquina, você precisará do ambiente de desenvolvimento React Native configurado. Isso geralmente inclui:

* **Node.js**: Versão LTS (Long Term Support) recomendada.
* **npm** (Node Package Manager): Instalado junto com o Node.js.
* **React Native CLI**: Para comandos específicos do React Native.
* **Xcode** (para desenvolvimento iOS) ou **Android Studio** (para desenvolvimento Android) com os SDKs e emuladores configurados.

Consulte a documentação oficial do React Native para obter instruções detalhadas e as versões recomendadas das ferramentas.

### Como Executar
---
Siga estas etapas para executar o aplicativo frontend:

Navegue até o diretório do projeto frontend:

```bash
cd digital-twin-front
```

Instale as dependências do projeto:

```bash
npm install
```

Inicie o bundler Metro e execute o aplicativo:

```bash
npx expo start -c
```

Este comando iniciará o Metro Bundler e abrirá uma aba no seu navegador com opções para executar o aplicativo em um emulador Android, iOS, ou no seu próprio dispositivo físico através do aplicativo Expo Go. A flag `-c` limpa o cache do Metro Bundler, o que é útil para resolver problemas.

### Estrutura do Projeto
---
O projeto React Native segue uma estrutura de pastas modular para melhor organização e escalabilidade:

```
digital-twin-front/
├── .expo/                       # Arquivos de cache e configuração do Expo
├── .vscode/                     # Configurações do VS Code
├── assets/                      # Recursos estáticos do aplicativo
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   ├── logo.png
│   └── splash-icon.png
├── node_modules/                # Dependências do projeto (geradas pelo npm/yarn)
├── src/                         # Código-fonte principal do aplicativo
│   ├── context/                 # Contextos React (ex: ApiUrlContext)
│   │   └── ApiUrlContext.tsx
│   ├── navigation/              # Configuração do React Navigation
│   │   └── AppNavigator.tsx
│   └── screens/                 # Componentes de tela (páginas do aplicativo)
│       ├── ConfigScreen.tsx
│       ├── SensorDetailScreen.tsx
│       ├── SensorListScreen.tsx
│       └── SplashScreen.tsx
├── .gitignore                   # Arquivo para ignorar arquivos/pastas no Git
├── app.json                     # Configuração do aplicativo Expo
├── App.tsx                      # Ponto de entrada principal do React Native
├── index.ts                     # Arquivo de inicialização do Expo (geralmente)
├── package-lock.json            # Bloqueio de versão de dependências
├── package.json                 # Manifest do projeto e dependências
├── README.md                    # Documentação do projeto Frontend
└── tsconfig.json                # Configuração do TypeScript
```

### Configuração da API
---
A comunicação entre o aplicativo frontend (React Native) e o backend (Spring Boot) depende de uma URL base da API configurada corretamente.

#### Como Configurar a URL da API no Aplicativo:
Ao iniciar o aplicativo, a **SplashScreen** será exibida. Se a URL da API não estiver configurada ou for inválida, o aplicativo tentará direcionar você automaticamente para a **ConfigScreen**.
Na **ConfigScreen**, você encontrará um campo de texto onde poderá inserir a URL completa do seu backend.

**Para conectar-se a um backend LOCAL (rodando no seu computador) a partir de um emulador Android:**
Use o IP especial **10.0.2.2** para se referir ao `localhost` da sua máquina de desenvolvimento.
Exemplo: Se seu backend Spring Boot está rodando na porta **8080** e seu path base é `/api`, a URL a ser inserida será:

```
http://10.0.2.2:8080/api
```

**Importante**: O **10.0.2.2** mapeia para o `localhost` da sua máquina dentro do emulador. Certifique-se de que o número da porta (8080 no exemplo) corresponde à porta real do seu backend.

**Se você estiver usando um dispositivo Android físico conectado na mesma rede Wi-Fi que o seu computador:**
Você precisará usar o **endereço IP real da sua máquina host** na rede local. Para encontrá-lo no Windows, abra o `Prompt de Comando` e digite `ipconfig`. Procure o "Endereço IPv4" do seu adaptador de rede (ex: `192.168.1.10`).
Exemplo: Se o IP da sua máquina for **192.168.1.10** e seu backend estiver na porta **8080**, a URL será:

```
http://192.168.1.10:8080/api
```

Após inserir a URL correta, clique em **"Salvar"**. O aplicativo irá persistir esta URL localmente usando **AsyncStorage** (armazenamento assíncrono), para que você não precise inseri-la novamente a cada inicialização.

### CORS no Backend
---
Lembre-se que para que o frontend possa se comunicar com o backend, o backend (Spring Boot) deve estar configurado para permitir requisições Cross-Origin (CORS) da origem do seu emulador/dispositivo. Se você encontrar erros de "Network request failed" ou "CORS policy", verifique a configuração CORS no seu projeto Spring Boot.

### Próximos Passos
---
* Explore os componentes de tela (`screens/`) para entender o fluxo de navegação e a exibição dos dados.
* Examine o `context/ApiUrlContext.tsx` para ver como a URL da API é gerenciada globalmente no aplicativo.
* Teste a navegação entre as telas de listagem e detalhes do sensor, verificando as chamadas à API no console do Metro Bundler.
