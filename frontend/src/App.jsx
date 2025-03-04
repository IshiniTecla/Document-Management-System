import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import { Logins } from './pages/Logins.jsx';
import Contactus from './pages/Contactus.jsx';
import { LeaveagentLogin } from './pages/Leaveagent/LeaveagentLogin.jsx';
import { SalesmanagerLogin } from './pages/Salesmanager/SalesmanagerLogin.jsx';
import { ManagerLogin } from './pages/Manager/ManagerLogin.jsx';
import { MDashboard } from './pages/Manager/MDashboard.jsx';
import { LADashboard } from './pages/Leaveagent/LADashboard.jsx';
import { FileUpload } from './pages/Leaveagent/UploadFiles.jsx';
import { PrivacyPolicy } from './pages/PrivacyTerms.jsx';
import { SalesDashboard } from './pages/SalesDashboard.jsx';
import { Inventory } from './pages/Inventory.jsx';
import { ViewInventory } from './pages/ViewInventory.jsx';
import { InvoicePage } from './pages/Leaveagent/Invoice.jsx';
import { Docoverview } from './pages/Manager/Docoverview.jsx';

const App = () => {
  return (
    <div>

      <Routes>
        <Route index path='/' element={<Home />} />
        <Route index path='/signup' element={<Signup />} />
        <Route index path='/logins' element={<Logins />} />
        <Route index path='/contactus' element={<Contactus />} />
        <Route index path='/salesmanagerlogin' element={<SalesmanagerLogin />} />
        <Route index path='/leaveagentlogin' element={<LeaveagentLogin />} />
        <Route index path='/managerlogin' element={<ManagerLogin />} />
        <Route path="/manager-dashboard/:email" element={<MDashboard />} />
        <Route path="/leaveagent-dashboard/:email" element={<LADashboard />} />
        <Route path="/file-upload/:email" element={<FileUpload />} />
        <Route path="/Privacy-Terms" element={<PrivacyPolicy />} />
        <Route path="/sales-dashboard" element={<SalesDashboard />} />
        <Route path="/inventory/:email" element={<Inventory />} />
        <Route path="/inventory" element={<ViewInventory />} />
        <Route path="/invoice/:email" element={<InvoicePage />} />
        <Route path="/document-overview/:email" element={<Docoverview />} />
      </Routes>

    </div>

  )
}

export default App
