import Page from '../UX/Page/Page';
import Input from '../UX/Forms/Input';
import { PrimaryButton, SecondaryButton } from '../UX/Forms/Button';

const SignIn =({txtCorreoValue, 
    txtPasswordValue, 
    onChange:onChangeHandler,
    errorTxtCorreo, 
    errorPassword,
    onConfirmClick,
    onCancelClick
}) =>{

    return(
       <Page header = {(<h2>Crear Cuenta</h2>)}>
           <section>
               <Input
                label = "Correo Electronico" 
                type= "text" 
                name= "txtCorreo"
                placeholder="Su correo electronico" 
                value= {txtCorreoValue}
                hasError="" 
                error={errorTxtCorreo} 
                info="" 
                onChange={onChangeHandler}
                />
               <Input
                label = "Correo Contrasenia" 
                type= "password" 
                name= "txtPassword"
                placeholder="Contrasenia" 
                value= {txtPasswordValue} 
                hasError="" 
                error={errorPassword}
                info="Minimo 8 caracteres, una mayuscula, una minuscula, un numero y un simbolo"
                onChange={onChangeHandler} 
                />

                <PrimaryButton /*className="pill"*/ onClick={onConfirmClick}>
                    Crear Cuenta
                </PrimaryButton>

                <SecondaryButton onClick={onCancelClick}>
                    Tengo Cuenta
                </SecondaryButton>
           </section>
       </Page> 
    );
}

export default SignIn;