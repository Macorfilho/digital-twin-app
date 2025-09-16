# Digital Twin App

Este repositório contém o código-source completo para o aplicativo Digital Twin, uma solução abrangente projetada para simular e monitorar dispositivos no mundo real através de suas contrapartes digitais. O projeto é cuidadosamente segmentado em duas partes principais para facilitar o desenvolvimento, a manutenção e a escalabilidade:

- **Backend:** Desenvolvido com Spring Boot (Java), é responsável pela gestão de dados de sensores, leituras e pela API RESTful.
- **Frontend:** Construído com React Native (Expo), fornece a interface móvel para visualização e interação com os dados.

## Membros da Equipe

- 550432 - Amanda Maia Ballet
- 99761 - Bruno Lopes da Silva
- 98828 - Marcelo Rodriguez Corner Filho
- 99557 - Pedro Cara Nascimento

## Estrutura do Repositório

```
.
├── digital-twin/                # Projeto Backend (Spring Boot)
│   ├── src/
│   ├── pom.xml
│   └── README.md
└── digital-twin-front/          # Projeto Frontend (React Native)
    ├── src/
    ├── assets/
    ├── App.tsx
    ├── package.json
    └── README.md
```

## Tecnologias Utilizadas

### Backend
- **Java 17+**
- **Spring Boot:** Framework para criação de aplicações Java.
- **Spring Data JPA:** Para persistência de dados.
- **Maven:** Gerenciador de dependências e build.
- **H2 Database:** Banco de dados em memória.

### Frontend
- **React Native:** Framework para desenvolvimento de aplicativos móveis.
- **Expo:** Plataforma para facilitar o desenvolvimento e build de apps React Native.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **React Navigation:** Para gerenciamento de navegação.
- **Victory Native & @shopify/react-native-skia:** Para a criação de gráficos.
- **AsyncStorage:** Para persistência de dados no dispositivo.

## Como Começar

### Pré-requisitos

- **Backend:** Java 17+, Maven
- **Frontend:** Node.js, npm/yarn, Expo CLI, e um emulador/dispositivo físico.

### 1. Executar o Backend

Em um terminal, navegue até a pasta do backend e inicie o servidor Spring Boot:

```bash
cd digital-twin
./mvnw spring-boot:run
```

O servidor estará disponível em `http://localhost:8080`.

**Observação:** O backend utiliza um banco de dados em memória (H2), o que significa que os dados não persistem entre reinicializações do servidor.

### 2. Executar o Frontend

Em outro terminal, navegue até a pasta do frontend, instale as dependências e inicie o aplicativo:

```bash
cd digital-twin-front
npm install
expo start
```

Siga as instruções no terminal do Expo para abrir o aplicativo em um emulador ou no seu dispositivo.

### 3. Configurar a API no App

Ao iniciar o aplicativo pela primeira vez, você será direcionado para a tela de configuração. Insira a URL do seu backend.

- Se estiver usando um **emulador Android**, a URL é: `http://10.0.2.2:8080/api`
- Se estiver usando um **emulador iOS ou dispositivo físico** na mesma rede, use o IP da sua máquina (ex: `http://192.168.1.10:8080/api`).

## Funcionalidades Implementadas

- **Visualização de Sensores:** Tela principal que lista todos os sensores disponíveis.
- **Detalhes do Sensor:** Tela de detalhes que exibe informações do sensor e um gráfico com o histórico de leituras.
- **Gráfico de Leituras:** O gráfico na tela de detalhes exibe as últimas 20 leituras do sensor, com eixos X (tempo) e Y (valor) e labels.
- **Registro de Novas Leituras:** Funcionalidade para registrar um novo valor (mock) para o sensor, com atualização automática do gráfico.
- **Configuração de API:** Tela para configurar o endereço do servidor backend, com persistência dos dados.
