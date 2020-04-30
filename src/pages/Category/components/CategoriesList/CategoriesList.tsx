import React, { useEffect, useState } from "react";
import { WithStyles, withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { styles } from "./styles";
import IconButton from "@material-ui/core/IconButton";
import { Category, asyncSetCategoryData, sliceEntries } from "./util";
import EditCategoryDialog from "../EditCategoryDialog/EditCategoryDialog";
import DeleteCategoryDialog from "../DeleteCategoryDialog/DeleteCategoryDialog";
import { isArray } from "util";
interface Props {
  searchText: string;
  entriesPerPage: number;
  currentPageNumber: number;
  handleNextPageEntries: (value: number) => void;
  handleEntriesLength: (value: number) => void;
  refresh: boolean;
}

const getSortLabel = (
  ascendingOrder: boolean,
  setAscendingOrder: React.Dispatch<React.SetStateAction<boolean>>,
  setCategoryData: React.Dispatch<React.SetStateAction<Category[]>>,
  orderBy: keyof Category
) => {
  return (
    <IconButton
      edge="end"
      aria-label="sort"
      aria-haspopup="true"
      color="primary"
      onClick={() => {
        asyncSetCategoryData(setCategoryData, orderBy, ascendingOrder);
        setAscendingOrder(!ascendingOrder);
      }}
    >
      {ascendingOrder ? (
        <ArrowUpwardIcon fontSize="small" />
      ) : (
        <ArrowDownwardIcon fontSize="small" />
      )}
    </IconButton>
  );
};
const getTableHeader = (
  headerClassName: string,
  NameAscendingOrder: boolean,
  setNameAscendingOrder: React.Dispatch<React.SetStateAction<boolean>>,
  DateAscendingOrder: boolean,
  setDateAscendingOrder: React.Dispatch<React.SetStateAction<boolean>>,
  setCategoryData: React.Dispatch<React.SetStateAction<Category[]>>
) => {
  return (
    <>
      <th key="name" className={headerClassName}>
        Category Name
        {getSortLabel(
          NameAscendingOrder,
          setNameAscendingOrder,
          setCategoryData,
          "name"
        )}
      </th>
      <th key="date" className={headerClassName}>
        Created At
        {getSortLabel(
          DateAscendingOrder,
          setDateAscendingOrder,
          setCategoryData,
          "date"
        )}
      </th>
      <th key="action" className={headerClassName}>
        Action
      </th>
    </>
  );
};

const getTableBody = (
  categoryData: Category[],
  dataClassName: string,
  openEditDialog: (name: string, id: string, date: string) => void,
  openDeleteDialog: (name: string, id: string) => void,
  searchText: string = ""
) => {
  let rows = categoryData.filter((category: Category) =>
    category.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
  );
  let data: JSX.Element[] | JSX.Element = [];
  if (rows.length !== 0) {
    data = rows.map((category: Category) => {
      const { id, name, date } = category;
      return (
        <tr key={id}>
          <td className={dataClassName}>{name}</td>
          <td className={dataClassName}>{date}</td>
          <td className={dataClassName}>
            <IconButton
              edge="end"
              aria-label="Edit Category"
              aria-haspopup="true"
              color="primary"
              onClick={() => openEditDialog(name, id, date)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="Delete Category"
              aria-haspopup="true"
              color="primary"
              onClick={() => openDeleteDialog(name, id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </td>
        </tr>
      );
    });
  } else
    data = (
      <tr key="noMatch">
        <td className={dataClassName} colSpan={3}>
          No Matching
        </td>
      </tr>
    );
  return data;
};

const CategoriesList: React.FunctionComponent<
  WithStyles<typeof styles> & Props
> = (props) => {
  const {
    classes,
    searchText,
    entriesPerPage,
    currentPageNumber,
    handleNextPageEntries,
    handleEntriesLength,
    refresh,
  } = props;
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [tableBody, setTableBody] = useState<JSX.Element | JSX.Element[]>([]);
  const [tableHeader, setTableHeader] = useState<JSX.Element | JSX.Element[]>(
    []
  );
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [categoryDate, setCategoryDate] = React.useState("");
  const [NameAscendingOrder, setNameAscendingOrder] = React.useState(true);
  const [DateAscendingOrder, setDateAscendingOrder] = React.useState(true);
  const handleOpenEditDialog = (name: string, id: string, date: string) => {
    setCategoryName(name);
    setCategoryId(id);
    setCategoryDate(date);
    setOpenEditDialog(true);
  };
  const handleOpenDeleteDialog = (name: string, id: string) => {
    setCategoryName(name);
    setCategoryId(id);
    setOpenDeleteDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    asyncSetCategoryData(setCategoryData);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    asyncSetCategoryData(setCategoryData);
  };
  useEffect(() => {
    asyncSetCategoryData(setCategoryData);
  }, []);
  useEffect(() => {
    if (refresh) asyncSetCategoryData(setCategoryData);
  }, [refresh]);
  useEffect(() => {
    const header = getTableHeader(
      classes.header,
      NameAscendingOrder,
      setNameAscendingOrder,
      DateAscendingOrder,
      setDateAscendingOrder,
      setCategoryData
    );

    let body = getTableBody(
      categoryData,
      classes.data,
      handleOpenEditDialog,
      handleOpenDeleteDialog,
      searchText
    );
    let nextPageEntries: number = 0;
    if (isArray(body)) {
      nextPageEntries =
        body.length - (currentPageNumber * entriesPerPage + entriesPerPage);
      handleEntriesLength(body.length);
      body = sliceEntries(body, entriesPerPage, currentPageNumber);
    }
    handleNextPageEntries(nextPageEntries);
    setTableHeader(header);
    setTableBody(body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryData,
    searchText,
    entriesPerPage,
    currentPageNumber,
    NameAscendingOrder,
    DateAscendingOrder,
  ]);
  return (
    <table className={classes.table}>
      <thead>
        <tr>{tableHeader}</tr>
      </thead>
      <tbody>
        {tableBody}
        <EditCategoryDialog
          openDialog={openEditDialog}
          handleClose={handleCloseEditDialog}
          name={categoryName}
          id={categoryId}
          setName={setCategoryName}
          date={categoryDate}
        />
        <DeleteCategoryDialog
          openDialog={openDeleteDialog}
          handleClose={handleCloseDeleteDialog}
          name={categoryName}
          id={categoryId}
        />
      </tbody>
    </table>
  );
};

export default withStyles(styles)(CategoriesList);
