import logo from './logo.svg';
import './App.css';
//import {Title} from './Components/UX/Title';
//import Page from './Components/UX/Page/Page';
import Splash from './Components/Views/Splash';
//import SignIn from './Components/Views/Signin';
import SignIn from './Components/Views/SigninPage';


function App() {
  return (
    /*<div>
      <Title>Hola Mundo Cruel</Title>
    </div>
    */
/*
    <Page 
      header ={(<h2>Pagina Principal</h2>)}
      footer = {(<nav><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul></nav>)}
    >
       <section>
          <p>
            Dolor est anim est sunt proident ad quis nulla commodo id irure in nisi. Amet eu sunt labore exercitation anim exercitation elit non labore tempor incididunt sit. Proident magna quis eu laborum aute est mollit consectetur. Est nisi excepteur cillum duis eu labore.
          </p>
       </section>
   </Page>
   */

   <SignIn></SignIn>
  );
}

export default App;
