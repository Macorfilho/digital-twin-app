# Digital Twin App

Este repositório contém o código-source completo para o aplicativo **Digital Twin**, uma solução abrangente projetada para simular e monitorar dispositivos no mundo real através de suas contrapartes digitais. O projeto é cuidadosamente segmentado em duas partes principais para facilitar o desenvolvimento, a manutenção e a escalabilidade:

* **Backend:** Desenvolvido com **Spring Boot (Java)**, esta porção do sistema é o coração da lógica de negócios. Ele é responsável por toda a gestão de dados de sensores e leituras, incluindo armazenamento, recuperação e processamento. Além disso, expõe uma robusta API RESTful que serve como a ponte de comunicação para as outras partes do sistema.
* **Frontend:** Construído com **React Native**, o frontend é a interface com a qual os usuários interagem. Seu principal papel é consumir a API fornecida pelo backend, traduzindo os dados brutos de sensores e leituras em visualizações intuitivas e interativas em dispositivos móveis (Android e iOS). Isso permite que os usuários monitorem o estado e o comportamento dos seus "gêmeos digitais" de forma eficiente e em tempo real.

---

## Membros da Equipe

Este projeto foi desenvolvido com a valiosa contribuição dos seguintes membros da equipe:

* 550432 - Amanda Maia Ballet
* 99761 - Bruno Lopes da Silva
* 98828 - Marcelo Rodriguez Corner Filho
* 99557 - Pedro Cara Nascimento

---

## Estrutura do Repositório

A organização deste repositório foi pensada para promover clareza e facilitar a navegação entre as diferentes partes do projeto. Cada componente principal reside em seu próprio diretório raiz, garantindo a modularidade e a independência de cada subsistema:

├── digital-twin/            # Pasta raiz do projeto Backend (Spring Boot)
│   ├── src/                 # Contém o código-fonte Java do backend
│   ├── pom.xml              # Arquivo de configuração do Maven para o backend
│   └── ...                  # Outros arquivos de configuração e recursos do backend
└── digital-twin-front/      # Pasta raiz do projeto Frontend (React Native)
├── src/                 # Contém o código-fonte JavaScript/TypeScript do frontend
├── package.json         # Arquivo de manifesto do Node.js/React Native
└── ...                  # Outros arquivos de configuração e recursos do frontend


Essa estrutura facilita o gerenciamento de dependências separadas, a execução independente de cada parte e a colaboração entre equipes ou desenvolvedores focados em áreas específicas.

---

## Como Começar

Para configurar e executar o projeto completo em seu ambiente local e começar a explorar suas funcionalidades, é essencial seguir as instruções detalhadas e específicas para cada componente. Cada parte do projeto possui um README dedicado que aborda seus pré-requisitos, etapas de instalação e execução.

Recomendamos que você comece configurando o backend primeiro, pois o frontend depende diretamente da sua disponibilidade e dos seus endpoints da API.

---

## Visão Geral

O aplicativo Digital Twin representa uma abordagem moderna para o monitoramento e a simulação de ativos físicos. Ao criar uma representação virtual fiel de um objeto ou sistema real, a plataforma permite a **visualização em tempo real** de dados de sensores, o que é crucial para análises preditivas, manutenção proativa e otimização de desempenho. Através desta interface, os usuários podem acompanhar métricas vitais como temperatura, pressão, umidade, ou qualquer outro dado relevante que seus sensores físicos possam coletar. Além disso, a capacidade de visualizar **históricos de leituras** oferece insights valiosos sobre tendências e comportamentos passados, auxiliando na tomada de decisões informadas e no aprimoramento contínuo dos sistemas monitorados. Este projeto serve como uma base robusta para futuras expansões em áreas como IoT (Internet das Coisas), automação e análise de dados em tempo real.
