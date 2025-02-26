"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQyjXEzfKO-LHHwP0XmeX5YGuzjscD7c0",
  authDomain: "synnertech-8061a.firebaseapp.com",
  projectId: "synnertech-8061a",
  storageBucket: "synnertech-8061a.firebasestorage.app",
  messagingSenderId: "380022922556",
  appId: "1:380022922556:web:8d2c574827e5ec58511239",
  measurementId: "G-P6Y3N10KCY",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const problemStatements = [
  {
    heading: "Auction platform",
    hyperlinkName: "Auction platform",
    link: "https://github.com/CodingNinjasCUIET/RapidCode-Auction.git",
  },
  {
    heading: "Weather Forcast",
    hyperlinkName: "Weather Forcast",
    link: "https://github.com/CodingNinjasCUIET/RapidCode-WeatherForecast.git",
  },
  {
    heading: "Traveling website",
    hyperlinkName: "Traveling website",
    link: "https://github.com/CodingNinjasCUIET/RapidCode-TravelingWebsite.git",
  },
  {
    heading: "Quiz Platfrom",
    hyperlinkName: "Quiz Platfrom",
    link: "https://github.com/CodingNinjasCUIET/RapidCode-Quiz.git",
  },
  {
    heading: "Car Store",
    hyperlinkName: "Car Store",
    link: "https://github.com/CodingNinjasCUIET/RapidCode-CarStore.git",
  },
];

export default function ProblemAllocator() {
  const [teamId, setTeamId] = useState<string | null>("");
  const [allocatedProblem, setAllocatedProblem] = useState<
    (typeof problemStatements)[0] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      if (teamId) {
        const docRef = doc(db, "allocations", teamId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setAllocatedProblem(docSnap.data().problemStatement);
        }
      }
    };
    fetchData();
  }, [teamId]);

  const handleAllocateProblem = async () => {
    if (!teamId) return;
    if (allocatedProblem) return;

    const teamNumber = parseInt(teamId, 10);
    const index = teamNumber % problemStatements.length;
    const fixedProblem = problemStatements[index];
    setAllocatedProblem(fixedProblem);

    try {
      await setDoc(doc(db, "allocations", teamId), {
        problemStatement: fixedProblem,
      });
    } catch (error) {
      console.error("Error saving allocation: ", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamId(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Problem Allocator
        </h1>
        {!allocatedProblem ? (
          <>
            <label
              htmlFor="teamId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Your Team ID:
            </label>
            <input
              id="teamId"
              type="number"
              value={teamId || ""}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 7"
              min="0"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.replace(/[^0-9]/g, "");
              }}
            />
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={handleAllocateProblem}
              disabled={!teamId}
            >
              Allocate Problem
            </button>
          </>
        ) : (
          <div className="text-center border-2 rounded-lg p-4">
            <p className="text-white text-xl">
              {allocatedProblem.heading} -{" "}
              <a
                href={allocatedProblem.link}
                className="text-blue-500 font-medium underline hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
              >
                {allocatedProblem.hyperlinkName}
              </a>
            </p>
            <p className="text-sm text-gray-500">
              (Your problem statement is saved and won't change.)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}