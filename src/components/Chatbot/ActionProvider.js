import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  addMessageToState(message) {
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  }
  handleAppointmentConfirmation({ fullName, email, phoneNumber, dateTime, reason, selectedService }) {
    const message = this.createChatBotMessage(
      `Your appointment has been successfully booked!\n\n` +
      `Name: ${fullName}\n` +
      `Email: ${email}\n` +
      `Phone Number: ${phoneNumber}\n` +
      `Service: ${selectedService}\n` +
      `Preferred Date/Time: ${dateTime}\n` +
      `Reason: ${reason}\n\n` +
      `We will contact you soon. Thank you!`
    );
    this.addMessageToState(message);
  }
  handleFAQ() {
    const message = this.createChatBotMessage(
      "Here are some frequently asked questions. Click on a question to see the answer:",
      {
        widget: "faqOptions",
      }
    );
    this.addMessageToState(message);
  }
  
  handleFAQResponse(question) {
    const faqAnswers = {
      "What is SMLNEXGEN LLP?": "SMLNEXGEN LLP is a leading provider of innovative digital solutions, offering a comprehensive range of services including website development, mobile app creation, custom software development, and strategic digital marketing.",
      "How can I book an appointment?": "Click the 'Book an Appointment' option in the chatbot.",
      "What services do you offer?": "We specialize in Web Development, App Development, Custom Software, and IT Support.",
      "How can I contact support?": "You can email us at support@smlnexgen.com or call +91-94870-84117.",
      "What are your pricing plans?": "Our pricing depends on the project scope. Contact us for a personalized quote.",
    };
  
    const response = faqAnswers[question] || "Sorry, I don't have an answer for that.";
    const message = this.createChatBotMessage(response);
    this.addMessageToState(message);
  }
  
  
  handleHello() {
    const message = this.createChatBotMessage("Hello! How can I assist you today?");
    this.addMessageToState(message);
  }

  handleGoodbye() {
    const message = this.createChatBotMessage("Goodbye! Have a great day. Feel free to reach out anytime. 😊");
    this.addMessageToState(message);
  }

  handleAppointmentBooking() {
    const message = this.createChatBotMessage(
      "Let's get started with booking your appointment! Please provide the following details:",
      { widget: "appointmentForm" } // Custom widget to show the form
    );
    this.addMessageToState(message);
  }

  handleServices() {
    const message = this.createChatBotMessage(
      "We offer Web Development, App Development, Custom Software, and IT Support."
    );
    this.addMessageToState(message);
  }

  handleWebDevelopment() {
    const message = this.createChatBotMessage(
      "We provide frontend, backend, and full-stack web solutions, including React, Next.js, Node.js, and more."
    );
    this.addMessageToState(message);
  }

  handleAppDevelopment() {
    const message = this.createChatBotMessage(
      "We build secure, high-performance mobile and web apps for iOS, Android, and cross-platform solutions."
    );
    this.addMessageToState(message);
  }

  handleCustomSoftwareDevelopment() {
    const message = this.createChatBotMessage(
      "We develop custom software solutions tailored to your business needs, ensuring scalability and efficiency."
    );
    this.addMessageToState(message);
  }

  handleSupport() {
    const message = this.createChatBotMessage(
      "Need help? Contact us at smlnexgenllp@gmail.com or call +91-94870-84117."
    );
    this.addMessageToState(message);
  }

  handleAbout() {
    const message = this.createChatBotMessage(
      "SMLNEXGEN LLP specializes in innovative software solutions, web & app development, and IT support to help businesses grow in the digital age."
    );
    this.addMessageToState(message);
  }

  handleKeywordResponse(keyword) {
    let response = "";

    switch (keyword) {
      case "development":
        response =
          "We specialize in web and app development, offering modern solutions using cutting-edge technologies like React, Next.js, and Node.js.";
        break;

      case "software":
        response =
          "Our software solutions include custom applications, enterprise software, and AI-powered tools to optimize business processes.";
        break;

      case "security":
        response =
          "We ensure top-tier security for your applications with best practices, encryption, and compliance with industry standards.";
        break;

      case "pricing":
        response =
          "Our pricing varies based on project scope and complexity. Contact us for a tailored quote that suits your business needs.";
        break;

      case "support":
        response =
          "We offer 24/7 IT support, troubleshooting, and maintenance to keep your systems running smoothly.";
        break;
      case "projects":
      case "clients":
        response =
          "We've worked on projects like Akashkrish Toyota CRM, Sri Hari Agrotech, and many more. We are soon going to reach 50+ clients.";
        break;
      case "company":
      case "location":
      case "contact":
      case "located":
        response =
          "Our company is located at: 3B 2nd Floor, JPS Tower, Thally Main Road, Hosur, Tamil Nadu, India, 635109. You can contact us at +91-94870-84117.";
        break;
      case "ceo":
      case "chairman":
      case "leader":
      case "founder":
      case "co-founder":
        response =
          "Our CEO is Sathish V, and our Chairman is Shanmuganathan Logav.";
        break;
      case "team":
        response =
          "We have a team of 25-30 skilled professionals working to deliver high-quality services.";
        break;

      default:
        response =
          "I’m not sure I understand. Here are some topics I can help with: Web Development, App Development, Software, IT Support.";
        break;
    }

    const message = this.createChatBotMessage(response);
    this.addMessageToState(message);
  }

  handleDefault(userMessage) {
    const lowerInput = userMessage.replace(/\s+/g, "").toLowerCase();

    // Check for greetings first
    if (
      lowerInput.includes("hi") ||
      lowerInput.includes("hello") ||
      lowerInput.includes("goodmorning") ||
      lowerInput.includes("goodafternoon") ||
      lowerInput.includes("goodevening")
    ) {
      const message = this.createChatBotMessage("Hello! How can we assist you today?");
      this.addMessageToState(message);
      return;
    }

    // Check for gratitude or farewells
    if (
      lowerInput.includes("thankyou") ||
      lowerInput.includes("thanks") ||
      lowerInput.includes("bye")
    ) {
      const message = this.createChatBotMessage("You're welcome! Have a great day!");
      this.addMessageToState(message);
      return;
    }

    // Service-related keyword detection
    const serviceKeywords = {
      "Web Development": /(webdev|webd|webdevelopment|website|site|webdesign|webservice|web)/,
      "Digital Marketing": /(digitalmarketing|seo|socialmedia|emailmarketing|internetmarketing)/,
      "App Development": /(appdev|mobileapp|android|ios|crossplatform|app)/,
      "Software Development": /(softwaredev|customsoftware|programming|coding|software)/,
      "Business Automation": /(businessautomation|processautomation|workflowautomation|automatebusiness)/,
      "Business Solutions": /(businesssolutions|enterprisesolutions|corporatesolutions|businessstrategy)/,
      "ERP": /(erp|enterpriseresourceplanning)/,
      "AI": /(ai|artificialintelligence)/,
      "MR Monitor": /(mrmonitor|businessmanagement|businessautomationtool)/,
      "IT Services": /(itservices|techservices|informationtechnology)/,
    };

    const responses = {
      "Web Development": "Our web development services include custom websites, e-commerce solutions, and responsive designs to enhance your online presence.",
      "Digital Marketing": "We provide SEO, social media management, and targeted campaigns to help boost your brand’s visibility and reach.",
      "App Development": "From iOS to Android, we build cross-platform and native apps that deliver seamless user experiences.",
      "Software Development": "Our software solutions are designed to streamline business operations with custom development and automation.",
      "Business Automation": "Optimize your workflow with intelligent automation tools that increase efficiency and productivity.",
      "Business Solutions": "We offer strategic enterprise solutions to improve business performance and drive growth.",
      "ERP": "Enhance your resource planning with our customized ERP solutions tailored to your business needs.",
      "AI": "Leverage artificial intelligence for data-driven decision-making and automation.",
      "MR Monitor": "Our MR Monitor tool provides comprehensive business management and automation capabilities.",
      "IT Services": "We offer IT consulting, cloud solutions, and tech support to ensure seamless operations.",
    };

    // Check for service-related keywords
    for (const [service, regex] of Object.entries(serviceKeywords)) {
      if (regex.test(lowerInput)) {
        const message = this.createChatBotMessage(responses[service]);
        this.addMessageToState(message);
        return;
      }
    }

    // General keyword responses
    const keywords = [
      "development",
      "software",
      "security",
      "pricing",
      "support",
      "contact",
      "projects",
      "clients",
      "company",
      "location",
      "located",
      "ceo",
      "chairman",
      "leader",
      "founder",
      "co-founder",
      "team",
    ];
    
    for (const keyword of keywords) {
      if (lowerInput.includes(keyword)) {
        this.handleKeywordResponse(keyword);
        return;
      }
    }

    // Default response if no keyword matches
    const defaultMessage = this.createChatBotMessage(
      "I'm not sure I understand. Can you please provide more details?"
    );
    this.addMessageToState(defaultMessage);
  }
}

export default ActionProvider;

