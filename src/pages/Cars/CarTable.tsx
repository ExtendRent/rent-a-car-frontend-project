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
import { deleteCar, fetchCars } from "../../store/slices/carSlice";
import { fetchCarBodyTypes } from "../../store/slices/carBodyTypeSlice";
import { fetchColors } from "../../store/slices/colorSlice";
import { fetchFuelType } from "../../store/slices/fuelTypeSlice";
import { fetchShiftTypes } from "../../store/slices/shiftTypeSlice";
import { fetchDrivingLicenseTypes } from "../../store/slices/drivingLicenseTypeSlice";
import { fetchVehicleStatus } from "../../store/slices/vehicleStatusSlice";

const CarModelTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const carState = useSelector((state: any) => state.car);
    const carModelState = useSelector((state: any) => state.carModel);
    const brandState = useSelector((state: any) => state.brand);
    const carBodyTypeState = useSelector((state: any) => state.carBodyType);
    const colorState = useSelector((state: any) => state.color);
    const vehicleStatusState = useSelector((state: any) => state.vehicleStatus);
    const fuelTypeState = useSelector((state: any) => state.fuelType);
    const shiftTypeState = useSelector((state: any) => state.shiftType);
    const drivingLicenseTypeState = useSelector((state: any) => state.drivingLicenseType);
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
        dispatch(fetchCarModels());
        dispatch(fetchBrands());
        dispatch(fetchCars());
        dispatch(fetchCarBodyTypes());
        dispatch(fetchColors());
        dispatch(fetchFuelType());
        dispatch(fetchShiftTypes());
        dispatch(fetchDrivingLicenseTypes());
        dispatch(fetchVehicleStatus());
    }, [page, rowsPerPage]);

    useEffect(() => {
        if (carModelState.carModel && brandState.brands && carState.cars && carBodyTypeState.carBodyTypes && colorState.colors && fuelTypeState.fuelTypes && shiftTypeState.shiftTypes && drivingLicenseTypeState.drivingLicenseTypes && vehicleStatusState.vehicleStatuses) {
            const tableData = carState.cars.map((car: any) => [
                car.id,
                <img src={car.imagesEntityImagePaths} />,
                car.carModelEntityBrandEntityName,
                car.carModelEntityName,
                car.colorEntityName,
                car.year,
                car.carBodyTypeEntityName,
                car.fuelTypeEntityName,
                car.shiftTypeEntityName,
                car.rentalPrice,
                car.licensePlate,
                car.kilometer,
                car.vehicleStatusEntityName,
                <IconButton onClick={() => handleUpdate(car.id)}><EditIcon /></IconButton>,
                <IconButton onClick={() => handleDelete(car.id)}><DeleteIcon /></IconButton>,
            ]);

            setData(tableData);
            setCount(carState.cars.length);
        }
        console.log(carState);

    }, [carState, carModelState, brandState, carBodyTypeState, colorState, fuelTypeState, shiftTypeState, drivingLicenseTypeState, vehicleStatusState]);
    const handleDelete = (id: number) => {
        console.log("Deleted ID:", id);
        dispatch(deleteCar({ carId: id }));
    };
    const handleUpdate = (id: number) => {
        console.log("Deleted ID:", id);
        navigate(`/adminPanel/updateCar/${id}`);
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
            case "imagesEntityImagePaths":
                columnName = "imagesEntityImagePaths";
                break;
            case "carModelEntityBrandEntityName":
                columnName = "carModelEntityBrandEntityName";
                break;
            case "carModelEntityName":
                columnName = "carModelEntityName";
                break;
            case "colorEntityName":
                columnName = "colorEntityName";
                break;
            case "year":
                columnName = "year";
                break;
            case "carBodyTypeEntityName":
                columnName = "carBodyTypeEntityName";
                break;
            case "fuelTypeEntityName":
                columnName = "fuelTypeEntityName";
                break;
            case "shiftTypeEntityName":
                columnName = "shiftTypeEntityName";
                break;
            case "rentalPrice":
                columnName = "rentalPrice";
                break;
            case "licensePlate":
                columnName = "licensePlate";
                break;
            case "kilometer":
                columnName = "kilometer";
                break;
            case "vehicleStatusEntityName":
                columnName = "vehicleStatusEntityName";
                break;
            default:
                break;
        }

        // Sıralama işlemleri burada yapılacak
        // Örnek bir sıralama işlemi:
        const sortedData = carState.cars.slice().sort((a: any, b: any) => {
            if (sortOrder.direction === "asc") {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return a[columnName] > b[columnName] ? 1 : -1;
            } else {
                // Sıralama işlemini doğrudan dizge karşılaştırma operatörleriyle gerçekleştir
                return b[columnName] > a[columnName] ? 1 : -1;
            }
        });

        // Sıralanmış verileri güncelle
        setData(sortedData.map((car: any) => [
            car.id,
            <img src={car.imagesEntityImagePaths} />,
            car.carModelEntityBrandEntityName,
            car.carModelEntityName,
            car.colorEntityName,
            car.year,
            car.carBodyTypeEntityName,
            car.fuelTypeEntityName,
            car.shiftTypeEntityName,
            car.rentalPrice,
            car.licensePlate,
            car.kilometer,
            car.vehicleStatusEntityName,]));
        // isLoading durumunu false olarak ayarla
        console.log(carState);

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
            const originalData = carState.cars.map((car: any) => [
                car.id,
                car.imagesEntityImagePaths,
                car.carModelEntityBrandEntityName,
                car.carModelEntityName,
                car.colorEntityName,
                car.year,
                car.carBodyTypeEntityName,
                car.fuelTypeEntityName,
                car.shiftTypeEntityName,
                car.rentalPrice,
                car.licensePlate,
                car.kilometer,
                car.vehicleStatusEntityName,]);
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
                    const filteredData = carState.cars.filter((car: any) => {
                        return (
                            car.id.toString().includes(filterList[0][0] || "") &&
                            car.carModelEntityBrandEntityName.toLowerCase().includes(filterList[1][0] || "") &&
                            car.carModelEntityName.toLowerCase().includes(filterList[2][0] || "") &&
                            car.colorEntityName.toLowerCase().includes(filterList[3][0] || "") &&
                            car.year.toString().includes(filterList[4][0] || "") &&
                            car.carBodyTypeEntityName.toLowerCase().includes(filterList[5][0] || "") &&
                            car.fuelTypeEntityName.toLowerCase().includes(filterList[6][0] || "") &&
                            car.shiftTypeEntityName.toLowerCase().includes(filterList[7][0] || "") &&
                            car.rentalPrice.toString().includes(filterList[8][0] || "") &&
                            car.licensePlate.toLowerCase().includes(filterList[9][0] || "") &&
                            car.kilometer.toString().includes(filterList[10][0] || "") &&
                            car.vehicleStatusEntityName.toLowerCase().includes(filterList[11][0] || "")
                        );
                    }).map((car: any) => [
                        car.id,
                        <img src={car.imagesEntityImagePaths} />,
                        car.carModelEntityBrandEntityName,
                        car.carModelEntityName,
                        car.colorEntityName,
                        car.year,
                        car.carBodyTypeEntityName,
                        car.fuelTypeEntityName,
                        car.shiftTypeEntityName,
                        car.rentalPrice,
                        car.licensePlate,
                        car.kilometer,
                        car.vehicleStatusEntityName,
                    ]);
                    setData(filteredData);
                    break;
                case 'search':
                    const { searchText } = tableState;
                    if (searchText) {
                        const searchData = carState.cars.filter((car: any) => {
                            return (
                                car.carModelEntityBrandEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.carModelEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.colorEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.year.toString().includes(searchText.toLowerCase()) ||
                                car.carBodyTypeEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.fuelTypeEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.shiftTypeEntityName.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.rentalPrice.toString().includes(searchText.toLowerCase()) ||
                                car.licensePlate.toLowerCase().includes(searchText.toLowerCase()) ||
                                car.kilometer.toString().includes(searchText.toLowerCase()) ||
                                car.vehicleStatusEntityName.toLowerCase().includes(searchText.toLowerCase())
                            );
                        }).map((car: any) => [
                            car.id,
                            car.carModelEntityBrandEntityName,
                            car.carModelEntityName,
                            car.colorEntityName,
                            car.year,
                            car.carBodyTypeEntityName,
                            car.fuelTypeEntityName,
                            car.shiftTypeEntityName,
                            car.rentalPrice,
                            car.licensePlate,
                            car.kilometer,
                            car.imagesEntityImagePaths,
                            car.vehicleStatusEntityName,
                        ]);
                        setData(searchData);
                    }
                    break;
                default:

                    console.log(carState);
                    console.log("Unhandled action:", action);
            }
        },
    };

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
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
                        name: "imagesEntityImagePaths",
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
                        name: "carModelEntityBrandEntityName",
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
                        name: "carModelEntityName",
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
                        name: "colorEntityName",
                        label: "RENK",
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
                        name: "year",
                        label: "YIL",
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
                        name: "carBodyTypeEntityName",
                        label: "KASA",
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
                        name: "fuelTypeEntityName",
                        label: "YAKIT",
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
                        name: "shiftTypeEntityName",
                        label: "VİTES",
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
                        name: "rentalPrice",
                        label: "FİYAT",
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
                        name: "licensePlate",
                        label: "PLAKA",
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
                        name: "kilometer",
                        label: "KM",
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
                        name: "vehicleStatusEntityName",
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

