# ChallengeEY

| **Alunos**                           | **RMs**   |
|                 :---:                |   :---:   |
|**Atila da Silva Gonçalves Moura**    | **82676** |
|**Carlos Eduardo de Castro Henriques**| **81945** |
|**Ian Makdisse**                      | **82205** |
|**Jair Urbano da Silva Junior**       | **82733** |
|**Leonardo da Rocha Leite Antonio**   | **81878** |

<!--TODO: Pegar o RM do pessoal. -->

**Turma: A**

**Ano: 4 SI**

## Objetivo / descrição do Projeto
Temos a missão de gameficar o processo de seleção de candidatos, então fizemos um website de **_missões (cursos)_** com ranks de iniciante até expert, o rank é atribuído com base na quantidade de pontuações que recebe de acordo com as **_missões_** que ele aceita e são concluídas.
## Diagrama do projeto

### Arquitetura
* **Ainda em desenvolvimento**
### Imagem utilizada

![alt text](./public/images/PaginaLogin.PNG "Página de login")
![alt text](./public/images/PaginaCadastro.PNG "Página de Cadastro")
![alt text](./public/images/ListaMissao.PNG "Página de Lista de Missões")
![alt text](./public/images/telaRegras.PNG "Página de Regras de Pontuação")
![alt text](./public/images/DescMissao.PNG "Página de Descrição da Missão")
![alt text](./public/images/ProgressoMissao.PNG "Página de Progresso da Missão")

## Como usar 

Execute o app:

* Instale o [NODE.js](https://nodejs.org/en/download/)
* Instale as seguintes bibliotecas
```cmd
npm install --save express

npm install --save express-handlebars

npm install body-parser --save

npm i -g nodemon

npm install --save sequelize

nodemon app.js

npm install --save mysql2

npm install --save cors

npm install --save express-session

npm install --save connect-flash

npm install --save bcryptjs

npm install --save passport

npm install --save passport-local

npm install aos --save
```
### Configuração do banco de dados local
* no workbench do **_MySQL_**  crie um **_Schema_** chamado `challengeey`
* no arquivo db.js localizado no caminho ChallengeEY/models/db.js troque as seguintes informações:
    ```js
    const sequelize = new Sequelize('challengeey', 'username', 'senha', {
        host: 'localhost',
        dialect: 'mysql'
    })
    ```
    sendo username, o usuario do seu banco de dados e senha, a senha do seu banco de dados
* em **_`ChallengeEY/models/missao-model.js`_** e em **_`ChallengeEY/models/usuario-model.js`_** descomente as seguintes linhas:
    ```js
        Usuaro.sync({ force: true })

        Missao.sync({ force: true })
    ```
    * rode utilizando `node app.js` ou `nodemon app.js`
    * isso criará as tabelas no banco de dados
    * pare de rodar o app utilizando `Ctrl + C`
    * comente novamente
    ```js
        //Usuaro.sync({ force: true })

        //Missao.sync({ force: true })
    ```
    * nos diretórios **_`ChallengeEY/models/missao-model.js`_** e **_`ChallengeEY/models/usuario-model.js`_**
* rode novamente utilizando `node app.js` ou `nodemon app.js`
* Pronto > Você acaba de executar o aplicativo de gameficação de processo de seleção 😄

Como clonar o repositório:

~~~wsl2   
    cd /home/Challenge
    git clone https://github.com/atila9595/ChallengeEY.git
    cd ChallengeEY
    ls
~~~
## Vídeo demonstrativo

[![youtube.com](./public/images/EY.jpg)](https://youtu.be/PqJC4B5rqRE)

## Referências 

* [Passport](https://www.passportjs.org/)
* [Sequelize](https://sequelize.org/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Handlebars](https://handlebarsjs.com/guide/)



---
![alt text](./public/images/takaka_logo_quadrado.jpeg "Logo TAKAKA") **_[ Takaka ]_** 
