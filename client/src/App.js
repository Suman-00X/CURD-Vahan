import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import PersonList from './Pages/PersonList';
import AddPerson from './Pages/AddPerson';
import UpdatePerson from './Pages/UpdatePerson';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonList />} />
          <Route path="/add-person" element={<AddPerson />} />
          <Route path="/update-person/:id" element={<UpdatePerson />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
