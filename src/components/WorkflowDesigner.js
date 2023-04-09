import React, { useState, useEffect,useCallback ,useRef} from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap
  } from 'reactflow';
  import 'reactflow/dist/style.css';
  import "../App.css"
import Module from "./Module";
//   const initialNodes = [
//       { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//     //   { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//     ];
    
  //  const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
    const initialNodes = [
        {
          id: '1',
          type: 'input',
          data: { label: 'input node' },
          position: { x: 250, y: 5 },
        },
      ];
      
      let id = 0;
      const getId = () => `dndnode_${id++}`;
         
const WorkFlowDesigner = () => {
  const [workflow, setWorkflow] = useState(null);
//   const [modules, setModules] = useState([]);
  const { id } = useParams();


  useEffect(() => {
    const fetchWorkflow = async () => {
       
      const response = await fetch(
        `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${id}`
      );
      const data = await response.json();
      setWorkflow(data);
    };
    // const fetchModules = async () => {
    //     const response = await fetch(
    //       `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=1&limit=5`
    //     );
    //     const data = await response.json();
    //     setModules(data);
    //   };
    //   fetchModules();
    fetchWorkflow();

  }, [id]);

//   const initialElements = [
//     {
//       id: "input",
//       data: { label: "Input", type: workflow?.input_type },
//       position: { x: 250, y: 5 },
//     },
//   ];

//   const [elements, setElements] = useState(initialElements);
//   const onConnect = (params) =>
//     setElements((els) => addEdge(params, els));

//   const onDelete = (event, node) =>
//     setElements((els) => els.filter((el) => el.id !== node.id && el.target !== node.id));
const reactFlowWrapper = useRef(null);
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState([]);
const [reactFlowInstance, setReactFlowInstance] = useState(null);

const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}, []);

const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');

    // check if the dropped element is valid
    if (typeof type === 'undefined' || !type) {
      return;
    }

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setNodes((nds) => nds.concat(newNode));
  },
  [reactFlowInstance]
);
  return (
    <div style={{ height: "100vh",width:"100vw" }}>
      <h1 style={{ textAlign: "center" }}>{workflow?.name}</h1>
  <div style={{display:"flex"}}>
  <div
          style={{
            width: "30vw",
            height: "100vh",
            backgroundColor: "#f7f7f7",
            padding: "1rem",
          }}
        >
        <Module/>
        </div>
      <div style={{ width: "70vw",height: "100vh" }}>    
    <ReactFlow
    nodes={nodes}
    edges={edges}
    onNodesChange={onNodesChange}
    onEdgesChange={onEdgesChange}
    onConnect={onConnect}
  >
    <MiniMap />
    <Controls />
    <Background />
  </ReactFlow>
  </div>
   {/* <div style={{height:"100vh",width:"70vw"}}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
          >
            <Controls />
          <Background/>
          <MiniMap/>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div> */}
  </div>
    </div>
  );
};

export default WorkFlowDesigner;
