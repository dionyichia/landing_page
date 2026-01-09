"use client"

import React, { useState, useEffect } from "react";

import { validationSchema } from "@/utils/validation";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import Link from "next/link";

type FormValues = {
    name: string,
    email: string,
    subject: string,
    message: string,
};

const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowDimensions, setWindowDimensions] = useState({
        width: 0,
        height: 0
    });

    // Handle window dimensions safely
    useEffect(() => {
        const updateDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Set initial dimensions
        updateDimensions();

        // Add event listener for window resize
        window.addEventListener('resize', updateDimensions);

        // Cleanup
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Auto-hide confetti after 5 seconds
    useEffect(() => {
        if (showConfetti) {
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showConfetti]);

    const handleSubmit = async (
        values: FormValues, 
        {
            setSubmitting,
            resetForm,
        }: {
            setSubmitting: (isSubmitting: boolean) => void,
            resetForm: () => void,
        } 
    ) => {
        setIsLoading(true);
        
        try {
            //Send email using nodemailer through api route
            console.log("trying to send: ", values);

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                //reset form after submit
                resetForm();
                
                //Show success message and confetti
                toast.success("Message sent successfully!");
                setShowConfetti(true);
                console.log("Sent successfully!");
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.log("Message failed to send: ", error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    return (
        <>
        <Formik 
            initialValues={{ name: "", email: "", subject: "", message: "", }}
            validationSchema={toFormikValidationSchema(validationSchema)}
            onSubmit={handleSubmit}
        >
            {({ errors, isValid }: FormikProps<FormValues>) => (
            <Form>
            <div className="mx-auto">
                <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                    <div className="relative">
                    <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        className="font-cormorant w-full text-sm md:text-base bg-white bg-opacity-50 hover:bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="font-cormorant text-red-400 text-sm md:text-base"
                    />
                    </div>
                </div>
                <div className="p-2 w-1/2">
                    <div className="relative">
                    <Field
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        className="w-full font-cormorant text-sm md:text-base bg-white bg-opacity-50 hover:bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 font-cormorant text-sm md:text-base"
                    />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                    <Field
                        type="subject"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        className="w-full font-cormorant text-sm md:text-base bg-white bg-opacity-50 hover:bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="subject"
                        component="div"
                        className="text-red-500 font-cormorant  text-sm md:text-base"
                    />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <div className="relative">
                    <Field
                        id="message"
                        name="message"
                        as="textarea"
                        placeholder="Drop me a message!"
                        className="w-full font-cormorant text-sm md:text-base bg-white bg-opacity-50 hover:bg-gray-200 rounded border border-gray-300 focus:border-gray-500 focus:bg-white focus:ring-2 focus:ring-gray-200 h-32 outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 font-cormorant text-sm md:text-base"
                    />
                    </div>
                </div>
                <div className="p-2 w-full flex flex-row flex-nowrap justify-between">
                    <button
                    disabled={isLoading || !isValid || Object.keys(errors).length > 0}
                    className="
                        btn-primary flex font-cormorant text-sm md:text-base lg:text-lg items-start border-0 py-2 px-2 md:px-8 focus:outline-none rounded 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        hover:bg-accent
                        "
                    type="submit"
                    >
                    {isLoading ? "Sending..." : "Send Message"}
                    </button>
                        <div className="flex items-center gap-2 pr-2 md:hidden">
                            <Link 
                                href="https://github.com/dionyichia" 
                                target="_blank" 
                                rel="noopener noreferrer" >
                                <FaGithub className="w-6 h-6 md:w-8 md:h-8 text-foreground dark:text-font hover:scale-105 hover:text-accent dark:hover:text-accent filter transition-all" />
                            </Link>
                            <Link 
                                href="https://www.linkedin.com/in/dionyichia/" 
                                target="_blank" 
                                rel="noopener noreferrer" >
                                <FaLinkedin className="w-6 h-6 md:w-8 md:h-8 filter text-foreground dark:text-font hover:scale-105 hover:text-accent dark:hover:text-accent transition-all duration-200" />
                            </Link>
                            <Link 
                                href="mailto:dionyichia@gmail.com?subject=Hello from your website&body=Hey Dion,%0D%0A%0D%0AI found your website and wanted to reach out..."
                                target="_blank" 
                                rel="noopener noreferrer" >
                                <FaEnvelope className="w-6 h-6 md:w-8 md:h-8 filter text-foreground dark:text-font hover:scale-105 hover:text-accent dark:hover:text-accent transition-all duration-200" />
                            </Link>
                        </div>
                </div>
                </div>
            </div>
            </Form>
            )}
        </Formik>

        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />

        {/* Confetti */}
        {showConfetti && windowDimensions.width > 0 && (
            <Confetti
                width={windowDimensions.width}
                height={windowDimensions.height}
                recycle={true}
                numberOfPieces={200}
                gravity={0.3}
                style={{ zIndex: 9999, position: 'fixed', top: 0, left: 0 }}
            />
        )}
        </>
    );
}

export default ContactForm;