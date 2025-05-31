import React from "react";

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Tailwind,
  Text,
  Hr,
  Section,
} from "@react-email/components";

interface EmailProps {
  name: string;
  email: string;
  message: string;
}

export const Email: React.FC<Readonly<EmailProps>> = ({
  name,
  email,
  message,
}) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-50 font-sans">
          <Container className="mx-auto my-[40px] max-w-[600px] rounded-lg border border-solid border-gray-200 bg-white shadow-sm">
            {/* Header Section */}
            <Section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-lg px-[32px] py-[24px]">
              <Heading className="mx-0 my-0 text-center text-[20px] font-semibold text-white">
                New Contact Form Submission
              </Heading>
            </Section>

            {/* Content Section */}
            <Section className="px-[32px] py-[24px]">
              <Text className="text-[16px] leading-[24px] text-gray-800 mb-[16px]">
                Hello Dion,
              </Text>
              
              <Text className="text-[14px] leading-[22px] text-gray-600 mb-[24px]">
                You've received a new message through your website's contact form.
              </Text>

              {/* Contact Details */}
              <Section className="bg-gray-50 rounded-lg p-[20px] mb-[20px]">
                <Text className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-[8px] mt-0">
                  Contact Information
                </Text>
                
                <Text className="text-[14px] leading-[20px] text-gray-800 my-[4px]">
                  <strong>Name:</strong> {name}
                </Text>
                
                <Text className="text-[14px] leading-[20px] text-gray-800 my-[4px]">
                  <strong>Email:</strong>{" "}
                  <span className="text-blue-600">{email}</span>
                </Text>
              </Section>

              {/* Message Section */}
              <Section className="mb-[20px]">
                <Text className="text-[12px] font-semibold text-gray-500 uppercase tracking-wide mb-[8px] mt-0">
                  Message
                </Text>
                
                <Section className="bg-white border border-gray-200 rounded-lg p-[16px]">
                  <Text className="text-[14px] leading-[22px] text-gray-800 whitespace-pre-wrap my-0">
                    {message}
                  </Text>
                </Section>
              </Section>

              <Hr className="border-gray-200 my-[20px]" />

              {/* Footer */}
              <Text className="text-[12px] leading-[18px] text-gray-500 text-center mb-0">
                This message was sent from your website contact form.
                <br />
                Please reply directly to {email} to respond.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};