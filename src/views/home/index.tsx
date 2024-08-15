import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Home() {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const timer = setTimeout(setNow, 1000, dayjs());
    return () => clearTimeout(timer);
  });

  return <p>Welcome to {now.format("YYYY-MM-DD HH:mm:ss")} </p>;
}
