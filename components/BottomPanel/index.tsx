import { ClosePanelIcon } from "assets/images";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./bottom-panel.module.css";

export function BottomPanel() {
  const contracts = useSelector((state: any) => state.contracts);
  const hasContracts = contracts.length > 0;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const PanelVariants = {
    shrink: {
      padding: "10px",
    },
    grow: {
      padding: "70px",
    },
  };

  let containerClass = `gap-3 ${styles["container"]}`;
  if (isOpen) containerClass += ` ${styles["active"]}`;

  let closePanelBtnClass = `${styles["close-panel-btn"]} gap-x-3`;
  return (
    <>
      {hasContracts ? (
        <motion.div
          initial="grow"
          animate={isOpen ? "grow" : "shrink"}
          variants={PanelVariants}
          className={containerClass}
        >
          <div className={`${styles["body"]} gap-3`}>
            <BulbIcon isGrown={!isOpen} />
            <p className="grey">Smart contract testing is coming soon</p>
          </div>
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={closePanelBtnClass}
          >
            <ClosePanelIcon />
            <span className="grey">{isOpen ? "Close" : "Open"} Panel</span>
          </div>
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}

const BulbIcon = ({ isGrown }: { isGrown: boolean }) => {
  return (
    <svg
      style={isGrown ? { width: 26, height: 26 } : {}}
      width="48"
      height="63"
      viewBox="0 0 48 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.0879 47.5002H21.0833V32.9168H26.9167V47.5002H29.9121C30.2971 43.9943 32.085 41.101 34.9871 37.9422C35.3167 37.5864 37.4138 35.4135 37.6617 35.1043C39.7217 32.5308 41.0129 29.4277 41.3866 26.1524C41.7603 22.8772 41.2013 19.563 39.7741 16.5915C38.3468 13.62 36.1092 11.1121 33.3191 9.35652C30.5289 7.60096 27.2997 6.66918 24.0032 6.66848C20.7067 6.66778 17.477 7.59818 14.6861 9.35254C11.8952 11.1069 9.65657 13.6139 8.22802 16.5848C6.79946 19.5556 6.23908 22.8696 6.6114 26.145C6.98372 29.4204 8.2736 32.524 10.3325 35.0985C10.5833 35.4106 12.6863 37.5864 13.01 37.9393C15.915 41.101 17.7029 43.9943 18.0879 47.5002V47.5002ZM18.1667 53.3335V56.2502H29.8333V53.3335H18.1667ZM5.78251 38.7502C3.03556 35.3181 1.31402 31.1799 0.816193 26.8122C0.318366 22.4444 1.06451 18.0249 2.96866 14.0628C4.87282 10.1006 7.85752 6.75688 11.579 4.41687C15.3004 2.07686 19.6072 0.835722 24.0032 0.836426C28.3992 0.83713 32.7055 2.07965 36.4262 4.42085C40.1469 6.76205 43.1305 10.1067 45.0334 14.0695C46.9363 18.0323 47.681 22.452 47.1818 26.8196C46.6826 31.1871 44.9597 35.3248 42.2117 38.756C40.4033 41.0077 35.6667 44.5835 35.6667 48.9585V56.2502C35.6667 57.7973 35.0521 59.281 33.9581 60.375C32.8642 61.4689 31.3804 62.0835 29.8333 62.0835H18.1667C16.6196 62.0835 15.1358 61.4689 14.0419 60.375C12.9479 59.281 12.3333 57.7973 12.3333 56.2502V48.9585C12.3333 44.5835 7.59376 41.0077 5.78251 38.7502Z"
        fill="#E2DCDC"
      />
    </svg>
  );
};
