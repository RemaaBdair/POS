import React from "react";
const useSearch = <T,>(data: T[], searchText: string) => {
  const result = React.useMemo(() => {
    return data.filter((item: T) => {
      const values = Object.values(item);
      for (let elem of values) {
        if (elem.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()))
          return true;
      }
      return false;
    });
  }, [data, searchText]);
  return [result];
};
export default useSearch;
