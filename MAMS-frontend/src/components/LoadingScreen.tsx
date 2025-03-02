
import { Loader } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20); // Update every 20ms to make it smooth over 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#02959F] to-[#017781]">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-4 w-[90%] max-w-md">
        <Loader className="h-12 w-12 text-[#02959F] animate-spin" />
        <h2 className="text-2xl font-semibold text-[#02959F] animate-pulse">
          Loading MADMS...
        </h2>
        <div className="w-full mt-4">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 text-center mt-2">
            {progress.toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
