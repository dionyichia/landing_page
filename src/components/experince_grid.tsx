"use client"
import { useState, useEffect } from 'react';

import { ExperienceData } from "@/sections/Experience";
import { Heading3, Heading4, AccentText, SmallText } from "./typography";
import Image from "next/image";

import Link from 'next/link';

import { CodeXml, Video, Globe } from 'lucide-react'

interface ExperienceGridProps {
  experience: ExperienceData;
}

const ExperienceGrid = ({ experience }: ExperienceGridProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-slide effect (every 5 seconds)
    useEffect(() => {
        if (!Array.isArray(experience.img) || experience.img.length <= 1) return;

        const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
            prev === experience.img!.length - 1 ? 0 : prev + 1
        );
        }, 5000);

        return () => clearInterval(interval);
    }, [experience.img]);

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto_250px] p-2 md:p-6 gap-4 md:gap-8 rounded-lg transition-shadow duration-300 text-font">
            {/* Header Section */}
            <div className='order-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 flex flex-col items-start flex-nowrap'>
                <div className="w-full flex items-start justify-between">
                    <div className="flex-1">
                        <Heading3 className="font-bold mb-1">
                            {experience.title}
                        </Heading3>
                        <Heading4 className="font-medium">
                            {experience.org}
                        </Heading4>
                        <AccentText className="font-medium">
                            {experience.period}
                        </AccentText>
                    </div>

                    {/* Logo placeholder */}
                    <div className="md:w-20 md:h-20 rounded-lg flex items-center justify-center ml-2 md:ml-4 relative overflow-hidden">
                    {experience.logo && <Image
                        src={experience.logo}
                        alt="Company Logo"
                        fill 
                        className="object-contain"
                    />}
                    </div>
                </div>

                {/* Link Section - Conditional Icons */}
                <div className='flex items-center gap-2 md:gap-3 pt-6 md:pt-10'>
                    {experience.code && (
                        <Link 
                            href={experience.code}
                            className="group relative p-2 rounded-lg transition-transform group-hover:scale-110 btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <CodeXml 
                                width={20}
                                height={20}
                                className="w-4 h-4 md:w-6 md:h-6"
                            />
                            {/* <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                View Code
                            </span> */}
                        </Link>
                    )}
                    
                    {experience.site && (
                        <Link 
                            href={experience.site}
                            className="group relative p-2 rounded-lg transition-colors group-hover:scale-110 btn "
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Globe 
                                width={20}
                                height={20}
                                className="w-4 h-4 md:w-6 md:h-6"
                            />
                            {/* <span className="absolute -top-8 left-1/2 transform -translate-x-1/2  text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Live Demo
                            </span> */}
                        </Link>
                    )}
                    
                    {experience.video && (
                        <Link 
                            href={experience.video}
                            className="group relative p-2 rounded-lg transition-transform group-hover:scale-110 btn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Video
                                width={20}
                                height={20}
                                className="w-4 h-4 md:w-6 md:h-6"
                            />
                            {/* <span className="absolute -top-8 left-1/2 transform -translate-x-1/ text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                                Watch Video
                            </span> */}
                        </Link>
                    )}
                </div>
            </div>


            {/* Image Slider Section */}
            <div className="order-2 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3">
            {experience.img && experience.img.length > 0 && (

                <>
                <div className="h-48 md:h-full relative cursor-pointer transition-transform ease-in-out duration-300">
                    {/* Image Container with fixed positioning context */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Render all images stacked */}
                        {experience.img.map((imgSrc, index) => (
                            <div
                                key={index}
                                className={`transition-opacity duration-500 ease-in-out overflow-hidden flex items-center justify-center ${
                                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                } ${index !== currentImageIndex ? 'absolute inset-0' : ''}`}
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`Exp image ${index + 1}`}
                                    width={0} 
                                    height={0}
                                    className="w-auto h-auto max-w-full max-h-48 md:max-h-[250px] object-contain rounded-lg shadow-lg hover:shadow-xl"
                                    sizes="(max-width: 768px) 100vw, 75vw"
                                    priority={index === 0}
                                />
                            </div>
                        ))}
                    </div>
                
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center rounded-lg z-10">
                        <div className="opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        </div>
                    </div>
                </div>

                {/* Dots indicator */}
                    {experience.img.length > 1 && (
                        <div className="flex justify-center mt-2 space-x-2">
                            {experience.img.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex ? 'bg-stone-500' : 'bg-stone-200'
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                )}
                </>
            )}
            </div>

            {/* Skills Section */}
            <div className="order-3 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-3 flex flex-col gap-4">
                <div className="bg-primary-foreground dark:bg-foreground p-2 md:p-3 rounded-md">
                <Heading4 className="text-font-secondary pb-2 ">Relevant Skills and Technologies</Heading4>
                <div className="flex flex-wrap gap-1 md:gap-2">
                    {experience.skills.map((skill, index) => (
                    <SmallText
                        key={index}
                        className="px-2 py-1 md:px-4 md:py-2 bg-primary text-font dark:text-background border-accent rounded-md flex items-center"
                    >
                        {skill}
                    </SmallText>
                    ))}
                </div>
                </div>

                {/* Description Section */}
                <div className="">
                <Heading4 className="pb-2">Description</Heading4>
                <ul className="space-y-2">
                    {experience.description.map((desc, index) => (
                    <SmallText className="font-extrabold" key={index}>
                        {desc}
                    </SmallText>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
};

export default ExperienceGrid;