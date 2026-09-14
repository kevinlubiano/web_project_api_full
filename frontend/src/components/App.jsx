import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { api } from "../utils/api";
import { authorize, register } from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const navigate = useNavigate();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setIsCheckingAuth(false);
      return;
    }

    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData.data || userData);
        setLoggedIn(true);
        setIsCheckingAuth(false);

        return api.getInitialCards();
      })
      .then((cardsData) => {
        setCards(cardsData.data || cardsData);
      })
      .catch((error) => {
        console.error(error);
        setIsCheckingAuth(false);
      });
  }, []);

  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  async function handleCardLike(card) {
    const isLiked = card.likes?.some((like) => like._id === currentUser._id);

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);

      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) => console.error(error));
  }

  function handleLogin({ email, password }) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return api.getUserInfo();
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoggedIn(true);
        navigate("/");

        return api.getInitialCards();
      })
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => {
        console.error("ERROR LOGIN:", error);
      });
  }

  function handleRegister({ email, password }) {
    register(email, password)
      .then(() => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: true,
        });
      })
      .catch((error) => {
        console.error(error);

        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
        });
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setCurrentUser({});
    navigate("/signin");
  }

  function handleCloseInfoTooltip() {
    setInfoTooltip({
      isOpen: false,
      isSuccess: false,
    });
  }

  return (
    <>
      <Routes>
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />

        <Route
          path="/signup"
          element={<Register onRegister={handleRegister} />}
        />

        <Route
          element={
            <ProtectedRoute
              loggedIn={loggedIn}
              isCheckingAuth={isCheckingAuth}
            />
          }
        >
          <Route
            path="/"
            element={
              <CurrentUserContext.Provider
                value={{
                  currentUser,
                  handleUpdateUser,
                  handleUpdateAvatar,
                  handleAddPlaceSubmit,
                }}
              >
                <div className="page">
                  <div className="page__content">
                    <Header
                      email={currentUser.email}
                      loggedIn={loggedIn}
                      onLogout={handleLogout}
                    />

                    <Main
                      cards={cards}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                      onOpenPopup={handleOpenPopup}
                      onClosePopup={handleClosePopup}
                      popup={popup}
                    />

                    <Footer />
                  </div>
                </div>
              </CurrentUserContext.Provider>
            }
          />
        </Route>
      </Routes>

      <InfoTooltip
        isOpen={infoTooltip.isOpen}
        onClose={handleCloseInfoTooltip}
        isSuccess={infoTooltip.isSuccess}
      />
    </>
  );
}

export default App;
