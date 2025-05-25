# Digital Twin App - Backend (Spring Boot)

Este diretório contém o código-fonte do backend, construído com Spring Boot e Java.

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Java Development Kit (JDK) - versão 24 ou superior recomendada
- Maven

## Como Executar

Siga estas etapas para executar o backend:

1.  **Navegue até o diretório do projeto:**

    cd digital-twin

2.  **Execute a aplicação Spring Boot usando o Maven:**

    mvn spring-boot:run

    Isso irá compilar o projeto e iniciar o servidor Tomcat embutido, onde a aplicação estará rodando por padrão na porta `8080`.

## Arquitetura

O backend segue uma arquitetura RESTful simples. As principais partes incluem:

- **Modelos (`src/main/java/com/newbyte/digital_twin/model/`)**: Define as entidades de dados (Sensor, Reading).
- **Repositórios (`src/main/java/com/newbyte/digital_twin/repository/`)**: Interfaces para interação com o banco de dados usando Spring Data JPA.
- **Controladores (`src/main/java/com/newbyte/digital_twin/controller/`)**: Lidam com as requisições HTTP e retornam as respostas.
- **Serviços (`src/main/java/com/newbyte/digital_twin/service/`)**: (Opcional, pode ser adicionado para lógica de negócios mais complexa).
- **Inicializador de Dados (`src/main/java/com/newbyte/digital_twin/DataInitializer.java`)**: Popula o banco de dados H2 com dados de exemplo na inicialização.

## Banco de Dados

O backend utiliza o banco de dados embutido H2 para persistência. O arquivo do banco de dados é armazenado em `./data/readings.mv.db` (relativo ao diretório onde a aplicação é executada).

Você pode acessar o console do H2 em `http://localhost:8080/h2-console` enquanto a aplicação estiver rodando. Use a URL JDBC `jdbc:h2:file:./data/readings`, com nome de usuário `sa` e deixe a senha em branco.

## Endpoints da API

Os seguintes endpoints REST estão disponíveis:

- `GET /api/sensors`: Retorna a lista de todos os sensores.
- `GET /api/sensors/{id}`: Retorna os detalhes de um sensor específico pelo seu ID.
- `GET /api/readings/{sensorId}`: Retorna a lista de leituras para um sensor específico.
- `POST /api/readings`: Adiciona uma nova leitura de sensor. Espera um objeto Reading no corpo da requisição.

## Próximos Passos

- Explore os controladores para entender como as requisições da API são tratadas.
- Verifique os modelos e repositórios para a estrutura dos dados e a interação com o banco de dados.
- O `DataInitializer` fornece dados de exemplo para testes.

Sinta-se à vontade para contribuir e explorar o código!
