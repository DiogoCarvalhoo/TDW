import { ProgressBar } from "react-bootstrap";
import styled from "styled-components";
import { PollsItemType } from "../../pages/polls";
import PollsItem from "../polls/polls_item";

const PollHeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  gap: 20px;

  max-width: 1000px;
`;

const ProgressBarDiv = styled.div`
  width: 60%;
  margin: auto;
`;

const PollStatsDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
`;

const DatesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PollTweetDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

interface PollProps {
  pollInfo: PollsItemType;
}

function PollHeader({ pollInfo }: PollProps) {
  const pollText = pollInfo.text.split("\n");
  const creator = pollText[pollText.length - 1].substring(1);

  const finishDate = new Date(
    pollText[pollText.length - 2].substring(10).replace("at ", "")
  );

  const finishDisplayDate = finishDate.toLocaleDateString("pt-PT", dateOptions);

  const creationDate = new Date(pollInfo.created_at);
  const creationDisplayDate = creationDate.toLocaleDateString(
    "pt-PT",
    dateOptions
  );

  const creationDateMiliseconds = Date.parse(creationDate.toString());
  const finishDateMiliseconds = Date.parse(finishDate.toString());
  const currentDateMiliseconds = Date.now();

  const percentage = Math.round(
    ((currentDateMiliseconds - creationDateMiliseconds) /
      (finishDateMiliseconds - creationDateMiliseconds)) *
      100
  );

  return (
    <PollHeaderDiv className="container px-4 col-sm-11 col-md-11 col-lg-8 col-xl-7 p-3 bg-white shadow-sm rounded">
      <h2>Poll Criada Por @{creator}</h2>

      <DatesDiv>
        <span>Começou a {creationDisplayDate.replace(" às", ",")}</span>
        <ProgressBarDiv>
          <ProgressBar animated now={percentage} />
        </ProgressBarDiv>
        <span>Termina a {finishDisplayDate.replace(" às", ",")}</span>
      </DatesDiv>

      <PollTweetDiv>
        <PollsItem
          pollInfo={pollInfo}
          liked={pollInfo.liked}
          retweeted={pollInfo.retweeted}
          show_link={false}
          media_url=""
          media_type=""
        />
      </PollTweetDiv>

      <div>
        <h3>Vota aqui</h3>
        <h3>&#8595;</h3>
      </div>
    </PollHeaderDiv>
  );
}

export default PollHeader;
