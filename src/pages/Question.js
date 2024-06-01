import React, { useState } from "react";
import styled from "styled-components";
import { ProgressBar, Button } from "react-bootstrap";
import { QuestionData } from "../asset/data/questiondata";
import { useNavigate, createSearchParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: skyblue;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Question = () => {
  const navigate = useNavigate();
  const [questionNu, setQuestionNu] = useState(0);
  const [totalScore, settotalScroe] = useState([
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
  ]);
  const handleClickButton = (nu, type) => {
    console.log(nu, type);
    const newScore = totalScore.map((item) =>
      item.id === type ? { id: item.id, score: item.score + nu } : item
    );
    console.log(newScore);
    //score:1
    settotalScroe(newScore);
    console.log(newScore);
    //score:0

    //state는 비동기작업!!!!!, console.log는 점수 올라가 있음
    console.log(totalScore);
    setQuestionNu(questionNu + 1);
    if (QuestionData.length !== questionNu + 1) {
      setQuestionNu(questionNu + 1);
    } else {
      const mbti = newScore.reduce(
        (acc, curr) =>
          acc +
          (curr.score >= 2 ? curr.id.substring(0, 1) : curr.id.substring(1, 2)),
        ""
      );
      console.log(mbti);
      navigate({
        pathname: "/result",
        search: `?${createSearchParams({ mbti: mbti })}`,
      });
    }
 
  return (
    <div>
      <ProgressBar
        striped
        variant="danger"
        now={(questionNu / QuestionData.length) * 100}
      />
      <Wrapper>
        <div>
          <div>{QuestionData[questionNu].title}</div>
          <ButtonGroup>
            <Button
              onClick={() =>
                handleClickButton(1, QuestionData[questionNu].type)
              }
              style={{ width: "400px", height: "200px", fontsize: "16px" }}
            >
              {QuestionData[questionNu].answera}
            </Button>
            <Button
              onClick={() =>
                handleClickButton(0, QuestionData[questionNu].type)
              }
              style={{ width: "400px", height: "200px", fontsize: "16px" }}
            >
              {QuestionData[questionNu].answerb}
            </Button>
          </ButtonGroup>
        </div>
      </Wrapper>
    </div>
  );
};
export default Question;
