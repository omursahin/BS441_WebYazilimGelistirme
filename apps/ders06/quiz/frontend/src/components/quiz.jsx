const Quiz = ({quiz, count, handleClick}) => {

    const renderAnswerTag = (prefix, answer, correct, handleClick) => {
        return <div data-testid="answers" className="answer" onClick={() => handleClick(correct)}
                    tabIndex="0">{prefix + answer}</div>
    }

    return (
        <div data-testid="quiz" id={"quiz_" + quiz.id} className="quiz">
            <p className="question">Soru {count}: {quiz.question}</p>
            {renderAnswerTag("A: ",quiz.answers[0],quiz.indexOfRightAnswer===0, handleClick)}
            {renderAnswerTag("B: ",quiz.answers[1],quiz.indexOfRightAnswer===1, handleClick)}
            {renderAnswerTag("C: ",quiz.answers[2],quiz.indexOfRightAnswer===2, handleClick)}
            {renderAnswerTag("D: ",quiz.answers[3],quiz.indexOfRightAnswer===3, handleClick)}
        </div>
    );
}
export default Quiz;