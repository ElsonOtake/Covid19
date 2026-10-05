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

const COUNTRIES_CONFIG = {
  argentina: { imgSrc: AR, population: 45199254 },
  bolivia: { imgSrc: BO, population: 11673021 },
  brazil: { imgSrc: BR, population: 212559417 },
  chile: { imgSrc: CL, population: 19116201 },
  colombia: { imgSrc: CO, population: 50882891 },
  ecuador: { imgSrc: EC, population: 17643054 },
  'french-guiana': { imgSrc: GF, population: 298682 },
  guyana: { imgSrc: GY, population: 786552 },
  peru: { imgSrc: PE, population: 32971854 },
  paraguay: { imgSrc: PY, population: 7132538 },
  suriname: { imgSrc: SR, population: 586632 },
  uruguay: { imgSrc: UY, population: 3473730 },
  venezuela: { imgSrc: VE, population: 28435940 },
};

const DEFAULT_CONFIG = { imgSrc: S_A, population: 0 };
const POPULATION_SOUTH_AMERICA = 439477929;

const Details = () => {
  const detailsData = useSelector((state) => state.detailsReducer);
  const homeData = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { imgSrc, population } = COUNTRIES_CONFIG[slug] || DEFAULT_CONFIG;

  useEffect(() => {
    dispatch(fetchDetails(slug));
  }, []);

  const {
    name,
    confirmed,
    deaths,
    timeline,
  } = detailsData;

  const deathRate = confirmed ? (deaths / confirmed) * 100 : 0;
  const casesPerMillion = population ? parseInt((confirmed / population) * 1000000, 10) : 0;

  const getConfirmed = (total, country) => total + country.confirmed;
  const getDeaths = (total, country) => total + country.deaths;

  const confirmedSouthAmerica = homeData.reduce(getConfirmed, 0);
  const deathsSouthAmerica = homeData.reduce(getDeaths, 0);

  return (
    <>
      {
        Boolean(name) ? (
          <main className="mainDetails">
            <article>
              <img src={imgSrc} alt={`${name} map`} />
              <section>
                <h1>{name}</h1>
                <p className="confirmed">{`${(confirmed || 0).toLocaleString()} Confirmed`}</p>
              </section>
            </article>
            <section>
              <h3>COUNTRY STATS</h3>
            </section>
            <section className="statistics">
              <div className="population">
                <div>
                  <p className="number">{(population || 0).toLocaleString()}</p>
                  <p className="text">population</p>
                </div>
                <div>
                  <p className="number">{(casesPerMillion || 0).toLocaleString()}</p>
                  <p className="text">cases / million</p>
                </div>
                <div>
                  <p className="number">{(deathRate || 0).toFixed(2)}</p>
                  <p className="text">death rate</p>
                </div>
              </div>
              <div className="active">
                <div>
                  <p className="number">{(deaths || 0).toLocaleString()}</p>
                  <p className="text">total deaths</p>
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
                continent={POPULATION_SOUTH_AMERICA}
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
