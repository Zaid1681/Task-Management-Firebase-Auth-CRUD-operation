import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainMenu from "./components/MainMenu/MainMenu";
import TasksList from "./components/TasksList/TasksList";
import TaskForm from "./components/TaskForm/TaskForm";
import Register from "./components/Auth/Register";
// import Regist
function App() {
  return (
    <>
      <BrowserRouter>
        <MainMenu />
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/newtask" element={<TaskForm />} />
          <Route path="/auth" element={<Register />} />
        </Routes>
        {/* < /Routes> */}
        {/* <Route path="/newtask">
            <TaskForm />
          </Route>
          <Route path="/">
            <TasksList />
          </Route>
          <Route path="/auth">
            <Register />
          </Route>
        </Routes> */}
      </BrowserRouter>
    </>
  );
}

export default App;
