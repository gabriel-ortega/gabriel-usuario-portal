import { useSelector } from 'react-redux';
import { LoginLayout } from './layout/LoginLayout'
import SignUp from './views/signUp';
import SignUp2 from './views/signUp2';

export const RegisterPage = () => {
  const { regStage } = useSelector(state => state.auth);
  const title = (regStage===1 || regStage==null) ? "Please provide your basic information" : "Provide your account credentials"
    
  
  return (
    <LoginLayout title={title}>
      {
        (regStage === 2)
        ?<SignUp2/>
        :<SignUp/>
      }
    </LoginLayout>
  )
}
