import {Button, ProgressBar} from "react-bootstrap";
import {useState} from "react";

export const MyProgressBar = ({variant, changeCount}) => {

    const [amount, setAmount] = useState(0);
    const handleIncDec = (delta) => {
        changeCount(prevState => prevState + delta);
        setAmount(prevState => {
            if (prevState + delta > 100) {
                return 100;
            }
            if (prevState + delta < 0) {
                return 0;
            }
            return prevState + delta;
        });
    }
    return (
        <div>
            <ProgressBar variant={variant} animated now={amount}/>
            <Button onClick={() => handleIncDec(5)} variant="outline-success">+</Button>
            <Button onClick={() => handleIncDec(-5)} variant="outline-danger">-</Button>
        </div>
    )
}
