import child1 from "../assets/children/child1.jpg";
import child2 from "../assets/children/child2.jpg";
import child3 from "../assets/children/child3.jpg";

const meetingData = [

    {
        id: 1,
        childId: 1,
        childName: "Heer",
        image: child1,
        age: 8,
        center: "Sarvesham Seva Sangh, Pune",
        date: "2026-08-05",
        time: "01:00 PM",
        status: "Scheduled",
        message: "Please arrive 15 minutes early."
    },

    {
        id: 2,
        childId: 2,
        childName: "Gopal",
        image: child2,
        age: 4,
        center: "Sakar, Ch. Sambhajinagar",
        date: "2026-08-04",
        time: "04:00 PM",
        status: "Pending",
        message: "Waiting for adoption center approval."
    },

    {
        id: 3,
        childId: 3,
        childName: "Anju",
        image: child3,
        age: 4,
        center: "BAL ASHA TRUST, Mumbai",
        date: "2026-08-07",
        time: "12:30 PM",
        status: "Rejected",
        message: "Documents are incomplete."
    }

];

export default meetingData;