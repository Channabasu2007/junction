import React from "react";
import { GraduationCap, School } from "lucide-react";

const PointsRoadmap = ({ user }) => {
  // Color Picking form Database
  const secondaryColor = user?.PageLayout?.ColorsPicker?.secondary ?? "#9333ea";
  const primaryColor = user?.PageLayout?.ColorsPicker?.primary ?? "#2563eb";
  const paragraphColor = user?.PageLayout?.ColorsPicker?.paragraph ?? "#374151";

  // Taking out the Educational Data from Database
  const {
    college,
    highSchool,
    secondarySchool,
    primarySchool,
    qualifications,
  } = user;

  const educationTimeline = [
    {
      level: "College",
      details: college,
      icon: <GraduationCap className="w-6 h-6 text-white" />,
    },
    {
      level: "High School",
      details: highSchool,
      icon: <School className="w-6 h-6 text-white" />,
    },
    {
      level: "Secondary School",
      details: secondarySchool,
      icon: <School className="w-6 h-6 text-white" />,
    },
    {
      level: "Primary School",
      details: primarySchool,
      icon: <School className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <div className="mt-10">
      {/* Heading of the section  */}
      <h1
        className="text-3xl font-bold tracking-tight mb-6 text-center"
        style={{ color: primaryColor }}
      >
        My Education Journey
      </h1>

      {/* Schooling and other curicular things  */}
      <div className="px-6 border-l-4 m-6 mb-0" style={{
        borderColor: secondaryColor,
      }}>
        {educationTimeline.map((edu, index) => (
          <div
            key={index}
            className="my-3 p-4 border-2 rounded-2xl"
            style={{
              backgroundColor: `${secondaryColor}20`,
              borderColor: primaryColor
            }}
          >
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: primaryColor }}
            >
              {edu.level}
            </h2>
            {edu.details && (
              <ul>
                {edu.details.collegeName && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      College:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {edu.details.collegeName}
                    </span>
                  </li>
                )}
                {edu.details.school && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      School:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {" "}
                      {edu.details.school}
                    </span>
                  </li>
                )}
                {edu.details.degree && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      Degree:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {" "}
                      {edu.details.degree}
                    </span>
                  </li>
                )}
                {edu.details.field && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      Field:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {edu.details.field}
                    </span>
                  </li>
                )}
                {edu.details.stream && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      Stream:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {edu.details.stream}
                    </span>
                  </li>
                )}
                {edu.details.board && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      Board:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {" "}
                      {edu.details.board}
                    </span>
                  </li>
                )}
                {edu.details.year && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      Year:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {edu.details.year}
                    </span>
                  </li>
                )}
                {edu.details.percentage && (
                  <li>
                    <span
                      className="font-medium"
                      style={{ color: `${primaryColor}90` }}
                    >
                      Percentage:
                    </span>{" "}
                    <span style={{ color: primaryColor }}>
                      {edu.details.percentage}
                    </span>
                  </li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Qualifications */}
      <h2
        className="text-3xl font-bold tracking-tight mt-20 mb-8 text-center"
        style={{ color: primaryColor }}
      >
        Certifications & Qualifications
      </h2>
      <div className="grid w-full gap-8 px-6 mb-5 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {qualifications?.map((q, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl border shadow-md hover:shadow-xl transition transform hover:scale-[1.02]"
            style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}20` }}
          >
            <h3 className="font-semibold text-xl mb-2" style={{ color: primaryColor }}>
              {q.courseName}
            </h3>
            <p className="text-sm mb-1" style={{ color: paragraphColor }}>
              <span
                className="font-medium"
                style={{ color: `${primaryColor}90` }}
              >
                Institution: </span> <span style={{ color: primaryColor }}>
                {q.institution}
              </span>
            </p>
            <p className="text-sm mb-2" style={{ color: paragraphColor }}>
              <span
                className="font-medium"
                style={{ color: `${primaryColor}90` }}
              >
                Duration:</span> <span style={{ color: primaryColor }}>
                {q.duration}
              </span>
            </p>
            {q.credential && (
  <a
    href={q.credential}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 mt-2 text-sm font-medium underline decoration-2 underline-offset-4 hover:opacity-80 transition"
    style={{ color: secondaryColor }}
  >
    View Resources 
  </a>
)}


          </div>
        ))}
      </div>
    </div>
  );
};

export default PointsRoadmap;
