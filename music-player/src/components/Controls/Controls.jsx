import React, { useCallback, memo } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPrevious from "@mui/icons-material/SkipPrevious";
import PlayArrow from "@mui/icons-material/PlayArrow";
import SkipNext from "@mui/icons-material/SkipNext";
import QueueMusic from "@mui/icons-material/QueueMusic";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./Controls.scss";
import { useSelector, useDispatch } from "react-redux";
import { prevMusic, nextMusic, setRepeat } from "../../store/musicPlayerReducer";

const RepeatButton = memo(({repeatMode, ...props}) => {
  switch(repeatMode) {
    case "ALL":
      return <RepeatIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
    case "ONE":
      return <RepeatOneIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
    case "SHUFFLE":
      return <ShuffleIcon sx={{ fontSize: 30, cursor: "pointer" }} {...props} />
    default:
      return null;
  }
});

const Controls = ({
  setshowPlayList,
  resetDuration,
  play,
  pause,
  changeVolume,
}) => {

  const dispatch = useDispatch();

  const playing = useSelector((state) => state.playing);
  const repeatMode = useSelector((state => state.repeat));
  const onClickPlay = useCallback(() => play(), [play]);
  const onClickPause = useCallback(() => pause(), [pause]);
  const onChangeVolume = useCallback((e) => changeVolume(e.target.value), [changeVolume]);

  const onClickPrevious = useCallback(() => {
    if (repeatMode==="ONE")
      resetDuration();
    else dispatch(prevMusic());
  }, [repeatMode, resetDuration, dispatch]);
  const onClickNext = useCallback(() => {
    if (repeatMode==="ONE")
      resetDuration();
    else dispatch(nextMusic());
  }, [repeatMode, resetDuration, dispatch]);
  const onClickRepeat= useCallback(() => dispatch(setRepeat()), [dispatch]);
  const onClickShowPlayList = useCallback(() => setshowPlayList(true), [setshowPlayList]);

  return (
    <div className="control-area">
      <QueueMusic
        sx={{ fontSize: 30, cursor: "pointer" }}
        onClick={onClickShowPlayList}
      />
      <RepeatButton repeatMode={repeatMode} onClick={onClickRepeat} />
      <SkipPrevious
        onClick={onClickPrevious}
        sx={{ fontSize: 30, cursor: "pointer" }}

      />
      {playing ? (
        <PauseIcon
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPause}
        />
      ) : (
        <PlayArrow
          className="play"
          sx={{ fontSize: 30, cursor: "pointer" }}
          onClick={onClickPlay}
        />
      )}
      <SkipNext
        onClick={onClickNext}
        sx={{ fontSize: 30, cursor: "pointer" }}

      />
      <div className="volume-container">
        <VolumeUpIcon sx={{ fontSize: 20 }} />
        <input
          type="range"
          style={{ cursor: "pointer" }}
          defaultValue={1}
          onChange={onChangeVolume}
          min="0"
          max="1"
          step="0.1"
        />
      </div>
    </div>
  );
};

export default memo(Controls);
