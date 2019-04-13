import React, {Component} from 'react';
import './index.css'

const ERR = '请检查算式是否符合规范！';
let isClickEqual = false;
let canDoClickOperator = true;
let canDoClickNum = true;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
        }
    }


    handleClick = (e) => {
        const {inputValue} = this.state;
        const itemText = e.text;
        const itemValue = e.value;
        let tempText;
        tempText = inputValue;
        switch (itemValue) {
            case 'clear':
                tempText = '';
                isClickEqual = false;
                canDoClickOperator = true;
                canDoClickNum = true;
                break;
            case 'back':
                if (isClickEqual) {
                    tempText = '';
                    isClickEqual = false;
                    canDoClickOperator = true;
                    canDoClickNum = true;
                } else {
                    tempText = tempText.substring(0, tempText.length - 1);
                }
                break;
            case '×':
            case '-':
            case '÷':
            case '+':
                if (canDoClickOperator) {
                    tempText += itemText;
                    canDoClickOperator = false;
                    canDoClickNum = true;
                }
                break;
            case '=':
                if (!isClickEqual &&canDoClickOperator) {
                    let val = this.cal(tempText);
                    if (!isFinite(val)) {
                        alert(ERR);
                        break;
                    }
                    tempText = tempText + itemText + val;

                    canDoClickOperator = false;
                    canDoClickNum = false;
                    isClickEqual = true;
                }
                break;
            default:
                if (canDoClickNum) {
                    tempText += itemText;
                    canDoClickOperator = true;
                }
        }

        this.setState({
            inputValue: tempText,
        })
    };
    //计算算法
    cal = (str) => {
        let arr = [];
        let op;

        op = str.trim().split(' ');
        for (let i = 0; i < op.length; i++) {
            switch (op[i]) {
                case '-':
                    let temp = 0 - op[++i];
                    arr.push(temp);
                    break;
                case '×':
                    let temp1 = arr.pop();
                    let temp2 = temp1 * op[++i];
                    arr.push(temp2);
                    break;
                case '÷':
                    let temp3 = arr.pop();
                    let temp4 = temp3 / op[++i];
                    arr.push(temp4);
                    break;
                default:
                    arr.push(op[i]);
            }
        }
        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            if (!isNaN(arr[i])) {
                sum += parseFloat(arr[i]);
            }
        }
        return sum
    };

    render() {
        //作用域绑定
        let self = this;
        const {inputValue} = this.state;

        const colums = [{value: 1, text: 1,}, {value: 2, text: 2,}, {value: 3, text: 3,}, {value: 'back', text: '删除',},
            {value: 4, text: 4,}, {value: 5, text: 5,}, {value: 6, text: 6,}, {value: '+', text: ' + ',},
            {value: 7, text: 7,}, {value: 8, text: 8,}, {value: 9, text: 9,}, {value: '-', text: ' - ',},
            {value: '.', text: '.',}, {value: 0, text: 0,}, {value: '×', text: ' × ',}, {value: '÷', text: ' ÷ ',},
            {value: '=', text: ' = ',}, {value: 'clear', text: '清空',},];

        const ele = colums.map(function (value, index, array) {
            return <button key={index} onClick={self.handleClick.bind(self, value)}
                           className='btn'>{value.text}</button>
        });


        return (
            <div className="main">
                <div className='cal'>
                    <div>
                        <input type='text' value={inputValue} readOnly={true} className='input'/>
                    </div>
                    {ele}
                </div>
            </div>
        );
    }
}

export default App;
