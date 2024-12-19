import { Col, Row, Card, CardHeader, Input, CardBody } from "reactstrap";
import { useTranslation } from "react-i18next";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../params";

const Products = () => {
  const navigate = useNavigate();
  if (localStorage.getItem("authenticated") !== "true") navigate("/login");
  const { t } = useTranslation();
  const [rows, $rows] = useState([]);

  const columns = [
    {
      name: "ID",
      maxWidth: "30px",
      selector: (row) => row.id,
    },
    {
      name: t("Product"),
      sortable: true,
      selector: (row) => row.product,
    },
    {
      name: t("Selling price"),
      sortable: true,
      selector: (row) => row.sellingPrice,
    },
    {
      name: t("Last purchase price"),
      sortable: true,
      selector: (row) => row.lastPurchasePrice,
    },
    {
      name: t("Stock"),
      sortable: true,
      selector: (row) => row.stock,
    },
    {
      name: t("Purchases"),
      sortable: true,
      selector: (row) => row.purchases,
    },
    {
      name: t("Sales"),
      sortable: true,
      selector: (row) => row.sales,
    },
    {
      name: t("Updated at"),
      sortable: true,
      selector: (row) => row.updatedAt,
    },
  ];
  const fetchProducts = (search = "") => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "flex";
    const url = `${DOMAIN}admin/products`;
    const payload = {
      method: "POST",
      body: JSON.stringify({
        token: localStorage.getItem("token"),
        limit: 10000,
        offset: 0,
        trie: "id",
        orderBy: "desc",
        name: search === "" ? null : search,
      }),
      headers: { "content-type": "application/json" },
    };
    fetch(url, payload)
      .then((r) => r.json())
      .then((r) => {
        if (r.status !== true) return;
        $rows(() =>
          r.object.products.map((e) => ({
            id: e.id,
            product: e.nameOfProduct,
            sales: e.qte_vendu_global,
            purchases: e.qte_achete_global,
            lastPurchasePrice: e.dernier_prix_achat,
            charges: e.totalCharge,
            sellingPrice: e.prix_vente,
            stock: e.qte_stoke,
            updatedAt: e.updated_at,
          }))
        );
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (loader) loader.style.display = "none";
      });
  };
  useEffect(() => {
    fetchProducts();
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  }, []);

  let timeOut;
  const search = (value) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => fetchProducts(value), 750);
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
        <Table title={t("Products")} data={rows} columns={columns} />
      </CardBody>
    </Card>
  );
};

export default Products;
