'use client'

export const Logo = () => (
  <div className="flex cursor-pointer group">
    <p className="m-0 transition-all duration-500 ease-bezier group-hover:rotate-[360deg]">
      {'©'}
    </p>
    <div className="flex relative overflow-hidden whitespace-nowrap ml-[5px]
                    transition-all duration-500 ease-bezier group-hover:pr-[30px]">
      <p className="relative text-sm lg:text-base transition-transform duration-500 ease-bezier 
                   group-hover:-translate-x-full">
        {'↗'}MAViS MA
      </p>
      <p className="relative pl-[0.3em] text-sm lg:text-base transition-transform duration-500 
                   ease-bezier group-hover:-translate-x-[85px]">
        {'↗'}Based in Melbourne AU
      </p>
    </div>
  </div>
); 