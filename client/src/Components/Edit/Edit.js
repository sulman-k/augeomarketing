import { useEffect, useState } from 'react';
import { UPDATE_PERSON } from '../Queries';
import { useMutation } from '@apollo/client';

import "./EditStyles.css"

const Edit = ({ person, onClose }) => {
    const [id, setId] = useState(person.id)
  const [firstName, setFirstName] = useState(person.firstName);
  const [lastName, setLastName] = useState(person.lastName);
  const [jobTitle, setJobTitle] = useState(person.jobTitle);
  const [updatePerson, { loading, error }] = useMutation(UPDATE_PERSON);

  const submitHandler = async (event) => {
    event.preventDefault();

   await updatePerson({ variables: { id: id, firstName:firstName, lastName:lastName, jobTitle:jobTitle } });
   onClose();
  };

  useEffect(() => {

  }, [])

  return (
    <div className="edit-person">
    <form onSubmit={submitHandler}>
      <div className="edit-person-row">
        <h2>Edit Person</h2>
      </div>
      <div className="edit-person-row">
        <label htmlFor="firstNameInput">First Name:</label>
        <input id="firstNameInput" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      </div>
      <div className="edit-person-row">
        <label htmlFor="lastNameInput">Last Name:</label>
        <input id="lastNameInput" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className="edit-person-row">
        <label htmlFor="jobTitleInput">Job Title:</label>
        <input id="jobTitleInput" type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      </div>
      <div className="edit-person-row">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
      <div className="edit-person-row">
        <button type="submit">Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  </div>
  );
};
export default Edit;