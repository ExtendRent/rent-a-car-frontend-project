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
import { deleteCustomer, fetchCustomers } from "../../store/slices/customerSlice";
import "../Color/ColorTable.css";

const CustomerTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customerState = useSelector((state: any) => state.customer);
  const [data, setData] = useState<any[][]>([["Loading Data..."]]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCustomers());
  }, [page, rowsPerPage]);

  useEffect(() => {
    const tableData = customerState.customers.map((customer: any) => [
      customer.id,
      customer.phoneNumber,
      customer.drivingLicenseNumber,
      customer.drivingLicenseTypeEntityName,
      customer.name,
      customer.surname,
      customer.emailAddress,
      customer.userImageEntityImageUrl,
      <IconButton onClick={() => handleUpdate(customer.id)}><EditIcon /></IconButton>,
      <IconButton onClick={() => handleDelete(customer.id)}><DeleteIcon /></IconButton>,
    ]);

    setData(tableData);
    setCount(customerState.length);

  }, [customerState]);
  const handleDelete = (id: number) => {
    console.log("Deleted ID:", id);
    dispatch(deleteCustomer({ customerId: id }));
  };
  const handleUpdate = (id: number) => {
    navigate(`/adminPanel/updateCustomer/${id}`);
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
    let columnName: string = "";
    switch (sortOrder.name) {
      case "id":
        columnName = "id";
        break;
      case "phoneNumber":
        columnName = "phoneNumber";
        break;
      case "drivingLicenseNumber":
        columnName = "drivingLicenseNumber";
        break;
      case "drivingLicenseTypeEntityName":
        columnName = "drivingLicenseTypeEntityName";
        break;
      case "name":
        columnName = "name";
        break;
      case "surname":
        columnName = "surname";
        break;
      case "emailAddress":
        columnName = "emailAddress";
        break;
      case "userImageEntityImageUrl":
        columnName = "userImageEntityImageUrl";
        break;

      default:
        break;
    }

    const sortedData = customerState.customers.slice().sort((a: any, b: any) => {
      if (sortOrder.direction === "asc") {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return a[columnName] > b[columnName] ? 1 : -1;
      } else {
        // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
        return b[columnName] > a[columnName] ? 1 : -1;
      }
    });

    // Sıralanmış verileri güncelle
    setData(sortedData.map((customer: any) => [
      customer.id,
      customer.phoneNumber,
      customer.drivingLicenseNumber,
      customer.drivingLicenseTypeEntityName,
      customer.name,
      customer.surname,
      customer.emailAddress,
      customer.userImageEntityImageUrl,
    ]));
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
      const originalData = customerState.customers.map((customer: any) => [
        customer.id,
        customer.phoneNumber,
        customer.drivingLicenseNumber,
        customer.drivingLicenseTypeEntityName,
        customer.name,
        customer.surname,
        customer.emailAddress,
        customer.userImageEntityImageUrl,
      ]);
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
          const filteredData = customerState.customers.filter((customer: any) => {
            return (
              customer.id.toString().includes(filterList[0][0] || "") &&
              customer.phoneNumber.toLowerCase().includes(filterList[1][0] || "") &&
              customer.drivingLicenseNumber.toLowerCase().includes(filterList[2][0] || "") &&
              customer.drivingLicenseTypeEntityName.toLowerCase().includes(filterList[3][0] || "") &&
              customer.name.toLowerCase().includes(filterList[4][0] || "") &&
              customer.surname.toLowerCase().includes(filterList[5][0] || "") &&
              customer.emailAddress.toLowerCase().includes(filterList[6][0] || "") &&
              customer.userImageEntityImageUrl.toLowerCase().includes(filterList[7][0] || "")
            );
          }).map((customer: any) => [
            customer.id,
            customer.phoneNumber,
            customer.drivingLicenseNumber,
            customer.drivingLicenseTypeEntityName,
            customer.name,
            customer.surname,
            customer.emailAddress,
            customer.userImageEntityImageUrl,
          ]);
          setData(filteredData);
          break;
        case 'search':
          const { searchText } = tableState;
          if (searchText) {
            const searchData = customerState.customers.filter((customer: any) => {
              return (
                customer.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.drivingLicenseNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.drivingLicenseTypeEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.surname.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.emailAddress.toLowerCase().includes(searchText.toLowerCase()) ||
                customer.userImageEntityImageUrl.toLowerCase().includes(searchText.toLowerCase())
              );
            }).map((customer: any) => [
              customer.id,
              customer.phoneNumber,
              customer.drivingLicenseNumber,
              customer.drivingLicenseTypeEntityName,
              customer.name,
              customer.surname,
              customer.emailAddress,
              customer.userImageEntityImageUrl,]);
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
      <h2 className="h2-card">MÜŞTERİLER</h2>
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
                  <th style={{ textAlign: "center", borderBottom: "1px solid rgba(224, 224, 224, 1)" }}>{columnMeta.label}</th>
                ),
                customBodyRender: (value: any) => (
                  <div style={{ textAlign: "center" }}>{value}</div>
                ),
              },
            },
            {
              name: "phoneNumber",
              label: "PHONE",
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
              name: "drivingLicenseNumber",
              label: "EHLİYET NO",
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
              name: "drivingLicenseTypeEntityName",
              label: "EHLİYET TİPİ",
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
              label: "AD",
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
              name: "surname",
              label: "SOYAD",
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
              name: "email",
              label: "EMAIL",
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
              name: "userImageEntityImageUrl",
              label: "IMG",
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

export default CustomerTable;

