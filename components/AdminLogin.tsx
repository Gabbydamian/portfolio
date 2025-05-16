"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userLogin } from "@/actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function AdminLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { success } = await userLogin(email, password);

      if (!success) {
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      router.refresh();

      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occured", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-24 py-12 mt-24 max-w-lg">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
