import { CheckboxIcon } from "assets/images";
import styles from "./contract-list-item.module.css";
import { SyntheticEvent } from "react";
import { IContract, IItem, IQuery, ITypes } from "interfaces";
import { useRouter } from "next/router";
import { usePropsForContract } from "hooks";

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
  const { itemId } = router.query as IQuery;
  const { SetHiddenItem } = usePropsForContract();

  let url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  url = `${url}/contracts`;
  const onToggle = (e: SyntheticEvent) => {
    SetHiddenItem(contract._id, { _id: item._id, isHidden: !item.isHidden });
    e.stopPropagation();
  };

  const routeToItem = () => {
    const route = `/${contract._id}/${item._id}`;
    if (router.asPath !== route) router.push(route);
  };

  let containerClass = `${styles.container} flex items-center px-4 py-2 mb-2`;
  if (item.isHidden) containerClass += ` ${styles["false"]}`;
  if (item._id === itemId) containerClass += ` ${styles["active"]}`;
  // console.log(item, itemId);
  return (
    <div className={containerClass} onClick={() => routeToItem()}>
      <button className="mr-3" onClick={onToggle}>
        <CheckboxIcon className={`${styles["checkbox"]}`} />
      </button>
      <input
        type="checkbox"
        name={item.name}
        id={item.name}
        checked={!item.isHidden}
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
