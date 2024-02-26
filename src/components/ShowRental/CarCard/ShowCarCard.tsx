import React from 'react';
import { mdiAccountGroup, mdiBagSuitcase, mdiGasStationOutline, mdiCarShiftPattern, mdiCalendarAccountOutline, mdiCarChildSeat, mdiCreditCardMultipleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import './ShowCarCard.css';
const ShowCarCard: React.FC<{ carDTO: any }> = ({ carDTO }) => {
  return (
    <div className="container-carCard">
      <div>
        <div
          style={{
          
            marginTop: 12,
          }}
          key={carDTO.id}
        >
          <div
            className="card-header"
            style={{
              textAlign: "center",
              paddingTop: "20px",
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "#A8A8A8"
            }}
          >
            ARACINIZ
          </div>
            <div className="card-image">
          <img
            src={carDTO.imageEntityImageUrl}
            loading="lazy"
            alt=""
            style={{
              maxWidth: "100%",
              height: "-webkit-fill-available",
              marginBottom: 1.6,
              transition: "transform 0.3s ease",
            }}
          />
          <div
            
            style={{
              margin:"21px",
              textAlign: "center",
              paddingTop: "20px",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          > 
          </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div
            style={{
              borderRightStyle: "solid",
              borderWidth: 1.5,
              borderColor: "#E1DED9",
              paddingLeft: 2,
              width: "50%",
              color: "#A8A8A8",
            }}
          >
            <div style={{ marginBottom: 1.6 }}>
              <span style={{ fontSize: "1.25rem", fontWeight: "bold",color:"#FFFFFF" }}>
                Araç Özellikleri
              </span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiAccountGroup}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.seat} Kişi</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiBagSuitcase}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.luggage} Büyük Bavul</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiGasStationOutline}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.fuelTypeEntityName}</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiCarShiftPattern}
                size={1}
                className="iconClass"
              />
              <span>{carDTO.shiftTypeEntityName}</span>
            </div>
          </div>

          <div style={{ paddingLeft: 3, width: "50%", color:"#A8A8A8"}}>
            <div style={{ marginBottom: 1.6, }}>
              <span style={{ fontSize: "1.25rem", fontWeight: "bold", color:"#FFFFFF"}}>
                Kiralama Koşulları
              </span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiCalendarAccountOutline}
                size={1}
                className="iconClass"
              />
              <span>21 Yaş Ve Üstü</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiCarChildSeat}
                size={1}
                className="iconClass"
              />
              <span>Ehliyet Yılı 1 ve Üzeri</span>
            </div>
            <div className="mid-column">
              <Icon
                path={mdiCreditCardMultipleOutline}
                size={1}
                className="iconClass"
              />
              <span>1 Kredi Kartı</span>
            </div>
            <div>
              Minimum Ehliyet:{" "}
              <span className="bold-text">
                {carDTO.expectedMinDrivingLicenseTypeName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCarCard;
