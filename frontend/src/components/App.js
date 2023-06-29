import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { InfoTooltip } from "./InfoTooltip";
import { auth } from "../utils/Authentification";
import { Login } from "./Login";
import { Registration } from "./Registration";
import ProtectedRouteElement from "./ProtectedRoute.js";

function App() {
  const [imagePopup, setImagePopup] = React.useState({});
  const [isAddPopupOpened, setIsAddPopupOpened] = React.useState(false);
  const [isEditProfilePopupOpened, setIsEditProfilePopupOpened] = React.useState(false);
  const [isEditAvatarPopupOpened, setIsEditAvatarPopupOpened] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [infoToolTipOpened, setInfoToolTipOpened] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn) {
      api
        .getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((cardElements) => {
          setCards(cardElements);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const isAnyPopupOpened =
    imagePopup ||
    isEditProfilePopupOpened ||
    isEditAvatarPopupOpened ||
    infoToolTipOpened;

  React.useEffect(() => {
    function escClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    isAnyPopupOpened
      ? document.addEventListener("keyup", escClose)
      : document.removeEventListener("keyup", escClose);
  }, [isAnyPopupOpened]);

  function handleSetUser(userInfo) {
    setLoading(true);

    api
      .setUserInfo(userInfo)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar(ava) {
    setLoading(true);

    api
      .putAvatar(ava)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    api
      .putLike(card._id, !isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((item) => (item._id === card._id ? newCard : item))
        )
      )
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() =>
        setCards((state) => state.filter((item) => item._id !== card._id))
      )
      .catch((err) => console.log(err));
  }

  function handleAddCardSubmit(newCard) {
    setLoading(true);

    api
      .addCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      return auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          navigate("/main", { replace: true });
        })
        .catch((err) => console.log(err));
    }
  }

  React.useEffect(() => {
    handleTokenCheck();
    return () => {};
}, []);

  function handleLoginUser(email, password) {
    return auth
      .signIn(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate("/main", { replace: true });
        }
      })
      .catch(() => {
        setInfoToolTipOpened(true);
        setIsSuccessful(false);
      });
  }

  async function handleRegisterUser(email, password) {
    try {
      const res = await auth.signUp(email, password);
      if (res.data.email) {
        navigate("/sign-in", { replace: true });
        setInfoToolTipOpened(true);
        setIsSuccessful(true);
      }
    } catch {
      setInfoToolTipOpened(true);
      setIsSuccessful(false);
    }
  }

  function handleNavRegistration() {
    navigate("/sign-up", { replace: true });
  }

  function handleNavLogin() {
    navigate("/sign-in", { replace: true });
  }

  function handleNavExit() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  function closeAllPopups() {
    setImagePopup({});
    setIsAddPopupOpened(false);
    setIsEditProfilePopupOpened(false);
    setIsEditAvatarPopupOpened(false);
    setInfoToolTipOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          navRegistration={handleNavRegistration}
          navLogin={handleNavLogin}
          navExit={handleNavExit}
        />

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/main" /> : <Navigate to="sign-in" />
            }
          />
          <Route
            path="/sign-up"
            element={<Registration onRegister={handleRegisterUser} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLoginUser} />}
          />
          <Route
            path="/main"
            element={
              <ProtectedRouteElement
                element={Main}
                onCardClick={setImagePopup}
                onAddCard={setIsAddPopupOpened}
                onEditProfile={setIsEditProfilePopupOpened}
                onEditAvatar={setIsEditAvatarPopupOpened}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                isLoggedIn={isLoggedIn}
              />
            }
          />
        </Routes>

        {isLoggedIn && <Footer />}

        <EditProfilePopup
          isOpened={isEditProfilePopupOpened}
          onClose={closeAllPopups}
          onSetUser={handleSetUser}
          loading={loading}
        />
        <EditAvatarPopup
          onSetAvatar={handleUpdateAvatar}
          isOpened={isEditAvatarPopupOpened}
          onClose={closeAllPopups}
          loading={loading}
        />
        <ImagePopup card={imagePopup} onPopupClose={closeAllPopups} />
        <AddPlacePopup
          onAddCard={handleAddCardSubmit}
          isOpened={isAddPopupOpened}
          onClose={closeAllPopups}
          loading={loading}
        />
        <InfoTooltip
          name={"successful"}
          isSuccessful={isSuccessful}
          isOpened={infoToolTipOpened}
          onPopupClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
