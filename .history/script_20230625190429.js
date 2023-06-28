// Đọc câu hỏi từ tệp JSON
fetch("quest_lib.json")
.then(response => response.json())
.then(data => {
    const questions = data.questions;

    // Lấy ngẫu nhiên 20 câu hỏi
    const randomQuestions = getRandomElements(questions, 3);

    let currentQuestionIndex = 0;
    let score = 0;
    let timeRemaining = 900; // 15 phút * 60 giây = 900 giây

    const questionContainer = document.getElementById("questionContainer");
    const questionElement = document.getElementById("question");
    const answerTextElements = [
        document.getElementById("answerText1"),
        document.getElementById("answerText2"),
        document.getElementById("answerText3"),
        document.getElementById("answerText4")
    ];
    const resultElement = document.getElementById("result");
    const nextButton = document.getElementById("nextButton");
    const scoreElement = document.getElementById("score");

    // Cập nhật câu hỏi và câu trả lời
    function updateQuestion() {
        const question = randomQuestions[currentQuestionIndex];
        questionElement.textContent = question.question;
        resultElement.textContent = "";

        for (let i = 0; i < answerTextElements.length; i++) {
            answerTextElements[i].textContent = question.choices[i];
        }
    }

    // Kiểm tra câu trả lời
    function checkAnswer() {
        const question = randomQuestions[currentQuestionIndex];
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');

        if (selectedAnswer) {
            const selectedAnswerText = selectedAnswer.nextElementSibling.textContent;

            if (selectedAnswerText === question.correctAnswer) {
                score += 1;
                resultElement.textContent = "Đúng";
                resultElement.style.color = "green";
            } else {
                resultElement.textContent = "Sai";
                resultElement.style.color = "red";
            }

            setTimeout(() => {
                currentQuestionIndex++;

                if (currentQuestionIndex < randomQuestions.length) {
                    updateQuestion();
                    selectedAnswer.checked = false;
                    nextButton.disabled = true;
                    setTimeout(() => {
                        nextButton.disabled = false;
                    }, 200);
                } else {
                    clearInterval(timerInterval);
                    questionContainer.style.display = "none";
                    nextButton.style.display = "none";
                    const finalScore = (score / randomQuestions.length) * 10;
                    scoreElement.textContent = `Tổng điểm: ${finalScore.toFixed(1)}`;
                    scoreElement.style.display = "block";
                    scoreElement.style.fontWeight = "bold";

                    if (finalScore > 5) {
                        scoreElement.style.color = "green"; // Màu xanh lá cây nếu tổng điểm lớn hơn 5
                    } else {
                        scoreElement.style.color = "red"; // Màu đỏ nếu tổng điểm nhỏ hơn hoặc bằng 5
                    }

                    scoreElement.style.fontSize = "2rem";

                    if (timeRemaining === 0) {
                        questionContainer.style.display = "none";
                        nextButton.style.display = "none";
                    } else {
                        questionContainer.style.display = "none";
                        nextButton.style.display = "none";
                        const minutes = Math.floor((15 * 60 - timeRemaining) / 60);
                        const seconds = (15 * 60 - timeRemaining) % 60;
                        timerElement.textContent = `Bạn đã làm xong trong: ${minutes} phút ${seconds} giây`;
                        timerElement.style.backgroundColor = "white";
                        timerElement.style.color = "black";
                    }
                }
            }, 200);
        }
    }

    // Xử lý sự kiện khi nhấn nút "Tiếp theo"
    nextButton.addEventListener("click", () => {
        checkAnswer();
    });

    // Bắt đầu trắc nghiệm
    updateQuestion();

    // Đồng hồ đếm ngược
    const timerElement = document.createElement("div");
    timerElement.style.fontSize = "24px";
    timerElement.style.fontWeight = "bold";
    timerElement.style.marginTop = "10px";
    timerElement.style.textAlign = "center";
    timerElement.style.color = "white";
    timerElement.style.backgroundColor = "black";
    timerElement.style.width = "fit-content";
    timeclock.appendChild(timerElement);

    const timerInterval = setInterval(() => {
        timeRemaining--;
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timerElement.textContent = `Thời gian còn lại: ${minutes} phút ${seconds} giây`;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            questionContainer.style.display = "none";
            nextButton.style.display = "none";
            const finalScore = (score / randomQuestions.length) * 10;
            scoreElement.textContent = `Tổng điểm: ${finalScore.toFixed(1)}`;
            scoreElement.style.display = "block";
            scoreElement.style.fontWeight = "bold";
            scoreElement.style.color = "red";
            scoreElement.style.fontSize = "2rem";
        }
    }, 1000);

    // Hiển thị modal thông báo
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();

    // Tự động đóng modal sau 3 giây
    setTimeout(() => {
        modal.hide();
    }, 3000);
})
.catch(error => {
    console.error("Error:", error);
});

// Hàm lấy ngẫu nhiên các phần tử từ một mảng
function getRandomElements(array, numElements) {
const shuffledArray = array.sort(() => Math.random() - 0.5);
return shuffledArray.slice(0, numElements);
}