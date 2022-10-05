import '../assets/App.css';
import {getRandomQuizzes} from "../assets/quizzes";
import {useEffect, useState} from "react";

function App() {
    const [quiz, setQuiz] = useState(null);

    useEffect(()=>{
        setQuiz(getRandomQuizzes(1))
    },[getRandomQuizzes])

    if(!quiz){
        return (
            <div className="App">
                Yükleniyor...
            </div>
        )
    }
    return (
        <div className="App">
            <p className="question"> {quiz[0].question}</p>
            <div onClick={() => alert(quiz[0].indexOfRightAnswer === 0)} className="answer">A: {quiz[0].answers[0]}</div>
            <div onClick={() => alert(quiz[0].indexOfRightAnswer === 1)} className="answer">B: {quiz[0].answers[1]}</div>
            <div onClick={() => alert(quiz[0].indexOfRightAnswer === 2)} className="answer">C: {quiz[0].answers[2]}</div>
            <div onClick={() => alert(quiz[0].indexOfRightAnswer === 3)} className="answer">D: {quiz[0].answers[3]}</div>
        </div>
    );
}

export default App;
