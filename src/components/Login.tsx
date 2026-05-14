import { useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../lib/validations/login";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSignInWithEmail = async (data: LoginFormData) => {
    
   
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (error) {
        throw error;
      }

      toast.success("Welcome back, Doctor");
    } catch (error) {
      
     const errorMsg = error instanceof Error ? error.message : "A system error occurred. Please contact IT";
     toast.error(errorMsg) 

     
   
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <form
        onSubmit={handleSubmit(onSignInWithEmail)}
        className="p-8 bg-white rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6">AetherCare Staff Login</h2>

        <div className="mb-4">
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-slate-200"}`}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={`w-full p-2  border rounded ${errors.email ? "border-red-500" : "border-slate-200"}`}
          />
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {isLoading ? "Authenticating..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
