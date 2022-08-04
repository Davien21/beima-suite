import { CheckboxIcon } from "assets/images";
import styles from "./contract-list-item.module.css";
import { useSelector, useDispatch } from "react-redux";
import { SyntheticEvent } from "react";
import { IContract, IItem, IStore, ITypes } from "interfaces";
import { useRouter } from "next/router";
import { getItemById } from "utils/helpers";
import { toggleTestItemHiddenState } from "store/slices/testContractSlice";
export function ListItem({
  type,
  contract,
  isChecked,
  item,
}: {
  type: ITypes;
  contract: IContract;
  isChecked: boolean;
  item: IItem;
}) {
  const router = useRouter();
  const { itemId: routeItemId } = router.query;

  const isLoggedIn = false;

  const dispatch = useDispatch();
  const onToggle = (e: SyntheticEvent) => {
    if (!isLoggedIn) dispatch(toggleTestItemHiddenState(item._id));
    e.stopPropagation();
  };

  const routeToItem = () => {
    const route = `/${contract._id}/${item._id}`;
    if (router.asPath !== route) router.push(route);
  };

  let containerClass = `${styles.container} flex items-center px-4 py-2 mb-2`;
  if (!isChecked) containerClass += ` ${styles["false"]}`;
  if (item._id === routeItemId) containerClass += ` ${styles["active"]}`;
  // console.log(item, routeItemId);
  return (
    <div className={containerClass} onClick={() => routeToItem()}>
      <button className="mr-3" onClick={onToggle}>
        <CheckboxIcon className={`${styles["checkbox"]}`} />
      </button>
      <input
        type="checkbox"
        name={item.name}
        id={item.name}
        checked={isChecked}
        onChange={onToggle}
      />
      <label className="">
        <div className="flex gap-x-2 items-center">
          <span className={`${styles[type]}`}>
            {type.charAt(0).toUpperCase()}
          </span>
          <span>{item.name}</span>
        </div>
      </label>
    </div>
  );
}
