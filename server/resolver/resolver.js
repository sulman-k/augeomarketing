const data = require('../data/data.json');

const { v4: uuidv4 } = require('uuid');
const { people, departments } = require('../data/data.json');
const resolvers = {
  Query: {
    allPeople: () => people,
    person: (_, { id, firstName, lastName, jobTitle, departmentId }) => {
      if (id) {
        return people.find(person => person.id === id);
      }
      if (firstName) {
        const regex = new RegExp(firstName, 'i');
        return people.find(person => regex.test(person.firstName));
      }
      if (lastName) {
        const regex = new RegExp(lastName, 'i');
        return people.find(person => regex.test(person.lastName));
      }
      if (jobTitle) {
        const regex = new RegExp(jobTitle, 'i');
        return people.find(person => regex.test(person.jobTitle));
      }
      if (departmentId) {
        return people.filter(person => person.departmentId === departmentId);
      }
      throw new Error('At least one search parameter is required');
    },
    allDepartments: () => departments,
    department: (_, { id, name }) => {
      if (id) {
        return departments.find(depart => depart.id === id);
      }
      if (name) {
        const regex = new RegExp(name, 'i');
        return departments.find(department => regex.test(department.name));
      }
    },
  },
  Mutation: {
    updatePerson: (_, { id, firstName, lastName, jobTitle }) => {
      const person = people.find(person => person.id === id);
      if (!person) {
        throw new Error(`Person with id ${id} not found`);
      }
      if (firstName) {
        person.firstName = firstName;
      }
      if (lastName) {
        person.lastName = lastName;
      }
      if (jobTitle) {
        person.jobTitle = jobTitle;
      }
      return person;
    },
  },
  Person: {
    department: (person) => departments.find(department => department.id == person.departmentId),
    manager: (person) => {
      if (!person.managerId) {
        return{...person,
        managerId: null}
      };
      return people.find(manager => manager.id == person.managerId);
    },
    reports: (person) => people.filter(report => report.managerId == person.id),
  },
  Department: {
    people: (department) => people.filter(person => person.departmentId == department.id),
  },
};

module.exports = resolvers;
