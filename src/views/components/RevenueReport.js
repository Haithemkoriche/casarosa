// ** Third Party Components
// import axios from "axios";
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Row, Col, Card, CardTitle, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledButtonDropdown } from "reactstrap";
import { useTranslation } from "react-i18next";

const RevenueReport = ({ primary, warning, charges, profit, yearly }) => {
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

  const budgetSeries = [{ data: profit }, { data: charges }],
    budgetOptions = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: "line",
        sparkline: { enabled: true },
      },
      stroke: { curve: "smooth", dashArray: [0, 5], width: [2] },
      colors: [warning, primary],
      tooltip: { enabled: false },
    };

  return yearly !== null ? (
    <Card className="card-revenue-budget">
      <Row className="mx-0">
        <Col className="revenue-report-wrapper" md="8" xs="12">
          <div className="d-sm-flex justify-content-between align-items-center mb-3">
            <CardTitle className="mb-50 mb-sm-0">{t("Charges and profit")}</CardTitle>
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
        </Col>
        <Col className="budget-wrapper" md="4" xs="12">
          <UncontrolledButtonDropdown>
            <DropdownToggle className="budget-dropdown" outline color="primary" size="sm" caret>
              {yearly.years[0]}
            </DropdownToggle>
            <DropdownMenu>
              {yearly.years.map((item) => (
                <DropdownItem className="w-100" key={item}>
                  {item}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </UncontrolledButtonDropdown>
          <h2 className="mb-25">{yearly.profit} {t('DA')}</h2>
          <div className="d-flex justify-content-center">
            <span>{yearly.charges} {t('DA')}</span>
          </div>
          <Chart id="budget-chart" type="line" height="80" options={budgetOptions} series={budgetSeries} />
        </Col>
      </Row>
    </Card>
  ) : null;
};

export default RevenueReport;
