import StatsCard from "../components/StatsCard";
import { Card, Col, Row, CardText, CardBody, Button } from "reactstrap";
import { DollarSign, TrendingUp, User, Box } from "react-feather";
import { useTranslation } from "react-i18next";
import StripedTable from "../components/StripedTable";
import { useContext, useEffect, useState } from "react";
import RadarChart from "../components/RadarChart";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import { useSkin } from "@hooks/useSkin";
import { useParams } from "react-router-dom";
import CardMedal from "../components/CardMedal";
import DOMAIN from "../../params";
import StoreRevenue from "../components/StoreRevenue";
import { ThemeColors } from "../../utility/context/ThemeColors";

const Store = () => {
  const { t } = useTranslation();
  const [totalProfit, $totalProfit] = useState("");
  const [totalSales, $totalSales] = useState("");
  const [totalCredit, $totalCredit] = useState("");
  const [totalStock, $totalStock] = useState("");
  const [totalCharges, $totalCharges] = useState("");
  const [recap, $recap] = useState([]);
  const [top, $top] = useState([]);
  const [graphData, $graphData] = useState({});
  const [stockAlert, $stockAlert] = useState(null);

  const { colors } = useContext(ThemeColors);

  const storeId = useParams().id;
  const storeName = useParams().store;
  const statistics = [
    {
      title: `${totalSales} ${t("DA")}`,
      subtitle: t("Sales"),
      color: "light-primary",
      icon: <TrendingUp size={24} />,
    },
    {
      title: `${totalCredit} ${t("DA")}`,
      subtitle: t("Customers credit"),
      color: "light-info",
      icon: <User size={24} />,
    },
    {
      title: `${totalStock} ${t("DA")}`,
      subtitle: t("Total stock"),
      color: "light-danger",
      icon: <Box size={24} />,
    },
    {
      title: `${totalCharges} ${t("DA")}`,
      subtitle: t("Charges"),
      color: "light-success",
      icon: <DollarSign size={24} />,
    },
  ];

  const { skin } = useSkin();
  const labelColor = skin === "dark" ? "#b4b7bd" : "#6e6b7b";
  const gridLineColor = "rgba(200, 200, 200, 0.2)";
  const radarData = (canvas) => {
    const gradientBlue = canvas.getContext("2d").createLinearGradient(0, 0, 0, 150);
    gradientBlue.addColorStop(0, "rgba(155,136,250, 0.9)");
    gradientBlue.addColorStop(1, "rgba(155,136,250, 0.8)");

    const gradientRed = canvas.getContext("2d").createLinearGradient(0, 0, 0, 150);
    gradientRed.addColorStop(0, "rgba(255,161,161, 0.9)");
    gradientRed.addColorStop(1, "rgba(255,161,161, 0.8)");

    return {
      labels: [t("Charges"), t("Profit"), t("Stock"), t("Sales"), t("Credit")],
      datasets: [
        {
          fill: true,
          borderColor: "transparent",
          backgroundColor: gradientBlue,
          data: [totalCharges, totalProfit, totalStock, totalSales, totalCredit],
          pointBorderColor: "transparent",
          pointBackgroundColor: "transparent",
        },
      ],
    };
  };

  const fetchStore = () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
    const url = `${DOMAIN}admin/dashboardByStore`;
    const payload = {
      method: "POST",
      body: JSON.stringify({ token: localStorage.getItem("token"), store_id: storeId }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        console.log("success");
        $totalProfit(() => r.object.balancetotalByStore[0].totalBenefice);
        $totalSales(() => r.object.balancetotalByStore[0].totalBillingValue);
        $totalStock(() => r.object.balancetotalByStore[0].totalCA);
        $totalCredit(() => r.object.balancetotalByStore[0].balanceValue);
        $totalCharges(() => r.object.balancetotalByStore[0].totalCharge);
        $stockAlert(() => ({
          titles: [t("Product"), t("Stock"), t("Sales")],
          data: r.object.stockAlert.map((e) => ({ data: [e.nameOfProduct, e.qteStock, e.qteVendu] })),
        }));
        $recap(() =>
          r.object.recapDaily.map((e) => ({
            data: [e.id, e.totalCharge, e.totalBillingValue, e.totalPurchase, e.totalBenefice, e.totalCA, e.date],
          }))
        );
        $top(() =>
          r.object.Top10.map((e) => ({
            data: [e.product_id, e.nameOfProduct, e.qteStock, e.qteVendu],
          }))
        );
        $graphData(() => ({
          profit: r.object.graphe.BeneficeByMonth.map((e) => parseFloat(e.SumtotalBenefice)),
          charges: r.object.graphe.chargeByMonth.map((e) => parseFloat(e.sumtotalCharge)),
        }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (loader) loader.style.display = "none";
      });
  };

  useEffect(() => {
    fetchStore();
    setInterval(() => fetchStore(), 300000);
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <>
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal number={`${totalProfit} ${t("DA")}`} title={storeName} />
        </Col>
        <Col>
          <StatsCard cols={{ xl: "3", sm: "6" }} data={statistics} />
        </Col>
      </Row>
      <Card>
        <Row className="match-height">
          <Col sm="3">
            <RadarChart labelColor={labelColor} gridLineColor={gridLineColor} data={radarData} title={t("Performance")} />
          </Col>
          <Col lg="9">
            <StoreRevenue
              primary={colors.primary.main}
              warning={colors.warning.main}
              charges={graphData.charges}
              profit={graphData.profit}
            />
          </Col>
        </Row>
      </Card>
      <Card>
        <CardBody>
          <CardText>{t("Top products")}</CardText>
        </CardBody>
        <StripedTable data={top} columns={["ID", t("Product"), t("Stock"), t("Sales")]} />
      </Card>
      {stockAlert === null ? (
        <></>
      ) : (
        <Card style={{ maxHeight: "500px" }}>
          <CardBody>
            <CardText>{t("Stock alert")}</CardText>
          </CardBody>
          <StripedTable data={stockAlert.data} columns={stockAlert.titles} />
        </Card>
      )}
      <Card>
        <CardBody>
          <CardText>{t("Recap")}</CardText>
        </CardBody>
        <StripedTable data={recap} columns={["ID", t("Charges"), t("Sales"), t("Purchases"), t("Profit"), t("CA"), t("Date")]} />
      </Card>
    </>
  );
};

export default Store;
