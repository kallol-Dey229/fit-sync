import { Flame } from "lucide-react";
import { FaFacebook,FaTwitter,FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-[#09091d] text-white pt-16 pb-8 px-6 text-center md:text-left">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
        
       
        <div>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="bg-orange-600 p-2 rounded">
              <Flame className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-black uppercase">
              FIT<span className="text-orange-600">SYNC</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0 mb-4">
            The performance platform built for serious athletes, world-class trainers, and ambitious gym communities.
          </p>
          

          <div className="flex justify-center md:justify-start gap-2">
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded text-gray-400 hover:text-white"><FaTwitter className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded text-gray-400 hover:text-white"><RiInstagramFill className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded text-gray-400 hover:text-white"><FaYoutube className="w-4 h-4" /></a>
            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-800 rounded text-gray-400 hover:text-white"><FaFacebook className="w-4 h-4" /></a>
          </div>
        </div>

        
        <div>
          <h4 className="font-black uppercase text-sm mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Home</a>
            <a href="#" className="hover:text-white">All Classes</a>
            <a href="#" className="hover:text-white">Community Forum</a>
            <a href="#" className="hover:text-white">Sign In</a>
          </div>
        </div>

        
        <div>
          <h4 className="font-black uppercase text-sm mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <p className="hover:text-white">support@fitsync.fit</p>
            <p className="hover:text-white">+8801908064940</p>
            <p>23/1 Banani, Dhaka, Bangladesh 1213</p>
          </div>
        </div>

      </div>

      
      <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 FitSync Fitness. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-400">Privacy</a>
          <a href="#" className="hover:text-gray-400">Terms</a>
          <a href="#" className="hover:text-gray-400">Cookies</a>
        </div>
      </div>
    </footer>
  );
}