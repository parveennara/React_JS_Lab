import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddExpense from "./components/AddExpense";
import ShowExpenses from "./components/ShowExpenses"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/add" element={<AddExpense onTrue={""} onClose={""} />} />
          <Route path="/" element={<ShowExpenses />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;