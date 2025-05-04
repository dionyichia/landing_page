import { Heading1, Heading2, Paragraph, SmallText } from '../components/typography';

const Contact = () => {
  return (
    <section className="py-12" id="contact">
      <div className="container mx-auto px-4">
        <Heading1 className="text-center mb-8">About Me</Heading1>
        
        <Heading2 className="mb-4">My Background</Heading2>
        <Paragraph className="mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Paragraph>
        
        <SmallText className="italic text-gray-600">
          Based in New York City since 2015
        </SmallText>
      </div>
    </section>
  );
};

export default Contact;