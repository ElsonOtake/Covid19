import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import S_A from '../images/S_A.png';
import BR from '../images/BR.png';
import { fetchWHO } from '../redux/Home/Home';

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
        <article>
          <img src={S_A} alt="South America map" />
          <section>
            <h1>South America</h1>
            <p className="confirmed">37,672,077 Confirmed</p>
          </section>
        </article>
        <section>
          <h3>STATS BY COUNTRY</h3>
        </section>
        <div>
          <article>
            <img src={BR} alt="Brazil map" />
            <section>
              <h2>Brazil</h2>
              <p>21,327,616</p>
            </section>
          </article>
        </div>
      </main>
    </>

  );
};

export default Home;
