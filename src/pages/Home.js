import { useState } from "react";
import "../App.css";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

const itemArray = Array(9).fill("");
function Home() {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [isGameOver, setisGameOver] = useState(false);
  const [countx, setCountx] = useState(0);
  const [counto, setCounto] = useState(0);
  // const [countn, setCountN] = useState(0);

  const checkWinner = () => {
    if (
      (itemArray[0] === itemArray[1] &&
        itemArray[1] === itemArray[2] &&
        itemArray[0] !== "") ||
      (itemArray[3] === itemArray[4] &&
        itemArray[4] === itemArray[5] &&
        itemArray[3] !== "") ||
      (itemArray[6] === itemArray[7] &&
        itemArray[7] === itemArray[8] &&
        itemArray[6] !== "") ||
      (itemArray[0] === itemArray[4] &&
        itemArray[4] === itemArray[8] &&
        itemArray[0] !== "") ||
      (itemArray[2] === itemArray[4] &&
        itemArray[4] === itemArray[6] &&
        itemArray[2] !== "") ||
      (itemArray[0] === itemArray[3] &&
        itemArray[3] === itemArray[6] &&
        itemArray[0] !== "") ||
      (itemArray[1] === itemArray[4] &&
        itemArray[4] === itemArray[7] &&
        itemArray[1] !== "") ||
      (itemArray[2] === itemArray[5] &&
        itemArray[5] === itemArray[8] &&
        itemArray[2] !== "")
    ) {
      setWinMessage((isCross ? "X" : "O") + " Won");
      setisGameOver(true);
      if (isCross) {
        setCountx(countx + 1);
      } else if (!isCross) {
        setCounto(counto + 1);
      }
    } else {
      const filledCells = itemArray.filter((el) => el !== "").length;
      if (filledCells === 9) {
        setWinMessage("Tie");
        setisGameOver(true);
      }
    }
  };
  const handleReload = () => {
    itemArray.fill("");
    setIsCross(false);
    setWinMessage("");
    setisGameOver(false);
  };
  const changeItem = (index) => {
    if (itemArray[index] !== "" || isGameOver) {
      return;
    } else {
      itemArray[index] = isCross ? "x" : "o";
      setIsCross(!isCross);
      checkWinner();
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h1 style={{ marginLeft: "34vw" }}>Tic-Tac-Toe</h1>

          <div className="container">
            <div className="game-container">
              {itemArray.map((item, index) => (
                <div className="cell">
                  <Card
                    color="primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      changeItem(index);
                    }}
                  >
                    <CardBody className="box">{item}</CardBody>
                  </Card>
                </div>
              ))}
            </div>

            <div className="display-block">
              <div>
                {winMessage
                  ? winMessage
                  : isCross
                  ? "Cross Turn"
                  : "Circle Turn"}
              </div>
              <Button color="success" onClick={handleReload}>
                Play again
              </Button>
              <div>X Won {countx} times</div>
              <div>O Won {counto} times</div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
