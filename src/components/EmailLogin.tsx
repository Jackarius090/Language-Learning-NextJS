"use client";

import { useState } from "react";
import { signIn } from "next-auth/react"; // Use client-side version, not the server import

export default function EmailLoginIn() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);

    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: true,
        redirectTo: "/", // Replace with your redirect path
      });
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <form action={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}

      <div className="mb-4">
        <label className="block mb-2">
          Email
          <input
            name="email"
            type="email"
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Password
          <input
            name="password"
            type="password"
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
}
