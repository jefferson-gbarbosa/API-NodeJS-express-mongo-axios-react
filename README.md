# React Login Authentication with JWT Access, Refresh Tokens, Cookies and Axios

## Conteúdo
* [Sobre a aplicação](#sobre-a-aplicação)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Screenshots](#camera_flash-screenshots)
* [Contato](#email-contato)

## Sobre a aplicação
1. __Back-end__: Desenvolvido em Node.JS com Express, utilizando Mongoose com banco de dados MongoDB.
2. __Front-end__: Permite cadastrar usuários, fazer login e recuperar senhas. Desenvolvido em React, JavaScript e CSS.

## :hammer_and_wrench: Tecnologias
* Back-end
  * __Node.js__ com Typescript
  * __Prisma ORM__ para acessar o banco de dados
  * Autenticação __JTW__
* Front-end
  * __React__ com JavaScript
  * __COOKIE-PARSER__ para armazenar cookies
  * __CSS__ para estilização

## :car: Iniciando a aplicação
Baixe o repositório com git clone e entre na pasta do projeto.
```bash
$ git clone https://github.com/jefferson-gbarbosa/API-NodeJS-express-mongo-axios-react.git
```

### __Back-end__
Na pasta backend, renomeie o arquivo _.env.local-example_ para _.env.local_<br/>
Informe a URL da API na variável __DATABASE_URL__.<br/>
Informe a palavra secreta da API na variável __JWT_SECRET__<br/>
```bash
# Instale as dependências
$ npm install

# Para iniciar a aplicação na porta 3000
$ npm run start
```
### __Front-end__
  Na pasta web, informe o IP da aplicação back-end no arquivo _src/services/api.ts_<br/>
```bash
# Instale as dependências
$ npm install

# Para iniciar a aplicação na porta 5500
$ npm run dev
```

## :camera_flash: Screenshots
<!-- ![](https://github.com/luiizsilverio/pizzaria/blob/main/web/src/assets/pizza-web.gif) -->

## :email: Contato

E-mail: [**jeffersonqx@gmail.com**](mailto:jeffersonqx@gmail.com)
