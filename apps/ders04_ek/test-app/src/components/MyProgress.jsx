import {Button, Col, Container, ProgressBar, Row} from "react-bootstrap";
import {useState} from "react";

export const MyProgress = ({increaseFunc, variant}) => {
    const [amount, setAmount] = useState(50);
    const handleIncDec = (delta) => {
        increaseFunc(prevState => prevState + delta);
        setAmount(prevState => {
                if (0 > prevState) {
                    return 0
                } else if (prevState > 100) {
                    return 100
                } else {
                    return prevState + delta
                }
            }
        )
    }
    return (
        <Container>
            <Row>
                <Col xs={6}>
                    <ProgressBar
                        animated
                        variant={variant}
                        now={amount}/>
                </Col>
                <Col xs={3}>
                    <Button onClick={() => handleIncDec(5)} variant="outline-success">+</Button>
                    <Button onClick={() => handleIncDec(-5)} variant="outline-danger">-</Button>
                </Col>
            </Row>
        </Container>
    )
}
