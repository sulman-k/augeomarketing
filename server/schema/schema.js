
const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Person {
    id: ID!
    firstName: String!
    lastName: String!
    jobTitle: String!
    department: Department!
    manager: Person
    reports: [Person]!
  }
  type Department {
    id: ID!
    name: String!
    people: [Person]!
  }
  
  type Query {
  allPeople: [Person]!
  person(id: ID, firstName: String, lastName: String, jobTitle: String, departmentId: ID): Person
  allDepartments: [Department]!
  department(id: ID, name:String): Department
}
  
  type Mutation {
    updatePerson(id: ID!, firstName: String, lastName: String, jobTitle: String): Person
  }
  
  
`;

module.exports = typeDefs;




