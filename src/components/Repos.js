import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  // Calculate total occurrence of each language & stars from repos
  // total: what we return (object), item: each item to iterate
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    // Get rid of nulls
    if (!language) return total;
    // If property(css, js etc) on the object does not exist:
    if (!total[language]) {
      // Create object with value: 1 (first instance)
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      // If property on the object do exist:
      total[language] = {
        // Copy all properties
        ...total[language],
        // Overwrite value property with +1
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count
      };
    }
    return total;
    // Return object from reduce (eg: 'css: 14')
  }, {});

  // Most used languages (convert to array)
  const mostUsed = Object.values(languages)
    // Sort by highest value first
    .sort((a, b) => {
      return b.value - a.value;
    })
    // Show first 5 of most popular languages
    .slice(0, 5);

  // Most stars per language (convert to array)
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // Stars & Forks
  const { stars, forks } = repos.reduce(
    (total, item) => {
      // eslint-disable-next-line no-shadow
      const { stargazers_count, name, forks } = item;

      return total;
    },
    {
      stars: {},
      forks: {}
    }
  );

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={mostUsed} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={mostPopular} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }
  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
