import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom';
import App from '../App';
import Login from '../components/login';
import { BrowserRouter } from 'react-router-dom';
import { JoinRoom } from '../components/joinRoom';

//App
test("App renders", async () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                 <App />
            </BrowserRouter>
        </React.StrictMode>,
      div
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  });

//Login
test('Test login state', () => {
    let login = new Login({});
    expect(login.state.Password).toEqual('');
});

//JoinRoom
test('Test joinRoom render', async () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                 <JoinRoom />
            </BrowserRouter>
        </React.StrictMode>,
      div
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
})

