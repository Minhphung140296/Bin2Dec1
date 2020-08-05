import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import { StyledForm, Field, Lable, BinaryTextInput, Button, DecimalTextInput } from './styles';

function App(){
    const [binaryText, setBinaryText] = useState('');
    const [decimalText, setDecimalText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // tạo form thực hiện biểu mẫu gửi
    const onFormSubmit = e =>{
        e.preventDefault();// ngăn chặn làm mới trình duyệt
        //chỉ chấp nhận giá trị nhập vào là 0 và 1
        if(binaryText.match(/^[0-1]+$/g) === null){
            setErrorMessage("Enter either 0 or 1");
            return
        }
        setErrorMessage('') //Đặt lại thông báo lỗi

        /*Công thức:
            input = 1 => output = 1*(2^0) = 1
            input = 10 => output = 0*(2^0)+ (1*(2^1)) = 2
            => tính từ phía sau tính lên
        */
       const reversedbinaryText = binaryText
        .split('')
        .map(Number) // chuyển đổi từ 1 số từ chuỗi
        .reverse()

        //tính kết quả bằng các value trước
        const result = reversedbinaryText.reduce(
            (accumulator, currentValue,idx)=>
                accumulator + currentValue * Math.pow(2,idx)
        )
        setDecimalText(result);
    }

    return (
        <>
            <h1>Binary to Decimal Converter</h1>
            <StyledForm onSubmit={onFormSubmit}>
                {errorMessage && <span style={{color:'red'}}>{errorMessage}</span>}
                <Field>
                    <Lable>Binary Input</Lable>
                    <div>
                        <BinaryTextInput 
                            autoComplete="off"
                            type="text"
                            name='binary'
                            placeholder="enter 0 or 1"
                            value = {binaryText}
                            onChange={e => setBinaryText(e.target.value)}
                        />
                        <Button>Convert</Button>
                    </div>
                </Field>
                <Field>
                    <Lable>Decimal Output</Lable>
                    <DecimalTextInput 
                        type="text"
                        name="decimal"
                        value={decimalText}
                        disabled
                    />
                </Field>
            </StyledForm>
        </>
    );
}
const rootElement = document.getElementById('root')
ReactDOM.render( <App />,rootElement)