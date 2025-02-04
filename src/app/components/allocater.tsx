"use client";

import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { CardSpotlight } from "@/components/ui/card-spotlight";

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
    heading: "Alumni Networking Platform",
    content:
      "Every expert was once a novice, but not every novice will become an expert. The right mentoring is a unique tool for excelling in a field. As an educational institution, develop a platform to strengthen the alumni-student bond and help newcomers in both professional and personal fields. Recommended Features: Easy connecting features, Categorized approach, Campus life management section, Mental health management.",
    hyperlinkName: "Design Templates",
    link: "https://www.figma.com/design/msZVWACKOitLFvo4nAk71O/SYNER-TECH-Final-templates?node-id=0-1&p=f&t=sF6HaOaC4pGXzLND-0",
    features: [
      "Easy connecting features",
      "Categorized approach",
      "Campus life management section",
      "Mental health management",
    ],
  },
  {
    heading: "Online Education Platform",
    content:
      "Due to post covid effects on study you being an educational institute finds a need to develop an online platform for education delivery aiming to provide an innovative experience to students and track their progress.",
    hyperlinkName: "Design Templates",
    link: "https://www.figma.com/design/msZVWACKOitLFvo4nAk71O/SYNER-TECH-Final-templates?node-id=1-2&p=f&t=sF6HaOaC4pGXzLND-0",
    features: [
      "Interactive elements",
      "Dedicated profile for progress tracking",
      "Calendar-oriented planning",
      "Burden free approach",
    ],
  },
  {
    heading: "Financial Literacy Scale",
    content:
      "Financial literacy is one of the most valuable skills for individuals in every era. The need for a constant monitoring system and timely feedback is key to achieving literacy in any field. As a financial consulting firm, develop a tool encompassing all major aspects.",
    hyperlinkName: "Design Templates",
    link: "https://www.figma.com/design/msZVWACKOitLFvo4nAk71O/SYNER-TECH-Final-templates?node-id=1-480&p=f&t=sF6HaOaC4pGXzLND-0",
    features: [
      "Literacy scale for gauging momentary levels of literacy",
      "Content curation tool",
      "Feedback system for accurate diagnosis and solution of problems",
      "News and industry tracker",
    ],
  },
  {
    heading: "Cloud Gaming Service",
    content:
      "Being an aspiring gamer and restricted by personal computer hardware is one of the worst nightmares. To tackle this problem, develop a cloud gaming service that allows users to run high-end games and manage different game profiles for a better experience.",
    hyperlinkName: "Design Templates",
    link: "https://www.figma.com/design/msZVWACKOitLFvo4nAk71O/SYNER-TECH-Final-templates?node-id=1-481&p=f&t=sF6HaOaC4pGXzLND-0",
    features: [
      "Dedicated game information",
      "Advanced Game Management",
      "Game Recommendations",
      "Game Community",
    ],
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

    const randomProblem =
      problemStatements[Math.floor(Math.random() * problemStatements.length)];
    setAllocatedProblem(randomProblem);

    try {
      await setDoc(doc(db, "allocations", teamId), {
        problemStatement: randomProblem,
      });
    } catch (error) {
      console.error("Error saving allocation: ", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamId(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center  p-4 ">
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
          <CardSpotlight className="text-center">
            <div className="z-[1000]">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Allocated Problem
              </h2>
              <div className="text-white mb-6">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {allocatedProblem.heading}
                </h3>
                <p className="text-base leading-relaxed mb-4">
                  {allocatedProblem.content}
                </p>
                <ul className="list-disc list-inside text-left pl-4 mb-4">
                  {allocatedProblem.features?.map((feature, index) => (
                    <li key={index} className="text-white">
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href={allocatedProblem.link}
                  className="text-blue-500 font-medium underline hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {allocatedProblem.hyperlinkName}
                </a>
              </div>
              <p className="text-sm text-gray-500">
                (Your problem statement is saved and won't change.)
              </p>
            </div>
          </CardSpotlight>
        )}
      </div>
    </div>
  );
}
