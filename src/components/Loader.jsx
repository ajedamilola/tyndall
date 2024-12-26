import React from "react";

const Loader = () => {
  return (
    <div className='h-[90dvh] flex flex-col items-center justify-center gap-4'>
      <div className='flex items-center gap-2'>
        <div className='w-8 h-8 rounded-full bg-[#00B8A9]/80 animate-pulse' />
        <span className='text-xl font-semibold font-manrope'>Tyndall</span>
      </div>
      <div className='animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full'></div>
    </div>
  );
};

export default Loader;
