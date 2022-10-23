import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import "./globalStyle.scss";
import { fetchDeleteJobById, jobsActionTypes } from "features/jobs/jobsAction";

function createData(job) {
  return {
    ...job,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "tenCongViec",
    numeric: false,
    disablePadding: true,
    label: "Tên Công Việc",
  },
  {
    id: "danhGia",
    numeric: false,
    disablePadding: false,
    label: "Đánh Giá",
  },
  {
    id: "giaTien",
    numeric: false,
    disablePadding: false,
    label: "Giá",
  },
  {
    id: "hinhAnh",
    numeric: false,
    disablePadding: false,
    label: "Ảnh",
  },
  {
    id: "moTa",
    numeric: false,
    disablePadding: false,
    label: "Mô Tả",
  },
  {
    id: "moTaNgan",
    numeric: false,
    disablePadding: false,
    label: "Mô Tả Ngắn",
  },
  {
    id: "saoCongViec",
    numeric: false,
    disablePadding: false,
    label: "Sao",
  },
  {
    id: "action",
    numeric: false,
    disablePadding: false,
    label: "Hành động",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function JobReadOnlyDataTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = React.useState([]);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false);
  const [confirmLabel, setConfirmLabel] = React.useState("");
  const [deleteUserId, setDeleteUserId] = React.useState(null);
  const [notifyConfigModal, setNotifyConfigModal] = React.useState({
    title: "Notify",
    label: "Label",
  });
  const [isOpenNotifyConfigModal, setIsOpenNotifyConfigModal] =
    React.useState(false);

  const pageConfig = useSelector(
    (state) => state.jobsReducer.jobsListPageConfig
  );

  const usersList = useSelector((state) => state.jobsReducer.jobsList);

  const dispatch = useDispatch();

  const handleClickDelete = (user) => {
    setDeleteUserId(user.id);
    setConfirmLabel(`Bạn có chắc muốn xóa công việc ${user.tenCongViec} chứ ?`);
    setIsOpenDeleteModal(true);
  };

  const handleClickUpdate = (index) => {
    dispatch(jobsActionTypes.setJobUpdateIndex(index));
    dispatch(jobsActionTypes.setJobsListCRUDStatus("update"));
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  const handleCloseNotifyConfigModal = () => {
    setIsOpenNotifyConfigModal(false);
  };

  const handleSubmitDeleteModal = async () => {
    const res = await dispatch(fetchDeleteJobById(deleteUserId));
    setNotifyConfigModal(res);
    setIsOpenNotifyConfigModal(true);

    setDeleteUserId(null);
    setConfirmLabel(``);
    setIsOpenDeleteModal(false);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    if (!usersList) return;

    const cloneUsersList = [...usersList];

    const mapToRow = cloneUsersList.map((user) => createData(user));

    setRows(mapToRow);
  }, [usersList]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    dispatch(jobsActionTypes.setJobsListPageIndex(newPage + 1));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      jobsActionTypes.setJobsListPageSize(parseInt(event.target.value, 10))
    );
    dispatch(jobsActionTypes.setJobsListPageIndex(1));
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.tenCongViec}
                      </TableCell>
                      <TableCell align="center">{row.danhGia}</TableCell>
                      <TableCell align="center">{row.giaTien}</TableCell>
                      <TableCell align="center">
                        <img
                          src={row.hinhAnh}
                          alt={row.tenCongViec}
                          width={50}
                        />
                      </TableCell>
                      <TableCell
                        className="jobReadOnlyDataTable"
                        align="center"
                      >
                        <p>{row.moTa}</p>
                      </TableCell>
                      <TableCell
                        className="jobReadOnlyDataTable"
                        align="center"
                      >
                        <p>{row.moTaNgan}</p>
                      </TableCell>
                      <TableCell align="center">{row.saoCongViec}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          aria-label="Cập nhật"
                          onClick={() => handleClickUpdate(index)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Xóa"
                          onClick={() => handleClickDelete(row)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Số dòng mỗi trang"
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={pageConfig.totalRow || rows.length}
          rowsPerPage={pageConfig.pageSize}
          page={pageConfig.pageIndex - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={isOpenDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmLabel}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal}>Hủy</Button>
          <Button onClick={handleSubmitDeleteModal} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isOpenNotifyConfigModal}
        onClose={handleCloseNotifyConfigModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {notifyConfigModal.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {notifyConfigModal.label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNotifyConfigModal}>Hủy</Button>
          <Button onClick={handleCloseNotifyConfigModal} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
