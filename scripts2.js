// Model
const calculator = {
  isBtnDisabled: true,
  setOperand: function(operand, num) {
    operand === 'firstOperand' ? this.firstOperand = num : this.secondOperand = num;
            console.log(operand, 'num', num, 'this.firstOperand', this.firstOperand, 'this.secondOperand', this.secondOperand, 'this.operator', this.operator)
  },
  setOperator: function(sign) {
    this.operator = sign;
    console.log('this.operator', sign)
  },
  createEquation(a, b, sign) {
    if (sign === '/' && b === 0) {
      return `На ноль делить нельзя`;
    }
    switch(sign) {
      case '+':
        return `Результат: ${a} ${sign} ${b} = ${a + b}`;
      case '-':
        return `Результат: ${a} ${sign} ${b} = ${a - b}`;
      case '*':
        return `Результат: ${a} x ${b} = ${a * b}`;
      case '/':
        return `Результат: ${a} ${sign} ${b} = ${a / b}`;
    }
  },
  blankCalculatorView: function() {
    calculatorView.blankResultField(); // model вызывает обновление view
  },
  showCalculatorView: function(e) {
    calculatorView.showResult(e, this.createEquation(this.firstOperand, this.secondOperand, this.operator)); // model вызывает обновление view
  },
      changeDisabledBtnCondition(bool) { // Эту и следующую функцию можно было бы сделать одной, но я думаю такой вариант лучше покажет как мы контроллером работаем с моделью (т.е. модель изменяет свое состояние реагируя на действия контроллера)
        this.isBtnDisabled = bool;
      },
      disableBtnView: function() {
        calculatorView.disableBtn(this.isBtnDisabled); // model вызывает обновление view
      },
  log: function() {
    console.log('ddd')
  }
}

// View
const calculatorView = {
  resultField: document.getElementById('show-result'),
  button: document.getElementById('calculate-btn'),
  disableBtn: function(bool) {
    this.button.disabled = bool;
  },
  blankResultField: function() {
    this.resultField.textContent = '';
  },
  showResult: function(e, result) {
    console.log('qqq')
    e.preventDefault();
    this.resultField.textContent = result;
  }
}

// Controller (контроллер вызывает только методы модели)
const controller = {
  inputNum_1: document.getElementById('input_1'),
  inputNum_2: document.getElementById('input_2'),
  inputSign: document.getElementById('sign'),
  button: document.getElementById('calculate-btn'),
  addListeners: function() {
    this.inputNum_1.addEventListener('input', this.validateInputs.bind(controller));
    this.inputNum_2.addEventListener('input', this.validateInputs.bind(controller));
    this.inputSign.addEventListener('change', this.validateInputs.bind(controller));
    this.button.addEventListener('click', calculator.showCalculatorView.bind(calculator));
  },
  validateInputs: function() {
    if (!this.inputNum_1.value || !this.inputNum_2.value) {
      calculator.changeDisabledBtnCondition(true);
      calculator.disableBtnView();
      calculator.blankCalculatorView();
      console.log('no')
    } else {
      calculator.changeDisabledBtnCondition(false);
      calculator.disableBtnView();
      calculator.setOperand('firstOperand', Number(this.inputNum_1.value));
      calculator.setOperand('secondOperand', Number(this.inputNum_2.value));
      calculator.setOperator(this.inputSign.value);
      console.log('yes')
    }
  },
  initDisableBtn: function() {
    calculator.disableBtnView();
  }
}

window.addEventListener('load', () => { 
  controller.initDisableBtn();
  controller.addListeners();
 });