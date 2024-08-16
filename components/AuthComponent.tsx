"use client";
import Link from "next/link";
import React, { useState } from "react";

interface AuthComponentPropsInterface {
  type: string;
}

const AuthComponent = ({ type }: AuthComponentPropsInterface) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: any) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex flex-col justify-center items-center md:h-[90vh] h-[70vh]">
      <p className="text-red-500">Sorry! | Backend Is Not Implemented Yet!</p>
      <p className="text-red-500 mb-4">Authentication UI are just for showcase</p>

      <div className="bg-white rounded-lg shadow-lg max-w-xs w-full">
        <h2 className="text-lg font-medium py-2 bg-black rounded-t-lg text-white text-center">
          {type === "signin" ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={type === "signin" ? handleSignIn : handleSignUp}
          className="pt-6 px-6 pb-3"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2 text-xs"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2 text-xs"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white font-medium text-sm p-1.5 rounded-md hover:bg-black transition duration-300"
          >
            {type === "signin" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-xs pb-4">
          {type === "signin"
            ? `Don't have an account? |`
            : "Already have an account? |"}{" "}
          <Link
            href={type === "signin" ? "/sign-up" : "/sign-in"}
            className="text-blue-500 font-medium"
          >
            {type === "signin" ? "Sign Up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthComponent;
