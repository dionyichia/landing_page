"use client"

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BriefcaseBusiness, GraduationCap, Tent, Sword, HeartHandshake } from 'lucide-react';
import { Heading2, Heading3, Paragraph, Text } from "@/components/typography";

const Lifeline = () => {
  // Array of timeline events in chronological order (newest first)
  const timelineEvents = [
    {
      title: "Nanyang Technological University",
      subtitle: "Renaissance Engineering Program (REP), Singapore",
      period: "Aug 21' - Present",
      role: "Computer Engineering Scholar",
      description: [
        "Pursuing a Bachelor's in Computer Science & a Master's in Technology Management"
      ],
      icon: GraduationCap,
    },
    {
      title: "DSO National Laboratories",
      subtitle: "Singapore",
      period: "May 23' - August 23'",
      role: "Software Engineer",
      description: [
        "Benchmarked different clustering algorithms and optimized implementation for edge processing purposes"
      ],
      icon: BriefcaseBusiness,
    },
    {
      title: "Renaissance Engineers Are Caring Humans (REACH)",
      subtitle: "NTU, Singapore",
      period: "August 24' - August 25'",
      role: "President",
      description: [
        "Kickstarted 7 different engineering-based and 2 other community-based volunteering projects",
        "Created a pre-assessment visual field testing booth for glaucoma patients, received a $15,000 grant from Tan Tock Seng General Hospital for further development"
      ],
      icon: HeartHandshake,
    },
    {
      title: "Land Transport Authority",
      subtitle: "Singapore",
      period: "June 24' - July 24'",
      role: "Artificial Intelligence Engineer",
      description: [
        "Conducted research on various Deep Learning fields including Computer Vision, Neural Networks, Retrieval Augmented Generation, and Reinforcement Learning",
        "Produced documentation to improve conceptual understanding"
      ],
      icon: BriefcaseBusiness,
    },
    {
      title: "Cosmose",
      subtitle: "Singapore",
      period: "February 23' - April 23'",
      role: "Business Development Intern",
      description: [
        "Developed automation tools for Customer Relations Management processes",
        "Covered end-to-end B2B sales in a fast-growing tech startup"
      ],
      icon: BriefcaseBusiness,
    },
    {
      title: "5th Singapore Infantry Regiment",
      subtitle: "Singapore",
      period: "January 21' - November 22'",
      role: "Motorised Support Platoon Commander",
      description: [
        "Oversaw the operation of a platoon of 20 soldiers and 22 armored vehicles",
        "Planned and prepared 1 of 5 Army Static Heartland Sites across Singapore for National Day 2022"
      ],      
      icon: Sword,
    },
    {
      title: "Outdoors Adventure Club, ASRJC",
      subtitle: "Singapore",
      period: "February 19' - April 20'",
      role: "Vice-President",
      description: [
        "Taught pioneering skills and managed a team of 30",
        "Led an internationalization trip to rural Vietnam, planned hikes, activities, and the refurbishment of a local kindergarten"
      ],
      icon: Tent,
    },
    {
      title: "Anderson Serangoon Junior College (ASRJC)",
      subtitle: "Singapore",
      period: "February 19' - December 20'",
      role: "Student",
      description: [
        "Completed pre-university education (A-Levels)"
      ],
      icon: GraduationCap,
    },
    {
      title: "Early Education Years",
      subtitle: "Singapore",
      period: "07' - 18'",
      role: "",
      description: [
        "Mayflower Secondary School",
        "Member of the basketball team for 8 years"
      ],
      icon: GraduationCap,
    }
  ];

  const [visibleItems, setVisibleItems] = useState(new Set());
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Transform scroll progress to line height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Intersection Observer for individual items
  useEffect(() => {
    const observers = [];
    const items = containerRef.current?.querySelectorAll('[data-timeline-item]');
    
    if (items) {
      items.forEach((item, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => new Set([...prev, index]));
            }
          },
          { 
            threshold: 0.3,
            rootMargin: "-10% 0px -10% 0px"
          }
        );
        observer.observe(item);
        observers.push(observer);
      });
    }

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { 
      scale: 0,
      rotate: -180
    },
    visible: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        ease: "backOut",
        delay: 0.2
      }
    }
  };

  return (
    <section className="py-8 md:py-16 w-full">
        {/* Header */}
        <div className="mb-8 md:mb-16">
          <Heading2 className="text-left text-stone-800 mb-4">
            My Journey
          </Heading2>
          <div className="w-full h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone-200 hidden md:block">
            <motion.div
              className="w-full bg-gradient-to-b from-stone-600 to-stone-800 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-8 md:space-y-16">
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              const isVisible = visibleItems.has(index);

              return (
                <motion.div
                  key={index}
                  data-timeline-item
                  className="relative flex items-start gap-4 md:gap-12"
                  variants={itemVariants}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                >
                  {/* Timeline Point with Icon, Show only on  md size screens and above */}
                  <motion.div
                    className="relative z-10 flex-shrink-0 hidden md:block"
                    variants={iconVariants}
                    initial="hidden" 
                    animate={isVisible ? "visible" : "hidden"}
                  >
                    <div className="w-16 h-16 bg-white border-4 border-stone-600 rounded-full flex items-center justify-center shadow-lg">
                      <IconComponent className="w-7 h-7 text-stone-700" />
                    </div>
                  </motion.div>

                  {/* Content Card */}
                  <div className="flex-grow min-w-0">
                    <div className="bg-white rounded-xl md:p-6 hover:shadow-md transition-all duration-300 hover:border-stone-200">
                      {/* Title and Date */}
                      <div className="flex flex-row no-wrap justify-between">
                         <Heading3 className="font-bold text-stone-800 md:mb-2">
                          {event.title}
                        </Heading3>
                        <Text className="inline-block no-wrap">
                          {event.period}
                        </Text>
                      </div>
                    
                      {/* Role Badge */}
                      {event.role && (
                        <Paragraph className="inline-block text-sm font-medium rounded-full md:mb-2">
                          {event.role}
                        </Paragraph>
                      )}

                      {/* Description */}
                      <ul className="space-y-2">
                        {event.description.map((item, idx) => (
                          <li key={idx} className="flex items-start justify-items-start gap-3 text-stone-700 leading-relaxed">
                            <div className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2.5 flex-shrink-0"></div>
                            <Text>{item}</Text>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
    </section>
  );
};

export default Lifeline;