'use client'

import Rounded from "@/common/RoundedButton";

interface MenuButtonProps {
  buttonRef: React.RefObject<HTMLDivElement>;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuButton = ({ buttonRef, isActive, onClick, className = '' }: MenuButtonProps) => (
  <div 
    ref={buttonRef} 
    className={`scale-0 fixed lg:right-2 z-[98] transition-transform duration-300 ease-out 
                right-4 top-3 lg:top-[70px] ${className}`}
  >
    <Rounded
      onClick={onClick}
      className="relative m-0 lg:m-[20px] w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] rounded-full !border-0
                bg-[#1C1D20] cursor-pointer flex items-center justify-center"
    >
      <div className={`w-full relative ${isActive ? 'burger-active' : ''}`}>
        <div className="burger-line" />
        <div className="burger-line" />
      </div>
    </Rounded>
  </div>
); 