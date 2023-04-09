import WorkflowList from './components/workflowList';
import WorkFlowDesigner from './components/WorkflowDesigner';

import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={ <WorkflowList />} />
        {/* <Route path="/" element={ <Flow />} /> */}
        <Route path="/workflow/:id" element={ <WorkFlowDesigner />} />
         
      </Routes>
    </>
  );
};

export default App;