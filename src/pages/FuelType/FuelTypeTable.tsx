import React, { useState, useEffect } from "react";
import { CircularProgress, Typography,IconButton  } from "@mui/material";
import MUIDataTable, {
  MUIDataTableColumn,
  FilterType,
  Responsive,
} from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteFuelType, fetchFuelType } from "../../store/slices/fuelTypeSlice";

const FuelTypeTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const fuelTypeState = useSelector((state: any) => state.fuelType);
  const [data, setData] = useState<any[][]>([["Loading Data..."]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
  const navigate  = useNavigate();
  
  useEffect(() => {
    dispatch(fetchFuelType());
  }, [page, rowsPerPage]);

  useEffect(() => {
     const tableData = fuelTypeState.fuelTypes.map((fuelType: any) => [
        fuelType.id,
        fuelType.name,
      <IconButton onClick={() => handleUpdate(fuelType.id)}><EditIcon /></IconButton>,
      <IconButton onClick={() => handleDelete(fuelType.id)}><DeleteIcon /></IconButton>,
    ]);
      
      setData(tableData);
      setCount(fuelTypeState.length);
   
  }, [fuelTypeState]);
  const handleDelete = (id: number) => {
    console.log("Deleted ID:", id);
    dispatch(deleteFuelType({ fuelTypeId: id }));
  };
  const handleUpdate = (id: number) => {
    console.log("Deleted ID:", id);
    navigate(`/adminPanel/updateFuelType/${id}`);
  };
  const changePage = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
    setIsLoading(true);
    setPage(page); 
    setIsLoading(false);
  };
  const changeRowsPerPage = (rowsPerPage: number, page: number) => { 
    setRowsPerPage(rowsPerPage);
    setPage(page);
  };

  const sort = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
    setIsLoading(true);
    let columnName: string = "";
    switch (sortOrder.name) {
      case "id":
        columnName = "id";
        break;
      case "name":
        columnName = "name";
        break;
      default:
        break;
    }
  
    const sortedData = fuelTypeState.fuelTypes.slice().sort((a: any, b: any) => {
      if (sortOrder.direction === "asc") {
        return a[columnName] > a[columnName] ? 1 : -1;
      } else {
        return b[columnName] > b[columnName] ? 1 : -1;
      }
    });
  
    setData(sortedData.map((fuelType: any) => [fuelType.id, fuelType.name]));
    setIsLoading(false);
  };
  const handleRowSelectionChange = (currentRowsSelected: any[]) => {
    if (currentRowsSelected.length > 0) {
      const selectedRow = data[currentRowsSelected[0].index];
      const selectedId = selectedRow[0];
    }
  };

  const options = {
    customTableBodyWidth: "100%",
    onRowSelectionChange: handleRowSelectionChange,
    filter: true,
    filterType: 'dropdown' as FilterType,
    responsive: 'vertical' as Responsive,
    serverSide: true,
    count: count,
    rowsPerPage: rowsPerPage,
    rowsPerPageOptions: [2, 10, 15],
    page: page,
    sortOrder: sortOrder,
    search: true,
    filterList: [],
    onFilterReset: () => {
      const originalData = fuelTypeState.fuelTypes.map((fuelType: any) => [fuelType.id, fuelType.name]);
      setData(originalData);
    },
    onTableChange: (action: string, tableState: any) => {
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'changeRowsPerPage':
          changeRowsPerPage(tableState.rowsPerPage, tableState.page);
          break;
        case 'sort':
          sort(tableState.page, tableState.sortOrder);
          break;
        case 'filterChange':
          const { filterList } = tableState;
          const filteredData = fuelTypeState.fuelTypes.filter((fuelType: any) => {
            return (
                fuelType.id.toString().includes(filterList[0][0] || "") &&
                fuelType.name.toString().includes(filterList[1][0] || "")
            );
          }).map((fuelType: any) => [fuelType.id, fuelType.name]);
          setData(filteredData);
          break;
        case 'search':
          const { searchText } = tableState;
          if (searchText) {
            const searchData = fuelTypeState.fuelTypes.filter((fuelType: any) => {
              return (
                fuelType.name.toString().includes(searchText.toLowerCase())
              );
            }).map((fuelType: any) => [fuelType.id, fuelType.name]);
            setData(searchData);
          }
          break;
        default:
          console.log("Unhandled action:", action);
      }
    },
  };

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <MUIDataTable
        title={
          <Typography variant="h6">
            YAKIT TİPİ 
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={data}
        columns={[
          {
            name: "id",
            label: "ID",
            options: {
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center",borderBottom:"1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any) => (
                <div style={{ textAlign: "center" }}>{value}</div>
              ),
            },
          },
          {
            name: "name",
            label: "YAKIT TİPİ",
            options: {
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center",borderBottom:"1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any) => (
                <div style={{ textAlign: "center" }}>{value}</div>
              ),
            },
          },
          {
            name: "",
            label: "",
            options: {
              filter: false,
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                <div style={{ textAlign: "center" ,float: "inline-end"}}>
                  {value}
                </div>
              ),
            },
          },
          {
            name: "",
            label: "",
            options: {
              filter: false,
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any, tableMeta: { rowData: any[] }) => (
                <div style={{ textAlign: "center" , float: "inline-start"}}>
                  {value}
                </div>
              ),
            },
          },
        ]}
        options={options}
      />
    </div>
  );
};

export default FuelTypeTable;

