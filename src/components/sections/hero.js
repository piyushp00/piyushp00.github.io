import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { email } from '@config';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 150px 0;
  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }
  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }
  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }
  p {
    margin: 20px 0 0;
    max-width: 540px;
  }
  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hello World!, my name is</h1>;
  const two = <h2 className="big-heading">Piyush Pandey.</h2>;
  const three = <h3 className="big-heading">I love exploring new things.</h3>;
  const four = (
    <div>
      <p>
        I'm an India based developer with a goal-driven creative mindset and passion for learning
        and innovating.
      </p>

      <p>
        Currently, I hold a B.Tech in Computer Science Engineering from{' '}
        <a href="https://bvucoepune.edu.in/" target="_blank" rel="noreferrer">
          Bharati Vidyapeeth College of Engineering, Pune
        </a>
      </p>
      <p>
        Outside work, I share tech content and resources on{' '}
        <a href="https://twitter.com/Piyushp00" target="_blank" rel="noreferrer">
          Twitter
        </a>. Off-screen, I love to read books and I also love rockets.🚀🚀
      </p>
    </div>
  );
  const five = (
    <a href={`mailto:${email}`} className="email-link">
      Hire Me
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
