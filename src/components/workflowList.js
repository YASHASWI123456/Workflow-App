import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function WorkflowList() {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    axios.get('https://64307b10d4518cfb0e50e555.mockapi.io/workflow')
      .then(response => {
        setWorkflows(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Workflow List</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Input Type</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {workflows.map(workflow => (
              <tr key={workflow.id}>
                  <Link to={`/workflow/${workflow.id}`} style={{textDecoration:"none",color:"black"}}>
              <td>
               
                  {workflow.name}
            
              </td>
          </Link>
              <td>{workflow.input_type}</td>
              <td>{workflow.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WorkflowList;
