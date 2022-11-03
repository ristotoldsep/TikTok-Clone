import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import axios from 'axios';
import { BASE_URL } from "../../utils";
import { Video } from "../../types";

interface IProps {
  postDetails: Video,
}

const Detail = ({ postDetails } : IProps) => {
  const [post, setPost] = useState(postDetails);

  const [playing, setPlaying] = useState(false);

  // State for volume button (Mute/unmute)
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const router = useRouter();

  // console.log(post);

  const onVideoClick = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  // FOR MUTING THE VIDEO AUDIO
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  if (!post) return null;

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-stone-200">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => { router.back(); }}>
            <MdOutlineCancel className="text-black text-[35px] hover:text-[#F51997]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              src={post.video.asset.url}
              className="h-full cursor-pointer"
              ref={videoRef}
              loop
              onClick={onVideoClick}
            ></video>
          </div>
          <div className="absolute top-[45%] left-[45%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isVideoMuted ? (
            <button onClick={() => setIsVideoMuted(false)}>
              <HiVolumeOff className="text-black text-2xl lg:text-4xl hover:text-[#F51997]" />
            </button>
          ) : (
            <button onClick={() => setIsVideoMuted(true)}>
              <HiVolumeUp className="text-black text-2xl lg:text-4xl hover:text-[#F51997]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// TO GET DATA FOR DETAIL VIDEO PAGE, WE TAKE IT FROM THE URL AND use Server Side Props!
export const getServerSideProps = async ({
  params: { id}
} : {
  params: { id: string }
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)

  return {
    props: { postDetails: data }
  }
}


export default Detail;
