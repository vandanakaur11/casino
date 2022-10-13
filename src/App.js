import React, { useState } from "react";
import Layout from "./main/layout/Layout";
import { AppContext } from "./contextApi";

const App = () => {

    let initialState = {
        totalCredit: 0,
        totalDebit: 0,
        gameSort: 'ALL GAMES',
        uRemoteId: '',
        gameMode: true
    };

    let auth = localStorage.getItem('auth');
    if (auth) {
        initialState.singined = true;
    } else {
        initialState.singined = false;
    }

    let currentBalnce = localStorage.getItem('currentBalnce')

    if (currentBalnce) {
        initialState.headerBalance = currentBalnce
    } else {
        initialState.headerBalance = 0;
    }

    const [appState, setAppState] = useState(initialState);

    const applyAction = (action, payload) => {
        switch (action) {
            case 'signin':
                setAppState((pre) => ({
                    ...pre,
                    singined: payload.singined
                }))
                break;
            case 'set balance':
                setAppState((pre) => ({
                    ...pre,
                    headerBalance: payload?.toLocaleString()
                }))
                break;
            case 'sort':
                setAppState((pre) => ({
                    ...pre,
                    gameSort: payload
                }))
                break;
            case 'toggle-mode':
                setAppState((pre) => ({
                    ...pre,
                    gameMode: payload
                }))
                break;
            case 'set-remote-id':
                setAppState((pre) => ({
                    ...pre,
                    uRemoteId: payload
                }))
                break
            default:
                break;
        }
    }

    return (
        <div>
            <AppContext.Provider value={{ appState, applyAction }}>

                <Layout />

            </AppContext.Provider>
        </div>
    );
};
export default App;
