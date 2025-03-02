import { useState } from "react";
import { User, Lock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Only for registration
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the form fields
    if (!email || !password) {
      toast({ title: "Error", description: "Email and Password are required", variant: "destructive" });
      return;
    }

    if (isRegistering && password !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }

    try {
      const endpoint = isRegistering ? "register" : "login";
      const response = await axios.post(`http://127.0.0.1:5000/api/auth/${endpoint}`, {
        email,
        password,
      });

      const data = response.data;
      console.log("Server Response:", data);

      if (response.status === 200) {
        toast({ title: "Success", description: isRegistering ? "Registration successful!" : "Login successful!" });

        // Store JWT Token for Login
        if (!isRegistering) {
          if (rememberMe) {
            localStorage.setItem("token", data.token);
          } else {
            sessionStorage.setItem("token", data.token);
          }
          navigate("/dashboard");
        } else {
          // If registered, switch to login form
          setIsRegistering(false);
        }
      } else {
        toast({ title: "Error", description: data.message || "Something went wrong", variant: "destructive" });
      }
    } catch (error) {
      console.error("Request Failed:", error);
      toast({ title: "Error", description: "Server error", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#02959F] py-6 mb-8">
        <h1 className="text-white text-4xl font-bold text-center tracking-wider animate-fadeIn">
          Marwadi University Accreditation and Data Management System
        </h1>
      </div>

      <div className="max-w-md mx-auto px-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-[#02959F] mb-6 text-center">
            {isRegistering ? "Sign Up" : "Sign In"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#02959F] h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02959F] focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#02959F] h-5 w-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02959F] focus:border-transparent transition-all duration-200 outline-none"
                placeholder="Password"
                required
              />
            </div>

            {/* Confirm Password for Registration */}
            {isRegistering && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#02959F] h-5 w-5" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#02959F] focus:border-transparent transition-all duration-200 outline-none"
                  placeholder="Confirm Password"
                  required
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#02959F] hover:bg-[#037885] text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isRegistering ? "Sign Up" : "Sign In"}
            </button>
          </form>

          {/* Toggle Between Sign In & Sign Up */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-[#02959F] hover:text-[#037885] font-semibold"
            >
              {isRegistering ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
