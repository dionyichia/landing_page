"use client"

import React, { useState, useEffect } from "react";

import { validationSchema } from "@/utils/validation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { ToastContainer, toast } from "react-toastify";
import Confetti from "react-confetti";

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
                        className="w-full bg-gray-100 bg-opacity-50 hover:bg-stone-200 rounded border border-gray-300 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500"
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
                        className="w-full bg-gray-100 bg-opacity-50 hover:bg-stone-200 rounded border border-gray-300 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500"
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
                        className="w-full bg-gray-100 bg-opacity-50 hover:bg-stone-200 rounded border border-gray-300 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="subject"
                        component="div"
                        className="text-red-500"
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
                        className="w-full bg-gray-100 bg-opacity-50 hover:bg-stone-200 rounded border border-gray-300 focus:border-stone-500 focus:bg-white focus:ring-2 focus:ring-stone-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    />
                    <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500"
                    />
                    </div>
                </div>
                <div className="p-2 w-full">
                    <button
                    disabled={isLoading}
                    className="flex mx-auto text-white bg-stone-500 border-0 py-2 px-8 focus:outline-none hover:bg-stone-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    >
                    {isLoading ? "Sending..." : "Send Message"}
                    </button>
                </div>
                </div>
            </div>
            </Form>
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
            />
        )}
        </>
    );
}

export default ContactForm;