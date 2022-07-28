import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
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

let imgSrc;

const Article = ({ code, name, confirmed }) => {
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

  return (
    <>
      {
        code !== 'S_A'
          ? (
            <Link to={`details/${code}`}>
              <article>
                <img src={imgSrc} alt={`${name} map`} />
                <section>
                  <h2>{name}</h2>
                  {
                    name === 'South America'
                      ? (
                        <p>
                          {`${confirmed.toLocaleString()} Confirmed`}
                        </p>
                      )
                      : (
                        <p>
                          {confirmed.toLocaleString()}
                        </p>
                      )
                  }
                </section>
                {
                  name !== 'South America' && <i className="fa-solid fa-circle-arrow-right" />
                }
              </article>
            </Link>
          )
          : (
            <article>
              <img src={imgSrc} alt={`${name} map`} />
              <section>
                <h2>{name}</h2>
                {
                  name === 'South America'
                    ? (
                      <p>
                        {`${confirmed.toLocaleString()} Confirmed`}
                      </p>
                    )
                    : (
                      <p>
                        {confirmed.toLocaleString()}
                      </p>
                    )
                }
              </section>
              {
                name !== 'South America' && <i className="fa-solid fa-circle-arrow-right" />
              }
            </article>
          )
      }
    </>
  );
};

Article.defaultProps = {
  code: '',
  name: '',
  confirmed: 0,
};

Article.propTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  confirmed: PropTypes.number,
};

export default Article;
