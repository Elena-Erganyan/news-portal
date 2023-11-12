import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/userApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import ResendEmail from "../../components/ResendEmail";


const Register = () => { 
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({name: "", username: "", email: "", password: ""});
  const [showResendSection, setShowResendSection] = useState(false);

  const [register, { isLoading, isSuccess, error, data = {} }] = useRegisterMutation();

  useEffect(() => {
    let resendTimerId;
    if (isSuccess) {
      resendTimerId = window.setTimeout(() => setShowResendSection(true), 9000);
    }
    
    if (error) {
      const errorData = getErrorMessage(error);
      if (typeof(errorData) === "object") {
        setErrors((prevErrors) => ({...prevErrors, ...errorData}));
      } else {
        setErrorMessage(errorData);
      }
    } else {
      if ("message" in data){
        setMessage(data.message);
      }
    }
    return () => clearTimeout(resendTimerId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setErrors({name: "", username: "", email: "", password: ""});
    setMessage("");
    setErrorMessage("");
    
    register({name, username, email, password});
  };

  return (
    <form className="register" onSubmit={handleSubmit}>
      <h2>Зарегистрироваться</h2>

      <label>
        Имя
        <input
          id="name"
          maxLength={20}
          name="name"
          onChange={(evt) => setName(evt.target.value)}
          placeholder="Максимум 20 символов"
          type="text"
          value={name}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </label>

      <label>
        Юзернейм
        <input
          id="username"
          maxLength={20}
          name="username"
          onChange={(evt) => setUsername(evt.target.value)}
          placeholder="Максимум 20 символов, без пробелов"
          type="text"
          value={username}
        />
        {errors.username && <p className="error">{errors.username}</p>}
      </label>

      <label>
        Электронная почта
        <input
          id="email"
          name="email"
          onChange={(evt) => setEmail(evt.target.value)}
          type="email"
          value={email}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </label>

      <label>
        Пароль
        <p className="note">(должен состоять из минимум 8 символов и включать строчные и заглавные буквы, цифры и символы)</p>
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
          ? <p>Регистрируем пользователя...</p>
          : <button type="submit">Зарегистрироваться</button>
        }
        
        <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
      </div>
        
      {showResendSection && <ResendEmail email={email} />}
      {errorMessage && <p className="error">{errorMessage}</p>}
      {message && <p className="success-msg">{message}</p>}
    </form>
  );
};

export default Register;
