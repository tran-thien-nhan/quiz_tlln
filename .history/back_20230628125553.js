// Code form submission handler
document.getElementById("codeForm").addEventListener("submit", function (event) {
    event.preventDefault();
    var code = document.getElementById("codeInput").value;
    var alertSpan = document.getElementById("alert");
    if (code === "TLLN12345") {
        alertSpan.textContent = "Correct!";
        alertSpan.style.color = "green";
        window.location.href = "quiz.html"; // Chuyển hướng sang trang quiz.html
    } else {
        alertSpan.textContent = "Invalid code";
        alertSpan.style.color = "red";
    }
});

// Back button click event handler
document.getElementById("backButton").addEventListener("click", function () {
    window.history.back(); // Trở về trang trước đó
});