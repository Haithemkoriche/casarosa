// ** React Imports
import { useContext, useEffect, useState } from "react";
// ** Reactstrap Imports
import { Row, Col, CardText, CardBody, Card, CardHeader, Input } from "reactstrap";
// ** Context
import { ThemeColors } from "../../utility/context/ThemeColors";
import { useTranslation } from "react-i18next";
// ** Components
import CardMedal from "../components/CardMedal";
import StatsCard from "../components/StatsCard";
import RevenueReport from "../components/RevenueReport";
import TopCard from "../components/TopCard";
import StoresChart from "../components/StoresChart";
import { TrendingUp, User, DollarSign, Box } from "react-feather";
import StripedTable from "../components/StripedTable";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../params";
import FullScreenLoader from "../components/FullScreenLoader";

const Dashboard = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("authenticated") !== "true") navigate("/login");

  const [topProducts, $topProducts] = useState([]);
  const [topStoreSales, $topStoreSales] = useState([]);
  const [topStoreCharges, $topStoreCharges] = useState([]);
  const [topStoreProfit, $topStoreProfit] = useState([]);
  const [totalProfit, $totalProfit] = useState("");
  const [stats, $stats] = useState([]);
  const [graphData, $graphData] = useState({});
  const [stockAlert, $stockAlert] = useState(null);
  const [store, $store] = useState(null);
  const [yearly, $yearly] = useState(null);
  // const storeDetails = (row) => navigate(`/store/${row.id}/${row.store}`);

  // ** Context
  const { colors } = useContext(ThemeColors);
  const { t } = useTranslation();
  const fetchDashboard = (value = "") => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
    const url = `${DOMAIN}admin/balancetotal`;
    const payload = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ token: localStorage.getItem("token"), product: value === "" ? null : value }),
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        $topProducts(() => r.object.top5_products.map((e) => ({ name: e.nameOfProduct, value: e.qte_vendu_global })));
        $topStoreSales(() => r.object.Top5StoreBybillingValue.map((e) => ({ name: e.name, value: `${e.totalBillingValue} ${t("DA")}`, id: e.id })));
        $topStoreCharges(() => r.object.Top5StoreByCharge.map((e) => ({ name: e.name, value: `${e.totalCharge} ${t("DA")}`, id: e.id })));
        $topStoreProfit(() => r.object.Top5StoreByBenefice.map((e) => ({ name: e.name, value: `${e.totalBenefice} ${t("DA")}`, id: e.id })));
        $totalProfit(() => `${r.object.total.totalBenefice} ${t("DA")}`);
        $stats(() => [
          {
            title: `${r.object.total.totalVente} ${t("DA")}`,
            subtitle: t("Sales"),
            color: "light-primary",
            icon: <TrendingUp size={24} />,
          },
          {
            title: `${r.object.total.totalCredit} ${t("DA")}`,
            subtitle: t("Customers credit"),
            color: "light-info",
            icon: <User size={24} />,
          },
          {
            title: `${r.object.total.totalproduct} ${t("DA")}`,
            subtitle: t("Total stock"),
            color: "light-danger",
            icon: <Box size={24} />,
          },
          {
            title: `${r.object.total.totalVersement} ${t("DA")}`,
            subtitle: t("Payments"),
            color: "light-success",
            icon: <DollarSign size={24} />,
          },
        ]);
        $graphData(() => ({
          profit: r.object.Graphe1.BeneficeByMonth.map((e) => parseFloat(e.SumtotalBenefice)),
          charges: r.object.Graphe1.chargeByMonth.map((e) => parseFloat(e.sumtotalCharge)),
        }));
        $stockAlert(() => ({
          titles: [t("Product"), t("Stock"), t("Sales")],
          data: r.object.StockAlertGlobaltop25.map((e) => ({ data: [e.nameOfProduct, e.qte_stoke, e.qte_vendu_global] })),
        }));
        const st = r.object.Stores.object.stores;
        const labels = st.map((e) => e.name);
        const sales = st.map((e) => e.totalBillingValue);
        const charges = st.map((e) => e.totalCharge);
        const profit = st.map((e) => e.totalBenefice);
        $store(() => ({
          labels,
          datasets: [
            {
              maxBarThickness: 10,
              label: t("Sales"),
              backgroundColor: "lightgreen",
              borderColor: "transparent",
              data: sales,
            },
            {
              maxBarThickness: 10,
              backgroundColor: "pink",
              label: t("Charges"),
              borderColor: "transparent",
              data: charges,
            },
            {
              maxBarThickness: 10,
              backgroundColor: "gold",
              label: t("Profit"),
              borderColor: "transparent",
              data: profit,
            },
          ],
        }));
        $yearly(() => ({
          years: r.object.ghrapheYear.BeneficeByYear.map((e) => e.year),
          profit: r.object.ghrapheYear.BeneficeByYear.map((e) => e.SumtotalBenefice),
          charges: r.object.ghrapheYear.chargeByYear.map((e) => e.sumtotalCharge),
        }));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (loader) loader.style.display = "none";
      });
  };

  useEffect(() => {
    fetchDashboard();
    setInterval(() => fetchDashboard(), 300000);
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  let timeOut;
  const search = (value) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => fetchDashboard(value), 750);
  };

  return (
    <>
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal number={totalProfit} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard cols={{ xl: "3", sm: "6" }} data={stats} />
        </Col>
      </Row>
      <Row className="match-height">
        {topProducts.length > 0 ? (
          <Col>
            <TopCard title={t("Top products")} items={topProducts} />
          </Col>
        ) : (
          <></>
        )}
        {topStoreSales.length > 0 ? (
          <Col>
            <TopCard title={t("Top stores by sales")} items={topStoreSales} clickable={true} />
          </Col>
        ) : (
          <></>
        )}
        {topStoreProfit.length > 0 ? (
          <Col>
            <TopCard title={t("Top stores by profit")} items={topStoreProfit} clickable={true} />
          </Col>
        ) : (
          <></>
        )}
        {topStoreCharges.length > 0 ? (
          <Col>
            <TopCard title={t("Top stores by charges")} items={topStoreCharges} clickable={true} />
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <Col lg="12" md="12">
        <RevenueReport primary={colors.primary.main} warning={colors.warning.main} charges={graphData.charges} profit={graphData.profit} yearly={yearly} />
      </Col>
      {store === null ? (
        <></>
      ) : (
        <Col xl="12" lg="12">
          <StoresChart data={store} style={{ maxHeight: "500px" }} />
        </Col>
      )}
      {stockAlert === null ? (
        <></>
      ) : (
        <Card style={{ maxHeight: "500px" }}>
          <CardHeader>
            <Row>
              <Col>
                <Input placeholder={t("Search")} type="search" onChange={(e) => search(e.target.value)}></Input>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <CardText>{t("Stock alert")}</CardText>
          </CardBody>
          <StripedTable data={stockAlert.data} columns={stockAlert.titles} />
        </Card>
      )}
    </>
  );
};

export default Dashboard;
