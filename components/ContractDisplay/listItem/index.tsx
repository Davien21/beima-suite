import { CheckboxIcon } from "assets/images";
import styles from "./contract-list-item.module.css";
import { useSelector, useDispatch } from "react-redux";
import { SyntheticEvent } from "react";
import { IContract, IItem, IStore } from "interfaces";
import { useRouter } from "next/router";
import { getItemById } from "utils/helpers";
import { toggleTestItemHiddenState } from "store/slices/testContractSlice";
export function ListItem({
  contract,
  isChecked,
  itemId,
  type,
}: {
  contract: IContract;
  isChecked: boolean;
  itemId: string;
  type: "function" | "event";
}) {
  const router = useRouter();
  const { itemId: routeItemId } = router.query;

  const isLoggedIn = false;

  const item = getItemById(contract, itemId);

  const dispatch = useDispatch();
  const onToggle = (e: SyntheticEvent) => {
    if (!isLoggedIn) dispatch(toggleTestItemHiddenState(itemId));
    e.stopPropagation();
  };

  const route = `/${contract.id}/${itemId}`;

  let containerClass = `${styles.container} flex items-center px-4 py-2 mb-2`;
  if (!isChecked) containerClass += ` ${styles["false"]}`;
  if (itemId === routeItemId) containerClass += ` ${styles["active"]}`;

  return (
    <div className={containerClass} onClick={() => router.push(route)}>
      <button className="mr-3" onClick={onToggle}>
        <CheckboxIcon className={`${styles["checkbox"]}`} />
      </button>
      <input
        type="checkbox"
        name={item?.name}
        id={item?.name}
        checked={isChecked}
        onChange={onToggle}
      />
      <label className="">
        <div className="flex gap-x-2 items-center">
          <span className={`${styles[type]}`}>
            {type.charAt(0).toUpperCase()}
          </span>
          <span>{item?.name}</span>
        </div>
      </label>
    </div>
  );
}
