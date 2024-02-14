import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/configureStore';
import { RentalModel } from '../../models/Responses/Rental/RentalModel';
import { fetchCars } from '../../store/slices/carSlice';
import { fetchPaymentDetails } from '../../store/slices/paymentDetailsSlice';
import { fetchDiscountCodes } from '../../store/slices/discountCodeSlice';
import { fetchRentals } from '../../store/slices/rentalSlice';
import SideBar from '../../components/Sidebar/SideBar';

type Props = {}

const Rentals = (props: Props) => {

    const dispatch = useDispatch<AppDispatch>();
    const carState = useSelector((state: any) => state.car);
    const paymentDetailsState = useSelector((state: any) => state.paymentDetails);
    const discountCodeState = useSelector((state: any) => state.discountCode);
    const rentalState = useSelector((state: any) => state.rental);

    const [isActive, setIsActive] = useState(false);
    const [selectedCar, setSelectedCar] = useState<number>(0);
    const [selectedPaymentDetails, setSelectedPaymentDetails] = useState<number>(0);
    const [selectedDiscountCode, setSelectedDiscountCode] = useState<number>(0);
    const [selectedRental, setSelectedRental] = useState<number | null>(null);
    const [selectedRentalProperties, setSelectedRentalProperties] = useState<RentalModel | null>(null);
    const [selectedStartDate, setSelectedStartDate] = useState<Date | string>("");
    const [selectedEndDate, setSelectedEndDate] = useState<Date | string>("");
    const [startKilometer, setstartKilometer] = useState<number>(0);
    const [endKilometer, setEndKilometer] = useState<number>(0);

    useEffect(() => {
        dispatch(fetchCars());
        dispatch(fetchPaymentDetails());
        dispatch(fetchDiscountCodes());
        dispatch(fetchRentals());
    }, [dispatch])



    return (
        <div>
            <SideBar>
                <div
                    id="container-car"
                    className="container d-flex flex-column align-items-center">
                    {selectedRentalProperties && (
                        <div>
                            <h2>Seçilen Rental Özellikleri:</h2>
                            <form>
                                <div className="form-group">
                                    <label>Marka</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.carEntityBrandEntityName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Model:</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.carEntityModelEntityName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Renk:</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.carEntityColorEntityName}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Kasa Tipi:</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.carBodyTypeEntityName}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Yıl:</label>
                                    <input type="number"
                                        value={selectedRentalProperties.carEntityYear} />
                                    readOnly
                                </div>

                                <div className="form-group">
                                    <label>Kiralama Ücreti:</label>
                                    <input
                                        type="number"
                                        value={selectedRentalProperties.carEntityRentalPrice}
                                        readOnly
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Plaka:</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.carEntityLicensePlate}
                                        readOnly
                                    />
                                </div>

                                {selectedRentalProperties.startDate instanceof Date && (
                                    <div className="form-group">
                                        <label>Başlangıç Tarihi:</label>
                                        <input type="date" value={selectedRentalProperties.startDate.toISOString().slice(0, 10)}
                                            readOnly />
                                    </div>
                                )}


                                {selectedRentalProperties.endDate instanceof Date && (
                                    <div className="form-group">
                                        <label>Bitiş Tarihi:</label>
                                        <input type="date" value={selectedRentalProperties.endDate.toISOString().slice(0, 10)}
                                            readOnly />
                                    </div>
                                )}
                                <div className="form-group">
                                    <label>Ödeme Miktarı:</label>
                                    <input type="number" value={selectedRentalProperties.paymentDetailsEntityAmount}
                                        readOnly />
                                </div>
                                <div className="form-group">
                                    <label>Ödeme Tipi:</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.paymentDetailsEntityPaymentTypeEntityPaymentTypeName}
                                        readOnly />
                                </div>
                                <div className="form-group">
                                    <label>isActive:</label>
                                    <input
                                        type="text"
                                        value={selectedRentalProperties.isActive.toString()}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Başl. Kilometre</label>
                                    <input type="number" value={startKilometer} />
                                </div>
                                <div className="form-group">
                                    <label>Bit. Kilometre:</label>
                                    <input
                                        type="number"
                                        value={endKilometer}
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                    {/* <div className="row col-md-12">
                        <div id="select-block" className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="selectRental">Rental Seç</label>
                                <select
                                    className="form-select"
                                    id="rentalSelect"
                                    value={selectedRental || ""}
                                    onChange={handleRentalChange}
                                >
                                    <option value="" disabled></option>
                                    {rentalState.rentals.map((rental: any) => (
                                        <option key={rental.id} value={rental.id}>
                                            {rental.carModelEntityBrandEntityName}{" "}
                                            {rental.carModelEntityName}
                                            {rental.year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedCar && (
                                <div className="mb-2">
                                    <label htmlFor="selectBrand">Marka Seç</label>
                                    <select
                                        className="form-select"
                                        id="brandSelect"
                                        value={selectedBrand || ""}
                                        onChange={handleBrandChange}
                                    >
                                        <option value="" disabled></option>
                                        {brandState.brands.map((brand: any) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {selectedBrand && (
                                <div className="mb-2">
                                    <label htmlFor="selectCarModel">Model Seç</label>
                                    <select
                                        className="form-select"
                                        id="carModelSelect"
                                        value={selectedCarModel || ""}
                                        onChange={handleCarModelChange}
                                    >
                                        <option value="" disabled></option>
                                        {carModelState.carModel.map((carModel: any) => (
                                            <option key={carModel.id} value={carModel.id}>
                                                {carModel.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="mb-2">
                                <label htmlFor="selectCarBodyType">Kasa Tipi Seç</label>
                                <select
                                    className="form-select"
                                    id="carBodyTypeSelect"
                                    value={selectedCarBodyType || ""}
                                    onChange={handleCarBodyTypeChange}
                                >
                                    <option value="" disabled></option>
                                    {carBodyTypeState.carBodyTypes.map((carBodyType: any) => (
                                        <option key={carBodyType.id} value={carBodyType.id}>
                                            {carBodyType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="selectColor">Renk Seç</label>
                                <select
                                    className="form-select"
                                    id="colorSelect"
                                    value={selectedColor || ""}
                                    onChange={handleColorChange}
                                >
                                    <option value="" disabled></option>
                                    {colorState.colors.map((color: any) => (
                                        <option key={color.id} value={color.id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="selectVehicleStatus">Araç Durumu Seç</label>
                                <select
                                    className="form-select"
                                    id="vehicleStatusSelect"
                                    value={selectedVehicleStatus || ""}
                                    onChange={handleVehicleStatusChange}
                                >
                                    <option value="" disabled></option>
                                    {vehicleStatusState.vehicleStatuses.map(
                                        (vehicleStatus: any) => (
                                            <option key={vehicleStatus.id} value={vehicleStatus.id}>
                                                {vehicleStatus.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="selectShiftType">Vites Tipi Seç</label>
                                <select
                                    className="form-select"
                                    id="shiftTypeSelect"
                                    value={selectedShiftType || ""}
                                    onChange={handleShiftTypeChange}
                                >
                                    <option value="" disabled></option>
                                    {shiftTypeState.shiftTypes.map((shiftType: any) => (
                                        <option key={shiftType.id} value={shiftType.id}>
                                            {shiftType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="selectFuelType">Yakıt Tipi Seç</label>
                                <select
                                    className="form-select"
                                    id="fuelTypeSelect"
                                    value={selectedFuelType || ""}
                                    onChange={handleFuelTypeChange}
                                >
                                    <option value="" disabled></option>
                                    {fuelTypeState.fuelTypes.map((fuelType: any) => (
                                        <option key={fuelType.id} value={fuelType.id}>
                                            {fuelType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-2">
                                <label htmlFor="selectDrivingLicenseType">Yakıt Tipi Seç</label>
                                <select
                                    className="form-select"
                                    id="drivingLicenseTypeSelect"
                                    value={selectedExpectedMinDrivingLicenseType || ""}
                                    onChange={handleDrivingLicenseTypeChange}
                                >
                                    <option value="" disabled></option>
                                    {expectedMinDrivingLicenseTypeState.drivingLicenseTypes.map(
                                        (drivingLicenseType: any) => (
                                            <option
                                                key={drivingLicenseType.id}
                                                value={drivingLicenseType.id}
                                            >
                                                {drivingLicenseType.name}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            <div style={{ marginTop: 15 }} className="mb-2">
                                <label style={{ marginLeft: 3 }} htmlFor="isAvailable checkBox">
                                    isAvailable
                                </label>
                                <input
                                    style={{ marginLeft: 6 }}
                                    type="checkbox"
                                    checked={isAvailable}
                                    onChange={(e) => setIsAvailable(e.target.checked)}
                                />
                            </div>
                        </div>
                        <div id="input-block" className="col-md-6">
                            <div className="mb-2">
                                <label htmlFor="inputYear">Yıl Giriniz</label>
                                <input
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundImage: "none",
                                        paddingRight: "10px",
                                    }}
                                    className="form-select "
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(parseInt(e.target.value, 10))}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="inputDetails">Detay Giriniz</label>
                                <input
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundImage: "none",
                                        paddingRight: "10px",
                                    }}
                                    className="form-select "
                                    type="text"
                                    value={details}
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="inputRentalPrice">Araç Fiyatı Giriniz</label>
                                <input
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundImage: "none",
                                        paddingRight: "10px",
                                    }}
                                    className="form-select "
                                    type="number"
                                    value={rentalPrice}
                                    onChange={(e) => setRentalPrice(parseFloat(e.target.value))}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="inputLicensePlate">Plaka Giriniz</label>
                                <input
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundImage: "none",
                                        paddingRight: "10px",
                                    }}
                                    className="form-select "
                                    type="text"
                                    value={licensePlate}
                                    onChange={(e) => setLicensePlate(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="inputKilometer">Kilometre Giriniz</label>
                                <input
                                    style={{
                                        appearance: "none",
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        backgroundImage: "none",
                                        paddingRight: "10px",
                                    }}
                                    className="form-select "
                                    type="number"
                                    value={kilometer}
                                    onChange={(e) => setKilometer(parseInt(e.target.value, 10))}
                                />
                            </div>
                            
                            
                        </div>
                    </div> */}

                    {/* <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCarUpdateSuccess}
                    >
                        Update Car
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleCancelUpdate}
                    >
                        Cancel
                    </button> */}
                </div >
            </SideBar >
        </div >
    );
};

export default Rentals;