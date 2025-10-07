import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import {
  cn,
  formatTime,
  MILLISECONDS_TO_SECONDS,
  TIMER_UPDATE_INTERVAL,
} from "@/lib/utils";

type CountdownProps = {
  duration: number;
  startTime: Date;
  text: string;
  onExpire: () => void;
};

const CRITICAL_TIME_RATIO = 0.3;
const WARNING_TIME_RATIO = 0.5;
const PULSE_TIME_RATIO = 0.2;

export function Countdown({
  duration,
  text,
  startTime,
  onExpire,
}: CountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsed = Math.floor(
        (now.getTime() - startTime.getTime()) / MILLISECONDS_TO_SECONDS
      );

      const remaining = Math.max(0, duration - elapsed);

      setTimeRemaining(remaining);

      if (remaining === 0) {
        onExpire();
      }
    }, TIMER_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [startTime, onExpire, duration]);

  const isCriticalTime = timeRemaining <= duration * CRITICAL_TIME_RATIO;
  const isWarningTime = timeRemaining <= duration * WARNING_TIME_RATIO;
  const isPulseTime = timeRemaining <= duration * PULSE_TIME_RATIO;

  return (
    <div className="col-span-2 flex items-center justify-center">
      <div
        className={cn(
          "flex w-fit items-center justify-center gap-2 rounded-md border border-foreground p-2 text-gray-500 text-sm",
          isCriticalTime && "border-red-600 text-red-600 dark:text-red-400",
          isWarningTime &&
            "border-orange-600 text-orange-600 dark:text-orange-400"
        )}
      >
        <Clock className={`h-4 w-4 ${isPulseTime ? "animate-pulse" : ""}`} />
        <p className="font-medium">
          {text} - Time remaining: {formatTime(timeRemaining)}
        </p>
      </div>
    </div>
  );
}
