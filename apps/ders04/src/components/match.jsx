import {useEffect, useState} from "react";
import {getRandomQuizzes} from "../assets/quizzes";

const Match = () => {
    const [quiz, setQuiz] = useState(null);
    const [answerText, setAnswerText] = useState("");

    const setRandomQuiz = () => {
        setAnswerText("");
        setQuiz(getRandomQuizzes(1))
    }

    useEffect(() => {
        setRandomQuiz();
    }, []);

    if (!quiz) {
        return (
            <div className="App">
                Yükleniyor...
            </div>
        )
    }


    return (
        <div className="App">
            <p data-testid="question" className="question"> {quiz[0].question}</p>
            <div data-testid="answers" onClick={() => quiz[0].indexOfRightAnswer === 0 ? setRandomQuiz() : setAnswerText("Yanlış")}
                 className="answer">A: {quiz[0].answers[0]}</div>
            <div data-testid="answers" onClick={() => quiz[0].indexOfRightAnswer === 1 ? setRandomQuiz() : setAnswerText("Yanlış")}
                 className="answer">B: {quiz[0].answers[1]}</div>
            <div data-testid="answers" onClick={() => quiz[0].indexOfRightAnswer === 2 ? setRandomQuiz() : setAnswerText("Yanlış")}
                 className="answer">C: {quiz[0].answers[2]}</div>
            <div data-testid="answers" onClick={() => quiz[0].indexOfRightAnswer === 3 ? setRandomQuiz() : setAnswerText("Yanlış")}
                 className="answer">D: {quiz[0].answers[3]}</div>
            <p data-testid="answerText">{answerText}</p>
        </div>
    );
}
export default Match;