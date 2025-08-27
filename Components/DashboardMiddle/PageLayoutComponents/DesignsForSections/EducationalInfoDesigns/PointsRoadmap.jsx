import React from "react";

const PointsRoadmap = ({ user }) => {
  const primarySchool = user?.primarySchool;
  const secondarySchool = user?.secondarySchool;
  const highSchool = user?.highSchool;
  const college = user?.college;
  const qualifications = user?.qualifications;
  
  return (
    <>
      <h1>Educational Deatails</h1>
    </>
  );
};

export default PointsRoadmap;
