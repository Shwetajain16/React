import React, { useState } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import HeartBrokenRoundedIcon from '@mui/icons-material/HeartBrokenRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
const Rating = props => {
  const { name, song, youtubeId } = props.band;
  const [isLiked, updateLike] = useState(false);
  const handleLike = () => {
    let currentLikedBands = props.likedBands;
    if (!isLiked) {
      updateLike(true);
      if (!currentLikedBands.includes(name))
        props.updateLikedBands(
          [...currentLikedBands, name]
        );
    } else {
      updateLike(false);
      if (currentLikedBands.includes(name))
        props.updateLikedBands(
          currentLikedBands
          .filter(band => band !== name)
          );
    }
  };
  return (
    <div>
      <iframe
        title={name}
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${youtubeId}`}
      />
      <div
        style={{
          paddingBottom: 10,
          paddingTop: 10
         }}
      >
        <button
          onClick={handleLike}
          disabled={isLiked}
          >
          {/* <FontAwesomeIcon
            icon={FavoriteRoundedIcon}
            style={{ paddingRight: 5 }}
          /> */}

          <FavoriteRoundedIcon />
          
        </button>
        <button
          onClick={handleLike}
          disabled={!isLiked}
          >
          {/* <FontAwesomeIcon
            icon={HeartBrokenRoundedIcon}
            style={{ paddingLeft: 5 }}
            /> */}
            <HeartBrokenRoundedIcon />
        </button>
      </div>
      <p>You {isLiked ? "liked" : "disliked"} </p>
      <h3>
        {song} by {name}
      </h3>
      <hr />
    </div>
  );
};
export default Rating;