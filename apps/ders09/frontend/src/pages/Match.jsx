import {useEffect, useState} from "react";
import {getRandomQuizzes} from "../assets/quizzes";
import Quiz from "../components/quiz";

const Match = () => {

    const [match, setMatch] = useState(null);
    const [error, setError] = useState(null);

    const startNewMatch = async () => {
        const quizzes = await getRandomQuizzes(3);
        if (!quizzes) {
            setError("Soruları çekerken hata meydana geldi");
        } else {
            setMatch({
                victory: false,
                defeat: false,
                currentIndex: 0,
                quizzes
            });
            setError(null);
        }
    }

    useEffect(() => {
        startNewMatch();
    }, []);

    const handleClick = (correct) => {
        if (correct) {
            if (match.currentIndex === match.quizzes.length - 1) {
                // Son soru doğru ise kazandı
                setMatch({
                    victory: true
                });
            } else {
                // Değilse sonraki soruya geç
                setMatch(prev => ({
                    ...prev,
                    currentIndex: prev.currentIndex + 1
                }));
            }
        } else {
            setMatch({
                defeat: true
            });
        }
    }

    if (error) {
        return <h2>{error}</h2>
    }

    if (!match) {
        return (
            <p>Yükleniyor...</p>
        )
    }

    if (match.victory) {
        return (
            <div data-testid="game-result" className="game-result">
                <h2>Kazandın!</h2>
                <div className="action">
                    <button className="play new-game-button" onClick={startNewMatch}>Yeni Oyun</button>
                </div>
            </div>
        )
    }

    if (match.defeat) {
        return (
            <div data-testid="game-result" className="game-result">
                <h2>Yanlış cevap, kaybettin :(</h2>
                <div className="action">
                    <button className="play new-game-button" onClick={startNewMatch}>Yeni Oyun</button>
                </div>
            </div>
        );
    }
    const count = "" + (match.currentIndex + 1) + "/" + match.quizzes.length;
    const quiz = match.quizzes[match.currentIndex];

    return (
        <Quiz quiz={quiz} count={count} handleClick={handleClick}/>
    );
}
export default Match;