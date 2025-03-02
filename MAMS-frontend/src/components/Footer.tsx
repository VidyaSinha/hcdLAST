
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#02959F] text-white mt-auto">
      <div className="mx-auto w-[80%] px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <p>Rajkot-Morbi Highway, Rajkot, Gujarat</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <p>+91 1234567890</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <p>info@marwadiuniversity.ac.in</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Academics</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Research</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Campus Life</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <p className="mb-4">Stay connected with us on social media</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-80">LinkedIn</a>
              <a href="#" className="hover:opacity-80">Twitter</a>
              <a href="#" className="hover:opacity-80">Facebook</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Marwadi University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
