import React, { useState, useEffect } from "react";
import { CircularProgress, Typography, IconButton } from "@mui/material";
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
import { deleteShiftType, fetchShiftTypes } from "../../store/slices/shiftTypeSlice";

const ShiftTypeTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const shiftTypeState = useSelector((state: any) => state.shiftType);
  const [data, setData] = useState<any[][]>([["Loading Data..."]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchShiftTypes());
  }, [page, rowsPerPage]);

  useEffect(() => {
    const tableData = shiftTypeState.shiftTypes.map((shiftType: any) => [
      shiftType.id,
      shiftType.name,
      shiftType.deleted,
      <IconButton onClick={() => handleUpdate(shiftType.id)}><EditIcon /></IconButton>,
      <IconButton onClick={() => handleDelete(shiftType.id)}><DeleteIcon /></IconButton>,
    ]);

    setData(tableData);
    setCount(shiftTypeState.length);

  }, [shiftTypeState]);
  const handleDelete = (id: number) => {
    console.log("Deleted ID:", id);
    dispatch(deleteShiftType({ shiftTypeId: id }));
  };
  const handleUpdate = (id: number) => {
    console.log("Deleted ID:", id);
    navigate(`/adminPanel/updateShiftType/${id}`);
  };
  const changePage = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
    setIsLoading(true);
    setPage(page);
    setIsLoading(false);
  };
  const changeRowsPerPage = (rowsPerPage: number, page: number) => { // Satır sayısını değiştiren fonksiyonu ekledik
    setRowsPerPage(rowsPerPage);
    setPage(page);
  };

  const sort = (page: number, sortOrder: { name: string; direction: "asc" | "desc" }) => {
    setIsLoading(true);
    // Tıklanan sütuna göre sıralama işlemini belirle
    let columnName: string = "";
    switch (sortOrder.name) {
      case "id":
        columnName = "id";
        break;
      case "name":
        columnName = "name";
        break;
      case "deleted":
        columnName = "deleted";
        break;
      default:
        break;
    }

    // Sıralama işlemleri burada yapılacak
    // Örnek bir sıralama işlemi:
    const sortedData = shiftTypeState.shiftTypes.slice().sort((a: any, b: any) => {
      if (sortOrder.direction === "asc") {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return b[columnName] > a[columnName] ? 1 : -1;
      }
    });

    // Sıralanmış verileri güncelle
    setData(sortedData.map((shiftType: any) => [shiftType.id, shiftType.name, shiftType.deleted ]));
    // isLoading durumunu false olarak ayarla
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
      const originalData = shiftTypeState.shiftTypes.map((shiftType: any) => [shiftType.id, shiftType.name, shiftType.deleted]);
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
          const filteredData = shiftTypeState.shiftTypes.filter((shiftType: any) => {
            return (
              shiftType.id.toString().includes(filterList[0][0] || "") &&
              shiftType.name.toString().includes(filterList[1][0] || "") &&
              (filterList[2][0] === "" || shiftType.deleted === (filterList[2][0] === "true")));
          }).map((shiftType: any) => [shiftType.id, shiftType.name, shiftType.deleted]);
          setData(filteredData);
          break;
        case 'search':
          const { searchText } = tableState;
          if (searchText) {
            const searchData = shiftTypeState.shiftTypes.filter((shiftType: any) => {
              return (
                shiftType.name.toLowerCase().includes(searchText.toLowerCase())||
                (shiftType.deleted && "true".includes(searchText.toLowerCase())) ||
                (!shiftType.deleted && "false".includes(searchText.toLowerCase()))
              );
            }).map((shiftType: any) => [shiftType.id, shiftType.name, shiftType.deleted]);
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
            VİTES TİPİ
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
                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any) => (
                <div style={{ textAlign: "center" }}>{value}</div>
              ),
            },
          },
          {
            name: "name",
            label: "VİTES TİPİ",
            options: {
              customHeadRender: (columnMeta: MUIDataTableColumn) => (
                <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
              ),
              customBodyRender: (value: any) => (
                <div style={{ textAlign: "center" }}>{value}</div>
              ),
            },
          },
          {
            name: "deleted",
            label: "SİLİNEN",
            options: {
                customHeadRender: (columnMeta: MUIDataTableColumn) => (
                    <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                ),
                customBodyRender: (value: boolean) => (
                    
                    <div style={{ textAlign: "center" }}>
                        
                        {value === true ? "true" : "false"}
                        
                    </div>)
            }
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
                <div style={{ textAlign: "center", float: "inline-end" }}>
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
                <div style={{ textAlign: "center", float: "inline-start" }}>
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

export default ShiftTypeTable;

