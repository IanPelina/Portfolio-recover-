import {Routes, Route} from "react-router-dom";

import Home from "../Pages/Home/Home";
import ProjectsDetails from "../Pages/ProjectsDetails/ProjectsDetails";
import ErrorPage from "../Pages/Error/ErrorPage";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detailsWork/:id" element={<ProjectsDetails />} />
            <Route path="/*" element={<ErrorPage />} />
        </Routes>
    )
}