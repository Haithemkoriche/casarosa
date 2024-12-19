// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { CardTitle, CardBody, CardHeader } from "reactstrap";
import { useTranslation } from "react-i18next";

const StoreRevenue = ({ primary, warning, charges, profit }) => {
  const [t] = useTranslation();
  // ** State
  const revenueOptions = {
      chart: { stacked: true, type: "bar", toolbar: { show: false } },
      grid: { padding: { top: -20, bottom: -10 }, yaxis: { lines: { show: false } } },
      xaxis: {
        categories: [
          t("Jan"),
          t("Feb"),
          t("Mar"),
          t("Apr"),
          t("May"),
          t("Jun"),
          t("Jul"),
          t("Aug"),
          t("Sept"),
          t("Oct"),
          t("Nov"),
          t("Dec"),
        ],
        labels: { style: { colors: "#b9b9c3", fontSize: "0.86rem" } },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      legend: { show: false },
      dataLabels: { enabled: false },
      colors: [warning, primary],
      plotOptions: { bar: { columnWidth: "17%", borderRadius: [5] }, distributed: true },
      yaxis: { labels: { style: { colors: "#b9b9c3", fontSize: "0.86rem" } } },
    },
    revenueSeries = [
      {
        name: "Profit",
        data: profit,
      },
      {
        name: "Charges",
        data: charges,
      },
    ];

  return (
    <CardBody>
      <div className="d-sm-flex justify-content-between align-items-center mb-3">
        <CardHeader>
          <CardTitle className="mb-50 mb-sm-0">{t("Charges and Profit")}</CardTitle>
        </CardHeader>
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center me-2">
            <span className="bullet bullet-primary me-50 cursor-pointer"></span>
            <span>{t("Charges")}</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="bullet bullet-warning me-50 cursor-pointer"></span>
            <span>{t("Profit")}</span>
          </div>
        </div>
      </div>
      <Chart id="revenue-report-chart" type="bar" height="230" options={revenueOptions} series={revenueSeries} />
    </CardBody>
  );
};

export default StoreRevenue;
