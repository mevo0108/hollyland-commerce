import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-[#c49a6c]/10">
          <Globe className="h-5 w-5 text-[#8B4513]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="vintage-card border-[#c49a6c] bg-[#f9f3e7]">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className={`font-serif ${language === 'en' ? 'bg-[#c49a6c]/20 font-bold' : ''} cursor-pointer hover:bg-[#c49a6c]/10`}
        >
          <span className="mr-2">🇺🇸</span> English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('he')}
          className={`font-serif ${language === 'he' ? 'bg-[#c49a6c]/20 font-bold' : ''} cursor-pointer hover:bg-[#c49a6c]/10`}
        >
          <span className="mr-2">🇮🇱</span> עברית
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;