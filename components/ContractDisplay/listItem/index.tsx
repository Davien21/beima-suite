import { CheckboxIcon } from "assets/images";
import styles from "./contract-list-item.module.css";
import { useSelector, useDispatch } from "react-redux";
import { SyntheticEvent, useEffect } from "react";
import { IContract, IItem, IQuery, IStore, ITypes } from "interfaces";
import { useRouter } from "next/router";
import { getItemById } from "utils/helpers";
import { toggleTestItemHiddenState } from "store/slices/testContractSlice";
import { useGetItem } from "hooks/apis";
import { useLocalStorage } from "usehooks-ts";
import { updateContractItem } from "services/contractsService";
import { toast } from "react-toastify";
import { mutate as globalMutate } from "swr";

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
  const dispatch = useDispatch();
  const { user } = useSelector((state: IStore) => state.auth);

  const { contractId, itemId } = router.query as IQuery;
  const { data: itemData, mutate } = useGetItem({ contractId, itemId });
  const [authToken, setJwt] = useLocalStorage("beima-auth-token", "");

  const isLoggedIn = !!user.firstName;

  let url = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  url = `${url}/contracts`;
  const onToggle = (e: SyntheticEvent) => {
    if (!isLoggedIn) {
      console.log("not logged in");
      dispatch(toggleTestItemHiddenState(item._id));
    } else if (isLoggedIn) {
      const update = { _id: item._id, isHidden: !item.isHidden };
      let newItem = { ...itemData, isHidden: !itemData.isHidden };
      const options = { optimisticData: newItem, rollbackOnError: true };
      mutate(async () => {
        const { error } = await updateContractItem(
          contractId,
          update,
          authToken
        );
        if (error) return toast.error("Error updating this description");
        globalMutate(url);
        return newItem;
      }, options);
    }
    e.stopPropagation();
  };

  const routeToItem = () => {
    const route = `/${contract._id}/${item._id}`;
    if (router.asPath !== route) router.push(route);
  };

  let containerClass = `${styles.container} flex items-center px-4 py-2 mb-2`;
  if (!isChecked) containerClass += ` ${styles["false"]}`;
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
