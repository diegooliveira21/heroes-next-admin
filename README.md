### Estrutura

A estrutura segue o conceito de Providers, onde se concentra a principal lógica de négocio da aplicação. Os Providers, muito parecido com as classes no OOP, persistem e compartilham dados entre os componentes e telas que o consomem, permitindo modular e escalar a lógica, conforme o negócio cresce ou muda. Com o avanço da lógica, um Provider tende a se sobrecarregar, já que a idéia é concentrar nele toda regra, nessa ocasião, granular o Provider em hooks menores, deixando cada vez mais a persistência dos dados no Provider e a lógica nos hooks, é um caminho a ser considerado para manter a boa manutenção da aplicação.

### Framework

O NextJS trás no seu kit, todo um ambiente de bibliotecas que precisavamos usar antes para desenvolver uma aplicação real em ReactJS. Roteamento, estilização, performance, cache, SEO e entre outros, eram funções mitigadas em muitas bibliotecas, o quê dificultava a manutenção, e fazia o responsável técnico se preocupar com muitas versões, regras de compatibilidade e qualidade do código que o time de cada subia. Sem contar do SSR, a primeira funcionalidade que fez o mercado ter olhos pro NextJS.

### Formulários, Dados e Renderizações

Numa aplicação CRUD, nós lidamos com todo o fluxo de dados de uma aplicação, logo precisamos garantir que tais sejam válidos. Para garantir essa consistência, fizemos o uso do YUP, uma biblioteca simplista, mas extremamente aplicável e funcional, nos formulários. Outro ponto crítico, é a quantidade de renders que um formulário pode causar, dependendo da sua estrutura. Por isso, em vez de um state, que ocasionaria renderizações desncessários e um negativo na performance, optamos por usar refs e o hook useCallback, com eles conseguimos orquestrar o envio dos dados sem que nenhum render desnecessário seja feito. Assim, a aplicação pode receber formulário com inúmeros inputs, que o usuário não terá penalidade durante o uso.

### Typesript

O uso do Typescript tras o melhor do Javascript. Instâncias de objetos, funções, variáveis as vezes são imprevisíveis numa aplicação JS, e ok, é a flexibildiade que a linguagem permite. Mas deixa cabível ao responsavel técnico 

### UI - React Bootstrap + Styles

Como primeiro uso do react-bootstrap, buscamos utilizar o máximo possível do framework como base para nossos componentes. Optamos por não utilizar a síntaxe de estilização do react-bootstrap por não ser bem escalável, já que lidar com classes css, de modo a construir um design system efetivo, com uma boa experiência de desenvolvimento para que o desenvolvedor tenha facilidade de aplicar sua lógica em volta, é bem trabalhoso, e difícil de alcançar. Aqui entra o styled, que nos permite evoluir e criar novos componentes para atender a necessidade da aplicação, dentro da estrutura que o React prega aos desenvolvedores.

### Firebase

Também como primeiro uso, o Firebase se mostrou efetivo na sua proposta, de ter soluções prontas e escaláveis em modelos de dados, e até fluxos prontos, como a de autenticação. Isso permitiu lançar a aplicação no prazo, e economizar um tempo que ainda seria investido no back-end.

