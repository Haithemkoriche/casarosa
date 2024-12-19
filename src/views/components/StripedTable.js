// ** Reactstrap Imports
import { Table } from "reactstrap";

const StripedTable = ({ columns, data }) => {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          {columns.map((e, i) => (
            <th key={i}>{e}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((d, i) => (
          <tr key={i}>
            {d.data.map((e, y) => (
              <td key={y}>{e}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StripedTable;
