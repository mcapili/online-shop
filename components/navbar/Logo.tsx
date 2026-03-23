import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { FcShop } from "react-icons/fc";

function Logo() {
  return (
    <Button size='icon' asChild>
      <Link href='/'>
        <FcShop className='w-6 h-6' />
      </Link>
    </Button>
  );
}

export default Logo
