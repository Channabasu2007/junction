import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { showSuccess, showError, showInfo } from '@/helpers/ToastManager';
import { reloadPreview } from "@/components/DesignedPages/MobilePreview"

const Education = ({ user }) => {
  const [firstRun, setFirstRun] = useState(true);
  const email = user.email
  const [showEducation, setShowEducation] = useState(user?.showEducation || true);

  const [primarySchool, setPrimarySchool] = useState({
    school: user?.primarySchool?.school || "",
    year: user?.primarySchool?.year || "",
    board: user?.primarySchool?.board || "",
  });

  const [secondarySchool, setSecondarySchool] = useState({
    school: user?.secondarySchool?.school || "",
    year: user?.secondarySchool?.year || "",
    board: user?.secondarySchool?.board || "",
    percentage: user?.secondarySchool?.percentage || "",
  });

  const [highSchool, setHighSchool] = useState({
    school: user?.highSchool?.school || "",
    board: user?.highSchool?.board || "",
    year: user?.highSchool?.year || "",
    percentage: user?.highSchool?.percentage || "",
    stream: user?.highSchool?.stream || "",
  });

  const [college, setCollege] = useState({
    collegeName: user?.college?.collegeName || "",
    year: user?.college?.year || "",
    degree: user?.college?.degree || "",
    percentage: user?.college?.percentage || "",
    field: user?.college?.field || "",
  });

  const [qualifications, setQualifications] = useState(
    Array.isArray(user.qualifications) && user.qualifications.length > 0
      ? user.qualifications
      : [
        {
          courseName: "",
          institution: "",
          duration: "",
          credential: "",
        },
      ]
  );


  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      return;
    }

    debouncedSave({
      primarySchool,
      secondarySchool,
      highSchool,
      college,
      qualifications,
      showEducation,
      email
    })
  }, [primarySchool, secondarySchool, highSchool, college, qualifications, showEducation]);

  const saveData = async (data) => {
    const res = await fetch('/api/DashboardDataChange/EducationalInfo', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      showError("Something went wrong while saving the data please try again later.")
    }
    reloadPreview()
  }

  const debouncedSave = useCallback(
    debounce(saveData, 1500),
    [] // The empty dependency array ensures this function is only created once
  );

  const handleQualificationChange = (index, field, value) => {
    const updated = [...qualifications];
    updated[index][field] = value;
    setQualifications(updated);
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      { courseName: "", institution: "", duration: "", credential: "" },
    ]);
  };

  const removeQualification = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  function debounce(func, delay) {
    let timeoutId; // This variable will hold the ID of the setTimeout

    return function (...args) {
      // Clear any existing timeout to reset the timer
      clearTimeout(timeoutId);

      // Set a new timeout
      timeoutId = setTimeout(() => {
        // Execute the original function with the correct 'this' context and arguments
        func.apply(this, args);
      }, delay);
    };
  }

  return (
    <div className="w-[90%] mx-auto py-6 mt-2 space-y-8 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold text-orange-600">Educational Information</h1>

      {/* Toggle */}
      <div className="flex items-center gap-3 text-lg">
        <Checkbox
          checked={showEducation}
          onCheckedChange={(checked) => setShowEducation(checked)}
        />
        <Label>I want to show my educational information</Label>
      </div>

      {showEducation && (
        <>
          {/* Primary School */}
          <div className="p-5 border rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-orange-500">Primary / Middle School</h2>
            <Input
              value={primarySchool.school}
              onChange={(e) => setPrimarySchool({ ...primarySchool, school: e.target.value })}
              placeholder="School Name"
              className="w-full"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                value={primarySchool.board}
                onChange={(e) => setPrimarySchool({ ...primarySchool, board: e.target.value })}
                placeholder="Board / Curriculum"
              />
              <Input
                value={primarySchool.year}
                onChange={(e) => setPrimarySchool({ ...primarySchool, year: e.target.value })}
                placeholder="Years Attended"
              />
            </div>
          </div>

          {/* Secondary School */}
          <div className="p-5 border rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-orange-500">Secondary (10th)</h2>
            <Input
              value={secondarySchool.school}
              onChange={(e) => setSecondarySchool({ ...secondarySchool, school: e.target.value })}
              placeholder="School Name"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Input
                value={secondarySchool.board}
                onChange={(e) => setSecondarySchool({ ...secondarySchool, board: e.target.value })}
                placeholder="Board"
              />
              <Input
                value={secondarySchool.year}
                onChange={(e) => setSecondarySchool({ ...secondarySchool, year: e.target.value })}
                placeholder="Year of Completion"
              />
              <Input
                value={secondarySchool.percentage}
                onChange={(e) => setSecondarySchool({ ...secondarySchool, percentage: e.target.value })}
                placeholder="Percentage / Grade"
              />
            </div>
          </div>

          {/* High School */}
          <div className="p-5 border rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-orange-500">Higher Secondary (12th)</h2>
            <Input
              value={highSchool.school}
              onChange={(e) => setHighSchool({ ...highSchool, school: e.target.value })}
              placeholder="School / College Name"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Input
                value={highSchool.board}
                onChange={(e) => setHighSchool({ ...highSchool, board: e.target.value })}
                placeholder="Board"
              />
              <Input
                value={highSchool.stream}
                onChange={(e) => setHighSchool({ ...highSchool, stream: e.target.value })}
                placeholder="Stream"
              />
              <Input
                value={highSchool.percentage}
                onChange={(e) => setHighSchool({ ...highSchool, percentage: e.target.value })}
                placeholder="Percentage / Grade"
              />
              <Input
                value={highSchool.year}
                onChange={(e) => setHighSchool({ ...highSchool, year: e.target.value })}
                placeholder="Year of Completion"
              />
            </div>
          </div>

          {/* College */}
          <div className="p-5 border rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-orange-500">Degree / Diploma</h2>
            <Input
              value={college.collegeName}
              onChange={(e) => setCollege({ ...college, collegeName: e.target.value })}
              placeholder="Institution Name"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Input
                value={college.degree}
                onChange={(e) => setCollege({ ...college, degree: e.target.value })}
                placeholder="Degree / Program Name"
              />
              <Input
                value={college.field}
                onChange={(e) => setCollege({ ...college, field: e.target.value })}
                placeholder="Field of Study"
              />
              <Input
                value={college.percentage}
                onChange={(e) => setCollege({ ...college, percentage: e.target.value })}
                placeholder="CGPA / Grade"
              />
              <Input
                value={college.year}
                onChange={(e) => setCollege({ ...college, year: e.target.value })}
                placeholder="Start & End Year"
              />
            </div>
          </div>

          {/* Other Qualifications */}
          <div className="p-5 border rounded-xl shadow-sm space-y-6 mb-20">
            <h2 className="text-xl font-semibold text-orange-500">
              Other Qualifications
            </h2>
            {qualifications.map((q, index) => (
              <div key={index} className="space-y-3 p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={q.courseName}
                    onChange={(e) => handleQualificationChange(index, "courseName", e.target.value)}
                    placeholder="Course Name"
                  />
                  <Input
                    value={q.institution}
                    onChange={(e) => handleQualificationChange(index, "institution", e.target.value)}
                    placeholder="Institution / Platform"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    value={q.duration}
                    onChange={(e) => handleQualificationChange(index, "duration", e.target.value)}
                    placeholder="Duration (Start & End Dates)"
                  />
                  <Input
                    value={q.credential}
                    onChange={(e) => handleQualificationChange(index, "credential", e.target.value)}
                    placeholder="Credential Link / Certificate No."
                  />
                </div>
                {qualifications.length > 1 && (
                  <Button variant="destructive" onClick={() => removeQualification(index)}>
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button variant="secondary" onClick={addQualification}>
              + Add Another Qualification
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Education;
