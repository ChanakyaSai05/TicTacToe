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
  const checkWinner = () => {
    let Lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];
    let flag = false;
    Lines.forEach((item) => {
      const [a, b, c] = item;
      if (
        itemArray[a] === itemArray[b] &&
        itemArray[b] === itemArray[c] &&
        itemArray[a] !== ""
      ) {
        flag = true;
        setWinMessage((isCross ? "X" : "O") + " Won");
        setisGameOver(true);
        if (isCross) {
          setCountx(countx + 1);
        } else if (!isCross) {
          setCounto(counto + 1);
        }
      }
    });
    if (flag === false) {
      const filledCells = itemArray.filter((el) => el !== "").length;
      if (filledCells === 9) {
        setWinMessage("It's a Tie");
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
      itemArray[index] = isCross ? "X" : "O";
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
