const 정답 = "PEPSI";
let index = 0;
let attempts = 0;
let timestamp;

function appStart() {
  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };
  //   const displayGameover = () => {
  //     const div = document.createElement("div");
  //     div.innerText = "게임이 종료됐습니다.";
  //     div.style =
  //       "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px;";
  //     document.body.appendChild(div);
  //   };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(timestamp);
    alert("다시 하세요!");
    location.reload();
    // displayGameover();
  };
  const success = () => {
    window.removeEventListener("keydown", handleKeydown);
    clearInterval(timestamp);
    alert("정답 입니다!");
    // displayGameover();
    location.reload();
  };
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleEnterkey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const button = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const letter = button.innerText;
      const 정답_글자 = 정답[i];
      if (letter === 정답_글자) {
        맞은_갯수 += 1;
        button.style.background = "#6AAA64";
      } else if (정답.includes(letter)) button.style.background = "#C9B458";
      else button.style.background = "#787C7E";

      button.style.color = "white";

      console.log("입력한글자:", letter, "정답글자:", 정답_글자);
    }
    if (맞은_갯수 === 5) success();
    else nextLine();
  };
  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterkey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };
  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timer = document.querySelector(".timer");
      timer.innerText = `${분}:${초}`;
    }
    timestamp = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
