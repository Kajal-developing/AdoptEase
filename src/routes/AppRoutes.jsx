import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ParentRegistration from "../pages/auth/ParentRegistration";
import CenterRegistration from "../pages/auth/CenterRegistration";
import ParentHome from "../pages/parent/ParentHome";
import CenterHome from "../pages/center/CenterHome";
import AdminHome from "../pages/admin/AdminHome";
import AdoptionProcedure from "../pages/common/AdoptionProcedure";
import TermsConditions from "../pages/common/TermsConditions";
import ParentProfile from "../pages/parent/ParentProfile";
import Cities from "../pages/common/Cities";
import AdoptionCenters from "../pages/common/AdoptionCenters";
import Children from "../pages/parent/Children";
import BookMeeting from "../pages/parent/BookMeeting";
import ScheduledMeetings from "../pages/parent/ScheduledMeetings";
import MeetingRequests from "../pages/center/MeetingRequests";
import MeetingDetails from "../pages/center/MeetingDetails";
import AddChild from "../pages/center/AddChild";
import EditChild from "../pages/center/EditChild";
import AllChildren from "../pages/center/AllChildren";
import CenterProfile from "../pages/center/CenterProfile";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/parent/registration"
                    element={<ParentRegistration />}
                />

                <Route
                    path="/center/registration"
                    element={<CenterRegistration />}
                />

                <Route
                    path="/parent/home"
                    element={<ParentHome />}
                />

                <Route
                    path="/center/home"
                    element={<CenterHome />}
                />

                <Route
                    path="/admin/home"
                    element={<AdminHome />}
                />

                <Route
                    path="/adoption-procedure"
                    element={<AdoptionProcedure />}
                />

                <Route
                    path="/terms-conditions"
                    element={<TermsConditions />}
                />

                <Route
                    path="/parent-profile"
                    element={<ParentProfile />}
                />

                <Route
                    path="/cities"
                    element={<Cities />}
                />

                <Route
                    path="/adoption-centers/:city"
                    element={<AdoptionCenters />}
                />

                <Route
                    path="/children/:centerId"
                    element={<Children />}
                />

                <Route
                    path="/book-meeting/:childId"
                    element={<BookMeeting />}
                />

                <Route
                    path="/scheduled-meetings"
                    element={<ScheduledMeetings />}
                />

                <Route
                    path="/center/meeting-requests"
                    element={<MeetingRequests />}
                />

                <Route
                    path="/center/meeting-details/:id"
                    element={<MeetingDetails />}
                />

                <Route
                    path="/center/add-child"
                    element={<AddChild />}
                />

                <Route
                    path="/center/edit-child/:id"
                    element={<EditChild />}
                />

                <Route
                    path="/center/all-children"
                    element={<AllChildren />}
                />

                <Route
                    path="/center/profile"
                    element={<CenterProfile />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;