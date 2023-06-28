document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const adminForm = document.getElementById('admin-form');
    const quizForm = document.getElementById('quiz');
    const resultContainer = document.getElementById('result');
  
    // Hiển thị form đăng nhập
    function showLoginForm() {
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
      adminForm.style.display = 'none';
      quizForm.style.display = 'none';
      resultContainer.style.display = 'none';
    }
  
    // Hiển thị form đăng ký
    function showRegisterForm() {
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
      adminForm.style.display = 'none';
      quizForm.style.display = 'none';
      resultContainer.style.display = 'none';
    }
  
    // Hiển thị form nhập câu hỏi (dành cho admin)
    function showAdminForm() {
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      adminForm.style.display = 'block';
      quizForm.style.display = 'none';
      resultContainer.style.display = 'none';
    }
  
    // Hiển thị trắc nghiệm
    function showQuiz() {
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      adminForm.style.display = 'none';
      quizForm.style.display = 'block';
      resultContainer.style.display = 'none';
      loadQuestion();
    }
  
    // Hiển thị kết quả
    function showResult(score, total) {
      loginForm.style.display = 'none';
      registerForm.style.display = 'none';
      adminForm.style.display = 'none';
      quizForm.style.display = 'none';
      resultContainer.style.display = 'block';
      resultContainer.innerText = 'Kết quả: ' + score + '/' + total;
    }
  
    // Xử lý khi người dùng đăng nhập
    document.getElementById('login-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Xử lý đăng nhập
      // ...
      showQuiz(); // Hiển thị trắc nghiệm sau khi đăng nhập thành công
    });
  
    // Xử lý khi người dùng đăng ký
    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Xử lý đăng ký
      // ...
      showLoginForm(); // Hiển thị form đăng nhập sau khi đăng ký thành công
    });
  
    // Xử lý khi người dùng thêm câu hỏi (dành cho admin)
    document.getElementById('admin-form').addEventListener('submit', function(e) {
      e.preventDefault();
      // Xử lý thêm câu hỏi
      // ...
      // Sau khi thêm câu hỏi, hiển thị lại form nhập câu hỏi để thêm câu hỏi tiếp theo
      document.getElementById('admin-form').reset();
      document.getElementById('question').focus();
    });
  
    // Xử lý khi người dùng làm trắc nghiệm
    document.getElementById('quiz').addEventListener('submit', function(e) {
      e.preventDefault();
      // Xử lý trắc nghiệm
      // ...
      showResult(5, 10); // Giả sử đạt được 5/10 điểm, bạn có thể thay đổi theo logic của bạn
    });
  
    // Hàm tải câu hỏi (giả sử từ một tệp JSON)
    function loadQuestion() {
      const questionContainer = document.getElementById('question-container');
      // Lấy câu hỏi từ tệp JSON hoặc nguồn dữ liệu khác
      const question = 'Câu hỏi trắc nghiệm đầu tiên';
      const answers = [' Câu trả lời 1', ' Câu trả lời 2', ' Câu trả lời 3', ' Câu trả lời 4'];
  
      // Hiển thị câu hỏi và các câu trả lời
      questionContainer.innerHTML = '';
      const questionElement = document.createElement('div');
      questionElement.textContent = question;
      questionContainer.appendChild(questionElement);
  
      for (let i = 0; i < answers.length; i++) {
        const answerElement = document.createElement('div');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = i + 1;
        answerElement.appendChild(input);
        answerElement.append(answers[i]);
        questionContainer.appendChild(answerElement);
      }
    }
  
    // Mặc định hiển thị form đăng nhập khi trang web được tải
    showLoginForm();
  });

  document.getElementById('question-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Lấy thông tin từ form
    const question = document.getElementById('question').value;
    const answer1 = document.getElementById('answer1').value;
    const answer2 = document.getElementById('answer2').value;
    const answer3 = document.getElementById('answer3').value;
    const answer4 = document.getElementById('answer4').value;
  
    // Tạo một đối tượng câu hỏi
    const questionObj = {
      question: question,
      answers: [answer1, answer2, answer3, answer4]
    };
  
    // Kiểm tra xem đã có dữ liệu trong tệp JSON hay chưa
    let questionArray = [];
    if (localStorage.getItem('questionArray')) {
      questionArray = JSON.parse(localStorage.getItem('questionArray'));
    }
  
    // Thêm câu hỏi vào mảng
    questionArray.push(questionObj);
  
    // Lưu mảng câu hỏi vào tệp JSON
    localStorage.setItem('questionArray', JSON.stringify(questionArray));
  
    // Reset form
    document.getElementById('question-form').reset();
  
    // Thông báo thành công
    alert('Thêm câu hỏi thành công!');
  });
  
  