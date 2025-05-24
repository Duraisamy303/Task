import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/login/login.screen";
import RootLayout from "./component/layout.component";
import { Provider } from "react-redux";
import store from "./store/store";
import UserList from "./screens/userList/userList.screen";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/user_list" element={<UserList />} />

          
          {/* Add more routes here */}
        </Routes>
      </RootLayout>
    </Router>
    </Provider>
  );
}

export default App;
