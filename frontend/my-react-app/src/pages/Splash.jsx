import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      className="page logo-page"
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 0.45, x: "-42vw", y: "-42vh" }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    >
      <Logo size={200} />
    </motion.div>
  );
}
