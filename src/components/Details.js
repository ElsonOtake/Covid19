import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
} from 'recharts';
import { fetchDetails } from '../redux/Details/Details';
import Header from './Header';
import './Details.css';
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

  return (
    <>
      <Header />
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
              <section className="lineDeaths">
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
              <section className="lineConfirmed">
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
