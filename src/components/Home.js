import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCovid19 } from '../redux/Home/Home';
import Article from './Article';

const Home = () => {
  const covid19Data = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (covid19Data.length === 0) {
      dispatch(fetchCovid19());
    }
  }, [covid19Data.length]);

  const getSumConfirmed = (total, country) => total + country.confirmed;

  return (
    <main className="mainHome">
      {
        covid19Data.length > 0 && (
          <Article
            code="S_A"
            name="South America"
            confirmed={covid19Data.reduce(getSumConfirmed, 0)}
          />
        )
      }
      <section>
        <h3>STATS BY COUNTRY</h3>
      </section>
      <div>
        {
          covid19Data.length > 0 && covid19Data.map((country) => {
            if (country.code !== 'S_A') {
              return (
                <Article
                  key={country.code}
                  code={country.code}
                  name={country.name}
                  confirmed={country.confirmed}
                />
              );
            }
            return null;
          })
        }
      </div>
    </main>
  );
};

export default Home;
