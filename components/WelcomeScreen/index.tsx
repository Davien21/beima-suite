import React from "react";
import styles from "./welcome-screen.module.css";
import { Button } from "components";
import { WelcomeImg } from "assets/images";
import { setIsUploadModalOpen } from "store/slices/modalSlice";
import { useDispatch } from "react-redux";
export function WelcomeScreen() {
  const dispatch = useDispatch();

  return (
    <div className={`${styles["container"]} mx-auto text-center mt-32`}>
      <div className="flex justify-center mb-4">
        <WelcomeImg />
      </div>
      <div className="text-center flex justify-center mb-14">
        <div className="w-7/12">
          <h2 className="text-3xl font-semibold mb-6">
            Welcome to Beima Suite
          </h2>
          <p className="">
            Easily document your smart contracts, test and collaborate in
            real-time with your teammates.
          </p>
        </div>
      </div>
      <div className="mb-20">
        <Button
          secondary
          onClick={() => {
            dispatch(setIsUploadModalOpen(true));
          }}
        >
          Create Your First Documentation
        </Button>
      </div>
      <div className="flex justify-center items-center gap-x-5">
        <span>Important Tips:</span>
        <div className="flex gap-x-4">
          <div className="flex items-center">
            <div className="function mr-2">F</div>
            <span
              style={{ color: "#939393" }}
              className="text-sm font-semibold"
            >
              Function
            </span>
          </div>
          <div className="flex items-center">
            <div className="event mr-2">E</div>
            <span
              style={{ color: "#939393" }}
              className="text-sm font-semibold"
            >
              Events
            </span>
          </div>
          <div className="flex items-center">
            <div className="meta mr-2">Pb</div>
            <span
              style={{ color: "#939393" }}
              className="text-sm font-semibold"
            >
              Public
            </span>
          </div>
          <div className="flex items-center">
            <div className="meta mr-2">V</div>
            <span
              style={{ color: "#939393" }}
              className="text-sm font-semibold"
            >
              View
            </span>
          </div>
          <div className="flex items-center">
            <div className="meta mr-2">Pa</div>
            <span
              style={{ color: "#939393" }}
              className="text-sm font-semibold"
            >
              Payable
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
