// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from "reactstrap";
import { useTranslation } from "react-i18next";
// ** Images
import medal from "@src/assets/images/illustration/badge.svg";

const CardMedal = ({ number, title = "" }) => {
  const [t] = useTranslation();

  return (
    <Card className="card-congratulations-medal">
      <CardBody>
        <h5>{title === "" ? t("Total profit") : title}</h5>
        <CardText className="font-small-3">{t("Accumulated stores profit")}</CardText>
        <h3 className="mb-75 mt-2 pt-50">
          <a href="/" onClick={(e) => e.preventDefault()}>
            {number}
          </a>
        </h3>
        {/* <Button color="primary">{t('View list')}</Button> */}
        <img className="congratulation-medal" src={medal} alt="Medal Pic" />
      </CardBody>
    </Card>
  );
};

export default CardMedal;
