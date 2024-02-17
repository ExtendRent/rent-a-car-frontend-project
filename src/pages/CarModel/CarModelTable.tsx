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
import { deleteCarModel, fetchCarModels } from "../../store/slices/carModelSlice";
import { fetchBrands } from "../../store/slices/brandSlice";

const CarModelTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const carModelState = useSelector((state: any) => state.carModel);
    const brandState = useSelector((state: any) => state.brand);
    const [data, setData] = useState<any[][]>([["Loading Data..."]]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [sortOrder, setSortOrder] = useState<{
        name: string, brandEntityName: string; direction: "asc" | "desc"
    }>({
        name: "", brandEntityName: "", direction: "asc"
    });

    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(fetchCarModels());
        dispatch(fetchBrands());
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (carModelState.carModel && brandState.brands) {
            const tableData = carModelState.carModel.map((carModel: any) => [
                carModel.id,
                carModel.name,
                carModel.brandEntityName,
                <IconButton onClick={() => handleUpdate(carModel.id)}><EditIcon /></IconButton>,
                <IconButton onClick={() => handleDelete(carModel.id)}><DeleteIcon /></IconButton>,
            ]);
            
            setData(tableData);
            setCount(carModelState.carModel.length);
        }
        console.log(carModelState);
        
    }, [carModelState, brandState]);
    const handleDelete = (id: number) => {
        console.log("Deleted ID:", id);
        dispatch(deleteCarModel({ id: id }));
    };
    const handleUpdate = (id: number) => {
        console.log("Deleted ID:", id);
        navigate(`/adminPanel/updateCarModel/${id}`);
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
            case "brandEntityName":
                columnName = "brandEntityName";
                break;
            default:
                break;
        }

        // Sıralama işlemleri burada yapılacak
        // Örnek bir sıralama işlemi:
        const sortedData = carModelState.carModel.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Sıralanmış verileri güncelle
        setData(sortedData.map((carModel: any) => [carModel.id, carModel.name, carModel.brandEntityName]));
        // isLoading durumunu false olarak ayarla
        console.log(carModelState.brandEntityName);
        
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
            const originalData = carModelState.carModel.map((carModel: any) => [carModel.id, carModel.name, carModel.brandEntityName]);
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
                    const filteredData = carModelState.carModel.filter((carModel: any) => {
                        return (
                            carModel.id.toString().includes(filterList[0][0] || "") &&
                            carModel.name.toString().includes(filterList[1][0] || "") &&
                            carModel.brandEntityName.toString().includes(filterList[2][0] || "")
                        );
                    }).map((carModel: any) => [carModel.id, carModel.name, carModel.brandEntityName]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = carModelState.carModel.filter((carModel: any) => {
                            return (
                                carModel.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                carModel.brandEntityName.toLowerCase().includes(searchText.toLowerCase())
                            );
                        }).map((carModel: any) => [carModel.id, carModel.name, carModel.brandEntityName]);
                        setData(searchData);
                    }
                    break;
                default:

                console.log(carModelState);
                console.log("Unhandled action:", action);
            }
        },
    };

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <MUIDataTable
                title={
                    <Typography variant="h6">
                        MODEL
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
                        label: "MODEL",
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
                        name: "brandEntityName",
                        label: "MARKA",
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
 
export default CarModelTable; 

