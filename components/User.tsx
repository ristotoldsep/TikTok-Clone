import React from 'react'
import Link from 'next/link'
import { IUser } from '../types';
import Image from 'next/image'
import { GoVerified } from "react-icons/go";


const User = ({ user, width, height }: { user: any, width: number, height: number}) => {
  
  return (
    <Link href={`/profile/${user._id}`} key={user._id}>
      <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded">
        <div className={`w-[${width}px] h-[${width}px]`}>
          <Image
            src={user.image}
            width={width || 34}
            height={height || 34}
            className={`rounded-full`}
            alt="User Profile Image"
          />
        </div>
        <div className="hidden xl:block">
          <p
            className="flex gap-1 items-center text-md font-bold text-primary"
            title={user.biography}
          >
            {user.userName}
            <GoVerified className="text-blue-400" />
          </p>
          <p className="capitalize text-gray-400 text-xs">{user.userName}</p>
        </div>
      </div>
    </Link>
  );
}

export default User