import { Heading2, Paragraph } from '../components/typography';
import ContactForm from '@/components/contact_stuff/contact_form';

import form_img from "@/assets/about_img.jpg"
import Image from 'next/image';

const Contact = () => {
  return (
    <section className="py-8 md:py-16 w-full bg-white" id="contact">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 w-full">
          <Heading2 className="mb-4 text-stone-800 text-left">
            Contact
          </Heading2>
          <div className="h-1 w-full bg-gray-300 rounded"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start px-4 sm:px-6 lg:px-8">
          
          {/* Left Column - Contact Form */}
          <div className="order-2 lg:order-1">
            <div className="mb-8">
              <Paragraph className="text-lg text-stone-700 leading-relaxed">
                Let&apos;s connect and discuss how we can work together. I&apos;d love to hear from you.
              </Paragraph>
            </div>
            <ContactForm/>
          </div>

          {/* Right Column - Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              {/* Image Container */}
              <div className="relative w-full max-w-md mx-auto lg:max-w-none">
                <div className="aspect-square relative overflow-hidden rounded-2xl shadow-2xl">
                  <Image 
                    src={form_img} 
                    alt="Professional headshot" 
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 40vw"
                    priority
                  />
                </div>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;