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
import { fetchRentalStatuses } from "../../store/slices/rentalStatusSlice";
import "../Color/ColorTable.css";

const RentalStatusTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const rentalStatusState = useSelector((state: any) => state.rentalStatus);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{ name: string; direction: "asc" | "desc" }>({ name: "", direction: "asc" });
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchRentalStatuses());
    }, [page, rowsPerPage]);

    useEffect(() => {
        const tableData = rentalStatusState.rentalStatuses.map((rentalStatus: any) => [
            rentalStatus.id,
            rentalStatus.name,
            rentalStatus.deleted,
        ]);

        setData(tableData);
        setCount(rentalStatusState.length);

    }, [rentalStatusState]);

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
            case "deleted":
                columnName = "deleted";
                break;
            default:
                break;
        }

        const sortedData = rentalStatusState.rentalStatuses.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        setData(sortedData.map((rentalStatus: any) => [rentalStatus.id, rentalStatus.name, rentalStatus.deleted]));
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
            const originalData = rentalStatusState.rentalStatuses.map((rentalStatus: any) => [rentalStatus.id, rentalStatus.name, rentalStatus.deleted]);
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
                    const filteredData = rentalStatusState.rentalStatuses.filter((rentalStatus: any) => {
                        return (
                            rentalStatus.id.toString().includes(filterList[0][0] || "") &&
                            rentalStatus.name.toString().includes(filterList[1][0] || "") &&
                            (filterList[2][0] === "" || rentalStatus.deleted === (filterList[2][0] === "true")));
                    }).map((rentalStatus: any) => [rentalStatus.id, rentalStatus.name, rentalStatus.deleted]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = rentalStatusState.rentalStatuses.filter((rentalStatus: any) => {
                            return (
                                rentalStatus.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                (rentalStatus.deleted && "true".includes(searchText.toLowerCase())) ||
                                (!rentalStatus.deleted && "false".includes(searchText.toLowerCase()))
                            );
                        }).map((rentalStatus: any) => [rentalStatus.id, rentalStatus.name, rentalStatus.deleted]);
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
        <h2 className="h2-card">KİRALAMA DURUMU</h2>
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
                        name: "name",
                        label: "KİRALAMA DURUMU",
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

export default RentalStatusTable;

