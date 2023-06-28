import React from "react";

export function Login({ onLogin }) {
  const [formValue, setFormValue] = React.useState({});

  function handleSetEmail(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSetPassword(evt) {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;

    onLogin(email, password).then(() => {
      evt.target.reset();
    });
  }

  return (
    <section className="login">
      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <h2 className="login__title">Вход</h2>
        <input
          className="login__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleSetEmail}
          required
          autoComplete="off"
        />
        <input
          className="login__input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleSetPassword}
          required
          autoComplete="off"
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
