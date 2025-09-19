"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res, "res");
    
    if (res.ok) {
      router.push("/");
    } else {
      const data = await res.json();
      alert(data.message || "Signup failed");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Signup</h1>
      <form onSubmit={handleSignup} className="flex flex-col gap-2 mt-4">
        <input
          className="border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2 rounded">Signup</button>
      </form>
    </div>
  );
}
