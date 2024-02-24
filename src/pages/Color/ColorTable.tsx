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
import { deleteColor, fetchColors } from "../../store/slices/colorSlice";
import './ColorTable.css'

const ColorTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const colorState = useSelector((state: any) => state.color);
  const [data, setData] = useState<any[][]>([["Loading Data..."]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
  const navigate  = useNavigate();
  useEffect(() => {
    dispatch(fetchColors());
  }, [page, rowsPerPage]);

  useEffect(() => {
     const tableData = colorState.colors.map((color: any) => [
        color.id,
        color.name,
      <IconButton onClick={() => handleUpdate(color.id)}><EditIcon /></IconButton>,
      <IconButton onClick={() => handleDelete(color.id)}><DeleteIcon /></IconButton>,
    ]);
      
      setData(tableData);
      setCount(colorState.length);
   
  }, [colorState]);
  const handleDelete = (id: number) => {
    dispatch(deleteColor({ colorId: id }));
  };
  const handleUpdate = (id: number) => {
    navigate(`/adminPanel/updateColor/${id}`);
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
      default:
        break;
    }
  
    // Sıralama işlemleri burada yapılacak
    // Örnek bir sıralama işlemi:
    const sortedData = colorState.colors.slice().sort((a: any, b: any) => {
      if (sortOrder.direction === "asc") {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return b[columnName] > a[columnName] ? 1 : -1;
      }
    });
  
    // Sıralanmış verileri güncelle
    setData(sortedData.map((color: any) => [color.id, color.name]));
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
      const originalData = colorState.colors.map((color: any) => [color.id, color.name]);
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
          const filteredData = colorState.colors.filter((color: any) => {
            return (
                color.id.toString().includes(filterList[0][0] || "") &&
                color.name.toLowerCase().includes(filterList[1][0] || ""));
          }).map((color: any) => [color.id, color.name]);
          setData(filteredData);
          break;
        case 'search':
          const { searchText } = tableState;
          if (searchText) {
            const searchData = colorState.colors.filter((color: any) => {
              return (
                color.name.toLowerCase().includes(searchText.toLowerCase())
              );
            }).map((color: any) => [color.id, color.name]);
            setData(searchData);
          }
          break;
        default:
          console.log("Unhandled action:", action);
      }
    },
  };

  return (
    <div className="container-card">
      <h2 className="h2-card">RENK</h2>
      <div className="form">
      
      <MUIDataTable
        title={
          <Typography variant="h6">
            
            {isLoading && (
              <CircularProgress
                size={24}
                style={{ marginLeft: 15, position: "relative", top: 4, backgroundColor: 'red' }}
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
            label: "RENK",
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
        options={{
          ...options,
          setRowProps: () => ({
            className: 'custom-row'  // Arka plan transparanlığı
          }),
          setTableProps: () => ({
            style: {
              className: 'custom-mui-table'
            },
          }),
        }}
      />
      </div>
    </div>
  );
};

export default ColorTable;

