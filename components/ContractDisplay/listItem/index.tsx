import { CheckboxIcon } from "assets/images";
import styles from "./contract-list-item.module.css";

export function ListItem({
  isChecked,
  name,
  onToggle,
  type,
}: {
  isChecked: boolean;
  name: string;
  onToggle: () => void;
  type: string;
}) {
  const toggleIsChecked = () => {
    // const updatedFilters = [...allFilters];
    // updatedFilters[filterIndex][name] = !isChecked;
    // onFilter(updatedFilters);
    // onFilter()
  };
  const initial = type.charAt(0).toUpperCase();

  return (
    <div
      className={`${styles.container} ${styles[
        isChecked
      ].toString()} flex items-center mb-5`}
    >
      <button className="mr-3" onClick={onToggle}>
        <CheckboxIcon
          className={`${styles["checkbox"]} ${styles[isChecked].toString()}`}
        />
      </button>
      <label className="capitalize cursor-pointer">
        <input
          type="checkbox"
          name={name}
          id={name}
          value={isChecked}
          checked={isChecked}
          onChange={onToggle}
        />
        <div className="flex gap-x-2 items-center">
          <span className={`${styles["event"]}"`}>
            {type.charAt(0).toUpperCase()}
          </span>
          <span>{name}</span>
        </div>
      </label>
    </div>
  );
}
