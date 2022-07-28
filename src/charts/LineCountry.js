import PropTypes from 'prop-types';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';

const LineCountry = (props) => {
  const { title, keyData, source } = props;
  return (
    <section className="lineChart">
      <h4>{title}</h4>
      <LineChart
        width={300}
        height={150}
        data={source}
        margin={{
          top: 5, right: 20, bottom: 5, left: 20,
        }}
      >
        <Line dataKey={keyData} stroke="#ffff00" dot={false} strokeWidth={3} />
        <CartesianGrid stroke="#fff" />
        <XAxis dataKey="date" stroke="#fff" />
        <YAxis stroke="#fff" />
        <Tooltip contentStyle={{ backgroundColor: 'transparent' }} />
      </LineChart>
    </section>
  );
};

const timelineShape = {
  name: PropTypes.string,
  newConfirmed: PropTypes.number,
  newDeaths: PropTypes.number,
};

LineCountry.defaultProps = {
  keyData: 'newConfirmed',
  source: [{
    name: '01',
    newConfirmed: 0,
    newDeaths: 0,
  }],
};

LineCountry.propTypes = {
  title: PropTypes.string.isRequired,
  keyData: PropTypes.string,
  source: PropTypes.arrayOf(PropTypes.shape(timelineShape)),
};

export default LineCountry;
