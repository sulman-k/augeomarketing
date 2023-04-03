import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import "./SearchStyles.css"
import Edit from './Edit/Edit';
import { GET_PERSON_BY_ID, GET_PERSON_FIRSTNAME, GET_PERSON_BY_LASTNAME, GET_PERSON_BY_JOBTITLE, GET_DEPARTMENT, GET_DEPARTMENT_BY_NAME } from './Queries';



const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [person, setPerson] = useState(null);
  const errorList = [];
  const [editPerson, setEditPerson] = useState(null);

  const [getPersonById, { loading: personLoadingById, error:errorOfPersonById}] = useLazyQuery(GET_PERSON_BY_ID);
  const [getPersonByFirstName, { loading: personByFirstNameLoading, error:errorOfPersonByFirstName }] = useLazyQuery(GET_PERSON_FIRSTNAME);
  const [getPersonByLastName, { loading: personByLastNameLoading, error:errorOfPersonByLastName }] = useLazyQuery(GET_PERSON_BY_LASTNAME);
  const [getPersonByJobTitle, { loading: personByJobTitleLoading, error: errorOfPersonByJobTitle }] = useLazyQuery(GET_PERSON_BY_JOBTITLE);
  const [getDepartmentByName, { loading: departmenByNametLoading, error: errorOfDepartmentById}] = useLazyQuery(GET_DEPARTMENT_BY_NAME);
  const [getDepartment, { loading: departmentLoading, error: errorOfDepartmentByName }] = useLazyQuery(GET_DEPARTMENT);

  const getData = async () => {
    if (!searchTerm) return;
    let personResultById = await getPersonById({ variables: { id: searchTerm } });
    if (personResultById.data && personResultById.data.person) {
      setPerson(personResultById.data.person);
      return;
    }else{errorList.push(errorOfPersonById)}

    const personResultByFirstName = await getPersonByFirstName({ variables: { firstName: searchTerm } });
    if (personResultByFirstName.data && personResultByFirstName.data.person) {
      setPerson(personResultByFirstName.data.person);
      return;
    }else{errorList.push(errorOfPersonByFirstName)}

    const personResultByLastName = await getPersonByLastName({ variables: { lastName: searchTerm } });
    if (personResultByLastName.data && personResultByLastName.data.person) {
      setPerson(personResultByLastName.data.person);
      return;
    }else{errorList.push(errorOfPersonByLastName)}

    let personResultByJobTitle = await getPersonByJobTitle({ variables: { jobTitle: searchTerm } });
    if  (personResultByJobTitle.data && personResultByJobTitle.data.person) {
      setPerson(personResultByJobTitle.data.person);
      return;
    }else{errorList.push(errorOfPersonByJobTitle)}

    const departmentResult = await getDepartment({ variables: { id: searchTerm } });
    if (departmentResult.data && departmentResult.data.department) {
      setDepartment(departmentResult.data.department);
      return;
    }else{errorList.push(errorOfDepartmentById)}

    const departmentNameResult = await getDepartmentByName({ variables: { name: searchTerm } });
    if (departmentNameResult.data && departmentNameResult.data.department) {
      setDepartment(departmentNameResult.data.department);
      return;
    }else{errorList.push(errorOfDepartmentByName)}
    if(errorList.length === 6){
      setDepartment("");
    setPerson("");
    };
  }
  const handleSearch = async (event) => {
    event.preventDefault();
    getData();
    setPerson('');
    setDepartment("");
    
  };

  useEffect(()=>{
    getData();
},[editPerson])
  const onCloseHandler  = () =>{
    setEditPerson(null);
  }
  
  return (
    <div className="container">
  <form onSubmit={handleSearch}>
    <input className="search-box" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
    <button className="search-button" type="submit">Search</button>
  </form>
  {personLoadingById || departmentLoading || personByJobTitleLoading || departmenByNametLoading || personByLastNameLoading || personByFirstNameLoading ? (
    <p>Loading...</p>
  ) : ( 
    <div className="details-container">
      {person &&  (
        <div className="person">
          <h2 className="person-title">Person Details</h2>
          <p className="person-item">{person.firstName} {person.lastName}</p>
          <p className="person-item">{person.jobTitle} at {person.department.name}</p>
          <p className="person-item">Managed by: {person.manager.firstName} {person.manager.lastName}</p>
          <div className="reports-container">
            <h3 className="reports-title">People Reporting to {person.firstName} </h3>
            {person.reports.map((reporter) => (
              <div key={reporter.id} className="report-item">
                <p className="report-name">{reporter.firstName} {reporter.lastName} ({reporter.jobTitle})</p>
              </div>
            ))}
          </div>
          {person && <button className="edit-button" onClick={() => setEditPerson(person)}>Edit</button>}
        </div>
      )}
      {department &&  (
        <div className="department">
          <h2 className="department-title">Department Details</h2>
          <p className="department-item">{department.name}</p>
          <div className="people-container">
            <h3 className="people-title">People</h3>
            {department.people.map((person) => (
              <div key={person.id} className="person-item">
                <p className="person-job">{person.firstName} {person.lastName} ({person.jobTitle})</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {(!person && !department) && <p>No Record Found</p>}
    </div>
  )}
  {editPerson && <Edit person={editPerson} onClose={onCloseHandler} />}
</div>

  );
};

export default Search;
