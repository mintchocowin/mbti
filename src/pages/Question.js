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
const Title = styled.div`
  font-size: 30px;
  text-align: center;
  margin-bottom: 30px;
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
    // if (type === "EI") {
    //   const addScore = totalScore[0].score + nu;
    //   //점수업데이트
    //   const newObject = { id: "EI", score: addScore };
    //   //새로운객체만들어주기
    //   totalScore.splice(0, 1, newObject);
    //   //여기에 도려내서 넣기
    // } else if (type === "SN") {
    //   const addScore = totalScore[1].score + nu;
    //   const newObject = { id: "SN", score: addScore };
    //   totalScore.splice(1, 1, newObject);
    // } else if (type === "TF") {
    //   const addScore = totalScore[2].score + nu;
    //   const newObject = { id: "TF", score: addScore };
    //   totalScore.splice(1, 1, newObject);
    // } else if (type === "JP") {
    //   const addScore = totalScore[3].score + nu;
    //   const newObject = { id: "JP", score: addScore };
    //   totalScore.splice(3, 1, newObject);
    // }
  };
  // const handleClickButtonB = (nu, type) => {
  //   if (type === "EI") {
  //     const addScore = totalScore[0].score + nu;
  //     const newObject = { id: "EI", score: addScore };
  //     totalScore.splice(0, 1, newObject);
  //   } else if (type === "SN") {
  //     const addScore = totalScore[1].score + nu;
  //     const newObject = { id: "SN", score: addScore };
  //     totalScore.splice(1, 1, newObject);
  //   } else if (type === "TF") {
  //     const addScore = totalScore[2].score + nu;
  //     const newObject = { id: "TF", score: addScore };
  //     totalScore.splice(1, 1, newObject);
  //   } else if (type === "JP") {
  //     const addScore = totalScore[3].score + nu;
  //     const newObject = { id: "JP", score: addScore };
  //     totalScore.splice(3, 1, newObject);
  //   }
  //   setQuestionNu(questionNu + 1);
  // };
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
