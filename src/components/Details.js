import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell,
} from 'recharts';
import { fetchDetails } from '../redux/Details/Details';
import S_A from '../images/S_A.png';
import AR from '../images/AR.png';
import BO from '../images/BO.png';
import BR from '../images/BR.png';
import CL from '../images/CL.png';
import CO from '../images/CO.png';
import EC from '../images/EC.png';
import GF from '../images/GF.png';
import GY from '../images/GY.png';
import PE from '../images/PE.png';
import PY from '../images/PY.png';
import SR from '../images/SR.png';
import UY from '../images/UY.png';
import VE from '../images/VE.png';

const Details = () => {
  const detailsData = useSelector((state) => state.detailsReducer);
  const covid19Data = useSelector((state) => state.covid19Reducer);
  const dispatch = useDispatch();
  const { code } = useParams();

  let imgSrc;
  switch (code) {
    case 'AR':
      imgSrc = AR;
      break;
    case 'BO':
      imgSrc = BO;
      break;
    case 'BR':
      imgSrc = BR;
      break;
    case 'CL':
      imgSrc = CL;
      break;
    case 'CO':
      imgSrc = CO;
      break;
    case 'EC':
      imgSrc = EC;
      break;
    case 'GF':
      imgSrc = GF;
      break;
    case 'GY':
      imgSrc = GY;
      break;
    case 'PE':
      imgSrc = PE;
      break;
    case 'PY':
      imgSrc = PY;
      break;
    case 'SR':
      imgSrc = SR;
      break;
    case 'UY':
      imgSrc = UY;
      break;
    case 'VE':
      imgSrc = VE;
      break;
    default:
      imgSrc = S_A;
  }

  useEffect(() => {
    dispatch(fetchDetails(code));
  }, []);

  const {
    name,
    population,
    confirmed,
    critical,
    deathRate,
    casesPerMillion,
    deaths,
    timeline,
  } = detailsData;

  const getPopulation = (total, country) => total + country.population;
  const getConfirmed = (total, country) => total + country.confirmed;
  const getCritical = (total, country) => total + country.critical;
  const getDeaths = (total, country) => total + country.deaths;

  const populationSouthAmerica = covid19Data.reduce(getPopulation, 0);
  const confirmedSouthAmerica = covid19Data.reduce(getConfirmed, 0);
  const criticalSouthAmerica = covid19Data.reduce(getCritical, 0);
  const deathsSouthAmerica = covid19Data.reduce(getDeaths, 0);

  const piePopulationData = [
    { name, value: population },
    { name: 'Others', value: populationSouthAmerica - population },
  ];

  const pieConfirmedData = [
    { name, value: confirmed },
    { name: 'Others', value: confirmedSouthAmerica - confirmed },
  ];

  const pieCriticalData = [
    { name, value: critical },
    { name: 'Others', value: criticalSouthAmerica - critical },
  ];

  const pieDeathsData = [
    { name, value: deaths },
    { name: 'Others', value: deathsSouthAmerica - deaths },
  ];

  const COLORS = ['#21618C', '#2E86C1'];

  const renderCustomizedLabelPopulation = ({ cx, cy }) => {
    const perc = 100 * (piePopulationData[0].value
      / (piePopulationData[0].value + piePopulationData[1].value));

    return (
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={25} fill="#ffff00">
        {`${parseFloat(perc).toFixed(0)}%`}
      </text>
    );
  };

  const renderCustomizedLabelConfirmed = ({ cx, cy }) => {
    const perc = 100 * (pieConfirmedData[0].value
      / (pieConfirmedData[0].value + pieConfirmedData[1].value));

    return (
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={25} fill="#ffff00">
        {`${parseFloat(perc).toFixed(0)}%`}
      </text>
    );
  };

  const renderCustomizedLabelCritical = ({ cx, cy }) => {
    const perc = 100 * (pieCriticalData[0].value
      / (pieCriticalData[0].value + pieCriticalData[1].value));

    return (
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={25} fill="#ffff00">
        {`${parseFloat(perc).toFixed(0)}%`}
      </text>
    );
  };

  const renderCustomizedLabelDeaths = ({ cx, cy }) => {
    const perc = 100 * (pieDeathsData[0].value
      / (pieDeathsData[0].value + pieDeathsData[1].value));

    return (
      <text x={cx} y={cy} dy={8} textAnchor="middle" fontSize={25} fill="#ffff00">
        {`${parseFloat(perc).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      {
        detailsData.code === code ? (
          <main>
            <article>
              <img src={imgSrc} alt={`${name} map`} />
              <section>
                <h1>{name}</h1>
                <p className="confirmed">{`${confirmed.toLocaleString()} Confirmed`}</p>
              </section>
            </article>
            <section>
              <h3>COUNTRY STATS</h3>
            </section>
            <section className="statistics">
              <div className="population">
                <div>
                  <p className="number">{population.toLocaleString()}</p>
                  <p className="text">population</p>
                </div>
                <div>
                  <p className="number">{casesPerMillion.toLocaleString()}</p>
                  <p className="text">cases / million</p>
                </div>
                <div>
                  <p className="number">{deathRate.toFixed(2)}</p>
                  <p className="text">death rate</p>
                </div>
              </div>
              <div className="critical">
                <div>
                  <p className="number">{critical.toLocaleString()}</p>
                  <p className="text">critical</p>
                </div>
                <div>
                  <p className="number">{deaths.toLocaleString()}</p>
                  <p className="text">deaths</p>
                </div>
              </div>
            </section>
            <section className="line">
              <section className="lineChart">
                <h4>Deaths</h4>
                <LineChart
                  width={300}
                  height={150}
                  data={timeline}
                  margin={{
                    top: 5, right: 20, bottom: 5, left: 20,
                  }}
                >
                  <Line dataKey="newDeaths" stroke="#ffff00" dot={false} strokeWidth={3} />
                  <CartesianGrid stroke="#fff" />
                  <XAxis dataKey="date" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: 'transparent' }} />
                </LineChart>
              </section>
              <section className="lineChart">
                <h4>Confirmed</h4>
                <LineChart
                  width={300}
                  height={150}
                  data={timeline}
                  margin={{
                    top: 5, right: 20, bottom: 5, left: 20,
                  }}
                >
                  <Line dataKey="newConfirmed" stroke="#ffff00" dot={false} strokeWidth={3} />
                  <CartesianGrid stroke="#fff" />
                  <XAxis dataKey="date" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip contentStyle={{ backgroundColor: 'transparent' }} />
                </LineChart>
              </section>
            </section>
            <h5>South America</h5>
            <div className="pie">
              <section className="pieChart">
                <PieChart width={200} height={200}>
                  <Pie
                    data={piePopulationData}
                    startAngle={-270}
                    labelLine={false}
                    label={renderCustomizedLabelPopulation}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {piePopulationData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <h4>Population</h4>
              </section>
              <section className="pieChart">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieConfirmedData}
                    startAngle={-270}
                    labelLine={false}
                    label={renderCustomizedLabelConfirmed}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieConfirmedData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <h4>Confirmed</h4>
              </section>
              <section className="pieChart">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieCriticalData}
                    startAngle={-270}
                    labelLine={false}
                    label={renderCustomizedLabelCritical}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieCriticalData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <h4>Critical</h4>
              </section>
              <section className="pieChart">
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieDeathsData}
                    startAngle={-270}
                    labelLine={false}
                    label={renderCustomizedLabelDeaths}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {pieDeathsData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
                <h4>Deaths</h4>
              </section>
            </div>
          </main>
        )
          : (
            <h2>Loading data</h2>
          )
      }
    </>
  );
};

export default Details;
