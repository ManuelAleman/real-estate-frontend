import React from "react";
import LogInForm from "@/components/login/LogIn";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/navbar/NavBar";
const LoginPage = () => {
  return (
    <div>
      <NavBar />
      <LogInForm />
      <Footer />
    </div>
  );
};

export default LoginPage;
