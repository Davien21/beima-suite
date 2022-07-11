import { CheckboxIcon } from "assets/images";
import { toggleHiddenItem } from "store/slices";
import styles from "./contract-list-item.module.css";
import { useDispatch } from "react-redux";
export function ListItem({
  index,
  isChecked,
  name,
  type,
}: {
  index: number;
  isChecked: boolean;
  name: string;
  type: string;
}) {
  const dispatch = useDispatch();
  const onToggle = () => {
    dispatch(toggleHiddenItem({ index, name }));
  };
  const initial = type.charAt(0).toUpperCase();

  return (
    <div
      className={`${styles.container} ${
        isChecked ? styles["true"] : styles["false"]
      } flex items-center mb-5`}
    >
      <button
        className="mr-3"
        onClick={(e) => {
          onToggle();
          e.stopPropagation();
        }}
      >
        <CheckboxIcon
          className={`${styles["checkbox"]} ${
            isChecked ? styles["true"] : styles["false"]
          }}`}
        />
      </button>
      <label className="capitalize cursor-pointer">
        <input
          type="checkbox"
          name={name}
          id={name}
          checked={isChecked}
          onChange={onToggle}
        />
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
