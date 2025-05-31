"use client"
import { useState, useEffect } from 'react';

import { ExperienceData } from "@/sections/Experience";
import { Heading4, Paragraph, Text } from "./typography";
import Image from "next/image";

interface ExperienceGridProps {
  experience: ExperienceData;
}

const ExperienceGrid = ({ experience }: ExperienceGridProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-slide effect (every 5 seconds)
    useEffect(() => {
        if (!experience.img || experience.img.length <= 1) return;

        const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
            prev === experience.img.length - 1 ? 0 : prev + 1
        );
        }, 5000);

        return () => clearInterval(interval);
    }, [experience.img]);

    return (
        <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-[auto_250px] gap-4 md:gap-6 bg-white rounded-lg transition-shadow duration-300">
            {/* Header Section */}
            <div className="order-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 flex items-start justify-between">
                <div className="flex-1">
                    <Heading4 className="text-xl font-bold text-gray-900 mb-1">
                        {experience.title}
                    </Heading4>
                    <Text className="text-stone-600 font-medium">
                        {experience.org}
                    </Text>
                    <Text className="text-gray-500 font-medium">
                        {experience.period}
                    </Text>
                </div>

                {/* Logo placeholder */}
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center ml-2 md:ml-4 relative overflow-hidden">
                <Image
                    src={experience.logo}
                    alt="Company Logo"
                    fill 
                    className="object-contain"
                />
                </div>

            </div>

            {/* Skills Section */}
            {experience.skills && experience.skills.length > 0 && (
                <div className="order-3 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
                <Paragraph className="text-gray-600 font-bold">Relevant Skills and Technologies</Paragraph>
                <div className="flex flex-wrap gap-1 md:gap-2">
                    {experience.skills.map((skill, index) => (
                    <Text
                        key={index}
                        className="px-2 py-1 md:px-4 md:py-2 bg-stone-100 text-stone-800 font-medium rounded-md flex items-center"
                    >
                        {skill}
                    </Text>
                    ))}
                </div>
                </div>
            )}

            {/* Image Slider Section */}
            <div className="order-2 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3">
            {experience.img && experience.img.length > 0 && (
                <div className="h-48 md:h-full bg-gray-100 rounded-lg border border-gray-200 overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow duration-300">
                    <Image
                        src={experience.img[currentImageIndex]}
                        alt={`Exp image ${currentImageIndex + 1}`}
                        fill
                        className="transition-opacity duration-500"
                        sizes="(max-width: 768px) 100vw, 75vw"
                        priority={currentImageIndex === 0}
                        onError={(e) => {
                            console.error('Image failed to load:', experience.img[currentImageIndex]);
                            // Optional: Set a fallback image
                            // e.currentTarget.src = '/fallback-image.jpg';
                        }}
                    />
                
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                        </div>
                    </div>
                
                    {/* Dots indicator */}
                    {experience.img.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
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
                </div>
            )}
            </div>

            {/* Description Section */}
            <div className="order-4 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3">
            <Paragraph className="text-gray-600 font-bold">Description</Paragraph>
            <ul className="space-y-2">
                {experience.description.map((desc, index) => (
                <Text key={index}>
                    {desc}
                </Text>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default ExperienceGrid;