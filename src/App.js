import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { Login } from './components/Login';
import { CustomerMenu } from './components/CustomerMenu';
import { EmployeeMenu } from './components/EmployeeMenu';
import { AdministratorMenu } from './components/AdministratorMenu';
import { AdministratorProfile } from './components/AdministratorProfile';
import { EmployeeProfile } from './components/EmployeeProfile';
import { CreateTables } from './components/CreateTables';
import { ConsultTables } from './components/ConsultTables';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/EmployeeMenu/:user" element={<EmployeeMenu />} />
          <Route exact path="/CustomerMenu/:user" element={<CustomerMenu />} />
          <Route
            exact
            path="/AdministratorMenu/:user"
            element={<AdministratorMenu />}
          />
          <Route
            exact
            path="/AdministratorMenu/:user/Profile"
            element={<AdministratorProfile />}
          />
          <Route
            exact
            path="/EmployeeMenu/:user/Profile"
            element={<EmployeeProfile />}
          />
          <Route
            exact
            path="/AdministratorMenu/:user/CreateTables"
            element={<CreateTables />}
          />
          <Route
            exact
            path="/AdministratorMenu/:user/ConsultTables"
            element={<ConsultTables />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
