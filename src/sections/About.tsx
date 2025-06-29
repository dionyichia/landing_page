import { Heading2, Paragraph } from "@/components/typography";
import about_img from "@/assets/about_img.jpg"
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="min-h-screen py-8 md:py-16">
      {/* Heading with extended line */}
      <div className="md:mb-10 mb-6">
        <Heading2 className="mb-4">About Me</Heading2>
        <div className="h-1 w-full rounded bg-primary"></div>
      </div>
      
      {/* Content container */}
      <div className="flex flex-col md:flex-row gap-16 items-center md:items-start md:px-4">
        {/* Text content - takes 3/5 on desktop */}
        <div className="order-2 w-full md:w-3/5 md:order-1 flex-col gap-4">
          <Paragraph>
            I&apos;m an aspiring technical strategist specialising in Computer Engineering. 
            I&apos;m passionate about building solutions that impact, and thrive at the intersection of tech, people, and product. 
            This summer, I&apos;m interning as an Algorithm Engineer at DSO National Laboratories, optimising clustering algorithms used for de-interleaving signals.
          </Paragraph>
          <Paragraph>
            Currently, a Year 3 Computer Engineering student under Nanyang Technological University&apos;s Renaissance Engineering Programme, a scholarship program with an accelerated Master's degree in Tech Management.
          </Paragraph>
          <Paragraph>
            Outside of tech, I&apos;m always chasing the next challenge. 
            From representing my school National Taekwondo Competitions, to surfing waves in Portugal, performing live as part of a band, and solo-backpacking across Europe, I love pushing myself to explore unfamiliar terrain — physically, creatively, and culturally. 
            Now, I&apos;m taking on a new frontier, training for my first Ironman 70.3 Oceanside in Spring 2026!
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