import React from "react";
import { PASSWORD_LOST } from "../../api";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import UseForm from "../Hooks/UseForm";
import { PASSWORD_RESET } from "../../api";
import UseFetch from "../Hooks/UseFetch";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState("");
  const [key, setKey] = React.useState("");
  const password = UseForm();
  const { error, loading, request } = UseFetch();
  const navigate  = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
      event.preventDefault();
    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });
    const {response} = await request(url, options);
    if(response.ok)  navigate('/login');
  }
  return (
    <div>
      <h1 className="title">Reseta a senha</h1>
      <form onsubmit={handleSubmit}>
        <Input label="Nova senha" type="password" name="password" {...password}/>
        {loading ? (
          <Button disabled>Resetando ...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error}/>
    </div>
  );
};

export default LoginPasswordReset;
