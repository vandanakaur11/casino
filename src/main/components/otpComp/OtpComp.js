import React, { Component, useState } from "react";
import OtpInput from "react-otp-input";

// export default class OTP extends Component {
//     state = { otp: "" };

//     handleChange = (otp) => this.setState({ otp });

//     render() {
//         return <OtpInput value={this.state.otp} onChange={this.handleChange} numInputs={4} separator={<span>-</span>} />;
//     }
// }

const OTP = ({ setForOtp }) => {
    const [otp, setOtp] = useState("");
    function handleChange(otp) {
        setOtp(otp);
    }
    setForOtp(otp);
    console.log(otp);
    return (
        <div style={{ width: "auto" }}>
            <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={6}
                separator={
                    <span>
                        <strong>.</strong>
                    </span>
                }
                inputStyle={{
                    width: "100%",
                    height: "3rem",
                    margin: "0 1rem",
                    fontSize: "2rem",
                    borderRadius: 4,
                    border: "1px solid rgba(0,0,0,0.3)",
                }}
                // onChange={() => handleChange(otp)}
            />
        </div>
    );
};

export default OTP;
