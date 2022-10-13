import React, { useState } from "react";
import classes from "./SettingsComponent.module.css";
import { Button, Switch } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router-dom";

const General = () => {
    const history = useHistory();
    const [message, setMessage] = useState('');
    const [updateMessage, setUpdateMessage] = useState('');
    const [Info, setInfo] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        cEmail: localStorage.getItem('email'),
        remote_id: localStorage.getItem('remoteId'),
        email: '',
        address: '',
        city: '',
        password: '',
        cPassword: ''
    });

    const updateUser = async () => {
        try {

            if (Info.cPassword === Info.password && Info.cPassword && Info.password) {
                const update = await axios.post('https://runescape-casino-api.herokuapp.com/api/v1/user/user-update', Info);
                console.log(update)
                if (update.data.status === 200) {
                    let auth = localStorage.getItem('auth');
                    auth = JSON.parse(auth);
                    auth = {
                        token: auth.token,
                        email: update.data.response.email,
                        name: update.data.response.name,
                        remote_id: update.data.response.remote_id
                    }

                    auth = JSON.stringify(auth);
                    localStorage.setItem('auth', auth);
                    localStorage.setItem('email', update.data.response.email);
                    setUpdateMessage(update.data.message);

                    setTimeout(() => {
                        setUpdateMessage('');
                    }, 3000);

                }

                if (update.data.status === 400) {
                    setMessage(update.data.response)
                    setTimeout(() => {
                        setMessage('');
                    }, 3000)

                }

            } else {
                setMessage('password not match');
                setTimeout(() => {
                    setMessage('');
                }, 3000)
            }

        } catch (error) {
            console.log(`Error: ${error.message}`)
        }
    }

    return (
        <div className={classes.settingsComponent}>
            <form className={classes.settingsComponentForm}>
                <div className={classes.settingsComponentFormMain}>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>First Name</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                firstname: e.target.value
                            })
                        }} />
                    </div>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>Last Name</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                lastname: e.target.value
                            })
                        }} />
                    </div>
                </div>
                <div className={classes.settingsComponentFormMain}>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>Phone Number</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                phone: e.target.value
                            })
                        }} />
                    </div>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>Email</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                email: e.target.value
                            })
                        }} />
                    </div>
                </div>
                <div className={classes.settingsComponentFormMain}>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>Address</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                address: e.target.value
                            })
                        }} />
                    </div>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>City</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                city: e.target.value
                            })
                        }} />
                    </div>
                </div>
                <div className={classes.settingsComponentFormMain}>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>New Password</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                password: e.target.value
                            })
                        }} />
                    </div>
                    <div className={classes.settingsComponentFormMainInput}>
                        <label>Confirm New Password</label>
                        <input type="text" onChange={(e) => {
                            setInfo({
                                ...Info,
                                cPassword: e.target.value
                            })
                        }} />
                    </div>
                </div>
                <p style={{ textAlign: 'center', color: 'green' }} >{updateMessage}</p>
                <p style={{ textAlign: 'center', color: 'red' }} >{message}</p>
                <Button variant="contained" className={classes.settingsComponentBtn} onClick={updateUser}>
                    Save Changes
                </Button>
            </form>

            <div className={classes.settingsComponentContent}>
                <h2>Marketing Prefrences</h2>
                <p>Be informed of our products and services via:</p>

                <div className={classes.settingsComponentContentMain}>
                    <div className={classes.generalSwitchs}>
                        <div className={classes.Switch}>
                            <h3>E-Mail</h3>
                            <span className={classes.SwitchSpan}></span>
                            <Switch />
                        </div>
                        <div className={classes.Switch}>
                            <h3>SMS</h3>
                            <span className={classes.SwitchSpan}></span>
                            <Switch />
                        </div>

                        <p>
                            We use your personal data to provide you with tailor-made promotions, bonuses, missions and game recommendations
                            to optimise your playing experience. You can opt in/out of these services below
                        </p>
                    </div>
                    <div className={classes.generalSwitchs}>
                        <div className={classes.Switch}>
                            <h3>Telehpone</h3>
                            <span className={classes.SwitchSpan}></span>
                            <Switch />
                        </div>

                        <div className={classes.Switch}>
                            <h3>Direct Mail</h3>
                            <span className={classes.SwitchSpan} />
                            <Switch />
                        </div>
                        <p>
                            If you would like to stop receiving marketing communications from us in general, please ensure that all mediums
                            above are de-selected. Alternatively, you can choose to receive communications by specific mediums only.
                        </p>
                    </div>
                    {/* <div className={classes.settingsComponentSwitchs}>
                </div> */}
                </div>

                <Button variant="contained" className={classes.settingsComponentBtn}>
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default General;
