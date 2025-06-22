import { useMemo } from "react";

export const useFilteredArr = (ordersInformation , filterBy ) => {
    const filteredArr = useMemo(() => {
      if (ordersInformation !== null && ordersInformation){
        let stepOne = ordersInformation.filter((e) => e.status === "active")
        let stepThree = stepOne.filter((e) =>
          e.taskName.toLowerCase().includes(filterBy.toLowerCase())
        );
        return stepThree
      }
      return null
      }, [filterBy, ordersInformation]);
    return filteredArr
}