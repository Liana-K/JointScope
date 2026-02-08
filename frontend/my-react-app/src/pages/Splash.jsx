import { useEffect } from "react";
import Logo from "../Components/Logo";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/login"), 2200);
  }, [navigate]);

  return (
    <motion.div
      initial={{
        x: 0,
        y: 0,
        scale: 1
      }}
      animate={{
        x: "-42vw",
        y: "-42vh",
        scale: 0.55
      }}
      transition={{
        duration: 1.6,
        ease: "easeInOut"
      }}
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Logo size={220} />
    </motion.div>
  );
}