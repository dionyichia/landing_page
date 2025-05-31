"use client"

import GridSlider from "@/components/experince_grid_slider";
import { Heading2 } from "@/components/typography";

import dso_logo from "@/assets/dso_national_laboratories_logo.jpeg";
import lta_logo from "@/assets/lta_logo.jpeg";
import cosmose_logo from "@/assets/cosmoseai_logo.jpeg";

import nn_img from "@/assets/lta/nn_img.jpg"
import cv_img from "@/assets/lta/cv_img.jpg"
import nlp_img from "@/assets/lta/nlp_img.jpg"
import rnn_img from "@/assets/lta/rnn_img.jpg"
import rl_img from "@/assets/lta/rl_img.jpg"

import { StaticImageData } from "next/image";


export interface ExperienceData {
  title: string;
  org: string;
  period: string;
  logo: StaticImageData;
  skills: string[];
  img: StaticImageData[];
  description: string[];
}

const Experience = () => {
  const workExperience: ExperienceData[] = [
    {
      title:"Software Engineer",
      org: "DSO National Laboratories",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Python", "C++", "HIP Programming", "Linux", "Embedded Systems"],
      img: [nn_img, cv_img, nlp_img, rnn_img, rl_img],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
    {
      title: "Artificial Intelligence Engineer",
      org: "Land Transport Authority",
      period: "June 2024 - July 2024",
      logo: lta_logo,
      skills: ["Retreieval Augmented Generation", "Computer Vision","Reinforcement Learning", "Generative AI"],
      img: [nn_img, cv_img, nlp_img, rnn_img, rl_img],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
    {
      title: "Business Development Intern",
      org: "Cosmose",
      period: "February 2023 - April 2023",
      logo: cosmose_logo,
      skills: ["Javascript", "Google Appscript", "B2B Sales", "Lead Generation"],
      img: [],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
  ];

  const projectsAndCompetitions: ExperienceData[] = [
    {
      title: "EyeTraker - Visual Field Analyser",
      org: "Tan Tock Seng General Hospital",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Computer Vision", "Python", "PyQT6", "Arduino", "Serial"],
      img: [],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
    {
      title: "Inflatacare",
      org: "Renaissance Engineering Program (REP), Singapore",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Node.js", "Vite", "MQTT", "Arduino Cloud", "Javascript", "Hardware - Software Integration"],
      img: [],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
    {
      title: "Finder",
      org: "Corrective-Retreival Augmented Generation for Student Notes",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Langchain", "Docker", "Marker (PDF Parsing)", "Ollama", "Milvus", "Flask", "Jinja2", "WebSockets", "Semantic Chunking", "Merged Rank Retrieval", "Object Oriented Programming", "Python"],
      img: [],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
    {
      title: "MindScope",
      org: "A mutimodal mental health classifier for early student mental disorder detection",
      period: "May 2025",
      logo: dso_logo,
      skills: ["Next.js", "Tailwind CSS", "Typescript"],
      img: [],
      description: [
        "Created personal landing page to collate past experiences, projects, and thoughts. Hope you enjoyed my page!"
      ]
    },
    {
      title: "HomeFinder",
      org: "Software Engineering Module Final Project",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["React", "Typescript", "React Router", "Flask", "SQLite", "Python", "Object Oriented Programming"],
      img: [],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
    {
      title: "Landing Page",
      org: "The page your looking at right now!",
      period: "May 2025",
      logo: dso_logo,
      skills: ["Next.js", "Tailwind CSS", "Typescript"],
      img: [],
      description: [
        "Created personal landing page to collate past experiences, projects, and thoughts. Hope you enjoyed my page!"
      ]
    },
    {
      title: "The Dating Platform",
      org: "NUS HacknRoll Hackfest 2024",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: [],
      img: [],
      description: [
        "Have you ever noticed how it is always so difficult to get swipes on dating platforms as a man? Well, as a 5'8 average looking male - I have :( BUT LOOK NO FURTHER, for the change is now!"
      ]
    },
    {
      title: "Hospital Inventory Management System",
      org: "Software Engineering Module Final Project",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Java", "Object Oriented Programming", "SOLID Principles"],
      img: [],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ]
    },
  ];

  return (
    <div id="experience" className="py-8 md:py-16 mx-auto w-full flex flex-col no-wrap justify-stretch">
      {/* Heading with extended line */}
      <div className="mb-12">
        <Heading2 className="mb-4">Experience</Heading2>
        <div className="h-1 w-full bg-gray-300 rounded"></div>
      </div>

      {/* Work Experience Section */}
      <div className="mb-16 flex flex-col flex-nowrap items-stretch px-0 md:px-8 lg:px-16">
        <Heading2 className="mb-8 flex justify-center text-2xl">Work Experience</Heading2>
        <GridSlider experiences={workExperience} />
      </div>

      {/* Projects & Competitions Section */}
      <div className="flex flex-col flex-nowrap items-stretch px-0 md:px-8 lg:px-16"> 
        <Heading2 className="mb-8 text-2xl text-center">Projects & Competitions</Heading2>
        <GridSlider experiences={projectsAndCompetitions} />
      </div>
    </div>
  );
};

export default Experience;