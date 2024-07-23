import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import ViewStudent from "./pages/dashboard/ViewStudent";

function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/*" element={<Auth />} />
      <Route path="" element={<Navigate to="/sign-in" replace />} />
      <Route path="/viewstudent/:registration_id" element={<ViewStudent/>} />
    </Routes>
  );
}
  
export default App;
