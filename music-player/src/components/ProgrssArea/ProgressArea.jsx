import React, { useRef, useImperativeHandle, forwardRef, useState, useCallback, memo } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { nextMusic, playMusic, stopMusic } from "../../store/musicPlayerReducer";
import "./ProgressArea.scss";

function ProgressArea(props, ref) {

  const audio = useRef();
  const progressBar = useRef();
  const dispatch = useDispatch();
  const [ currentTime, setcurrentTime ] = useState("00:00")
  const [ duration, setduration ] = useState("00:00")

  const { playList, currentIndex, repeatMode } = useSelector( (state) => ({
    playList : state.playList,
    currentIndex : state.currentIndex,
    repeatMode : state.repeat }),
    shallowEqual);

  useImperativeHandle(ref, () => ({
    play: () => audio.current.play(),
    pause: () => audio.current.pause(),
    changeVolume: (volume) => audio.current.volume = volume,
    resetDuration: () => audio.current.currentTime = 0
  }));

  const getTime = (time) => {
    const minutes = `0${parseInt(time/60, 10)}`;
    const seconds = `0${parseInt(time%60)}`;
    return `${minutes.slice(-2)}:${seconds.slice(-2)}`;
  }

  const onPlay = useCallback(() => dispatch(playMusic()), [dispatch]);
  const onPause = useCallback(() => dispatch(stopMusic()), [dispatch]);
  const onTimeUpdate = useCallback((e) => {
    if (e.target.readyState === 0) return;
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const progressBarWidth = 100 * currentTime/duration;
    progressBar.current.style.width = `${progressBarWidth}%`;
    setcurrentTime(getTime(currentTime));
    setduration(getTime(duration));
  }, [getTime]);
  const onClickProgress = useCallback((e) => {
    const progressBarWidth = e.currentTarget.clientWidth;
    const clickedOffsetX = e.nativeEvent.offsetX;
    const duration = audio.current.duration;
    audio.current.currentTime = (clickedOffsetX/progressBarWidth) * duration;
  }, []);
  const onEnded = useCallback(() => {
    if (repeatMode === "ONE") {
      audio.current.currentTime = 0;
      audio.current.play();
    }
    else dispatch(nextMusic());
  }, [repeatMode, dispatch]);

  return (
    <div className="progress-area" onMouseDown={onClickProgress}>
      <div className="progress-bar" ref={progressBar}>
        <audio
          autoPlay
          ref={audio}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          src={ playList[currentIndex].src }
          onEnded={onEnded}
        ></audio>
      </div>
      <div className="music-timer">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  );
}

export default memo(forwardRef(ProgressArea));
