import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
// import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
// import DeleteIcon from '@mui/icons-material/Delete';
//import Icon from '@mui/material/Icon';
//import { AccessAlarm, ThreeDRotation } from '@mui/icons-material/DeleteOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const HomeIcon = createSvgIcon(
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />,
  'Home',
);

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
            <HomeIcon />
      <HomeIcon color="primary" />
            {/* <svg data-testid="DeleteIcon"></svg> */}
          {/* <svg data-testid="ThumbUpAltIcon" fontSize="small" color="primary"></svg>
          <Icon>star</Icon> */}
{/*           
          <FontAwesomeIcon
            icon={faThumbsUp}
            style={{ paddingRight: 5 ,color: "red"}}
          /> */}
        </button>
        <button
          onClick={handleLike}
          disabled={!isLiked}
          >
          <FontAwesomeIcon
            icon={faThumbsDown}
            style={{ paddingLeft: 5 }}
            />
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