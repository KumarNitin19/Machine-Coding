import React from "react";
const StopWatch: React.FC = () => {
  return (
    <div className="stop-watch">
      <div className="stop-watch-label">Stop Watch</div>
      <div className="stop-watch-timer">
        <div className="stop-watch-timer-hours">
          <div className="stop-watch-timer-key">Hours</div>
          <div className="stop-watch-timer-value">00</div>
        </div>
        <div>:</div>
        <div className="stop-watch-timer-minutes">
          <div className="stop-watch-timer-key">Minutes</div>
          <div className="stop-watch-timer-value">00</div>
        </div>
        <div>:</div>
        <div className="stop-watch-timer-seconds">
          <div className="stop-watch-timer-key">Seconds</div>
          <div className="stop-watch-timer-value">00</div>
        </div>
      </div>
      <div className="stop-watch-actions">
        <button className="stop-watch-timer-reset">Reset</button>
        <button className="stop-watch-timer-start">Start</button>
      </div>
    </div>
  );
};

export default StopWatch;
