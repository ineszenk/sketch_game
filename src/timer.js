import { useContext, useState } from "react";
import { GameContext } from "./Game";

export function useTimer({ setPredict, predict }) {
  const [seconds, setSeconds] = useState(10);
  let { next } = useContext(GameContext);

  const timer = setTimeout(() => {
    if (seconds === 0) {
      setSeconds(10);
      next();
    }
    if (predict && seconds !== 0) {
      setSeconds(10);
      setPredict(false);
    } else if (!predict && seconds !== 0) {
      setSeconds(seconds - 1);
    }
  }, 1000);

  return [timer, seconds];
}
