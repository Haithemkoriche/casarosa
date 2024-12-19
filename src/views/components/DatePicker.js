// ** React Imports
import { Fragment, useState } from "react";

// ** Reactstrap Imports
import { Label } from "reactstrap";

// ** Third Party Components
import Flatpickr from "react-flatpickr";
import "@styles/react/libs/flatpickr/flatpickr.scss";

const DatePicker = ({ title }) => {
  // ** State
  const [picker, setPicker] = useState(new Date());
  return (
    <Fragment>
      <Label className="form-label" for="default-picker">
        {title}
      </Label>
      <Flatpickr className="form-control" value={picker} onChange={(date) => setPicker(date)} id="default-picker" />
    </Fragment>
  );
};

export default DatePicker;
