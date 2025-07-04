
import { Heading2, Heading4, Text } from "@/components/typography";

const Skills = () => {
  const skillCategories = [
    {
      title: "PROGRAMMING LANGUAGES",
      skills: ["Python", "C", "C++", "JavaScript", "TypeScript", "Java", "HTML/CSS", "Verilog"]
    },
    {
      title: "MACHINE LEARNING & DATA SCIENCE",
      skills: ["TensorFlow", "scikit-learn", "LangChain", "pandas", "numpy", "Matplotlib"]
    },
    {
      title: "FRONTEND & BACKEND DEV",
      skills: ["React.js", "Next.js", "Tailwind", "React Router", "PyQT6"]
    },
    {
      title: "EMBEDDED SYSTEMS & IOT",
      skills: ["Arduino", "Arduino Cloud", "MQTT", "Vivado"]
    },
    {
      title: "DEVOPS",
      skills: ["Git", "GitHub", "Microsoft Azure", "Vercel"]
    },
    {
      title: "LANGUAGES & OTHERS",
      skills: ["English", "Chinese", "Spanish", "Electric Bass", "Taekwondo", "Basketball"]
    }
  ];

  return (
    <section className="pb-8">
      <div className="md:mb-10 mb-6">
        <Heading2 className="mb-4">Technical Skills</Heading2>
        <div className="h-1 w-full rounded bg-primary"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="bg-foreground rounded-lg md:rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Heading4 className="mb-2 md:mb-4 text-stone-200">{category.title}</Heading4>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill, idx) => (
                <Text 
                  key={idx} 
                  className="inline-block bg-primary px-2 py-1 md:px-3 md:py-2 rounded-md md:rounded-lg text-stone-700 text-lg font-semibold hover:bg-stone-200 transition-colors duration-200"
                >
                  {skill}
                </Text>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
