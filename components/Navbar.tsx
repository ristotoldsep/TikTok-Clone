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

  const { userProfile, addUser, removeUser } = useAuthStore()

  // console.log(userProfile)

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[130px] md:h-[40px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="tiktok"
          />
        </div>
      </Link>

      <div>SEARCH</div>

      <div>
        {/* IF USER FOUND SHOW PROFILE BUTTONS */}
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            {/* UPLOAD BUTTON */}
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" /> {``}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {/* PROFILE BUTTON */}
            {userProfile.image && (
              <button className="m-0 flex items-center" title={userProfile.userName}>
                <Link href="/">
                  <>
                    <Image
                      width={40}
                      height={40}
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="profile photo"
                    />
                  </>
                </Link>
              </button>
            )}
            {/* LOG OUT BUTTON */}
            <button type="button" className="px-2" title="Log out" onClick={() => { googleLogout(); removeUser(); }}>
              <AiOutlineLogout color="red" fontSize={21}/>
            </button>
          </div>
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
