# Introdução
Projeto de software construido para o trabalho de conclusão do curso de Bacharel em Engenharia de Software pela Unicesumar.

## Requisitos 

- Necessário ter instalado NodeJS (versão 16) e NPM (Tutorial de como instalar: [Linux](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04)) | [Mac](https://www.webucator.com/article/how-to-install-nodejs-on-a-mac/) | [Windows](https://phoenixnap.com/kb/install-node-js-npm-on-windows)

- Necessário ter instalado um banco de dados Mysql (versão mais recente) para que a aplicação se conecte e persista os dados. [Como instalar](https://hevodata.com/learn/installing-mysql-on-ubuntu-20-04/)

Após realizar a instalação do banco de dados, altere as configurações de conexão com a base dados no arquivo .env que se encontra no diretório /consultaweb-api/

## Implantando

Instale as dependências utilizando o NPM na pasta raiz para instalar as dependencias da interface de usuário:

```
    npm install
```

Instale as dependências utilizando o NPM na pasta /consultaweb-api para instalar as dependencias da api:

```
    npm install -g nodemon 
```
e o comando

```
    npm install 
```

Após instalar as dependências, suba a api rodando o comando no diretório /consultaweb-api:

```
    npm run start
```

Após, suba a interface de usuário rodando o comando na pasta raiz:

```
    npm run dev
```

Após o termino do comando um endereço irá ser informado no terminal para acessar a aplicação.
