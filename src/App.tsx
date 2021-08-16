import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./styles/App.css";
import socketService from "./services/socketService";
import { JoinRoom } from "./components/joinRoom";
import GameContext, { IGameContextProps } from "./context/gameContext";
import { Game } from "./components/game";
import Messages from "./components/chat";
import ReactDOM from "react-dom";
import Login from "./components/login";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

//Styles
const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;
const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 50px;
`;
const MainContainer = styled.div`
  margin-left: 160px;
  padding: 0px 10px;
`;
const SideContainer = styled.div`
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 350px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
  z-index: 1; /* Stay on top */
  top: 0; /* Stay at the top */
  left: 0;
  background-color: beige;
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 20px;
`;
const Padding = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`;
const Options = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  text-align: center; 
`;
const RegularContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);

  const connectSocket = async () => {
    const socket = await socketService
      .connect("https://servertictactoe.azurewebsites.net/")
      .catch((err: any) => {
        console.log("Error: ", err);
      });
  };

  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  const LogIn = () => {
    ReactDOM.render(<Login />, document.getElementById('root'))
  }
  const LogOut = () => {
    localStorage.removeItem('registeredKey');
    console.log("Logout attempt reached");
    NotLoggedIn();
  }

  const NotLoggedIn = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  const Welcome = () => {
    return (<><WelcomeText>Welcome to Tic-Tac-Toe <b>Guest</b></WelcomeText><Options><button onClick={LogIn}>Sign In</button></Options></>
    )
  }
  const Screen = () => {
    if (!isInRoom) {
      return (<JoinRoom/>)   
    } else  {
      return(<SplitScreenContainer/>)
    }
  }
  const SplitScreenContainer = () => {
    return(<><MainContainer><Game /></MainContainer><SideContainer><Messages /></SideContainer></>);
  }

  if (localStorage.getItem('registeredKey') === '' || localStorage.getItem('registeredKey') === null) {
    return (
      <Router>
        <Switch>
            <Route path="/" exact><Welcome/></Route>
         </Switch>
      </Router>
    )
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>

        <WelcomeText>Welcome to Tic-Tac-Toe <b>{localStorage.getItem('registeredKey')}</b></WelcomeText>
        <Padding>
          <button onClick={LogOut}>Log Out</button>
        </Padding>

        <Screen/>

      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;