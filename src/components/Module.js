

  import React,{useEffect, useState} from 'react';
import "../App.css"
  const Modules = ({ data }) => {
    const { id, name, input_type, output_type } = data; 
    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
      };
    return (
      <div className="module" data-id={id} >
        <div className="dndnode-input" style={{border: 2 ,borderColor:"black",borderStyle:"solid",borderRadius:5,padding:5,margin:10,textAlign:"center"}}  onDragStart={(event) => onDragStart(event, 'input')} draggable>
        {name}
        </div>
        {/* <div className="name">{name}</div>
        <div className="input">{input_type}</div>
        <div className="output">{output_type}</div> */}
      </div>
    );
  };

 const Module= () => {
    const [modules, setModules] = useState([]);
    useEffect(()=> {
        const fetchModules = async () => {
            const response = await fetch(
              `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5`
            );
            const data = await response.json();
            setModules(data);
          };
          fetchModules();
    },[]);
  
    return (
      <aside>
          <h3>Modules</h3>
          {modules.map((module) => (
            <Modules key={module.id} data={module} />
          ))}
        {/* <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
          Default Node
        </div>
        <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
          Output Node
        </div> */}
      </aside>
    );
  };
  export default Module;