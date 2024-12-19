import { useTranslation } from "react-i18next";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../params";
import { Card, CardBody, CardHeader, Col, Input, Label, Row } from "reactstrap";
import Select from "react-select";
import { Grid } from "react-feather";

const Alerts = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("authenticated") !== "true") navigate("/login");
  const { t } = useTranslation();

  const [rows, $rows] = useState([]);
  const [status, $status] = useState(null);
  const [delivery, $delivery] = useState(null);
  let search = null;
  const columns = [
    {
      maxWidth: "50px",
      selector: (row) => <Grid onClick={() => navigate(`/alert/${row.id}`)} style={{ cursor: "pointer" }} />,
    },
    {
      name: t("Case number"),
      sortable: true,
      selector: (row) => row.case,
    },
    {
      name: t("To"),
      sortable: true,
      selector: (row) => row.to,
    },
    {
      name: t("Cost"),
      sortable: true,
      selector: (row) => `${row.cost} ${"DA"}`,
    },
    {
      name: t("Start date"),
      sortable: true,
      selector: (row) => row.start,
    },
    {
      name: t("Last update"),
      sortable: true,
      selector: (row) => row.update,
    },
    {
      name: t("Number of products"),
      sortable: true,
      selector: (row) => row.products,
    },
    {
      name: t("Quantity"),
      sortable: true,
      selector: (row) => row.quantity,
    },
    {
      name: t("Delivery"),
      sortable: true,
      selector: (row) => (row.delivery ? t("Recevied") : t("On route")),
    },
    {
      name: t("Status"),
      sortable: true,
      selector: (row) => (row.status ? t("Treated") : t("Untreated")),
    },
  ];

  const options = [
    { value: null, label: t("All") },
    { value: 1, label: t("Yes") },
    { value: 0, label: t("No") },
  ];

  const fetchAlerts = () => {
    let st = null;
    switch (status) {
      case null:
        st = null;
        break;
      case t("All"):
        st = null;
        break;
      case t("Yes"):
        st = 1;
        break;
      case t("No"):
        st = 0;
        break;
      default:
        st = null;
        break;
    }
    let dv = null;
    switch (delivery) {
      case null:
        dv = null;
        break;
      case t("All"):
        dv = null;
        break;
      case t("Yes"):
        dv = 1;
        break;
      case t("No"):
        dv = 0;
        break;
      default:
        dv = null;
        break;
    }
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
    const url = `${DOMAIN}admin/billingAlert`;
    const payload = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        name: search === "" ? null : search,
        delivery_status: dv,
        status: st,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        $rows(() =>
          r.object.map((e) => ({
            id: e.id,
            products: e.nombreOfProducts,
            to: e.name,
            quantity: e.globalQuantity,
            delivery: e.deliveryStatus,
            status: e.status,
            cost: e.totalBillingValue,
            start: e.created_at,
            update: e.updated_at,
            case: e.documentnumber,
          }))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (loader) loader.style.display = "none";
      });
  };

  useEffect(() => {
    fetchAlerts();
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  const changeStatus = (st) => {
    const word = st === null ? t("All") : st === 1 ? t("Yes") : t("No");
    $status(() => word);
  };
  const changeDevliery = (st) => {
    const word = st === null ? t("All") : st === 1 ? t("Yes") : t("No");
    $delivery(() => word);
  };

  useEffect(() => fetchAlerts(), [delivery, status]);

  let timeOut;
  const doASearch = (value) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      search = value;
      fetchAlerts();
    }, 750);
  };

  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <Input placeholder={t("Search")} type="search" onChange={(e) => doASearch(e.target.value)}></Input>
          </Col>
          <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Label>{t("Treated")}</Label>
            <Select className="react-select" classNamePrefix="select" defaultValue={options[0]} options={options} onChange={(e) => changeStatus(e.value)} />
          </Col>
          <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Label className="form-label">{t("Received")}</Label>
            <Select className="react-select" classNamePrefix="select" defaultValue={options[0]} options={options} onChange={(e) => changeDevliery(e.value)} />
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Table title={t("Alerts")} data={rows} columns={columns} />
      </CardBody>
    </Card>
  );
};

export default Alerts;
