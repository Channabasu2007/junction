import { useState } from "react";

const UserBio = ({ bio, paragraphColor}) => {
  const [showMore, setShowMore] = useState(false);

  const shortBio = bio.split(" ").slice(0, 10).join(" "); // first 10 words
  const isLongBio = bio.split(" ").length > 10;

  return (
    <div 
    className="mt-3 text-sm sm:text-base md:text-lg leading-relaxed  "
    style={{color : paragraphColor}}
    >
      {showMore || !isLongBio ? bio : `${shortBio}...`}
      
      {isLongBio && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="ml-2 text-blue-100 dark:text-blue-100 font-medium hover:underline 
          "
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};
export default UserBio;