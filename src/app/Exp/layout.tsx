import ShadowCursor from "@/components/Cursor/index";
import Navbar from "@/components/Navbar";
import SocialMedia from "@/components/SocialMedia";

import { Onborda, OnbordaProvider } from "onborda";
import { steps } from "./components/steps";
import { TourCard } from "./components/tour";

import ChatbotComponent from "@/components/Chatbot/Chatbot";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ShadowCursor />
        <Navbar />
        <SocialMedia />
        <OnbordaProvider>
          <Onborda
            steps={steps}
            cardComponent={TourCard}
            shadowOpacity="0.8"
            cardTransition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <div>{children}</div>
          </Onborda>
        </OnbordaProvider>
        <ChatbotComponent />
        <Footer />
      </body>
    </html>
  );
}
