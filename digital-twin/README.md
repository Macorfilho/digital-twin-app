# Digital Twin App - Backend (Spring Boot)

Este diretório contém o código-fonte do backend da aplicação Digital Twin, construído com Spring Boot e Java. Ele fornece uma API RESTful para gerenciar sensores e suas leituras.

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em sua máquina de desenvolvimento:

- **Java Development Kit (JDK)**: Versão 17 ou superior recomendada.
- **Apache Maven**: Ferramenta de automação de build.

## Como Compilar e Executar

Siga estas etapas para colocar o backend em funcionamento:

1. Navegue até o diretório do projeto backend:

    ```bash
    cd digital-twin
    ```

2. Execute a aplicação Spring Boot usando o Maven:

    ```bash
    mvn spring-boot:run
    ```

Isso irá compilar o projeto, baixar as dependências necessárias e iniciar o servidor web Tomcat embutido. A aplicação estará disponível por padrão na porta 8080.

## Arquitetura

O backend segue uma arquitetura RESTful com camadas bem definidas:

- **Modelos** (`src/main/java/com/newbyte/digital_twin/model/`): Define as entidades de dados (ex: Sensor, Reading).
- **Repositórios** (`src/main/java/com/newbyte/digital_twin/repository/`): Interfaces com Spring Data JPA.
- **Serviços** (`src/main/java/com/newbyte/digital_twin/service/`): Contém a lógica de negócios.
- **Controladores** (`src/main/java/com/newbyte/digital_twin/controller/`): Lidam com requisições HTTP e retornam JSON.
- **Inicializador de Dados** (`src/main/java/com/newbyte/digital_twin/DataInitializer.java`): Popula o banco de dados H2 com dados de exemplo.

## Banco de Dados

O backend utiliza o banco de dados embutido H2. O arquivo do banco é armazenado em:

```
./data/readings.mv.db
```

## Console H2

Acesse o console web H2 em:

- **URL**: http://localhost:8080/h2-console  
- **JDBC**: `jdbc:h2:file:./data/readings`  
- **Usuário**: `sa`  
- **Senha**: (deixe em branco)

## Endpoints da API

### GET `/api/sensors`

Retorna todos os sensores.  
**Exemplo de resposta:**

```json
[
  {
    "id": "sensor-1",
    "name": "Sensor de Temperatura",
    "unit": "°C",
    "currentValue": 25.3,
    "status": "OK"
  }
]
```

### GET `/api/sensors/{id}`

Retorna os detalhes de um sensor por ID.

```json
{
  "id": "sensor-1",
  "name": "Sensor de Temperatura",
  "unit": "°C",
  "currentValue": 25.3,
  "status": "OK"
}
```

### GET `/api/readings/{sensorId}`

Lista de leituras de um sensor específico.

```json
[
  {
    "id": 1,
    "sensorId": "sensor-1",
    "value": 25.1,
    "timestamp": "2025-06-18T10:00:00"
  }
]
```

### POST `/api/readings`

Adiciona nova leitura.  
**Corpo da requisição:**

```json
{
  "sensorId": "sensor-2",
  "value": 28.5,
  "timestamp": "2025-06-20T14:30:00"
}
```

## Exemplos cURL

- Obter todos os sensores:

  ```bash
  curl http://localhost:8080/api/sensors
  ```

- Obter leituras de um sensor:

  ```bash
  curl http://localhost:8080/api/readings/sensor-1
  ```

- Adicionar nova leitura:

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{
    "sensorId": "sensor-3",
    "value": 75.2,
    "timestamp": "2025-06-20T15:00:00"
  }' http://localhost:8080/api/readings
  ```

## Configuração CORS

Definida em `WebConfig.java`, permite acesso de emuladores (ex: `http://10.0.2.2:8081`). Verifique se os IPs/portas usados estão incluídos nas `allowedOrigins`.

## Próximos Passos

- Explore os controladores e serviços.
- Verifique modelos e repositórios.
- Use os dados de exemplo do `DataInitializer`.
- Contribua e explore o código!
