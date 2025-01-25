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
    className={`scale-0 fixed lg:right-0 z-[4] transition-transform duration-300 ease-out right-3 top-0 ${className}`}
  >
    <Rounded
      onClick={onClick}
      className="relative m-[20px] w-[80px] h-[80px] rounded-full 
                bg-[#1C1D20] cursor-pointer flex items-center justify-center"
    >
      <div className={`w-full relative ${isActive ? 'burger-active' : ''}`}>
        <div className="burger-line" />
        <div className="burger-line" />
      </div>
    </Rounded>
  </div>
); 