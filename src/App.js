import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './components/home/Main';
import PollDetail from './components/PollDetail/PollDetail'; 
import Vote from './components/Vote/Vote';
import CreatePoll from "./components/CreatePoll/CreatePoll";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<Main />} />
          <Route path="/PollDetail/:id" element={<PollDetail />} />
          <Route path="/Vote/:id" element={<Vote />} />
          <Route path="/CreatePoll" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>

    // <Main />
    // <PollDetail />
    //  <Vote />
    // <CreatePoll />
  );
}

export default App;
