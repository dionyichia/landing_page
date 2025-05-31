import { NextRequest, NextResponse } from "next/server"

import { render } from "@react-email/components"

import { transporter, smtpEmail, smtpPassword } from "@/utils/nodemailer"

import { Email } from "@/components/contact_stuff/email";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        const emailHtml = await render(
            <Email name={name} email={email} message={message} />
        );
        
        const options = {
            from: smtpEmail,
            to: smtpEmail,
            subject: subject,
            html: emailHtml,
        };

        await transporter.sendMail(options);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.log("Failed to send email: ", error)
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
};
