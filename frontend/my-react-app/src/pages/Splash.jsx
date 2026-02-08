import { useEffect } from "react";
import Logo from "./Components/Logo";

export default function Splash({ goTo }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      goTo("login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [goTo]);

  return (
    <div className="page logo-page">
      <Logo size={200} />
    </div>
  );
}
