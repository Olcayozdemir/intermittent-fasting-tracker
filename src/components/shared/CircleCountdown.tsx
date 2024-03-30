import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const FormText = styled.span<{ bold?: boolean }>`
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? "bold" : "400")};
  margin-bottom: 8px;
`;

interface CircleCountdownProps {
  startTime: string;
  endTime: string;
  isFasting: boolean;
  timeElapsed: number;
}

const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (time % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const calculateTotalFastingTime = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}`).getTime();
  const end = new Date(`1970-01-01T${endTime}`).getTime();
  return (end - start) / 1000;
};

const CircleCountdown = ({
  startTime,
  endTime,
  isFasting,
  timeElapsed,
}: CircleCountdownProps) => {
  const totalFastingTime = calculateTotalFastingTime(startTime, endTime);
  const totalDuration = 24 * 60 * 60; // Toplam süre 24 saat, saniye cinsinden
  const fastingPercentage = (totalFastingTime / totalDuration) * 100;
  const elapsedPercentage = (timeElapsed / totalDuration) * 100;

  const pathColor = isFasting
    ? elapsedPercentage < fastingPercentage
      ? "#FFA500"
      : "#008000"
    : "#6a1b9a";

  return (
    <CircularProgressbarWithChildren
      value={isFasting ? elapsedPercentage : fastingPercentage}
      strokeWidth={12}
      styles={buildStyles({
        pathColor: pathColor,
        textColor: "#000000",
        textSize: "16px",
      })}
    >
      <FormText>Set Fasting Time</FormText>
      <FormText bold>
        {isFasting ? formatTime(timeElapsed) : formatTime(totalFastingTime)}
      </FormText>
    </CircularProgressbarWithChildren>
  );
};

export default CircleCountdown;
