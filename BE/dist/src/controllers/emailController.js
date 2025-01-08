import { sendEmail } from '../utils/helpersEmail';
export const sendMessage = {
    sendEmail: async (to, subject, text, html) => {
        try {
            await sendEmail(to, subject, text, html);
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Failed to send email");
        }
    },
};
