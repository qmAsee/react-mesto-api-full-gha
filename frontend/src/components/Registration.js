import React from "react";
import { Link } from "react-router-dom";

export function Registration({ onRegister }) {
  const [formValue, setFormValue] = React.useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = formValue;

    onRegister(email, password).then(() => {
      evt.target.reset();
    });
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <section className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h2 className="register__title">Регистрация</h2>
        <input
          className="register__input"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <input
          className="register__input"
          name="password"
          type="password"
          placeholder="Пароль"
          onChange={handleChange}
          required
          autoComplete="off"
        />
        <button className="register__button">Зарегистрироваться</button>
      </form>
      <span className="register__already">
        Уже зарегистрированы?{" "}
        <Link className="register__login" to="/sign-in">
          Войти
        </Link>
      </span>
    </section>
  );
}
