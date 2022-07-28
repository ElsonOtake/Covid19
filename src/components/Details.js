import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
import LineCountry from '../charts/LineCountry';
import PieCountry from '../charts/PieCountry';

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

  return (
    <>
      {
        detailsData.code === code ? (
          <main className="mainDetails">
            <article>
              <img src={imgSrc} alt={`${name} map`} />
              <section>
                <h1>{name}</h1>
                <p className="confirmed">{`${confirmed?.toLocaleString() || 0} Confirmed`}</p>
              </section>
            </article>
            <section>
              <h3>COUNTRY STATS</h3>
            </section>
            <section className="statistics">
              <div className="population">
                <div>
                  <p className="number">{population?.toLocaleString() || 0}</p>
                  <p className="text">population</p>
                </div>
                <div>
                  <p className="number">{casesPerMillion?.toLocaleString() || 0}</p>
                  <p className="text">cases / million</p>
                </div>
                <div>
                  <p className="number">{deathRate?.toFixed(2) || 0}</p>
                  <p className="text">death rate</p>
                </div>
              </div>
              <div className="critical">
                <div>
                  <p className="number">{critical?.toLocaleString() || 0}</p>
                  <p className="text">critical</p>
                </div>
                <div>
                  <p className="number">{deaths?.toLocaleString() || 0}</p>
                  <p className="text">deaths</p>
                </div>
              </div>
            </section>
            <section className="line">
              <LineCountry title="Deaths" keyData="newDeaths" source={timeline} />
              <LineCountry title="Confirmed" keyData="newConfirmed" source={timeline} />
            </section>
            <h5>South America</h5>
            <div className="pie">
              <PieCountry
                title="Population"
                country={population}
                continent={populationSouthAmerica}
              />
              <PieCountry
                title="Confirmed"
                country={confirmed}
                continent={confirmedSouthAmerica}
              />
              <PieCountry
                title="Critical"
                country={critical}
                continent={criticalSouthAmerica}
              />
              <PieCountry
                title="Deaths"
                country={deaths}
                continent={deathsSouthAmerica}
              />
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
