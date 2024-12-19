// ** Third Party Components
import { Radar } from "react-chartjs-2";

// ** Reactstrap Imports
import { CardHeader, CardTitle, CardBody } from "reactstrap";

const RadarChart = ({ gridLineColor, labelColor, data, title }) => {
  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: { padding: { top: -20 } },
    scales: {
      r: {
        ticks: { display: false, maxTicksLimit: 1, color: labelColor },
        grid: { color: gridLineColor },
        pointLabels: { color: labelColor },
        angleLines: { color: gridLineColor },
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: { padding: 25, color: labelColor },
      },
    },
  };

  //** To add spacing between legends and chart
  const plugins = [
    {
      beforeInit(chart) {
        chart.legend.afterFit = function () {
          this.height += 20;
        };
      },
    },
  ];

  return (
    <>
      <CardHeader className="d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column">
        <CardTitle tag="h4">{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: "355px" }}>
          <Radar data={data} options={options} height={355} plugins={plugins} />
        </div>
      </CardBody>
    </>
  );
};

export default RadarChart;
