
import { Heading2, Heading3, Text } from "@/components/typography";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "C", "JavaScript", "TypeScript", "Java", "HTML/CSS", "Verilog"]
    },
    {
      title: "Machine Learning & Data Science",
      skills: ["TensorFlow", "scikit-learn", "LangChain", "pandas", "numpy", "Matplotlib"]
    },
    {
      title: "Frontend & Backend Development",
      skills: ["React.js", "Next.js", "Tailwind", "React Router", "PyQT6"]
    },
    {
      title: "Embedded Systems & IoT",
      skills: ["Arduino", "Arduino Cloud", "MQTT", "Vivado"]
    },
    {
      title: "DevOps",
      skills: ["Git", "GitHub", "Microsoft Azure", "Vercel"]
    },
    {
      title: "Languages & Others",
      skills: ["English", "Chinese", "Spanish", "Electric Bass", "Taekwondo", "Basketball"]
    }
  ];

  return (
    <section className="py-8">
      <Heading2 className="mb-6 text-stone-800">Technical Skills</Heading2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="bg-stone-50 rounded-lg md:rounded-xl p-4 md:p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <Heading3 className="mb-2 md:mb-6 text-stone-700">{category.title}</Heading3>
            <div className="flex flex-wrap gap-4">
              {category.skills.map((skill, idx) => (
                <Text 
                  key={idx} 
                  className="inline-block bg-stone-100 px-2 py-1 md:px-4 md:py-3 rounded-md md:rounded-lg text-stone-700 text-lg font-medium hover:bg-stone-200 transition-colors duration-200"
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
