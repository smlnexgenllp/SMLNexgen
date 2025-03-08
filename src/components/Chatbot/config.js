import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./Options";
import AppointmentForm from "./AppointmentForm";

const config = {
  botName: "SMLBot",
  initialMessages: [
    createChatBotMessage("Hello! Welcome to SMLNEXGEN LLP. How can I assist you today?", {
      widget: "options",
    }),
  ],
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props) => <Options {...props} />,
      props: {
        options: [
          { label: "Web Development", action: "handleWebDevelopment" },
          { label: "App Development", action: "handleAppDevelopment" },
          { label: "Custom Software", action: "handleCustomSoftwareDevelopment" },
          { label: "About Us", action: "handleAbout" },
          { label: "Support", action: "handleSupport" },
          { label: "Book an Appointment", action: "handleAppointmentBooking" },
          { label: "FAQ", action: "handleFAQ" }, // FAQ option added
        ],
      },
    },
    {
      widgetName: "appointmentForm",
      widgetFunc: (props) => <AppointmentForm {...props} />,
    },
    {
      widgetName: "faqOptions",
      widgetFunc: (props) => (
        <Options
          {...props}
          options={[
            { label: "What is SMLNEXGEN LLP?", action: "handleFAQResponse", question: "What is SMLNEXGEN LLP?" },
            { label: "How can I book an appointment?", action: "handleFAQResponse", question: "How can I book an appointment?" },
            { label: "What services do you offer?", action: "handleFAQResponse", question: "What services do you offer?" },
            { label: "How can I contact support?", action: "handleFAQResponse", question: "How can I contact support?" },
            { label: "What are your pricing plans?", action: "handleFAQResponse", question: "What are your pricing plans?" },
          ]}
        />
      ),
    },
    
    
  ],
};

export default config;
