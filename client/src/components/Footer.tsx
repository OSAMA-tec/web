export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-[#0a192f]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#e6f1ff]/60 mb-4 md:mb-0">
            &copy; {currentYear} Osama Hashmi. All rights reserved.
          </p>
          <p className="text-[#e6f1ff]/60">
            Designed & Built with <span className="text-[#64ffda]">❤</span> by Osama Hashmi
          </p>
        </div>
      </div>
    </footer>
  );
}
