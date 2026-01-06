'use client';
import React, { Fragment } from 'react';
import './paralax.scss';
import data from './data.json';

export const ParallaxBanner = () => {
  return (
    <Fragment>
      {data.map((item, index) => {
        return (
          <article
            key={index}
            className={`parallax_item parallax_${index} ${index === 0 || index === 3 ? 'white' : ''}`}
            style={{
              backgroundImage: `url(${item.bg})`,
            }}
          >
            <div className="mx-auto w-full lg:max-w-7xl px-5 lg:px-0">
              <div className="paralax_wrap">
                <h2 className="paralax_title">{item.title}</h2>
                <h5 className="parallax_subtitle">{item.subtitle}</h5>
                <p className="paralax_content">{item.description}</p>
              </div>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
};

export default ParallaxBanner;
