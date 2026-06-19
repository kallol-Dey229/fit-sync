"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Card, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Flame } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setApiError("");

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const { data,error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (data) {
        toast.success("Signed in successfully");
      }

      if (error) {
        setApiError(error.message || "Invalid email or password");
        return;
      }

      router.push(redirectTo);

      
    } catch (err) {
      setApiError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090e] px-4 py-10">

      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[120px]" />

      <div className="relative w-full max-w-md">

        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 rounded bg-orange-600 p-2">
            <Flame className="h-6 w-6 fill-white text-white" />
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            Fit<span className="text-orange-600">Sync</span>
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Welcome back! Sign in to continue.
          </p>
        </div>

        <Card className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">

          {apiError && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {apiError}
            </div>
          )}

          <Form onSubmit={onSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Email Address
              </Label>

              <Input
                placeholder="Enter your email"
                className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500"
              />

              <FieldError className="mt-1 text-xs text-red-400" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              className="w-full"
            >
              <Label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                Password
              </Label>

              <div className="relative mt-1 w-full">
                <Input
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-12 text-white placeholder:text-gray-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>

              <FieldError className="mt-1 text-xs text-red-400" />
            </TextField>

            <div className="flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-orange-500 hover:text-orange-400"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="mt-2 h-12 w-full rounded-xl bg-orange-600 font-black uppercase tracking-wider text-white hover:bg-orange-700"
            >
              Sign In
            </Button>
          </Form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="w-1/3 bg-white/10" />
            <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-gray-500">
              Or continue with
            </span>
            <Separator className="w-1/3 bg-white/10" />
          </div>

          <Button
            onClick={handleGoogleSignin}
            variant="bordered"
            className="h-12 w-full rounded-xl border-white/10 bg-white/5 font-semibold text-white hover:bg-white/10"
          >
            <FcGoogle size={22} />
            Sign In With Google
          </Button>

          <div className="mt-8 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href={`/auth/signup?redirect=${redirectTo}`}
              className="font-bold text-orange-500 underline transition-colors hover:text-orange-400"
            >
              Create Account
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}