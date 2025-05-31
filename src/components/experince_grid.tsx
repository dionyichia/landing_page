import { ExperienceData } from "@/sections/Experience";
import { Heading4, Paragraph, Text } from "./typography";
import Image from "next/image";

interface ExperienceGridProps {
  experience: ExperienceData;
}

const ExperienceGrid = ({ experience }: ExperienceGridProps) => {
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-6 bg-white rounded-lg px-6 transition-shadow duration-300">
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
            <div className="order-3 md:col-start-1 md:col-end-2 md:ow-start-2 md:row-end-3">
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

        {/* Image placeholder - you can replace this with actual image */}
        <div className="order-2 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2">
        {experience.img && (
            <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                <div className="text-sm text-gray-400">Project Image</div>
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