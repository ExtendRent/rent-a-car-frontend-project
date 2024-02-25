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
import { fetchPaymentDetails } from "../../store/slices/paymentDetailsSlice";
import { fetchPaymentTypes } from "../../store/slices/paymentTypeSlice";
import "../Color/ColorTable.css";

const PaymentDetailsTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const paymentDetailsState = useSelector((state: any) => state.paymentDetails);
    const paymentTypeState = useSelector((state: any) => state.paymentType);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{
        name: string; direction: "asc" | "desc"
    }>({
        name: "", direction: "asc"
    });

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchPaymentDetails());
        dispatch(fetchPaymentTypes());
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (paymentDetailsState.paymentDetails && paymentTypeState.paymentTypes) {
            const tableData = paymentDetailsState.paymentDetails.map((paymentDetails: any) => [
                paymentDetails.id,
                paymentDetails.paymentTypeEntityId,
                paymentDetails.amount,
                paymentDetails.paymentTypeEntityName,
                paymentDetails.createdDate,
                paymentDetails.deleted,
                <IconButton onClick={() => handleUpdate(paymentDetails.id)}><EditIcon /></IconButton>,
            ]);

            setData(tableData);
            setCount(paymentDetailsState.paymentDetails.length);
        }
        console.log(paymentDetailsState);

    }, [paymentDetailsState, paymentTypeState]);

    const handleUpdate = (id: number) => {
        console.log("Deleted ID:", id);
        navigate(`/adminPanel/updatePaymentDetails/${id}`);
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
            case "paymentTypeEntityId":
                columnName = "paymentTypeEntityId";
                break;
            case "amount":
                columnName = "amount";
                break;
            case "paymentTypeEntityName":
                columnName = "paymentTypeEntityName";
                break;
            case "createdDate":
                columnName = "createdDate";
                break;
            case "deleted":
                columnName = "deleted";
                break;
            default:
                break;
        }

        // Sıralama işlemleri burada yapılacak
        // Örnek bir sıralama işlemi:
        const sortedData = paymentDetailsState.paymentDetails.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Sıralanmış verileri güncelle
        setData(sortedData.map((paymentDetails: any) => [paymentDetails.id, paymentDetails.paymentTypeEntityId, paymentDetails.amount, paymentDetails.paymentTypeEntityName,
            paymentDetails.createdDate, paymentDetails.deleted]));
        // isLoading durumunu false olarak ayarla
        console.log(paymentDetailsState.paymentTypeEntityName);

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
            const originalData = paymentDetailsState.paymentDetails.map((paymentDetails: any) => [paymentDetails.id, paymentDetails.paymentTypeEntityId, paymentDetails.amount,
                paymentDetails.paymentTypeEntityName, paymentDetails.createdDate, paymentDetails.deleted]);
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
                    const filteredData = paymentDetailsState.paymentDetails.filter((paymentDetails: any) => {
                        return (
                            paymentDetails.id.toString().includes(filterList[0][0] || "") &&
                            paymentDetails.paymentTypeEntityId.toString().includes(filterList[1][0] || "") &&
                            paymentDetails.amount.toString().includes(filterList[2][0] || "") &&
                            paymentDetails.paymentTypeEntityName.toString().includes(filterList[3][0] || "") &&
                            paymentDetails.createdDate.toString().includes(filterList[4][0] || "") &&
                            (filterList[5][0] === "" || paymentDetails.deleted === (filterList[5][0] === "true"))
                        );
                    }).map((paymentDetails: any) => [paymentDetails.id, paymentDetails.paymentTypeEntityId, paymentDetails.amount, paymentDetails.paymentTypeEntityName,
                    paymentDetails.createdDate, paymentDetails.deleted]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = paymentDetailsState.paymentDetails.filter((paymentDetails: any) => {
                            return (
                                paymentDetails.amount.toString().includes(searchText.toLowerCase()) ||
                                paymentDetails.paymentTypeEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                paymentDetails.createdDate.toString().includes(searchText.toLowerCase()) ||
                                (paymentDetails.deleted && "true".includes(searchText.toLowerCase())) ||
                                (!paymentDetails.deleted && "false".includes(searchText.toLowerCase()))
                            );
                        }).map((paymentDetails: any) => [paymentDetails.id, paymentDetails.paymentTypeEntityId, paymentDetails.amount, paymentDetails.paymentTypeEntityName,
                        paymentDetails.createdDate, paymentDetails.deleted]);
                        setData(searchData);
                    }
                    break;
                default:

                    console.log(paymentDetailsState);
                    console.log("Unhandled action:", action);
            }
        },
    };

    return (
        <div className="container-card">
        <h2 className="h2-card">FATURA</h2>
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
                        name: "paymentTypeEntityId",
                        label: "FATURA ID",
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
                        name: "amount",
                        label: "TOPLAM TUTAR",
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
                        name: "paymentTypeEntityName",
                        label: "ÖDEME TÜRÜ",
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
                        name: "createdDate",
                        label: "FATURA TARİHİ",
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
                            customBodyRender: (value: any) => (
                                <div style={{ textAlign: "center" }}>
                                    {value === true ? 'true' : 'false'}
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

export default PaymentDetailsTable;

