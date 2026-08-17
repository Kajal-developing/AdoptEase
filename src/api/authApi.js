import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080"
});

// Automatically attach JWT token
API.interceptors.request.use(
    (config) => {

        if (config.url?.startsWith("/auth")) {
            return config;
        }

        const user =
            JSON.parse(localStorage.getItem("user")) || {};

        if (user?.token) {

            config.headers.Authorization =
                `Bearer ${user.token}`;

        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Existing API methods
export const loginUser = (loginData) =>
    API.post("/auth/login", loginData);

export const registerParent = (
    request,
    profilePhoto,
    housePhoto,
    familyPhoto
) => {

    const formData = new FormData();

    formData.append(
        "data",
        new Blob(
            [JSON.stringify(request)],
            {
                type: "application/json"
            }
        )
    );

    if (profilePhoto) {
        formData.append(
            "profilePhoto",
            profilePhoto
        );
    }

    if (housePhoto) {
        formData.append(
            "housePhoto",
            housePhoto
        );
    }

    if (familyPhoto) {
        formData.append(
            "familyPhoto",
            familyPhoto
        );
    }

    return API.post(
        "/auth/register/parent",
        formData
    );
};

export const registerCenter = (
    request,
    centerPhoto
) => {

    const formData = new FormData();

    formData.append(
        "data",
        new Blob(
            [JSON.stringify(request)],
            {
                type: "application/json"
            }
        )
    );

    if (centerPhoto) {

        formData.append(
            "centerPhoto",
            centerPhoto
        );
    }

    return API.post(
        "/auth/register/center",
        formData
    );
};

export const checkEmail = (email) =>
    API.get(`/auth/check-email`, {
        params: {
            email: email
        }
    });

// ================= PARENT REQUEST APIs =================

export const getParentProfile = (userId) => {

    return API.get(`/parent/profile/${userId}`);

};

export const updateParentProfile = (userId, request) => {

    return API.put(`/parent/profile/${userId}`, request);

};

export const changePassword = (userId, request) => {

    return API.put(
        `/parent/${userId}/change-password`,
        request
    );

};

export const getCentersByCity = (city) => {

    return API.get(`/parent/centers?city=${city}`);

};

export const getChildrenByCenter = (centerId) => {

    return API.get(`/parent/centers/${centerId}/children`);

};

export const getCenterById = (centerId) => {

    return API.get(`/parent/centers/${centerId}`);

};

export const getChildById = (childId) => {

    return API.get(`/parent/children/${childId}`);

};

export const bookMeeting = (userId, meetingData) => {

    return API.post(
        `/parent/${userId}/meetings`,
        meetingData
    );

};

export const getScheduledMeetings = (userId) => {

    return API.get(`/parent/${userId}/meetings`);

};

// Cancel meeting ticket
export const cancelMeeting = (meetingId) => {

    return API.delete(
        `/parent/meetings/${meetingId}`
    );

};

// ================= CENTER REQUEST APIs =================

export const getCenterProfile = (userId) => {

    return API.get(`/center/profile/${userId}`);

};

export const updateCenterProfile = (userId, data) => {

    return API.put(
        `/center/profile/${userId}`,
        data
    );

};

export const changeCenterPassword = (userId, data) => {

    return API.put(
        `/center/${userId}/change-password`,
        data
    );

};

export const deactivateCenterAccount = (userId) => {

    return API.put(
        `/center/${userId}/deactivate`
    );

};

export const getCenterChildren = (userId) => {

    return API.get(`/center/${userId}/children`);

};

export const addCenterChild = (userId, childData) => {

    return API.post(
        `/center/${userId}/children`,
        childData
    );

};

export const addChild = (userId, childData, image) => {

    const formData = new FormData();

    formData.append(
        "child",
        new Blob(
            [JSON.stringify(childData)],
            {
                type: "application/json"
            }
        )
    );

    if (image) {

        formData.append("image", image);

    }

    return API.post(
        `/center/${userId}/children`,
        formData
    );
};

export const getCenterChildById = (childId) => {

    return API.get(
        `/center/children/${childId}`
    );

};

export const updateCenterChild = (childId, formData) => {

    return API.put(
        `/center/children/${childId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

};

export const deactivateCenterChild = (childId) => {

    return API.put(
        `/center/children/${childId}/deactivate`
    );

};

// Get meeting requests for adoption center
export const getCenterMeetingRequests = (userId) => {

    return API.get(
        `/center/${userId}/meetings`
    );

};


// Approve meeting
export const approveCenterMeeting = (meetingId, data) => {

    return API.put(
        `/center/meetings/${meetingId}/approve`,
        data
    );

};


// Reject meeting
export const rejectCenterMeeting = (meetingId, data) => {

    return API.put(
        `/center/meetings/${meetingId}/reject`,
        data
    );

};

export const updateCenterPhoto = (
    userId,
    centerPhoto
) => {

    const formData = new FormData();

    formData.append(
        "centerPhoto",
        centerPhoto
    );

    return API.put(
        `/center/profile/${userId}/center-photo`,
        formData
    );
};


// ================= ADMIN REQUEST APIs =================

// Get Admin Profile
export const getAdminProfile = (userId) => {

    return API.get(
        `/admin/profile/${userId}`
    );

};

// Update admin profile
export const updateAdminProfile = (userId, data) => {

    return API.put(
        `/admin/profile/${userId}`,
        data
    );

};

export const getAdminDashboard = () => {
    return API.get("/admin/dashboard");
};

// Get pending parents
export const getPendingParents = () => {
    return API.get("/admin/parents/pending");
};

// Get pending centers
export const getPendingCenters = () => {
    return API.get("/admin/centers/pending");
};

// Approve parent
export const approveParent = (userId) => {
    return API.put(`/admin/parents/${userId}/approve`);
};

export const rejectParent = (userId, remark) => {
    return API.put(
        `/admin/parents/${userId}/reject`,
        {
            remark: remark
        }
    );
};

// Approve center
export const approveCenter = (userId) => {
    return API.put(`/admin/centers/${userId}/approve`);
};

// Reject center
export const rejectCenter = (userId, remark) => {

    return API.put(
        `/admin/centers/${userId}/reject`,
        {
            remark: remark
        }
    );

};

export const updateParentHousePhoto = (
    userId,
    housePhoto
) => {

    const formData = new FormData();

    formData.append(
        "housePhoto",
        housePhoto
    );

    return API.put(
        `/parent/profile/${userId}/house-photo`,
        formData
    );
};


export const updateParentFamilyPhoto = (
    userId,
    familyPhoto
) => {

    const formData = new FormData();

    formData.append(
        "familyPhoto",
        familyPhoto
    );

    return API.put(
        `/parent/profile/${userId}/family-photo`,
        formData
    );
};

export const updateParentProfilePhoto = (
    userId,
    profilePhoto
) => {

    const formData = new FormData();

    formData.append(
        "profilePhoto",
        profilePhoto
    );

    return API.put(
        `/parent/profile/${userId}/profile-photo`,
        formData
    );
};

// Reschedule rejected meeting
export const rescheduleMeeting = (meetingId, data) => {

    return API.put(
        `/parent/meetings/${meetingId}/reschedule`,
        data
    );

};

export default API;