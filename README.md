# Digital Twin App

Este repositório contém o frontend (React Native) e o backend (Spring Boot) para o aplicativo Digital Twin.
550432 Amanda Maia Ballet
99761 Bruno Lopes da Silva
98828 Marcelo Rodriguez Corner Filho
99557 Pedro Cara Nascimento

## Backend (Spring Boot)

### Comandos para Compilar e Executar

Para executar o backend, navegue até o diretório `digital-twin` (a pasta raiz do backend) e execute o seguinte comando no terminal:

mvn spring-boot:run

O backend estará disponível por padrão na porta 8080.

Localização do Arquivo H2

O banco de dados H2 embutido é usado para persistência. O arquivo do banco de dados pode ser encontrado no seguinte local (relativo ao diretório onde a aplicação backend é executada):

./data/readings.mv.db
Você pode acessar o console do H2 em http://localhost:8080/h2-console enquanto a aplicação estiver rodando. Use a URL JDBC jdbc:h2:file:./data/readings, com nome de usuário sa e deixe a senha em branco.

Endpoints Disponíveis

Aqui estão os endpoints da API REST disponíveis no backend:

GET /api/sensors: Retorna a lista de todos os sensores.
GET /api/sensors/{id}: Retorna os detalhes de um sensor específico pelo seu ID.
GET /api/readings/{sensorId}: Retorna a lista de leituras para um sensor específico.
POST /api/readingss: Adiciona uma nova leitura de sensor. Espera um objeto Reading no corpo da requisição.

Exemplo de Requisição cURL

Para obter a lista de sensores, você pode usar o seguinte comando cURL:

curl http://localhost:8080/api/sensors
Para obter as leituras de um sensor específico (substitua {sensorId} pelo ID real do sensor, por exemplo, o ID do sensor de pressão):

curl http://localhost:8080/api/readings/{sensorId}

curl -X POST -H "Content-Type: application/json" -d '{
"sensorId": 1,
"value": 28.5,
"timestamp": "2025-05-25T00:30:00"
}' http://localhost:8080/api/readings

Comandos para Executar:

Em cada pasta tera como executar cada parte do projeto
