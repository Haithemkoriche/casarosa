// ** Third Party Components
import { Bar } from "react-chartjs-2";
// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap";
import { useTranslation } from "react-i18next";

const StoresChart = ({ data }) => {
  const { t } = useTranslation();
  // ** Chart Options
  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    elements: { bar: { borderRadius: { topRight: 10, bottomRight: 10 } } },
    layout: { padding: { top: -4 } },
    scales: {
      x: {
        min: 0,
        grid: { drawTicks: false, borderColor: "transparent" },
      },
      y: { grid: { display: false } },
    },
    plugins: { legend: { align: "end", position: "top" } },
  };

  return (
    <Card>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">{t("Stores")}</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ minHeight: "400px" }}>
          <Bar data={data} options={options} height={400} />
        </div>
      </CardBody>
    </Card>
  );
};

export default StoresChart;
