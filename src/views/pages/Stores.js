import { useTranslation } from "react-i18next";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../params";
import { Card, CardBody, CardHeader, Col, Input, Row } from "reactstrap";
import { Grid } from "react-feather";

const Stores = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("authenticated") !== "true") navigate("/login");
  const [rows, $rows] = useState([]);

  const storeDetails = (row) => navigate(`/store/${row.id}/${row.store}`);

  const { t } = useTranslation();

  const columns = [
    {
      maxWidth: "50px",
      selector: (row) => <Grid onClick={() => storeDetails(row)} style={{ cursor: "pointer" }} />,
    },
    {
      name: "ID",
      maxWidth: "30px",
      sortable: true,
      selector: (row) => row.id,
    },
    {
      name: t("Store"),
      sortable: true,
      selector: (row) => row.store,
    },
    {
      name: t("Sales"),
      sortable: true,
      selector: (row) => `${row.sales} ${t("DA")}`,
    },
    {
      name: t("Purchases"),
      sortable: true,
      selector: (row) => `${row.purchases} ${t("DA")}`,
    },
    {
      name: t("Charges"),
      sortable: true,
      selector: (row) => `${row.charges} ${t("DA")}`,
    },
    {
      name: t("Profit"),
      sortable: true,
      selector: (row) => `${row.profit} ${t("DA")}`,
    },
    {
      name: t("Updated at"),
      sortable: false,
      selector: (row) => row.date,
    },
  ];

  const fetchStores = (search = "") => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
    const url = `${DOMAIN}admin/stores`;
    const payload = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        offset: 0,
        limit: 10000,
        orderBy: "desc",
        trie: "id",
        name: search === "" ? null : search,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        $rows(() =>
          r.object.stores.map((e) => ({
            id: e.id,
            store: e.name,
            sales: e.totalBillingValue,
            purchases: e.totalPurchase,
            profit: e.totalBenefice,
            charges: e.totalCharge,
            date: e.updated_at,
          }))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (loader) loader.style.display = "none";
      });
  };

  useEffect(() => {
    fetchStores();
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  let timeOut;
  const search = (value) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => fetchStores(value), 750);
  };

  return (
    <Card>
      <CardHeader>
        <Row>
          <Col>
            <Input placeholder={t("Search")} type="search" onChange={(e) => search(e.target.value)}></Input>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Table title={t("Stores")} data={rows} columns={columns} />
      </CardBody>
    </Card>
  );
};

export default Stores;
