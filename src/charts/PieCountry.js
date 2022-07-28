import PropTypes from 'prop-types';
import {
  PieChart, Pie, Cell,
} from 'recharts';

const PieCountry = (props) => {
  const { title, country, continent } = props;
  const COLORS = ['#21618C', '#2E86C1'];

  const pieData = [
    { name: 'Country', value: country },
    { name: 'Others', value: continent - country },
  ];

  const perc = 100 * (country / continent);

  const textPerc = (cx, cy) => (
    <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={25} fill="#ffff00">
      {`${parseFloat(perc).toFixed(0)}%`}
    </text>
  );

  const renderCustomizedLabel = ({ cx, cy }) => textPerc(cx, cy);

  return (
    <section className="pieChart">
      <PieChart width={200} height={200}>
        <Pie
          data={pieData}
          startAngle={-270}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={60}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <h4>{title}</h4>
    </section>
  );
};

PieCountry.propTypes = {
  title: PropTypes.string.isRequired,
  country: PropTypes.number.isRequired,
  continent: PropTypes.number.isRequired,
};

export default PieCountry;
