const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const schema = require("./Schema/schema");
const app = express();
const port = process.env.port || 8000;

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(port, () => {
  console.log(`listen to the port ${port}`);
});
  