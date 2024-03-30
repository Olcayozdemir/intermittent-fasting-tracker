import { useState, useEffect, useMemo } from "react";
import CircleCountdown from "./shared/CircleCountdown";
import Button from "./shared/Button"; // Önceden oluşturulmuş Button bileşenini kullanın
import Card from "./shared/Card";
import { styled } from "styled-components";
import MoreOptionsMenu from "./shared/MoreOptionMenu";
import { FastingSession, useFasting } from "../context/FastingContext";
import { ActiveFastingSession, useProfile } from "../context/ProfileContect";
import useDeviceType from "../hooks/useDeviceType";

const Row = styled.div<{ justify?: string; align?: string }>`
  display: flex;
  gap: 20px;
  margin: 20px 0px;
  align-items: ${({ align }) => align ?? "center"};
  justify-content: ${({ justify }) => justify ?? "space-evenly"};
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 150px 10px 50px;
  max-width: 540px;
  width: 100%;
`;

const FormInput = styled.input`
  border: none;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #6567d9;
  font-weight: bold;
  font-family: "Roboto", sans-serif;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5); /* blue-300 */
  }
`;

const FormText = styled.span<{ bold?: boolean; color?: string }>`
  font-size: ${({ bold }) => (bold ? "24px" : "16px")};
  font-weight: ${({ bold }) => (bold ? "bold" : "400")};
  margin-bottom: 8px;
  color: ${({ color }) => color ?? "black"};
  padding: 0px 8px;
  text-align: center;
`;

const IconDiv = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`;

const Chip = styled.div`
  height: 27px;
  background: rgba(210, 205, 255, 1);
  color: rgba(159, 112, 218, 1);
  font-size: 12px;
  font-weight: 400;
  line-height: 14.06px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 16px;
`;

const ColoredText = styled.span<{ bold?: boolean }>`
  font-family: Roboto;
  font-size: 32px;
  font-weight: 700;
  line-height: 22px;
  text-align: left;
  margin-bottom: 8px;
  color: rgba(101, 103, 217, 1);
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const TopTitle = styled.h1`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 24px;
`;

const FastingTimer = () => {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("16:00");
  const { fastingHistory, setFastingHistory, deleteFasting } = useFasting();
  const { activeFasting, setActiveFasting, user, stats } = useProfile();
  const [isFasting, setIsFasting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { isMobile } = useDeviceType();
  const [activeSession, setActiveSession] = useState(activeFasting);

  useEffect(() => {
    if (activeFasting?.status === "active" && activeSession === null) {
      setIsFasting(true);
      const now = new Date();
      const fastingStartDate = new Date(
        now.toISOString().split("T")[0] + "T" + activeFasting.start
      );

      const elapsedSeconds = Math.floor(
        (now.getTime() - fastingStartDate.getTime()) / 1000
      );
      setTimeElapsed(elapsedSeconds);
    }
  }, [activeFasting, activeSession]);

  const toggleFasting = () => {
    if (isFasting) {
      setIsFasting(false);
      setActiveSession(null);
      if (activeFasting) {
        const completedFasting: FastingSession = {
          ...activeFasting,
          completedAt: new Date().toISOString(),
        };
        setFastingHistory([...fastingHistory, completedFasting]);
      }
      setActiveFasting(null);
    } else {
      const newFasting: ActiveFastingSession = {
        id: Date.now(),
        start: startTime,
        end: endTime,
        status: "active",
      };
      setActiveFasting(newFasting);
      setActiveSession(newFasting);
      setIsFasting(true);
    }
  };

  const timeToHours = (time: string) => {
    const [hours] = time.split(":").map(Number);
    return hours;
  };

  const calculateTimeDifference = (startTime: string, endTime: string) => {
    return timeToHours(endTime) - timeToHours(startTime);
  };

  const calculateMinutesAgo = (date: string) => {
    const now = new Date();
    const sessionDate = new Date(date);
    const differenceInMinutes = Math.floor(
      (now.getTime() - sessionDate.getTime()) / 60000
    );

    if (differenceInMinutes >= 60 * 24) {
      const days = Math.floor(differenceInMinutes / (60 * 24));
      return days === 1 ? "yesterday" : `${days}  days ago`;
    } else if (differenceInMinutes >= 60) {
      const hours = Math.floor(differenceInMinutes / 60);
      const minutes = differenceInMinutes % 60;
      return `${hours} hours ${minutes > 0 ? `${minutes} minutes` : ""} ago`;
    } else {
      return `${differenceInMinutes} minutes ago`;
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFasting) {
      timer = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
    }

    return () => clearInterval(timer);
  }, [isFasting]);

  const timeDifferences = useMemo(
    () =>
      fastingHistory.map((session) =>
        calculateTimeDifference(session.start, session.end)
      ),
    [fastingHistory]
  );

  return (
    <Container>
      <Row>
        <TopTitle>
          Hello <b>{user?.name}</b>
        </TopTitle>
      </Row>
      <Card>
        <Title>Ready to Fasting</Title>
        <CircleCountdown
          endTime={endTime}
          startTime={startTime}
          isFasting={isFasting}
          timeElapsed={timeElapsed}
        />
        <Row>
          <Column>
            <FormText>Start to</FormText>
            <FormInput
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={isFasting}
            />
          </Column>
          <Column>
            <FormText>End to</FormText>
            <FormInput
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={isFasting}
            />
          </Column>
        </Row>
        <Button onClick={toggleFasting} isMobile={isMobile}>
          {isFasting ? "End Fasting" : "Start Fasting"}
        </Button>
      </Card>
      <Row align="stretch">
        <Card>
          <IconDiv>⏳</IconDiv>
          <FormText bold={true}>{stats?.totalHours}</FormText>
          <FormText>Total Hours</FormText>
        </Card>
        <Card>
          <IconDiv>🎉</IconDiv>
          <FormText bold>{stats?.completedFasts}</FormText>
          <FormText>Total Completed Fasting</FormText>
        </Card>
      </Row>
      <Row>
        <h2>My Latest Fastings</h2>
      </Row>
      {fastingHistory.map((session, index) => (
        <Card key={session.id} padding="20px" align="flex-start">
          <Row justify="flex-start">
            <ColoredText>{timeDifferences[index]} Hours</ColoredText>
            {session.completedAt && (
              <Chip>{calculateMinutesAgo(session.completedAt)}</Chip>
            )}
          </Row>
          <FormText color={"#8F939A"}>
            {session.start} - {session.end}
          </FormText>
          <MoreOptionsMenu onDelete={() => deleteFasting(session.id)} />
        </Card>
      ))}
    </Container>
  );
};

export default FastingTimer;
