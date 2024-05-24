import React from 'react';
import './heading.css' ;
import { Link } from 'react-router-dom';
function Heading() {
  return (
    <div className="heading">
          <Link to="/" id="heading"><h1>FlyWeight Polls</h1></Link>
    </div>
  )
}

export default Heading