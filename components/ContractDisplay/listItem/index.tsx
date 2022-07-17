import { CheckboxIcon } from "assets/images";
import { toggleHiddenItem } from "store/slices";
import styles from "./contract-list-item.module.css";
import { useSelector, useDispatch } from "react-redux";
import { SyntheticEvent } from "react";
import { IStore } from "interfaces";
import { useRouter } from "next/router";
export function ListItem({
  index,
  isChecked,
  name,
  type,
}: {
  index: number;
  isChecked: boolean;
  name: string;
  type: "function" | "event";
}) {
  const router = useRouter();
  const { contractId, itemId } = router.query;

  const dispatch = useDispatch();
  const onToggle = (e: SyntheticEvent) => {
    dispatch(toggleHiddenItem({ index, name }));
    e.stopPropagation();
  };
  const contracts = useSelector((state: IStore) => state.contracts);
  const { id } = contracts[index];
  const route = `/${id}/${name}?type=${type}`;

  let containerClass = `${styles.container} flex items-center px-4 py-2 mb-2`;
  if (!isChecked) containerClass += ` ${styles["false"]}`;
  if (name === itemId) containerClass += ` ${styles["active"]}`;

  return (
    <div className={containerClass} onClick={() => router.push(route)}>
      <button className="mr-3" onClick={onToggle}>
        <CheckboxIcon className={`${styles["checkbox"]}`} />
      </button>
      <input
        type="checkbox"
        name={name}
        id={name}
        checked={isChecked}
        onChange={onToggle}
      />
      <label className="">
        <div className="flex gap-x-2 items-center">
          <span className={`${styles[type]}`}>
            {type.charAt(0).toUpperCase()}
          </span>
          <span>{name}</span>
        </div>
      </label>
    </div>
  );
}
