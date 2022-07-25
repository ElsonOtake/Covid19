import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWHO } from '../redux/Home/Home';
import Article from './Article';

const Home = () => {
  const covid19Data = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (covid19Data.length === 0) {
      dispatch(fetchWHO());
    }
  }, [covid19Data.length]);

  return (
    <>
      <header>
        <p>Covid19 in South America</p>
      </header>
      <main>
        {
          covid19Data.length > 0 && covid19Data.filter(
            (country) => country.code === 'S_A',
          ).map((continent) => (
            <Article
              key={continent.code}
              code={continent.code}
              name={continent.name}
              confirmed={continent.confirmed}
            />
          ))
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
    </>

  );
};

export default Home;
