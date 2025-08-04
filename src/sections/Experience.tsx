"use client"

import GridSlider from "@/components/experince_grid_slider";
import { Heading2} from "@/components/typography";

import dso_logo from "@/assets/dso_logo.svg";
import lta_logo from "@/assets/lta_no_bg.png";
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

import hnr_logo from "@/assets/hnr_logo.svg"

import ttsh from "@/assets/tan-tock-seng-hospital.svg"

import rep_logo from "@/assets/rep_logo_no_bg.svg"

import oop from "@/assets/2002.jpg"

import { StaticImageData } from "next/image"


export interface ExperienceData {
  title: string;
  org: string;
  period: string;
  logo?: StaticImageData| null;
  skills: string[];
  img?: StaticImageData[]| null;
  description: string[];
  code?: string| null;
  site?: string| null;
  video?: string| null;
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
        "Optimised clustering algorithms for gpu acceleration, improving clustering efficiency by 80%",
        "Developed in an offline Linux environment."
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
        "Researched on five different fields of Artificial Intelligence: ANNs, CNNs, Generative AI, Retrieval Augmented Generation, Reinforcement Learning.",
        ""
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
        "Developed tools such as an automated mailing and reminder system, to automate Customer-Relations Management processes, reducing manual outreach workload by 30%.",
        "Generated over 50 leads and sucessfully closed 3 partners, through various outreach programmes and B2B sales."
      ],
      code: "",
      site: "",
      video: "",
    },
  ];

  const projectsAndCompetitions: ExperienceData[] = [
    {
      title: "EyeTracker - Visual Field Analyser",
      org: "Tan Tock Seng General Hospital",
      period: "May 2025 - August 2025",
      logo: ttsh,
      skills: ["Computer Vision", "Python", "C", "PyQT6", "Arduino", "Serial"],
      img: [],
      description: [
        "Created pre-assessment tutorial booth to better prepare patients for the Humphrey Visual Field test.",
        "Pythonic computer vision system with manual image processing, integrated with an arduino and other hardware modules (e.g. Pan-tilt servo system, lasers, buzzers etc.)",
      ],
      code: "https://github.com/dionyichia/visual_field_test",
      site: "",
      video: "",
    },
    {
      title: "Inflatacare",
      org: "Renaissance Engineering Program (REP), Singapore",
      period: "August 2024 - April 2025",
      logo: rep_logo,
      skills: ["Node.js", "Vite", "MQTT", "Arduino Cloud", "Javascript", "Hardware - Software Integration"],
      img: [infl, infl_home, infl_post],
      description: [
        "A comprehensive smart inflation device designed to assist everyday movement (e.g. sitting upright) and to combat bedsores amongst elderly patients.",
        "By monitoring pressure points and providing automated inflation controls, the system helps prevent pressure ulcers that develop from prolonged periods in the same position",
        "Interfaced with webapp connected to Arduino Cloud Server to visualize pressure data in real-time and allows caregivers or patients to control inflation settings to redistribute pressure as needed."
      ],
      code: "https://github.com/dionyichia/Inflatacare",
      site: "",
      video: "",
    },
    {
      title: "Automated PowerPoint Generator",
      org: "DSO Hackathon",
      period: "July 2025",
      logo: null,
      skills: ["Azure Services", "Streamlit", "Uvicorn", "FastAPI ", "PymuPDF", "python-pptx"],
      img: [],
      description: [
        "A slide generation tool that creates tailored PowerPoint presentations from your documents, templates and preferences.",
        ""
      ],
      code: "https://github.com/dionyichia/finder",
      site: "",
      video: "https://www.youtube.com/watch?v=YT9dohAY-Kk",
    },
    {
      title: "Finder",
      org: "Corrective-Retreival Augmented Generation for Student Notes",
      period: "November 2024 - December 2024",
      logo: null,
      skills: ["Langchain", "Docker", "Marker (PDF Parsing)", "Ollama", "Milvus", "Flask", "WebSockets", "Semantic Chunking", "Merged Rank Retrieval"],
      img: [finder_img, rag_archi],
      description: [
        "A tool to help students search through their documents and notes easily. Simply upload all notes and relevant documents and query the chatbot to get line-specific replies.",
        "An adpative RAG solution integrated with a Flask frontend, using Langgraph for agentic behaviour. Web-search is also available."
      ],
      code: "https://github.com/dionyichia/finder",
      site: "",
      video: "https://www.youtube.com/watch?v=YT9dohAY-Kk",
    },
    {
      title: "MindScope",
      org: "A mutimodal mental health classifier for early student mental disorder detection",
      period: "March 2025 - April 2025",
      logo: null,
      skills: ["Next.js", "Tailwind CSS", "Typescript"],
      img: [mindscope],
      description: [
        "A early-stage predictor of depression and severe anxiety in university students.",
        "A multimodal approach, applying various machine learning techniques to build a balanced tool that takes input from various mediums. (e.g. multiple choice answers, short essays about their day)",
        "Combination of a fine-tuned llama-3.1 model for sentiment analysis, a ANN trained for depression classification, and a Support Vector Machine for anxiety classification."
      ],
      code: "https://github.com/dionyichia/MindScope",
      site: "https://huggingface.co/fiendfrye/mental-status-classifier-lama-3.1-8b-fine-tuned",
      video: "https://www.youtube.com/watch?v=GDiBVJ74Snk",
    },
    {
      title: "HomeFinder",
      org: "Software Engineering Module Final Project",
      period: "Jan 2025 - April 2025",
      logo: dso_logo,
      skills: ["React", "Typescript", "React Router", "Flask", "SQLite", "Python", "Object Oriented Programming"],
      img: [hf_explore, hf_compare, hf_exp_loc, hf_logo],
      description: [
        "A tool designed to help prospective homebuyers in Singapore find their ideal neighborhood based on personalized preferences and real-time data",
        "Reccomends unqiue top 5 neighbourhoods for each user based on their ranked preferences (e.g. security, mobility, num schools) and budget.",
        "Centralises crucial livability metrics, such as number of malls, schools, transport options and even police stations, and enables side-by-side neighbourhood comparison.",
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
      period: "Feburary 2025",
      logo: hnr_logo,
      skills: [],
      img: [],
      description: [
        "Have you ever noticed how it is always so difficult to get quality swipes on dating platforms? Well, as a 5'7 average looking male - I have :( BUT LOOK NO FURTHER, for the change is now!"
      ],
      code: "",
      site: "",
      video: "",
    },
    {
      title: "Hospital Inventory Management System",
      org: "Software Engineering Module Final Project",
      period: "September 2024 - October 2024",
      logo: null,
      skills: ["Java", "Object Oriented Programming", "SOLID Principles"],
      img: [oop],
      description: [
        "Hospital Mangement System developed using foundational Object-Oriented Programming Principles.",
        "Enable role-limited functions such as account creation, patient registration, appointement management, billing and payment, mediciation dispensing, and stock management",
        "Created class diagrams as part of good software development practice.",
        "Used Git & Github for version control & collaboration."
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
          <Heading2 className="mb-2 flex justify-center">Work Experience</Heading2>
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