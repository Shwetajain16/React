import React from 'react';
import './styles.css';

function Home() {
  return (
    <React.Fragment>
    <section className="showcase">
    <img src="https://images.unsplash.com/photo-1505410603994-c3ac6269711f?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt="Picture"/>
    <div className="overlay">
      <h2>WELCOME</h2>
      <p>
        3-TIER TICKET COLLECTING  WEB APPLICATION
      </p>
    </div>
  </section>
    </React.Fragment>

  )
}

export default Home