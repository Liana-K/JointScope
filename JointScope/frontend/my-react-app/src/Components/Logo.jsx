import logo from "../assets/JointScope.png";

export default function Logo({ size = 180 }) {
  return (
    <img
      src={logo}
      alt="JointScope Logo"
      style={{ width: size, height: "auto" }}
    />
  );
} 
