"use client";

import Link from "next/link";
import { useState } from "react";

import { Button, Card, Description, FieldError, Form, Input, Label, Separator, TextField } from "@heroui/react";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Radio, RadioGroup } from "@heroui/react";

import { authClient } from "@/lib/auth-client";

import { useRouter, useSearchParams } from "next/navigation";
import { Flame } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  // Success & Error Messages
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const [role, setRole] = useState("member");

  const OnSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setApiError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // Confirm Password Validation
    if (user.password !== user.confirmPassword) {
      setApiError("Passwords do not match");
      return;
    }

    // const plan = role === "seeker" ? "seeker_free" : "recruiter_free";

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        role,
        password: user.password,
        image: user.image,
        // plan
      });

      if (error) {
        setApiError(error.message || "Signup Failed");
        return;
      }

      if (data) {
        setSuccess("Account created successfully");

        setTimeout(() => {
          router.push(redirectTo);
        }, 1500);
      }
    } catch (err) {
      setApiError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Google Sign In
  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090e] px-4 py-10">

      
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[120px]" />

      <div className="relative w-full max-w-md">

        
        <div className="mb-8 text-center flex flex-col items-center">
          <div className="bg-orange-600 p-2 rounded mb-3">
            <Flame className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-white">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Join FitSync and start your journey today!
          </p>
        </div>

        
        <Card className="border border-white/10 bg-white/5 p-8 backdrop-blur-xl rounded-xl">

          
          {apiError && (
            <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {apiError}
            </div>
          )}

          
          {success && (
            <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
              {success}
            </div>
          )}

          {/* Form */}
          <Form onSubmit={OnSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <TextField isRequired name="name" type="text" className="w-full">
              <Label className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                Full Name
              </Label>
              <Input
                placeholder="Enter your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 mt-1"
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Image URL */}
            <TextField name="image" type="url" className="w-full">
              <Label className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                Image URL (optional)
              </Label>
              <Input
                placeholder="Enter your photo URL"
                className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 mt-1"
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              className="w-full"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email";
                }
                return null;
              }}
            >
              <Label className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                Email Address
              </Label>
              <Input
                placeholder="Enter your email"
                className="w-full rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-gray-500 mt-1"
              />
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={6}
              className="w-full"
              validate={(value) => {
                if (value.length < 6) {
                  return "Password must be at least 6 characters";
                }
                return null;
              }}
            >
              <Label className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                Password
              </Label>
              <div className="relative w-full mt-1">
                <Input
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-12 text-white placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <Description className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters
              </Description>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Confirm Password */}
            <TextField
              isRequired
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className="w-full"
              validate={(value) => {
                return value.length >= 6 ? null : "Password too short";
              }}
            >
              <Label className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                Confirm Password
              </Label>
              <div className="relative w-full mt-1">
                <Input
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 pr-12 text-white placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              <FieldError className="text-xs text-red-400 mt-1" />
            </TextField>

            {/* Role Selection */}
            <div className="flex flex-col gap-2 mt-1">
              <Label className="text-gray-300 text-xs font-bold uppercase tracking-wider">Role</Label>
              <RadioGroup defaultValue="member" name="role" orientation="horizontal" onChange={(value) => setRole(value)}>
                <Radio value="member">
                  <Radio.Control><Radio.Indicator /></Radio.Control>
                  <Radio.Content><Label className="text-sm font-medium text-gray-200">Member</Label></Radio.Content>
                </Radio>
                <Radio value="trainer">
                  <Radio.Control><Radio.Indicator /></Radio.Control>
                  <Radio.Content><Label className="text-sm font-medium text-gray-200">Trainer</Label></Radio.Content>
                </Radio>
              </RadioGroup>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isLoading={loading}
              className="mt-4 h-12 w-full rounded-xl bg-orange-600 font-black text-white uppercase tracking-wider hover:bg-orange-700 transition-colors"
            >
              Create Account
            </Button>
          </Form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <Separator className="bg-white/10 w-1/3" />
            <span className="whitespace-nowrap text-xs uppercase tracking-wider text-gray-500 font-bold">
              Or continue with
            </span>
            <Separator className="bg-white/10 w-1/3" />
          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleSignin}
            variant="bordered"
            className="h-12 w-full rounded-xl border-white/10 bg-white/5 font-semibold text-white hover:bg-white/10"
          >
            <FcGoogle size={22} />
            Sign Up With Google
          </Button>

          {/* Bottom Link */}
          <div className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{"  "}
            <Link
              href={`/auth/signin?redirect=${redirectTo}`}
              className="font-bold text-orange-500 hover:text-orange-400 underline transition-colors"
            >
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </section>
  );
}