import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DealTimer.css";

const DealTimer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Set the target date to 2 days from now
  const getTargetDate = () => {
    const newTargetDate = new Date();
    newTargetDate.setDate(newTargetDate.getDate() + 2);
    return newTargetDate;
  };

  const [targetDate, setTargetDate] = useState(getTargetDate());

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="mainDeal">
      <div className="dealTimer">
        <div className="dealTimerMainContent">
          <div className="dealTimeContent">
            <p>ODOP Special</p>
            <h3>District-Specific <span>Offer</span></h3>
            <div className="dealTimeLink">
              <Link to="/marketplace" onClick={scrollToTop}>Explore Products</Link>
            </div>
          </div>
          <div className="dealTimeCounter">
            <div className="dealTimeDigit"><h4>{timeLeft.days}</h4><p>Days</p></div>
            <h4>:</h4>
            <div className="dealTimeDigit"><h4>{timeLeft.hours}</h4><p>Hours</p></div>
            <h4>:</h4>
            <div className="dealTimeDigit"><h4>{String(timeLeft.minutes).padStart(2, "0")}</h4><p>Minutes</p></div>
            <h4>:</h4>
            <div className="dealTimeDigit"><h4>{String(timeLeft.seconds).padStart(2, "0")}</h4><p>Seconds</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealTimer;
