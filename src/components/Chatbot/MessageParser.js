class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      this.actionProvider.handleHello();
    } else if (lowerCaseMessage.includes("services")) {
      this.actionProvider.handleServices();
    } else if (lowerCaseMessage.includes("web development")) {
      this.actionProvider.handleWebDevelopment();
    } else if (lowerCaseMessage.includes("app development")) {
      this.actionProvider.handleAppDevelopment();
    } else if (lowerCaseMessage.includes("software")) {
      this.actionProvider.handleCustomSoftwareDevelopment();
    } else if (lowerCaseMessage.includes("support") || lowerCaseMessage.includes("help")) {
      this.actionProvider.handleSupport();
    } else if (lowerCaseMessage.includes("about")) {
      this.actionProvider.handleAbout();
    } else if (
      lowerCaseMessage.includes("book an appointment") ||
      lowerCaseMessage.includes("schedule an appointment") ||
      lowerCaseMessage.includes("appointment") ||
      lowerCaseMessage.includes("schedule")
    ) {
      this.actionProvider.handleAppointmentBooking(); // Trigger the appointment flow
    } else {
      this.actionProvider.handleDefault(lowerCaseMessage); // Send dynamic response
    }
  }
}

export default MessageParser;
