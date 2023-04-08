// Model
const calculator = {
  isBtnDisabled: true,
  setOperand(operand, num, sign) { // сокращенная запись метода предпочтительнее (если что, для нее в отличии от обычной записи метода при наследовании доступен super)
    operand === 'firstOperand' ? this.firstOperand = num : this.secondOperand = num;
    this.validateInputs(this.firstOperand, this.secondOperand);
    this.setOperator(sign);
  },
  setOperator(sign) {
    this.operator = sign;
  },
  validateInputs(valueNum1, valueNum2) {
    if (!valueNum1 || !valueNum2) {
      this.changeDisabledBtnCondition(true);
      this.disableBtnView();
      this.blankCalculatorView();
    } else {
      this.changeDisabledBtnCondition(false);
      this.disableBtnView();
    }
  },
  createEquation(a, b, sign) {
    const number_1 = Number(a);
    const number_2 = Number(b);
    if (sign === '/' && number_2 === 0) {
      return `На ноль делить нельзя`;
    }
    switch(sign) {
      case '+':
        return `Результат: ${number_1} ${sign} ${number_2} = ${number_1 + number_2}`;
      case '-':
        return `Результат: ${number_1} ${sign} ${number_2} = ${number_1 - number_2}`;
      case '*':
        return `Результат: ${number_1} x ${number_2} = ${number_1 * number_2}`;
      case '/':
        return `Результат: ${number_1} ${sign} ${number_2} = ${number_1 / number_2}`;
    }
  },
  blankCalculatorView() {
    calculatorView.blankResultField(); // Model вызывает обновление View
  },
  showCalculatorView(e) {
    calculatorView.showResult(e, this.createEquation(this.firstOperand, this.secondOperand, this.operator)); // model вызывает обновление view
  },
  changeDisabledBtnCondition(bool) { // Функции changeDisabledBtnCondition() и  disableBtnView() можно было бы сделать одной, но я думаю такой вариант лучше покажет как мы контроллером работаем с моделью (т.е. модель изменяет свое состояние реагируя на действия контроллера)
    this.isBtnDisabled = bool;
  },
  disableBtnView() {
    calculatorView.disableBtn(this.isBtnDisabled); // Model вызывает обновление View
  },
}

// View
const calculatorView = {
  resultField: document.getElementById('show-result'),
  button: document.getElementById('calculate-btn'),
  disableBtn(bool) {
    this.button.disabled = bool;
  },
  blankResultField() {
    this.resultField.textContent = '';
  },
  showResult(e, result) {
    e.preventDefault();
    this.resultField.textContent = result;
  },
}

// Controller (контроллер вызывает только методы модели)
const controller = {
  setData(inp1, inp2, inpSign, btn) {
    this.inputNum_1 = inp1;
    this.inputNum_2 = inp2;
    this.inputSign = inpSign;
    this.button = btn;
  },
  addListeners() {
    this.inputNum_1.addEventListener('input', () => { calculator.setOperand('firstOperand', this.inputNum_1.value, this.inputSign.value) });
    this.inputNum_2.addEventListener('input', () => { calculator.setOperand('secondOperand', this.inputNum_2.value, this.inputSign.value) });
    this.inputSign.addEventListener('change', () => { calculator.setOperator(this.inputSign.value) });
    this.button.addEventListener('click', calculator.showCalculatorView.bind(calculator));
  },
  initDisableBtn() {
    calculator.disableBtnView();
  },
}
// Initialization
window.onload = function() {
  const app = {
    inputNum_1: document.getElementById('input_1'),
    inputNum_2: document.getElementById('input_2'),
    inputSign: document.getElementById('sign'),
    button: document.getElementById('calculate-btn'),
    init() {
      controller.setData(this.inputNum_1, this.inputNum_2, this.inputSign, this.button);
      controller.initDisableBtn();
      this.event();
    },
    event() {
      controller.addListeners();
    },
  }
  app.init();
}

// window.addEventListener('load', () => { 
//   controller.initDisableBtn();
//   controller.addListeners();
//  });