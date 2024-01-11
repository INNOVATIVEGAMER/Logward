import { useEffect, useState } from "react";

export const useSort = <T>(arr: T[], sortKey: keyof T, startSort: boolean) => {
  const [sortedItems, setSortedItems] = useState<T[]>(arr);
  const [isASC, setIsASC] = useState<boolean>(startSort);

  const toggleSort = () => setIsASC((prev) => !prev);

  useEffect(() => {
    if (arr.length === 0 || !sortKey) return;

    let positiveReturn = 1;
    let negativeReturn = -1;

    if (!isASC) {
      positiveReturn = -1;
      negativeReturn = 1;
    }

    const newItems = [...arr].sort((a, b) => {
      if (a[sortKey] >= b[sortKey]) return positiveReturn;
      else return negativeReturn;
    });

    setSortedItems(newItems);
  }, [arr, isASC, sortKey]);

  return { sortedItems, toggleSort, isASC };
};
