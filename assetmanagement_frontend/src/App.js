import './App.css';
import { Route, Routes } from "react-router-dom";
import React from 'react';
import { Login } from './component/Login';
import DisplayAssetAllocations from './component/DisplayAssetAllocations';
import Error from './component/Error';
import DisplayAssets from './component/DisplayAssets';
import AddAsset from './component/AddAsset';
import { Registration } from './component/Registration';
import Footer from './component/Footer';
import { LandingHeader } from './component/LandingHeader';
import LandingPage from './component/LandingPage';
import { About } from './component/About';
import EmployeeManagement from './component/EmployeeManagement';
import AddServiceRequest from './component/AddServiceRequest';
import DisplayServiceRequests from './component/DisplayServiceRequest';
import AddAssetAllocation from './component/AddAssetAllocation';
import DisplayAudit from './component/DisplayAudit';
import AddAudit from './component/AddAudit';
import RequireAuth from './component/RequireAuth';
import { Admin } from './component/Admin';
import { EmployeeDashboard } from './component/Employee-dashboard';
import Breadcrums from './component/Breadcrums';
import { Profile } from './component/profile';
import DisplayAssetEmployee from './component/DisplayAssetEmployee';
import AddServiceRequestAdmin from './component/AddServiceRequestAdmin';

function App() {
  return (

    <div className="App">
      <LandingHeader/>
      {/* <div className="container custom-container"> */}
      <div className="content-wrapper">
        {/* PUBLIC ROUTES */}
        <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

          {/* ASSET ALLOCATION */}
          <Route element={<RequireAuth />}>
          <Route path="/asset-allocations" element={<DisplayAssetAllocations />} />
          <Route path="/add-asset-allocation" element={<AddAssetAllocation />} />
          <Route path="/edit-asset-allocation/:id" element={<AddAssetAllocation />} />
          </Route>

          {/* ASSET */}
          <Route element={<RequireAuth />}>
          <Route path="/assets" element={<DisplayAssets />} /> 
          <Route path="/assetdisplay" element={<DisplayAssetEmployee />} />
          <Route path="/add-asset" element={<AddAsset />} /> 
          <Route path="/edit-asset/:id" element={<AddAsset />} /> 
          </Route>

          {/* EMPLOYEE */}
          <Route element={<RequireAuth />}>
          <Route path="/employees" element={<EmployeeManagement/>}/>
          <Route path="/edit-employee/:id" element={<EmployeeManagement />} />
          </Route>

          {/* SERVICE REQUEST */}
          <Route element={<RequireAuth />}>
          <Route path="/service-requests" element={<DisplayServiceRequests/>}/>
          <Route path="/add-service-request" element={<AddServiceRequest/>}/>
          <Route path="/edit-service-request/:id" element={<AddServiceRequest/>}/>
          <Route path="/edit-service-request-admin/:id" element={<AddServiceRequestAdmin/>}/>
          </Route>

          {/* AUDIT  */}
          <Route element={<RequireAuth />}>
          <Route path="/audits" element={<DisplayAudit/>}/>
          <Route path="/add-audit" element={<AddAudit/>}/>
          <Route path="/edit-audit/:id" element={<AddAudit/>}/>
          </Route>

          {/* ADMIN DASHBOARD */}
          <Route element={<RequireAuth />}>
          <Route path="/admin/:username" element={<Admin/>}/>
          </Route>

          {/* EMPLOYEE DASHBOARD */}
          <Route element={<RequireAuth />}>
          <Route path="/employee/:username" element={<EmployeeDashboard/>}/>
          </Route>

          {/* PROFILE */}
        <Route element={<RequireAuth />}>
          <Route path="/myprofile/:username" element={<Profile />} />
        </Route>

          {/* CATCH ALL ROUTES */}
          <Route path="*" element={<Error />} />
        </Routes>
        <Breadcrums/>
       </div> 
      <Footer/>
    </div>
  );
}

export default App;