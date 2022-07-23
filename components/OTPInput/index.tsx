import { toast } from "react-toastify";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./otp.module.scss";
import OtpInput from "react-otp-input";
import { Button } from "components";
import { VerifiedIcon } from "assets/images";

export function OTPInput({
  isVerified,
  onVerify,
  steps,
}: {
  isVerified: boolean;
  onVerify: (otp: string) => void;
  steps: number;
}) {
  const [otp, setOtp] = useState("");

  const handleChange = (value: string) => {
    setOtp(value);
  };

  useEffect(() => {
    if (otp.length === steps) {
      onVerify(otp);
    }
  }, [otp, onVerify, steps]);

  return (
    <div className={styles.opt__con}>
      <h6 className="mb-1">OTP Code</h6>
      <div className={styles.inner__otp__con}>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          separator={<span style={{ width: "8px" }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          containerStyle={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
          }}
          inputStyle={{
            border: "1px solid rgba(184, 186, 191, 0.2)",
            width: "54px",
            height: "54px",
            background: "rgba(184, 186, 191, 0.04)",
            fontSize: "30px",
            fontWeight: "500",
            borderRadius: "10px",
            transition: "all 0.3s ease-in-out",
          }}
          focusStyle={{
            border: "1px solid var(--app-blue)",
            outline: "none",
          }}
        />
        <span
          className={
            isVerified ? styles.verification__con : styles.notverified__con
          }
        >
          <VerifiedIcon /> <h6>{isVerified ? "Verified" : "Unverified"} </h6>
        </span>
      </div>
      {/* <h3 className={styles.otp__timer}>4mins 2secs remaining</h3> */}
    </div>
  );
}
