import styles from "./App.module.scss";
import { MdDone } from "react-icons/md";
import { AiTwotoneSave } from "react-icons/ai";
import { FaTruckFast } from "react-icons/fa6";
import { useEffect, useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import Nav from "./components/Nav/Nav";
import SvgQuestion from "./components/SvgQuestion";
import { findTrackingNumber } from "./utility/findTrackingNumber";
import { formatTimeToHHMMSS, formateTimeToDDMMYYY } from "./utility/converDate";

const TrackInformationItem = ({ head, body, className = "" }) => {
  return (
    <div className= {styles.track_information_item}>
      <p className= {styles.information_head}>{head}</p>
      <p className= {`${styles.information_bode} ${className}`} >{body}</p>
    </div>
  );
};

function App() {
  const { t, i18n } = useTranslation();

  const [Loading, setLoading] = useState(false);
  const [Item, setItem] = useState({});
  function handleSearch(value, SearchInput) {
    SearchInput.current.value = "";
    setLoading(true);
    findTrackingNumber(value)
      .then((res) => {
        setLoading(false);
        setItem(res.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }
  let status = [
    "TICKET_CREATED",
    "PACKAGE_RECEIVED",
    "OUT_FOR_DELIVERY",
    "DELIVERED",
  ];
  let checkCuurentState = Item?.CurrentStatus?.state;
  const lastSideAction = Item?.TransitEvents?.reverse().find(
    (action) => action.state === "WAITING_FOR_CUSTOMER_ACTION"
  );

  const track_details = Item?.TransitEvents?.filter((i) => {
    return status.includes(i?.state);
  });
  useEffect(() => {
    document.body.style.direction = i18n.language == "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <Nav handleSearch={handleSearch} />
      <div className= {styles.container} >
        <div className={styles.track_container} >
          <div className={styles.track_information} >
            <TrackInformationItem
              head={`${t("shipNumber")}  ${Item?.TrackingNumber || ""}`}
              body={t(Item?.CurrentStatus?.state || "")}
              className={
                checkCuurentState == "DELIVERED"
                  ? styles.green 
                  : checkCuurentState == "CANCELLED"
                  ? styles.red 
                  : styles.yellow 
              }
            />
            <TrackInformationItem
              head={t("lastUpdate")}
              body={formateTimeToDDMMYYY(Item?.CurrentStatus?.timestamp)}
            />
            <TrackInformationItem head={t("customerName")} body="ٍSOUQ.COM" />
            <TrackInformationItem
              head={t("deliveryTime")}
              body={formateTimeToDDMMYYY(Item?.PromisedDate)}
            />
          </div>
          <div
            className= {styles.wrapper}
            direction={i18n.language == "ar" ? "rtl" : "ltr"}
          >
            {status.map((it, i) => {
              const OUT_FOR_DELIVERY = it === "OUT_FOR_DELIVERY";
              const DELIVERED = it === "DELIVERED";
              const lastAction = Item?.TransitEvents?.slice()?.reverse()?.find((e) => {
                return status?.slice()?.reverse()?.includes(e?.state);
              });
              const lastActionIndex = status?.findIndex(
                (i) => i === lastAction?.state
              );
              const isDelivered = Item?.CurrentStatus?.state === "DELIVERED";
              const isCancel = Item?.CurrentStatus?.state === "CANCELLED";
              const inProcess =
                lastActionIndex >= i &&
                lastActionIndex >= 0 &&
                !isCancel &&
                !isDelivered;
                const canceled =
                lastActionIndex >= i &&
                lastActionIndex >= 0 &&
                isCancel &&
                !isDelivered;

              return (
                <Fragment key={i}>
                  <div
                    className={`${styles.item} ${isDelivered ? styles.delivered : ""} ${
                      inProcess ? styles.inprocess : ""
                    } ${canceled ? styles.canceled : ""} `}
                    
                  >
                    <div className= {styles.icon_content}>
                      <div
                        className={`${styles.icon} ${
                          (OUT_FOR_DELIVERY || DELIVERED) && !isDelivered
                            ? styles.big
                            : ""
                        }`}
                      
                      >
                        {isDelivered ? (
                          <MdDone />
                        ) : OUT_FOR_DELIVERY ? (
                          <FaTruckFast />
                        ) : DELIVERED ? (
                          <AiTwotoneSave />
                        ) : (
                          <MdDone />
                        )}
                      </div>
                    </div>
                    <div className={styles.line}></div>
                  </div>
                </Fragment>
              );
            })}
          </div>
          <div
            className={styles.content}
            direction={i18n.language == "ar" ? "rtl" : "ltr"}
          >
            {status.map((it, i) => {
              const extraAction = it === "OUT_FOR_DELIVERY";
              return (
                <div className={styles.wrapper} key={i}>
                  <p>{t(it)}</p>
                  {extraAction && checkCuurentState != "DELIVERED" && (
                    <p
                      className={`${styles.extra_info} ${
                        checkCuurentState == "DELIVERED"
                          ? styles.green
                          : checkCuurentState == "CANCELLED"
                          ? styles.red 
                          : styles.yellow 
                      }`}
                     
                    >
                      {t(lastSideAction?.exceptionCode)}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.details_wrapper}>
          <div className={styles.track_details}>
            <h3>{t("shippingDetails")}</h3>
            <div className={styles.table}>
              <div className={`${styles.item} ${styles.head}`}>
                <p>{t("branch")}</p>
                <p>{t("date")}</p>
                <p>{t("time")}</p>
                <p>{t("details")}</p>
              </div>
              {track_details?.map((eachTrack, i) => {
                return (
                  <div className={styles.item} key={i}>
                    <p>{t("branch")}</p>
                    <p>{formateTimeToDDMMYYY(eachTrack?.timestamp)}</p>
                    <p>{formatTimeToHHMMSS(eachTrack?.timestamp)}</p>
                    <p>{t(eachTrack?.state)}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.address}>
            <h3>{t("deliveryAddress")}</h3>
            <div className={styles.address_content}>
              <p>امبابه شارع طلعت حرب</p>
            </div>
            <div className={styles.problem}>
              <div className={styles.image}>
                <SvgQuestion />
              </div>
              <div className={styles.problem_content}>
                <p>{t("isProblem")}</p>
                <button>{t("reportProblem")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
