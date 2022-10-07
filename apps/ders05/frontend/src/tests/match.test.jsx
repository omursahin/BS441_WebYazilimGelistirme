import {render, fireEvent, waitFor, screen} from "@testing-library/react";
import Match from "../components/match";

const checkQuizIsDisplayed = async (screen) => {
    const questions = await waitFor(() => screen.findAllByTestId("question"));
    expect(questions).toHaveLength(1);
}

test("test oluşturuldu", () => {
    render(<Match/>);
    checkQuizIsDisplayed(screen);
});

test("cevap ver testi", async () => {
    // bu test doğru cevaba tıklar ise hata verir. Deterministik hale getirilmeli.
    render(<Match/>);
    const answers = await waitFor(() => screen.findAllByTestId("answers"));
    fireEvent.click(answers[3]);
    const answerText = await waitFor(() => screen.findByTestId("answerText"));
    checkQuizIsDisplayed(screen);
    expect(answerText).toHaveTextContent(/^Doğru|Yanlış$/);
})

test("çoklu test", async () => {
    render(<Match/>);


    for (let i = 0; i < 20; i++) {

        const answers = await waitFor(() => screen.findAllByTestId("answers"));
        fireEvent.click(answers[3]);
        const answerText = await waitFor(() => screen.findByTestId("answerText"));
        checkQuizIsDisplayed(screen);
        expect(answerText).toHaveTextContent(/^Doğru|Yanlış$/);
    }
})
