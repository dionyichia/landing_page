import { Heading2, Paragraph } from "@/components/typography";
import about_img from "@/assets/about_img.jpg"
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="">
      {/* Heading with extended line */}
      <div className="md:mb-16 mb-8">
        <Heading2 className="mb-2">About Me</Heading2>
        <div className="h-1 w-full bg-gray-300 rounded"></div>
      </div>
      
      {/* Content container */}
      <div className="flex flex-col md:flex-row gap-16 items-center md:items-start md:px-8">
        {/* Text content - takes 3/5 on desktop */}
        <div className="order-2 w-full md:w-3/5 md:order-1">
          <Paragraph>
            As a passionate software developer with over 8 years of experience, I specialize in building 
            modern web applications using React, Next.js, and TypeScript. My approach combines technical 
            expertise with creative problem-solving to deliver exceptional user experiences. Throughout 
            my career, I've collaborated with cross-functional teams to bring innovative solutions to 
            complex challenges. 
          </Paragraph>
          <Paragraph>
            When I'm not coding, you can find me exploring new technologies, 
            contributing to open-source projects, or mentoring aspiring developers. I'm driven by the 
            belief that thoughtful design and clean code can make a meaningful impact on how people 
            interact with technology.
          </Paragraph>
        </div>
        
        {/* Image - takes 2/5 on desktop */}
        <div className="md:w-2/5 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative h-32 w-52 md:w-full md:h-auto md:aspect-square">
            <Image 
              src={about_img} 
              alt="Professional headshot" 
              fill
              className="object-cover rounded-lg shadow-lg"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;