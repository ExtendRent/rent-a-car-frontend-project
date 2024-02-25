import React, { useState, useEffect } from "react";
import { CircularProgress, Typography,IconButton  } from "@mui/material";
import MUIDataTable, {
  MUIDataTableColumn,
  FilterType,
  Responsive,
} from "mui-datatables";
import { connect, useDispatch, useSelector } from "react-redux";
import { deleteBrand, fetchBrands, updateBrand } from "../../store/slices/brandSlice";
import { AppDispatch } from "../../store/configureStore";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import "../Color/ColorTable.css";

const BrandTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const brandState = useSelector((state: any) => state.brand);
  const [data, setData] = useState<any[][]>([["Loading Data..."]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
  const navigate  = useNavigate();
  useEffect(() => {
    dispatch(fetchBrands());
  }, [page, rowsPerPage]);

  useEffect(() => {
     // brandState'in bir dizi olup olmadığını kontrol ettik
     const tableData = brandState.brands.map((brand: any) => [
      brand.id,
      brand.name,
      <img src={brand.logoImagePath} alt="Brand Logo" />,
      <IconButton onClick={() => handleUpdate(brand.id)}><EditIcon /></IconButton>,
      <IconButton onClick={() => handleDelete(brand.id)}><DeleteIcon /></IconButton>,
    ]);
      
      setData(tableData);
      setCount(brandState.length);
   
  }, [brandState]);
  const handleDelete = (id: number) => {
    console.log("Deleted ID:", id);
    dispatch(deleteBrand({ brandId: id }));
  };
  const handleUpdate = (id: number) => {
    console.log("Deleted ID:", id);
    navigate(`/adminPanel/updateBrand/${id}`);
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
      case "logoImagePath":
        columnName = "logoImagePath";
        break;
      default:
        break;
    }
  
    // Sıralama işlemleri burada yapılacak
    // Örnek bir sıralama işlemi:
    const sortedData = brandState.brands.slice().sort((a: any, b: any) => {
      if (sortOrder.direction === "asc") {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return b[columnName] > a[columnName] ? 1 : -1;
      }
    });
  
    // Sıralanmış verileri güncelle
    setData(sortedData.map((brand: any) => [brand.id, brand.name, <img src={brand.logoImagePath} alt="Brand Logo" />]));
    // isLoading durumunu false olarak ayarla
    setIsLoading(false);
  };
  const handleRowSelectionChange = (currentRowsSelected: any[]) => {
    if (currentRowsSelected.length > 0) {
      const selectedRow = data[currentRowsSelected[0].index]; // Seçilen ilk satırın verilerini al
      const selectedId = selectedRow[0]; // ID, ilk sütunda olduğu varsayılarak alındı
      //console.log("Seçilen satır ID'si: ", selectedId);
      //dispatch(deleteBrand({ brandId: selectedId }))
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
      const originalData = brandState.brands.map((brand: any) => [brand.id, brand.name, brand.logoImagePath]);
      setData(originalData);
    },
    onTableChange: (action: string, tableState: any) => {
      switch (action) {
        case 'changePage':
          changePage(tableState.page, tableState.sortOrder);
          break;
        case 'changeRowsPerPage': // Yeni sayfa sayısını işlemek için case eklendi
          changeRowsPerPage(tableState.rowsPerPage, tableState.page);
          break;
        case 'sort':
          sort(tableState.page, tableState.sortOrder);
          break;
        case 'filterChange':
          const { filterList } = tableState;
          const filteredData = brandState.brands.filter((brand: any) => {
            return (
              brand.id.toString().includes(filterList[0][0] || "") &&
              brand.name.toLowerCase().includes(filterList[1][0] || "") &&
              brand.logoImagePath.toLowerCase().includes(filterList[2][0] || "")
            );
          }).map((brand: any) => [brand.id, brand.name, brand.logoImagePath]);
          setData(filteredData);
          break;
        case 'search':
          const { searchText } = tableState;
          if (searchText) {
            const searchData = brandState.brands.filter((brand: any) => {
              return (
                brand.name.toLowerCase().includes(searchText.toLowerCase()) ||
                brand.logoImagePath.toLowerCase().includes(searchText.toLowerCase())
              );
            }).map((brand: any) => [brand.id, brand.name, brand.logoImagePath]);
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
    <h2 className="h2-card">MARKALAR</h2>
    <div className="form">
      <MUIDataTable
        title={
          <Typography variant="h6">
            
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
            label: "MARKA",
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
            name: "logoImagePath",
            label: "LOGO",
            options: {
              filter: false,
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
            className: 'custom-row'
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

export default BrandTable;

