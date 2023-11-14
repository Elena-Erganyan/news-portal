import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useActivateUserMutation } from "../../redux/api/userApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { XCircle, CheckCircle } from "@phosphor-icons/react";
import "./styles.scss";


const Activation = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");
  const navigate = useNavigate();

  const [activateUser, { isLoading, data, error }] = useActivateUserMutation();

  useEffect(() => {
    activateUser({token});
    let timeoutId = setTimeout(()=> navigate("/login"), 3000);

    return () => clearTimeout(timeoutId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading
    ? <p>Загрузка...</p>
    : <main className="activationMessage">
        {error
          ? <XCircle size={100} weight="duotone" color="crimson" />
          : <CheckCircle size={100} weight="duotone" color="#43c7c7" />
        }

        <h1>{error ? getErrorMessage(error): data?.message}</h1>
      </main>
};

export default Activation;
