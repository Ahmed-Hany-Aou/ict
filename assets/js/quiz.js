class Quiz {
  static checkQuiz1() {
    const a1 = document.getElementById('q1a1').value.toLowerCase();
    const a2 = document.getElementById('q1a2').value;
    let score = 0;
    if(a1.includes('meaning') || a1.includes('processed') || (a1.includes('data') && a1.includes('raw'))) score++;
    if(a2 === "It spreads easily") score++;
    Quiz.animateResult('result1', `${score}/2 correct!`);
  }
  static checkQuiz2() {
    const a1 = document.getElementById('q2a1').value.toLowerCase();
    const a2 = document.getElementById('q2a2').value.toLowerCase();
    let score = 0;
    if(a1.includes('name') || a1.includes('address') || a1.includes('number') || a1.includes('personal')) score++;
    if(a2.includes('protect') || a2.includes('ideas') || a2.includes('creation') || a2.includes('copy')) score++;
    Quiz.animateResult('result2', `${score}/2 correct!`);
  }
  static checkQuiz3() {
    const a1 = document.getElementById('q3a1').value;
    const a2 = document.getElementById('q3a2').value.toLowerCase();
    let score = 0;
    if(a1 === "Phishing emails") score++;
    if(a2.includes('password') || a2.includes('update') || a2.includes('backup')) score++;
    Quiz.animateResult('result3', `${score}/2 correct!`);
  }
  static animateResult(id, text) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.style.background = "#d4f3ce";
    el.style.transition = "background 0.5s";
    setTimeout(() => { el.style.background = ""; }, 1200);
  }
}
window.Quiz = Quiz; // make available for inline HTML onclick
