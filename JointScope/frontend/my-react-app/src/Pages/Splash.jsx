import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Components/Logo";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/login"), 2600);
  }, [navigate]);

  return (
    <motion.div
      className="page logo-page"
      initial={{ scale: 1 }}
      animate={{ scale: 0.45, x: "-42vw", y: "-42vh" }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    >
      <div className="logo-circle">
        <Logo size={120} />
      </div>
    </motion.div>
  );
}
