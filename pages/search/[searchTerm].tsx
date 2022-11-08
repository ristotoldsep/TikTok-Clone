import React, { useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";
import useAuthStore from "../../store/authStore";

import User from "../../components/User";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);

  const router = useRouter();

  const { searchTerm }: any = router.query;

  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";

  // FILTER FUNCTION TO FIND ACCOUNTS WITH SEARCH TERM (SEARCH by username and biography)
  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) || user.biography.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(searchedAccounts);

  return (
    <div className="w-full">
      <p>You searched for: &quot;{searchTerm}&quot;</p>
      <div className="flex gap-10 mb-5 mt-4 border-b-2 border-gray-200 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-2">
          {searchedAccounts.length ? (
            searchedAccounts.map((account: IUser, i: number) => (
              <User user={account} width={50} height={50} key={i} />
            ))
          ) : (
            <NoResults text={`No accounts found for "${searchTerm}"`} />
          )}
        </div>
      ) : (
        <div className="md:mt-2 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, i: number) => (
              <VideoCard post={video} key={i} />
            ))
          ) : (
            <NoResults text={`No video results for "${searchTerm}"`} />
          )}
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: res.data },
  };
};

export default Search;
