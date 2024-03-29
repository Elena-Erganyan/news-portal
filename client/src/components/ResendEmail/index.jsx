import { useEffect, useRef, useState } from "react";
import { useResendActivationMutation } from "../../redux/api/userApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import "./styles.scss";


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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleClick = () => {
    resendActivation({email});
  };

  return (
    <div className="activation">
      <div className="activation__wrapper">
        
        <p>Не получили письмо активации?</p>
        
        <button
          disabled={isLoading || timer > 0}
          onClick={handleClick}
        >
          Отправить повторно
        </button>

      </div>

      {isSuccess && timer > 0
        ? <p className="success">{data.message}</p>
        : <p className="error">{getErrorMessage(error)}</p>
      }
    
      {timer > 0 
        && <p>Вы можете отправить письмо активации повторно через {timer} секунд</p>}
    </div>
  );
};

export default ResendEmail;
