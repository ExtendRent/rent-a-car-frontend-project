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
import { fetchVehicleStatus } from "../../store/slices/vehicleStatusSlice";

const VehicleStatusTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchVehicleStatus());
    }, [page, rowsPerPage]);

    useEffect(() => {
        const tableData = vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => [
            vehicleStatus.id,
            vehicleStatus.name,
            <IconButton onClick={() => handleUpdate(vehicleStatus.id)}><EditIcon /></IconButton>
        ]);

        setData(tableData);
        setCount(vehicleStatusState.length);

    }, [vehicleStatusState]);

    const handleUpdate = (id: number) => {
        navigate(`/adminPanel/updateVehicleStatus/${id}`);
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

        const sortedData = vehicleStatusState.vehicleStatuses.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        setData(sortedData.map((vehicleStatus: any) => [vehicleStatus.id, vehicleStatus.name]));
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
            const originalData = vehicleStatusState.vehicleStatuses.map((vehicleStatus: any) => [vehicleStatus.id, vehicleStatus.name]);
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
                    const filteredData = vehicleStatusState.vehicleStatuses.filter((vehicleStatus: any) => {
                        return (
                            vehicleStatus.id.toString().includes(filterList[0][0] || "") &&
                            vehicleStatus.name.toString().includes(filterList[1][0] || "")
                        );
                    }).map((vehicleStatus: any) => [vehicleStatus.id, vehicleStatus.name]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = vehicleStatusState.vehicleStatuses.filter((vehicleStatus: any) => {
                            return (
                                vehicleStatus.name.toString().includes(searchText.toLowerCase())
                            );
                        }).map((vehicleStatus: any) => [vehicleStatus.id, vehicleStatus.name]);
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
                        ARAÇ DURUMU
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
                        label: "ARAÇ DURUMU",
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
                    }
                ]}
                options={options}
            />
        </div>
    );
};

export default VehicleStatusTable;

