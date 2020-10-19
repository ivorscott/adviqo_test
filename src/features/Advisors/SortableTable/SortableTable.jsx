import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Rating from "@material-ui/lab/Rating";
import { Loading } from "../../../shared/components/Loading";
import { LanguageMenu } from "./LanguageMenu";
import { headCells } from "./constants";
import { succeeded } from "../../../shared/constants";
import { stableSort, getComparator } from "./helpers";
import { useTableStyles, useToolbarStyles } from "./styles";

function EnhancedTableHead(props) {
  const { classes, headCells, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({
  title,
  languages,
  isOnlineFiltered,
  onOnlineFilterChange,
  onLanguageFilterChange,
}) => {
  const classes = useToolbarStyles();

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant="h5" id="tableTitle">
        {title}
      </Typography>
      <Typography variant="subtitle1">Filters:</Typography>
      <Chip
        className={classes.online}
        label="Online"
        color={isOnlineFiltered ? "secondary" : "default"}
        onClick={onOnlineFilterChange}
      />
      <LanguageMenu languages={languages} onClick={onLanguageFilterChange} />
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string),
  onOnlineFilterChange: PropTypes.func.isRequired,
  onLanguageFilterChange: PropTypes.func.isRequired,
};

function SortableTable({
  orderByCell,
  orderFlow,
  rows,
  title,
  loading,
  languages,
  isOnlineFiltered,
  onOnlineFilterChange,
  onLanguageFilterChange,
}) {
  const classes = useTableStyles();
  const [order, setOrder] = React.useState(orderFlow);
  const [orderBy, setOrderBy] = React.useState(orderByCell);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <EnhancedTableToolbar
          title={title}
          languages={languages}
          isOnlineFiltered={isOnlineFiltered}
          onOnlineFilterChange={onOnlineFilterChange}
          onLanguageFilterChange={onLanguageFilterChange}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {loading === succeeded &&
                stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        role="advisor"
                        hover
                        key={`${index}-${row.firstName} ${row.lastName}`}
                      >
                        <TableCell component="th" scope="row">
                          <div className={classes.profile}>
                            <img height="75px" alt="profile" src={row.image} />
                            <span className={classes.name}>
                              {`${row.firstName} ${row.lastName}`}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">{row.status}</TableCell>
                        <TableCell align="right">{row.specialty}</TableCell>
                        <TableCell align="right">{row.language}</TableCell>
                        <TableCell align="right">
                          <Rating
                            name="read-only"
                            value={row.reviews}
                            readOnly
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}

              {loading !== succeeded && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className={classes.loader}>
                      <Loading />
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {loading === succeeded && !rows.length && (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className={classes.loader}>No Data</div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export { SortableTable };
