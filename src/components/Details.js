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
  const homeData = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();
  const { slug } = useParams();

  let imgSrc;
  let country;
  let population;
  const populationSouthAmerica = 439477929;

  switch (slug) {
    case 'argentina':
      imgSrc = AR;
      country = 'Argentina';
      population = 45199254;
      break;
    case 'bolivia':
      imgSrc = BO;
      country = 'Bolivia';
      population = 11673021;
      break;
    case 'brazil':
      imgSrc = BR;
      country = 'Brazil';
      population = 212559417;
      break;
    case 'chile':
      imgSrc = CL;
      country = 'Chile';
      population = 19116201;
      break;
    case 'colombia':
      imgSrc = CO;
      country = 'Colombia';
      population = 50882891;
      break;
    case 'ecuador':
      imgSrc = EC;
      country = 'Ecuador';
      population = 17643054;
      break;
    case 'french-guiana':
      imgSrc = GF;
      country = 'French Guiana';
      population = 298682;
      break;
    case 'guyana':
      imgSrc = GY;
      country = 'Guyana';
      population = 786552;
      break;
    case 'peru':
      imgSrc = PE;
      country = 'Peru';
      population = 32971854;
      break;
    case 'paraguay':
      imgSrc = PY;
      country = 'Paraguay';
      population = 7132538;
      break;
    case 'suriname':
      imgSrc = SR;
      country = 'Suriname';
      population = 586632;
      break;
    case 'uruguay':
      imgSrc = UY;
      country = 'Uruguay';
      population = 3473730;
      break;
    case 'venezuela':
      imgSrc = VE;
      country = 'Venezuela (Bolivarian Republic)';
      population = 28435940;
      break;
    default:
      imgSrc = S_A;
  }

  useEffect(() => {
    dispatch(fetchDetails(slug));
  }, []);

  const {
    name,
    confirmed,
    active,
    deaths,
    timeline,
  } = detailsData;

  const deathRate = (deaths / confirmed) * 100;
  const casesPerMillion = parseInt((confirmed / population) * 1000000, 10);

  const getConfirmed = (total, country) => total + country.confirmed;
  const getDeaths = (total, country) => total + country.deaths;

  const confirmedSouthAmerica = homeData.reduce(getConfirmed, 0);
  const deathsSouthAmerica = homeData.reduce(getDeaths, 0);

  return (
    <>
      {
        name === country ? (
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
              <div className="active">
                <div>
                  <p className="number">{active?.toLocaleString() || 0}</p>
                  <p className="text">active</p>
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
                title="Deaths"
                country={deaths}
                continent={deathsSouthAmerica}
              />
              <PieCountry
                title="Confirmed"
                country={confirmed}
                continent={confirmedSouthAmerica}
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
