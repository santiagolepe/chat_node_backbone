const { gql } = require('apollo-server-express')

const typeDefs = gql`

  type Token {
    token: String!
  }

  type User {
    _id: String!,
    name: String!,
    email: String!,
    role: String!,
    created_at: String!,
    updated_at: String!,
  }

  type Query {
    me: User,
  }

  type Mutation {
    login (email: String!, password: String!): Token!,
    signup (name: String!, email: String!, password: String!): Token!,
  }
`
module.exports = typeDefs