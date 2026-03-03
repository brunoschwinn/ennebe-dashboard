import { useState, useEffect } from "react";
import AppMobile from "./AppMobile.jsx";
import AppDesktop from "./AppDesktop.jsx";

export default function App() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile ? <AppMobile /> : <AppDesktop />;
}
