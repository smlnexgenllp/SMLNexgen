'use client';

import { FC, useEffect } from 'react';
import "./globals.css"
import initCursor from './cursor';
 
interface Props { }
 
const Index: FC<Props> = () => {
 
  useEffect(() => {
    initCursor();
  }, [])
  return (
    <div className='h-screen w-full fixed top-0 left-0 z-[-1] '>
      <canvas id="fluid" className='w-full h-full' />
    </div>
  );
};
export default Index;