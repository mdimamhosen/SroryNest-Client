import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import CTAButton from "../core/CTAButton";

const Banner = () => {
  return (
    <div className="bg-[#0A111D]   text-gray-200">
      <div className="relative  mx-auto flex  flex-col items-center justify-between gap-6   w-11/12 max-w-maxContent">
        <Link to={"/register"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-gray-800 p-1 font-bold text-gray-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all ease-linear duration-400  hover:drop-shadow-lg hover:bg-gray-900">
            <div className="flex hover:scale-95 flex-row items-center gap-2 rounded-full px-6 py-2  ease-linear  transition-all duration-400 group-hover:bg-black group-hover:text-white md:px-6 md:py-3 ">
              <p className="text-sm md:text-base lg:text-lg">Become a Member</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        {/* Heading */}
        <div className="text-center  text-4xl font-semibold md:text-3xl lg:text-4xl">
          <span className="text-gray-200">
            Read books and Explore the World of Knowledge
          </span>
        </div>

        {/* Sub Heading */}
        <div className=" mx-auto w-full lg:w-11/12 text-balance text-center text-xs  font-semibold text-gray-300  md:text-sm   ">
          Books are the quietest and most constant of friends; they are the most
          accessible and wisest of counselors, and the most patient of teachers.
        </div>
        {/* Common Buttons */}
        <div className=" mt-4 lg:mt-4 flex justify-center items-center flex-row gap-4 lg:gap-7">
          <CTAButton active={true} linkto={"/books"}>
            Read Books <FaArrowRight />
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Get Membership <FaArrowRight />
          </CTAButton>
        </div>

        <div className="mx-2 lg:-mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="w-full h-auto shadow-[10px_10px_rgba(245,245,245)]"
            muted
            loop
            autoPlay
            // controls
            controlsList="nodownload"
            preload="auto"
          >
            <source src={`/src/assets/video/banner.mp4`} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default Banner;
