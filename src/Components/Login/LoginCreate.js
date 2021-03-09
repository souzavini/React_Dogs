import React from "react";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import UseForm from "../Hooks/UseForm";
import { USER_POST } from "../../api.js";
import UserContext from "../../UserContext";
import UseFetch from "../Hooks/UseFetch";
import Error from "../Helper/Error";

const LoginCreate = () => {
  const username = UseForm();
  const email = UseForm("email");
  const password = UseForm();

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = UseFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });
    const { response } = await request(url, options);
    console.log(response);
    if (response.ok) userLogin(username.value, password.value);
  }
  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input label="Usuario" type="text" name="username" {...username} />
        <Input label="Email" type="text" name="username" {...email} />
        <Input label="Senha" type="password" name="username" {...password} />
        {loading ? (
          <Button disabled>Cadastrando ...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error}/>
      </form>
    </section>
  );
};

export default LoginCreate;
