import React from "react";
import { MyButton } from "../../../../components/Button/Button";

interface Props {
  currentPageNumber: number;
  getPrevPage: () => void;
  getNextPage: () => void;
  nextPageEntries: number;
}
const PageButtons: React.FunctionComponent<Props> = (props) => {
  const {
    getPrevPage,
    currentPageNumber,
    nextPageEntries,
    getNextPage,
  } = props;
  return (
    <>
      <MyButton
        OnClickHandle={getPrevPage}
        type="submit"
        variant="text"
        fullWidth={false}
        disable={currentPageNumber - 1 < 0 ? true : false}
      >
        PrevPage
      </MyButton>
      <label>{currentPageNumber + 1}</label>
      <MyButton
        OnClickHandle={getNextPage}
        type="submit"
        variant="text"
        fullWidth={false}
        disable={nextPageEntries > 0 ? false : true}
      >
        NextPage
      </MyButton>
    </>
  );
};
export default PageButtons;
