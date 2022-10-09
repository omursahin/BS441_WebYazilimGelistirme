import {render, fireEvent, waitFor, screen} from "@testing-library/react";
import Match from "../pages/Match";
import {quizzes} from "../assets/quizzes";

const checkQuizIsDisplayed = async (screen) => {
    const quiz = await waitFor(() => screen.findAllByTestId("quiz"));
    expect(quiz).toHaveLength(1);

    const questions = await waitFor(() => screen.findAllByTestId("question"));
    expect(questions).toHaveLength(1);

    const answers = await waitFor(() => screen.findAllByTestId("answers"));
    expect(answers).toHaveLength(4);

}

const getDisplayedQuiz = async (screen) => {
    const asked_quiz = await waitFor(() => screen.findAllByTestId("quiz"));
    const html_id = asked_quiz[0].id;
    const id = parseInt(html_id.substring("quiz_".length, html_id.length));

    const quiz = quizzes.find(e => e.id === id);
    return quiz;

}

test("test oluşturuldu", () => {
    render(<Match/>);
    checkQuizIsDisplayed(screen);
});

test("Yanlış cevap", async () => {
    // bu test doğru cevaba tıklar ise hata verir. Deterministik hale getirilmeli.
    render(<Match/>);
    const quiz = await getDisplayedQuiz(screen);

    const answers = await waitFor(() => screen.findAllByTestId("answers"));
    fireEvent.click(answers[(quiz.indexOfRightAnswer + 1) % 4]);
    const result = await waitFor(() => screen.findAllByTestId("game-result"));
    const lost = result[0].textContent.includes("Yanlış");
    const won = result[0].textContent.includes("Doğru");

    expect(lost).toEqual(true);
    expect(won).toEqual(false);
});


test("Doğru cevap", async () => {
    // bu test doğru cevaba tıklar ise hata verir. Deterministik hale getirilmeli.
    render(<Match/>);
    const quiz = await getDisplayedQuiz(screen);

    const answers = await waitFor(() => screen.findAllByTestId("answers"));
    fireEvent.click(answers[quiz.indexOfRightAnswer]);

    checkQuizIsDisplayed(screen);
});


test("Oyun Kazan", async () => {
    // bu test doğru cevaba tıklar ise hata verir. Deterministik hale getirilmeli.
    render(<Match/>);
    for (let i = 0; i < 3; i++) {
        const quiz = await getDisplayedQuiz(screen);
        const answers = await waitFor(() => screen.findAllByTestId("answers"));
        fireEvent.click(answers[quiz.indexOfRightAnswer]);
    }
    const result = await waitFor(() => screen.findAllByTestId("game-result"));
    const lost = result[0].textContent.includes("Yanlış");
    const won = result[0].textContent.includes("Kazandın");

    expect(lost).toEqual(false);
    expect(won).toEqual(true);
});