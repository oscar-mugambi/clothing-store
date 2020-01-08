import React from "react";
import SignIn from "../../Components/Sign-in/Sign-in";

import "./Signin-Signup.scss";
import SignUp from "../../Components/SignUp/SignUp";

const SignInAndSignUpPage = () => (
  <div className="sign-in-and-sign-up">
    <SignIn />
    <SignUp />
  </div>
);

export default SignInAndSignUpPage;
