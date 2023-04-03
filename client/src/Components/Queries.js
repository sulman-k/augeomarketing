import {gql} from '@apollo/client';

export const GET_PERSON_BY_ID = gql`
  query GetPerson($id: ID) {
    person(id: $id) {
      id
      firstName
      lastName
      jobTitle
      department {
        id
        name
      }
      manager {
        id
        firstName
        lastName
      }
      reports {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
export const GET_PERSON_FIRSTNAME = gql`
  query GetPerson($firstName: String) {
    person(firstName: $firstName) {
      id
      firstName
      lastName
      jobTitle
      department {
        id
        name
      }
      manager {
        id
        firstName
        lastName
      }
      reports {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
export const GET_PERSON_BY_LASTNAME = gql`
  query GetPerson($lastName: String) {
    person(lastName: $lastName) {
      id
      firstName
      lastName
      jobTitle
      department {
        id
        name
      }
      manager {
        id
        firstName
        lastName
      }
      reports {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
export const GET_PERSON_BY_JOBTITLE = gql`
  query GetPerson($jobTitle: String!) {
    person(jobTitle: $jobTitle) {
      id
      firstName
      lastName
      jobTitle
      department {
        id
        name
      }
      manager {
        id
        firstName
        lastName
      }
      reports {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $firstName: String, $lastName: String, $jobTitle: String) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName, jobTitle: $jobTitle) {
      id
      firstName
      lastName
      jobTitle
      department {
        id
        name
      }
      manager {
        id
        firstName
        lastName
        jobTitle
      }
      reports {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
export const GET_DEPARTMENT = gql`
  query GetDepartment($id: ID, $name: String) {
    department(id: $id, name: $name) {
      id
      name
      people {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
export const GET_DEPARTMENT_BY_NAME = gql`
  query GetDepartment($name: String!) {
    department(name: $name) {
      id
      name
      people {
        id
        firstName
        lastName
        jobTitle
      }
    }
  }
`;
