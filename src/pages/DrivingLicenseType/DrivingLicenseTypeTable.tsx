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
import { deleteDrivingLicenseType, fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";
import "../Color/ColorTable.css";

const DrivingLicenseTypeTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const drivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{
        name: string, description: string, licenseLevel: number; direction: "asc" | "desc"
    }>({
        name: "", description: "", licenseLevel: 0, direction: "asc"
    });

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchDrivingLicenseTypes());
    }, [page, rowsPerPage]);

    useEffect(() => {
        const tableData = drivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => [
            drivingLicenseType.id,
            drivingLicenseType.name,
            drivingLicenseType.description,
            drivingLicenseType.licenseLevel,
            <IconButton onClick={() => handleUpdate(drivingLicenseType.id)}><EditIcon /></IconButton>,
            <IconButton onClick={() => handleDelete(drivingLicenseType.id)}><DeleteIcon /></IconButton>,
        ]);

        setData(tableData);
        setCount(drivingLicenseTypeState.length);

    }, [drivingLicenseTypeState]);
    const handleDelete = (id: number) => {
        console.log("Deleted ID:", id);
        dispatch(deleteDrivingLicenseType({ drivingLicenseTypeId: id }));
    };
    const handleUpdate = (id: number) => {
        console.log("Deleted ID:", id);
        navigate(`/adminPanel/updateDrivingLicenseType/${id}`);
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
        // Tıklanan sütuna göre sıralama işlemini belirle
        let columnName: string = "";
        switch (sortOrder.name) {
            case "id":
                columnName = "id";
                break;
            case "name":
                columnName = "name";
                break;
            case "description":
                columnName = "description";
                break;
            case "licenseLevel":
                columnName = "licenseLevel";
                break;
            default:
                break;
        }

        // Sıralama işlemleri burada yapılacak
        // Örnek bir sıralama işlemi:
        const sortedData = drivingLicenseTypeState.drivingLicenseTypes.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Sıralanmış verileri güncelle
        setData(sortedData.map((drivingLicenseType: any) => [drivingLicenseType.id, drivingLicenseType.name, drivingLicenseType.description, drivingLicenseType.licenseLevel]));
        // isLoading durumunu false olarak ayarla
        setIsLoading(false);
    };
    const handleRowSelectionChange = (currentRowsSelected: any[]) => {
        if (currentRowsSelected.length > 0) {
            const selectedRow = data[currentRowsSelected[0].index]; // Seçilen ilk satırın verilerini al
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
        rowsPerPageOptions: [2, 5, 10],
        page: page,
        sortOrder: sortOrder,
        search: true,
        filterList: [],
        onFilterReset: () => {
            const originalData = drivingLicenseTypeState.drivingLicenseTypes.map((drivingLicenseType: any) => [drivingLicenseType.id, drivingLicenseType.name, drivingLicenseType.description, drivingLicenseType.licenseLevel]);
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
                    const filteredData = drivingLicenseTypeState.drivingLicenseTypes.filter((drivingLicenseType: any) => {
                        return (
                            drivingLicenseType.id.toString().includes(filterList[0][0] || "") &&
                            drivingLicenseType.name.toString().includes(filterList[1][0] || "") &&
                            drivingLicenseType.description.toString().includes(filterList[2][0] || "") &&
                            drivingLicenseType.licenseLevel.toString().includes(filterList[3][0] || "")
                        );
                    }).map((drivingLicenseType: any) => [drivingLicenseType.id, drivingLicenseType.name, drivingLicenseType.description, drivingLicenseType.licenseLevel]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = drivingLicenseTypeState.drivingLicenseTypes.filter((drivingLicenseType: any) => {
                            return (
                                drivingLicenseType.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                drivingLicenseType.description.toLowerCase().includes(searchText.toLowerCase()) ||
                                drivingLicenseType.licenseLevel.toString().includes(searchText.toString())
                            );
                        }).map((drivingLicenseType: any) => [drivingLicenseType.id, drivingLicenseType.name, drivingLicenseType.description, drivingLicenseType.licenseLevel]);
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
        <h2 className="h2-card">EHLİYET TİPİ</h2>
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
                        name: "description",
                        label: "AÇIKLAMA",
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
                        name: "licenseLevel",
                        label: "SEVİYE",
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

export default DrivingLicenseTypeTable;

