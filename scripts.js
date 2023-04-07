const input1 = document.getElementById('input_1');
const input2 = document.getElementById('input_2');
const signInput = document.getElementById('sign');
const btn = document.getElementById('calculate-btn');
const result = document.getElementById('show-result');
btn.disabled = true;
let number1, number2, sign;

input1.addEventListener('change', validInputs);
input2.addEventListener('change', validInputs);

function validInputs() {
  if (!input1.value || !input2.value) {
    btn.disabled = true;
    result.textContent = '';  
  } else {
    btn.disabled = false;
    number1 = Number(input1.value);// т.к. в калькуляторе у нас будет операция сложения
    number2 = Number(input2.value);
  }
}

function getSign() {
  sign = signInput.value;
}

function createEquation(a, b, sign) {
  if (sign === '/' && b === 0) {
    return `На ноль делить нельзя`;
  }
  switch(sign) {
    case '+':
      return `Результат: ${a} ${sign} ${b} = ${a + b}`;
    case '-':
      return `Результат: ${a} ${sign} ${b} = ${a - b}`;
    case '*':
      return `Результат: ${a} ${sign} ${b} = ${a * b}`;
    case '/':
      return `Результат: ${a} ${sign} ${b} = ${a / b}`;
  }
}

function calculate(e) {
  e.preventDefault();
  getSign();
  result.textContent = createEquation(number1, number2, sign);
}
btn.addEventListener('click', calculate);

// /* Здесь пишем скрипт, который позволит решить поставленную задачу:
//   1) Кнопка "вычислить" должна быть не активна, пока не введены оба числа
//   2) Если введены оба числа (т.е. инпуты не пустые), то делаем кнопку активной
//   3) по клику на эту кнопку - произвести вычисление и вывод результата в div с id="show-result" в формате:
//   "Результат вычислений = " + результат
// */