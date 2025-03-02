
import { useNavigate } from "react-router-dom";
import { Home, Mail, Phone, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    navigate('/');
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto w-[80%] px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-[#02959F] text-2xl font-semibold tracking-wider">
              MADMS
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-[#02959F] transition-colors">
              <Home className="h-5 w-5" />
            </a>
            <a href="mailto:info@marwadiuniversity.ac.in" className="text-gray-600 hover:text-[#02959F] transition-colors">
              <Mail className="h-5 w-5" />
            </a>
            <a href="tel:+911234567890" className="text-gray-600 hover:text-[#02959F] transition-colors">
              <Phone className="h-5 w-5" />
            </a>
            <Button
              variant="outline"
              className="flex items-center gap-2 text-[#02959F] hover:text-white hover:bg-[#02959F]"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
