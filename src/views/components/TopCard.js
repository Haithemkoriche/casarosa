// ** Third Party Components
import Avatar from "@components/avatar";
import { useNavigate } from "react-router-dom";

// ** Reactstrap Imports
import { Card, CardBody, CardTitle, CardHeader } from "reactstrap";

const TopCard = ({ title, items, clickable = false }) => {
  const colors = ["light-primary", "light-success", "light-danger", "light-warning", "light-info"];
  const navigate = useNavigate();
  const details = (item) => {
    if (clickable) navigate(`/store/${item.id}/${item.name}`);
  };
  const renderStates = () => {
    return items.map((item, i) => {
      return (
        <div key={i} className="browser-states">
          <div className="d-flex">
            <div className="me-1">
              <Avatar className="rounded" color={colors[i]} icon={i + 1} />
            </div>
            <h6 className="align-self-center mb-0" onClick={() => details(item)} style={{ cursor: clickable ? "pointer" : "auto" }}>
              {item.name}
            </h6>
          </div>
          <div className="d-flex align-items-center">
            <div className="fw-bold text-body-heading me-1">{item.value}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardBody>{renderStates()}</CardBody>
    </Card>
  );
};

export default TopCard;
