import { Heading2, Paragraph } from "@/components/typography";
import self_portrait from "@/assets/self-portrait.png"
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="">
      {/* Heading with extended line */}
      <div className="md:mb-10 mb-6">
        {/* <Heading2 className="mb-4">About Me</Heading2> */}
        {/* <div className="h-1 w-full rounded bg-primary"></div> */}
        <div className="mb-4 md:mb-8 flex flex-row flex-nowrap items-center gap-6 md:gap-8">
            <Heading2 className="w-fit flex flex-row text-nowrap">About Me</Heading2>
            <div className="h-0.75 w-full bg-primary rounded"></div>
        </div>
      </div>
      
      {/* Content container */}
      <div className="flex flex-col md:flex-row gap-16 items-center md:items-start pt-4">
        {/* Text content - takes 3/5 on desktop */}
        <div className="order-2 w-full md:w-3/5 md:order-1 flex-col gap-4">
          <Paragraph>
            I&apos;m an aspiring technical strategist specialising in Computer Engineering. 
            I&apos;m passionate about building solutions that impact, and thrive at the intersection of tech, people, and product.
          </Paragraph>
          <Paragraph>
            Currently, I&apos;m Year 3 exchange student at UC Berkeley, specialising in Computer Engineering under NTU&apos;s Renaissance Engineering Programme, an accelerated MSc track in Technology Management.
          </Paragraph>
          <Paragraph>
            Outside of tech, I&apos;m always chasing the next challenge. 
            From representing my school at varsity Taekwondo Competitions, to surfing waves in Portugal, performing live as part of a band, and solo-backpacking, I love pushing myself to explore unfamiliar terrain — physically, creatively, and culturally. 
          </Paragraph>
        </div>
        
        {/* Image - takes 2/5 on desktop */}
        <div className="md:w-2/5 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative w-52 md:w-full h-auto aspect-square">
            <Image 
              src={self_portrait} 
              alt="Professional headshot" 
              fill
              className="object-top object-cover rounded-lg shadow-lg"
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