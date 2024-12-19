import { useTranslation } from "react-i18next";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMAIN from "../../params";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Input, Row } from "reactstrap";
import BasicModal from "../components/BasicModal";
import { Box, Clock } from "react-feather";

const Alert = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("authenticated") !== "true") navigate("/login");
  const { t } = useTranslation();
  const billing_id = useParams().id;
  const [note, $note] = useState("");
  const [rows, $rows] = useState([]);
  const [modal, $modal] = useState(false);
  const [modalData, $modalData] = useState([]);
  const fetchAlert = (search = "") => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
    const url = `${DOMAIN}admin/alertDetails`;
    const payload = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        billing_id,
        name: search === "" ? null : search,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        $note(() => r.object.note);
        $rows(() =>
          r.object.map((e) => ({
            id: e.id,
            price: e.price,
            total: e.total,
            product: e.nameOfproduct,
            sent: e.Quantity,
            received: e.Quantity_found,
            difference: e.Quantity_deference,
            server: e.serverStatus,
            store: e.storeStaus,
            updated: e.updated_at,
          }))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (loader) loader.style.display = "none";
      });
  };

  useEffect(() => {
    fetchAlert();
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  const handleOrder = (id, type) => {
    const url = `${DOMAIN}admin/changestatus`;
    const payload = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        serverStatus: type === 0 ? 1 : 0,
        detail_billings_id: id,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        fetchAlert();
      })
      .catch((err) => console.error(err));
  };
  const fetchHistory = (id) => {
    const url = `${DOMAIN}admin/historique_status`;
    const payload = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        detail_billing_id: id,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.length === 0 || r.object === null) {
          $modalData(() => <p>{t("Empty")}</p>);
        } else {
          $modalData(() => (
            <>
              {r.map((el, i) => (
                <Row key={i} sm={12}>
                  <Col lg={1}>
                    <Box color={el.status === 0 ? "red" : "green"} />
                  </Col>
                  <Col>
                    <p>{el.status === 0 ? t("Untreated") : t("Treated")}</p>
                    <p>{el.created_at}</p>
                  </Col>
                </Row>
              ))}
            </>
          ));
        }
        $modal(() => true);
      })
      .catch((err) => console.error(err));
  };

  const search = (value) => fetchAlert(value);
  const columns = [
    {
      maxWidth: "10px",
      selector: (row) => <Clock onClick={() => fetchHistory(row.id)} style={{ cursor: "pointer" }} />,
    },
    {
      name: t("Product"),
      sortable: true,
      selector: (row) => row.product,
    },
    {
      name: t("Price"),
      sortable: true,
      selector: (row) => `${row.price} ${t("DA")}`,
    },
    {
      name: t("Total"),
      sortable: true,
      selector: (row) => `${row.total} ${t("DA")}`,
    },
    {
      name: t("Quantity sent"),
      sortable: true,
      selector: (row) => row.sent,
    },
    {
      name: t("Quantity received"),
      sortable: true,
      selector: (row) => row.received,
    },
    {
      name: t("Difference"),
      sortable: true,
      selector: (row) => <span style={{ color: row.difference > 0 ? "red" : "" }}>{row.difference}</span>,
    },
    {
      name: t("Last update"),
      minWidth: "200px",
      sortable: true,
      selector: (row) => row.updated,
    },
    {
      name: t("Store"),
      maxWidth: "120px",
      selector: (row) => (row.store ? t("Treated") : t("Untreated")),
    },
    {
      name: t("Server"),
      minWidth: "145px",
      selector: (row) => (
        <Button color={row.server ? "success" : "warning"} onClick={() => handleOrder(row.id, row.server)}>
          {row.server ? t("Treated") : t("Untreated")}
        </Button>
      ),
    },
  ];
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t("Note")}</CardTitle>
          <CardText>{note}</CardText>
        </CardHeader>
        <CardHeader>
          <Row>
            <Col>
              <Input placeholder={t("Search")} type="search" onChange={(e) => search(e.target.value)}></Input>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Table title={t("Alert")} data={rows} columns={columns} />
        </CardBody>
      </Card>
      <BasicModal data={modalData} basicModal={modal} close={() => $modal(() => false)} />
    </>
  );
};

export default Alert;
