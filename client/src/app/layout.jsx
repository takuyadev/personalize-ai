import "@/styles/globals.scss";
import { Footer } from "@/components/organisms/Footer/Footer";
import { Header } from "@/components/organisms/Header/Header";
import { AuthContextProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Personalize.ai - A.I. Powered First Line Personalization",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <div>
            <Header />
            {children}
            <Footer />
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
