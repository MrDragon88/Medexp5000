import SignIn from "./Signin";
import {useState} from 'react';
import {publicAxios} from '../../Lib/apiClient';


const SigninPage = ()=>{

    const [txtCorreo, setTxtCorreo] = useState('');
    const [txtPassword, setTxtPassword] = useState('');
 

    const onChangeHandler = ({target: {name,value}})=>{
        switch (name){
            case 'txtCorreo':
                setTxtCorreo(value);
            break;
            
            case 'txtPassword':
                setTxtPassword(value);
            break;
            
        }
    }
/*
    const onChangeHandler = (e)=>{
        const {name, value} = e.target;
    }
*/

const onConfirm = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    try{

        const data = publicAxios.post(
            '/api/v1/seguridad/signin',
            
            {
                email:txtCorreo,
                password:txtPassword
            });
    
        console.log('Signin Request: ',data)
    }catch(ex){
        console.log('Error on Signin submit',ex)
    }

}
const onCancel =(e)=>{
    e.preventDefault();
    e.stopPropagation();
}
    return(
        <>
            <SignIn
                txtCorreoValue = {txtCorreo}
                txtPasswordValue = {txtPassword}
                onChange = {onChangeHandler}
                errorTxtCorreo = ''
                errorPassword = ''
                onConfirmClick = {onConfirm}
                onCancelClick = {onCancel}
            />
        <hr />
        {`${txtCorreo} - ${txtPassword}`}
        </>
    );
}

export default SigninPage;