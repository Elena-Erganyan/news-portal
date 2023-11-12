import { useEffect, useRef, useState } from 'react';
import { useResendActivationMutation } from '../../redux/api/userApi';
import { getErrorMessage } from '../../utils/getErrorMessage';
import Button from '../Button';
import AlertMessage from '../AlertMessage';
import { StyledResendEmailWrapper } from './styled';
import { StyledFormText } from '../Form/styled';


const ResendEmail = ({ email }) => {

  const [resendActivation, {isLoading, isSuccess, error, data}] = useResendActivationMutation();

  const [timer, setTimer] = useState(0);

  const id = useRef();
  
  useEffect(() => {
    if (timer === 0) {
      window.clearInterval(id.current);
    }

    id.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
    
    return () => window.clearInterval(id.current);
  }, [timer]);

  useEffect(() => {
    if (isSuccess) {
      setTimer(90); // cooldown period in seconds
    }
  }, [isLoading]);

  const handleClick = () => {
    resendActivation({email});
  };

  return (
    <div>
      <StyledResendEmailWrapper>
        
        <StyledFormText>Didn't get the activation email?</StyledFormText>
        
        <Button
          color="blue"
          hoverColor="lightBlue"
          style={{alignSelf: 'flex-start'}}
          disabled={isLoading || timer > 0}
          onClick={handleClick}
        >
          Resend
        </Button>

      </StyledResendEmailWrapper>

      <AlertMessage
        enabled={Boolean(data || error)}
        message={{
          state: isSuccess && timer > 0 ? 'success' : 'error',
          text: isSuccess && timer > 0 ? data!.message : getErrorMessage(error) as string
        }}
      />
    

      {timer > 0 && <StyledFormText style={{marginTop: '2rem'}}>
                      You can resend the activation email in {timer} seconds
                    </StyledFormText>}
    </div>
    );
};

export default ResendEmail;
