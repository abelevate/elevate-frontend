import { 
    FaUser, FaBriefcase, FaProjectDiagram, FaGraduationCap, 
    FaTrophy, FaTools, FaEllipsisH 
} from "react-icons/fa";

// Icon map for each section key
export const sectionIcons = {
    personal_details: <FaUser className="me-1" />,
    work_experience: <FaBriefcase className="me-1" />,
    projects: <FaProjectDiagram className="me-1" />,
    education: <FaGraduationCap className="me-1" />,
    achievments: <FaTrophy className="me-1" />,
    skills: <FaTools className="me-1" />,
    other: <FaEllipsisH className="me-1" />
};

export const sections = {
    personal_details: "Personal Details",
    work_experience: "Work Experience",
    projects: "Projects",
    education: "Education",
    achievments: "Achievements",
    skills: "Skills",
    other: "Other"
};
