import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import ResendEmail from "../../components/ResendEmail";


const Login = () => {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({identifier: "", password: ""});
  const [showResendSection, setShowResendSection] = useState(false);

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    let timeoutId;
    if (error) {
      const errMessage = getErrorMessage(error);
      if (errMessage.indexOf("пароль") !== -1) {
        setErrors((prevErrors) => ({...prevErrors, password: errMessage}));
      } else if (errMessage.indexOf("юзернейм") !== -1 || errMessage.indexOf("электронная почта") !== -1) {
        setErrors((prevErrors) => ({...prevErrors, identifier: errMessage}));
      } else {
        setErrorMessage(errMessage);
        if (errMessage === "Пожалуйста, активируйте свою учётную запись, чтобы войти") {
          setTimeout(() => setShowResendSection(true), 3000);
        }
      }
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setErrors({identifier: "", password: ""});
    setErrorMessage('');
    setMessage('');

    login({identifier, password});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Войти</h2>

      <label>
        Идентификатор
        <input
          id="identifier"
          name="identifier"
          onChange={(evt) => setIdentifier(evt.target.value)}
          placeholder="Юзернейм или email"
          type="text"
          value={identifier}
        />
        {errors.identifier && <p className="error">{errors.identifier}</p>}
      </label>

      <label>
        Пароль
        <input
          id="password"
          name="password"
          onChange={(evt) => setPassword(evt.target.value)}
          type="password"
          value={password}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </label>

      <div className="form__footer">
        {isLoading
          ? <p>Загрузка...</p>
          : <button type="submit">Войти</button>
        }

        <p>Ещё нет учетной записи? <Link to="/register">Зарегистрироваться</Link></p>
      </div>

      {showResendSection && <ResendEmail email={identifier} />}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {message && <p className="success">{message}</p>}
    </form>
  );
};

export default Login;
