import React, { useState, useEffect } from "react";
import { formatDistanceToNow, format, parseISO, isValid } from "date-fns";

interface RelativeTimeProps {
  dateString: string;
  // Optional prop to always show absolute time
  alwaysAbsolute?: boolean;
  // Optional prop to show absolute time on hover (default: true) - Keep for tooltip
  showTooltip?: boolean;
}

const RelativeTime: React.FC<RelativeTimeProps> = ({
  dateString,
  alwaysAbsolute = false,
  showTooltip = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [displayTime, setDisplayTime] = useState<string>("");
  const [relativeTimeSuffix, setRelativeTimeSuffix] = useState<string | null>(
    null
  ); // State for the suffix
  const [absoluteTimeFull, setAbsoluteTimeFull] = useState<string | null>(null); // State for the full absolute time (for tooltip)

  useEffect(() => {
    setIsMounted(true); // Component is mounted on the client side

    const date = parseISO(dateString);

    if (!isValid(date)) {
      setDisplayTime("Invalid Date");
      setRelativeTimeSuffix(null);
      setAbsoluteTimeFull(null);
      return;
    }

    const now = new Date();
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    const relative = formatDistanceToNow(date, { addSuffix: true });

    // Always calculate the full absolute time for the tooltip
    setAbsoluteTimeFull(format(date, "PPP, p")); // e.g., "May 15th, 2025, 9:30 AM"

    // Determine display format
    if (alwaysAbsolute || diffHours >= 24) {
      // Show absolute if alwaysAbsolute or older than 24 hours
      setDisplayTime(format(date, "PPP, p")); // e.g., "May 15th, 2025, 9:30 AM"
      // Add the relative time as a suffix when displaying absolute time
      setRelativeTimeSuffix(`(${relative})`);
    } else {
      setDisplayTime(relative); // Show relative time
      setRelativeTimeSuffix(null); // Don't show suffix if already showing relative
    }

    // Optional: Update relative time periodically if needed (e.g., every minute)
    // const interval = setInterval(() => {
    //  const updatedDate = parseISO(dateString);
    //  if (isValid(updatedDate) && !alwaysAbsolute) {
    //   const now = new Date();
    //   const diffHours = (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60);
    //   const relative = formatDistanceToNow(updatedDate, { addSuffix: true });
    //   if (diffHours < 24) {
    //    setDisplayTime(relative);
    //    setRelativeTimeSuffix(null);
    //   } else {
    //    setDisplayTime(format(updatedDate, 'PPP, p'));
    //    setRelativeTimeSuffix(`(${relative})`);
    //   }
    //  } else if (isValid(updatedDate) && alwaysAbsolute) {
    //     const relative = formatDistanceToNow(updatedDate, { addSuffix: true });
    //      setRelativeTimeSuffix(`(${relative})`);
    //   }
    // }, 60000); // Update every minute

    // return () => clearInterval(interval); // Cleanup interval
  }, [dateString, alwaysAbsolute]); // Re-run effect if dateString or alwaysAbsolute changes

  // Render null on server-side to avoid hydration mismatch with relative time
  if (!isMounted) {
    return null;
  }

  return (
    <span
      title={showTooltip && absoluteTimeFull ? absoluteTimeFull : undefined}
    >
      {displayTime}
      {relativeTimeSuffix && ` ${relativeTimeSuffix}`}{" "}
      {/* Add suffix if present */}
    </span>
  );
};

export default RelativeTime;
