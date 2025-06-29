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

import hf_compare from "@/assets/homefinder/compare.png"
import hf_explore from "@/assets/homefinder/explore.png"
import hf_exp_loc from "@/assets/homefinder/explore_location.png"
import hf_logo from "@/assets/homefinder/hf-high-resolution-logo.png"

import infl from "@/assets/inflatacare/Inflatacare.png"
import infl_home from "@/assets/inflatacare/inflatacare_home.jpg"
import infl_post from "@/assets/inflatacare/poster.png"

import mindscope from "@/assets/MindScope.png"

import rag_archi from "@/assets/rag_archi.png"
import finder_img from "@/assets/finder.png"

import { StaticImageData } from "next/image";


export interface ExperienceData {
  title: string;
  org: string;
  period: string;
  logo: StaticImageData;
  skills: string[];
  img: StaticImageData[];
  description: string[];
  code: string,
  site: string,
  video: string,
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
        "Benchmarked different clustering algorithms and optimized implementation for gpu and vpu accelerated, edge processing purposes."
      ],
      code: "https://github.com/dionyichia/clustering",
      site: "",
      video: "https://www.youtube.com/watch?v=YT9dohAY-Kk",
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
      ],
      code: "",
      site: "",
      video: "",
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
      ],
      code: "",
      site: "",
      video: "",
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
      ],
      code: "https://github.com/dionyichia/visual_field_test",
      site: "",
      video: "",
    },
    {
      title: "Inflatacare",
      org: "Renaissance Engineering Program (REP), Singapore",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Node.js", "Vite", "MQTT", "Arduino Cloud", "Javascript", "Hardware - Software Integration"],
      img: [infl, infl_home, infl_post],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ],
      code: "https://github.com/dionyichia/Inflatacare",
      site: "",
      video: "",
    },
    {
      title: "Finder",
      org: "Corrective-Retreival Augmented Generation for Student Notes",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["Langchain", "Docker", "Marker (PDF Parsing)", "Ollama", "Milvus", "Flask", "WebSockets", "Semantic Chunking", "Merged Rank Retrieval"],
      img: [finder_img, rag_archi],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ],
      code: "https://github.com/dionyichia/finder",
      site: "",
      video: "https://www.youtube.com/watch?v=YT9dohAY-Kk",
    },
    {
      title: "MindScope",
      org: "A mutimodal mental health classifier for early student mental disorder detection",
      period: "May 2025",
      logo: dso_logo,
      skills: ["Next.js", "Tailwind CSS", "Typescript"],
      img: [mindscope],
      description: [
        "Created personal landing page to collate past experiences, projects, and thoughts. Hope you enjoyed my page!"
      ],
      code: "https://github.com/dionyichia/MindScope",
      site: "",
      video: "https://www.youtube.com/watch?v=GDiBVJ74Snk",
    },
    {
      title: "HomeFinder",
      org: "Software Engineering Module Final Project",
      period: "May 2025 - August 2025",
      logo: dso_logo,
      skills: ["React", "Typescript", "React Router", "Flask", "SQLite", "Python", "Object Oriented Programming"],
      img: [hf_explore, hf_compare, hf_exp_loc, hf_logo],
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ],
      code: "https://github.com/dionyichia/home-finder",
      site: "",
      video: "https://www.youtube.com/watch?v=L-36j67G9AU",
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
      ],
      code: "https://github.com/dionyichia/landing_page",
      site: "https://www.dionyichia.com/",
      video: "",
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
      ],
      code: "",
      site: "",
      video: "",
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
      ],
      code: "https://github.com/keechongwei/SC2002",
      site: "",
      video: "",
    },
  ];

  return (
    <div id="experience" className="py-8 md:py-16 mx-auto w-full flex flex-col no-wrap justify-stretch">
      {/* Heading with extended line */}
      <div className="mb-12">
        <Heading2 className="mb-4">Experience</Heading2>
        <div className="h-1 w-full bg-primary rounded"></div>
      </div>

      <div className="flex flex-col gap-y-16">
        {/* Work Experience Section */}
        <div className="flex flex-col flex-nowrap items-stretch px-0 md:px-2 lg:px-4">
          <Heading2 className="mb-2 flex justify-center text-2xl">Work Experience</Heading2>
          <GridSlider experiences={workExperience} />
        </div>

        {/* Projects & Competitions Section */}
        <div className="flex flex-col flex-nowrap items-stretch px-0 md:px-2 lg:px-4"> 
          <Heading2 className="mb-2 text-2xl text-center">Projects & Competitions</Heading2>
          <GridSlider experiences={projectsAndCompetitions} />
        </div>
      </div>
    </div>
  );
};

export default Experience;