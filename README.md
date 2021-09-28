# Setup

- para instalar a parte web

`yarn install`

-para instalar a parte api

`npm install`

## Start server

`node server.js`

## Start web

`yarn serve`

## Observações Gerais

- Um simples exemplo para testes de como seria um envio de mensagem em tempo real para um totem usando socket.io.
- Após starta ambos, basta informar a rota do servidor que você quer informar pelo o nome por exemplo: localhost:8080/servername, as informações irão aparecer após o envio de algum dado, como no exemplo abaixo:
![totem-tela](https://user-images.githubusercontent.com/50386900/135001385-dcbc50bf-914c-4b1d-aba2-58e460d1e559.png)

- As informações são passadas na rota da api como exemplo abaixo e são representadas em tempo real no lado da web:
![senha-totem](https://user-images.githubusercontent.com/50386900/135001465-ad6d8b70-36e1-44ca-a5ae-cd58c68b5f73.png)
