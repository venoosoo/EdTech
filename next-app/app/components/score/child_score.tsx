"use client";
import React, { useEffect, useState } from "react";

interface Grade {
  grade_letter: string;
  grade_number: number;
  time: string;
}

function convertGradeToLetter(gradeNumber: number): string {
  if (gradeNumber < 50) return "F";
  else if (gradeNumber < 60) return "D";
  else if (gradeNumber < 70) return "C";
  else if (gradeNumber < 80) return "B";
  else if (gradeNumber < 90) return "A";
  else return "A+";
}

const ChildScore = () => {
  const [grade, setGrade] = useState<Grade | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      console.error("No id found in localStorage");
      return;
    }

    async function fetchGrade(userId: string) {
      try {
        const res = await fetch("/api/get_grades", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: userId }),
        });

        if (!res.ok) throw new Error("Failed to fetch grade");

        const gradeNumber: number = await res.json();

        const gradeLetter = convertGradeToLetter(gradeNumber);
        const time = new Date().toLocaleString();

        setGrade({
          grade_number: gradeNumber,
          grade_letter: gradeLetter,
          time,
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchGrade(id);
  }, []);

  if (!grade) {
    return <p>Loading grade...</p>;
  }

  return (
    <div className="items-center lg:min-w-[475px] m-5 mt-16">
      <p className="leading-tight text-6xl">
        Keep
        <span className="text-gray-400"> Your</span>
        <br />
        <span>Children&apos;s success</span>
      </p>
      <p className="text-gray-400 mt-12 text-xl">Grinding in education</p>
      <div>
        <p className="text-8xl">
          {grade.grade_letter}, {grade.grade_number}%
        </p>
      </div>
      <p className="mt-10 text-2xl">
        <span className="text-gray-400">Latest update added: </span>
        <span className="font-bold">{grade.time}</span>
      </p>
    </div>
  );
};

export default ChildScore;

