"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api" // use your axios instance

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const signup = async () => {
    if (!email || !password) {
      alert("Enter email and password")
      return
    }

    try {
      setLoading(true)

      const res = await api.post("/api/auth/signup", {
        email,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.user.id)

      router.push("/dashboard")
    } catch (err: any) {
      console.error("Signup error:", err.response?.data || err.message)
      alert(err.response?.data?.error || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Sign Up</h1>

      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={signup}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </div>
  )
}
