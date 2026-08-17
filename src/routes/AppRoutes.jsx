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
import About from "../pages/common/About";
import PrivacyPolicy from "../pages/common/PrivacyPolicy";
import ParentRequests from "../pages/admin/ParentRequests";
import CenterRequests from "../pages/admin/CenterRequests";
import AdminAbout from "../pages/admin/AdminAbout";
import AdminProfile from "../pages/admin/AdminProfile";
import EditAdminProfile from "../pages/admin/EditAdminProfile";
import Contact from "../pages/common/Contact";
import ProtectedRoute from "./ProtectedRoute";

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
                    element={
                        <ProtectedRoute>
                            <ParentHome />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/home"
                    element={
                        <ProtectedRoute>
                            <CenterHome />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/home"
                    element={
                        <ProtectedRoute>
                            <AdminHome />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/adoption-procedure"
                    element={<AdoptionProcedure />}
                />

                <Route
                    path="/parent/adoption-procedure"
                    element={<AdoptionProcedure />}
                />

                <Route
                    path="/center/adoption-procedure"
                    element={<AdoptionProcedure />}
                />

                <Route
                    path="/parent/terms-conditions"
                    element={<TermsConditions />}
                />

                <Route
                    path="/center/terms-conditions"
                    element={<TermsConditions />}
                />

                <Route
                    path="/admin/terms-conditions"
                    element={<TermsConditions />}
                />

                <Route
                    path="/parent-profile"
                    element={
                        <ProtectedRoute>
                            <ParentProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cities"
                    element={
                        <ProtectedRoute>
                            <Cities />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/adoption-centers/:city"
                    element={
                        <ProtectedRoute>
                            <AdoptionCenters />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/children/:city/:centerId"
                    element={
                        <ProtectedRoute>
                            <Children />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/book-meeting/:city/:centerId/:childId"
                    element={
                        <ProtectedRoute>
                            <BookMeeting />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/scheduled-meetings"
                    element={
                        <ProtectedRoute>
                            <ScheduledMeetings />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/meeting-requests"
                    element={
                        <ProtectedRoute>
                            <MeetingRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/meeting-details/:id"
                    element={
                        <ProtectedRoute>
                            <MeetingDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/add-child"
                    element={
                        <ProtectedRoute>
                            <AddChild />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/edit-child/:id"
                    element={
                        <ProtectedRoute>
                            <EditChild />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/all-children"
                    element={
                        <ProtectedRoute>
                            <AllChildren />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/center/profile"
                    element={
                        <ProtectedRoute>
                            <CenterProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/about"
                    element={<About />}
                />

                <Route
                    path="/center/about"
                    element={<About />}
                />

                <Route
                    path="/parent/privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="/center/privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="/admin/privacy-policy"
                    element={<PrivacyPolicy />}
                />

                <Route
                    path="/admin/parent-requests"
                    element={
                        <ProtectedRoute>
                            <ParentRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/center-requests"
                    element={
                        <ProtectedRoute>
                            <CenterRequests />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/about"
                    element={<AdminAbout />}
                />

                <Route
                    path="/admin/profile"
                    element={
                        <ProtectedRoute>
                            <AdminProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditAdminProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contact"
                    element={<Contact />}
                />

                <Route
                    path="/center/contact"
                    element={<Contact />}
                />

                <Route
                    path="/admin/contact"
                    element={<Contact />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;