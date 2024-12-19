import { useTranslation } from "react-i18next";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../params";
import { Card, CardBody } from "reactstrap";

const Navigate = () => {
  const navigate = useNavigate();

  if (localStorage.getItem("authenticated") !== "true") navigate("/login");
  const [rows, $rows] = useState([]);
  const { t } = useTranslation();

  const columns = [
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
      selector: (row) => row.sales,
    },
    {
      name: t("Purchases"),
      sortable: true,
      selector: (row) => row.purchases,
    },
    {
      name: t("Charges"),
      sortable: true,
      selector: (row) => row.charges,
    },
    {
      name: t("Profit"),
      sortable: true,
      selector: (row) => row.profit,
    },
    {
      name: t("Updated at"),
      sortable: false,
      selector: (row) => row.date,
    },
  ];

  const fetchNavigate = (search = "") => {
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
    fetchNavigate();
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  return (
    <Card>
      <CardBody>
        <Table title={t("Navigate")} data={rows} columns={columns} />
      </CardBody>
    </Card>
  );
};

export default Navigate;
