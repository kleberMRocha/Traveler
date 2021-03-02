
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6ed1693c-fff9-41b2-a44e-4f7e01c3ed6f%2FFrame.png?table=block&id=b9b246c0-1d17-4da6-9fc8-1946c380c078&width=400&userId=&cache=v2" alt="traveller logo" />

### Funcionalidades

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para cumprir todos os requisitos.

Lembrando que o intuito desse documento é apenas para te auxiliar. Você deve se sentir livre para seguir ou não os requisitos mapeados aqui.

### **1. Autenticação**

Você deverá permitir a criação e autenticação de usuários na aplicação. Esses usuários serão administradores. Os administradores terão permissão para alterar o conteúdo que os usuários finais terão acesso.

Para isso, você pode criar uma tabela `users` onde serão armazenados os usuários para que essas informações sejam usadas em qualquer rota que necessite de autenticação.

Os campos que os usuários devem possuir são:

- id;
- name (nome do usuário);
- email (email do usuário);
- password (password do usuário);
- created_at;
- updated_at;

### 2. Cadastro de categorias

A aplicação deverá possuir uma rota para o cadastro de categorias. Será permitido o cadastro de apenas três categorias na aplicação e no próprio layout o Tiago sugeriu as opções de `Pontos Turísticos`, `Comida e Bebida`, `Eventos Organizados`.

Essas informações servirão para categorizar os diversos pontos de uma mesma cidade, deixando o acesso do usuário final mais intuitivo com o que ele desejar ver.

Uma tabela `categories` deve ser criada.

Os campos que as categorias devem possuir são:

- id;
- name (nome da categoria);
- created_at;
- updated_at;

### 3. Cadastro de cidades

Uma tabela `cities` e uma rota para receber os dados para o cadastro de cidades também deve existir. Essa tabela será responsável por armazenar apenas os dados referentes à cidade e não dos locais associados à ela.

A tabela deverá possuir os seguintes campos:

- id;
- name;
- image;
- description;

### 4. Tabela para endereços

Como possuiremos muitos endereços na aplicação e esta é mais como uma informação complementar, pode ser interessante não deixarmos o cadastro de locais ligado diretamente aos seus endereços e sim ligados por uma referência à uma tabela apenas para endereços.

A tabela `addresses` deverá possuir os seguintes campos:

- id;
- zip_code (CEP do endereço);
- street (rua);
- neighborhood (nome do bairro);
- number (número do local);

P.S.: Deixe o campo `number` como `nullable` pois podem haver endereços sem número.

### 5. Cadastro de locais

Para que você possa realizar o cadastro de locais, é importante que a tabela de categorias já exista, pois aqui será necessário uma relação *many to one* com ela.

Você pode criar uma tabela `places` com os seguintes campos:

- id;
- name;
- image
- description;
- category_id (referência para o id de uma categoria na tabela `categories`);
- address_id (referência para o id de um endereço na tabela `addresses`);

## **Entrega**

Esse projeto **não precisa ser entregue** e não receberá correção. Após concluir o projeto, adicionar esse código ao seu Github e/ou criar uma publicação no linkedin contando sobre sua experiência é uma boa forma de demonstrar seus conhecimentos para oportunidades futuras.
