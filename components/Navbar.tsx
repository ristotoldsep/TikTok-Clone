import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { GoogleLogin, GoogleLogout } from "react-google-login"; //DEPRECATED!!!
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import Logo from "../utils/tiktok-logo.png";
import { createOrGetUser } from "../utils";

// LETS USE ZUSTAND STORE INSTEAD OF REDUX THIS TIME
import useAuthStore from '../store/authStore';

const Navbar = () => {

  // const user = false;

  const { userProfile, addUser } = useAuthStore()

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] md:h-[40px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktok"
            layout="responsive"
          />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {userProfile ? (
          <div>{userProfile.userName}</div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log("Error")}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
