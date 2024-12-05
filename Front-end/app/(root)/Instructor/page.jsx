"use client";
import { useSelector } from "react-redux";

const Instructor = () => {
  const { user, isLoggin: isLoged } = useSelector((s) => s.user);
  return (
    <div>
      do you want to be an instructor ? (
      {isLoged ? "welcome in our team" : "you have to sign in first"})
    </div>
  );
};

export default Instructor;
