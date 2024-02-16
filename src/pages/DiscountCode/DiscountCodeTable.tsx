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
import { deleteDiscountCode, fetchDiscountCodes } from "../../store/slices/discountCodeSlice";


const DiscountCodeTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const discountCodeState = useSelector((state: any) => state.discountCode);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchDiscountCodes());
    }, [page, rowsPerPage]);

    useEffect(() => {
        const tableData = discountCodeState.discountCodes.map((discountCode: any) => [
            discountCode.id,
            discountCode.discountCode,
            discountCode.discountPercentage,
            <IconButton onClick={() => handleUpdate(discountCode.id)}><EditIcon /></IconButton>,
            <IconButton onClick={() => handleDelete(discountCode.id)}><DeleteIcon /></IconButton>,
        ]);

        setData(tableData);
        setCount(discountCodeState.length);

    }, [discountCodeState]);
    const handleDelete = (id: number) => {
        console.log("Deleted ID:", id);
        dispatch(deleteDiscountCode({ discountCodeId: id }));
    };
    const handleUpdate = (id: number) => {
        navigate(`/adminPanel/updateDiscountCode/${id}`);
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
            case "discountCode":
                columnName = "discountCode";
                break;
            case "discountPercentage":
                columnName = "discountPercentage";
                break;
            default:
                break;
        }

        const sortedData = discountCodeState.discountCodes.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });


        setData(sortedData.map((discountCode: any) => [discountCode.id, discountCode.discountCode, discountCode.discountPercentage]));
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
            const originalData = discountCodeState.discountCodes.map((discountCode: any) => [discountCode.id, discountCode.discountCode, discountCode.discountPercentage]);
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
                    const filteredData = discountCodeState.discountCodes.filter((discountCode: any) => {
                        return (
                            discountCode.id.toString().includes(filterList[0][0] || "") &&
                            discountCode.discountCode.toLowerCase().includes(filterList[1][0] || "") &&
                            discountCode.discountPercentage.toString().includes(filterList[0][0] || "")
                        );
                    }).map((discountCode: any) => [discountCode.id, discountCode.discountCode, discountCode.discountPercentage]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = discountCodeState.discountCodes.filter((discountCode: any) => {
                            return (
                                discountCode.discountCode.toLowerCase().includes(searchText.toLowerCase()) ||
                                discountCode.discountPercentage.toString().includes(searchText.toString())
                            );
                        }).map((discountCode: any) => [discountCode.id, discountCode.discountCode, discountCode.discountPercentage]);
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
                        INDIRIM KUPONLARI
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
                        name: "discountCode",
                        label: "iNDiRiM KODU",
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
                        name: "discountPercentage",
                        label: "iNDiRiM YüZDESi ",
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
                options={options}
            />
        </div>
    );
};

export default DiscountCodeTable;

