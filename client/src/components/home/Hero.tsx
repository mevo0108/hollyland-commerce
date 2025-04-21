import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import HollyandLogo from "@/assets/hollyand-logo.png";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-[#f9e8c1] text-[#2c1810]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-[#f9e8c1] via-[#f0e0c0] to-[#f4d59a] opacity-70"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik01NC4wMSA0OS4zNDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVsLTEyLjAwNS0xMi4wMDVsLTEyLjAwNSAxMi4wMDVMNi4wMSA0OS4zNDVMMCA0My4zMzVsMTIuMDA1LTEyLjAwNUwwIDE5LjMyNWw2LjAxLTYuMDFsMTIuMDA1IDEyLjAwNUwzMC4wMiAxMy4zMTVsMTIuMDA1IDEyLjAwNUw1NC4wMSAxMy4zMTVsNi4wMSA2LjAxTDQ4LjAxNSAzMS4zM0w2MC4wMiA0My4zMzV6IiBmaWxsPSIjYzQ5YTZjIiBmaWxsLW9wYWNpdHk9IjAuMiIgZmlsbC1ydWxlPSJldmVub2RkIi8+Cjwvc3ZnPg==')]"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
          <div className="mx-auto md:mx-0 w-40 h-40 mb-8 flex items-center justify-center">
            <img src={HollyandLogo} alt="Hollyand Premium Israel Products" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-[#2c1810]">{t('hero_title')}</h1>
          <p className="text-lg md:text-xl mb-8 font-serif text-[#5c4838]">{t('hero_subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/products">
              <Button size="lg" className="vintage-button bg-[#8B4513] hover:bg-[#6B3009] text-[#f9e8c1] border border-[#c49a6c] font-serif">
                {t('hero_button')}
              </Button>
            </Link>
            <Link href="/products?sale=true">
              <Button variant="outline" size="lg" className="bg-[#f9e8c1] border-[#c49a6c] text-[#8B4513] hover:bg-[#f0e0c0] font-serif">
                {t('view_all')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f9e8c1] to-transparent"></div>
    </section>
  );
};

export default Hero;
