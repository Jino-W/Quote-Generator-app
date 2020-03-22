import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import QuoteApi from "./Quotes/QuoteApi"
import QuoteLocal from "./Quotes/QuoteLocal"
import AddQuote from "./Quotes/AddQuote"
import ListQuote from './Quotes/ListQuote';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h2>Get Quote</h2>

        <div className="allLinks">
          <Link to ="/Quote_api">Random Quote (API)</Link> | 
          <Link to ="/random_quote">Random Quote (Local)</Link> | 
          <Link to ="/add_Quote">Add Quote (Local)</Link> | 
          <Link to ="/list_all">List All Quote (Local)</Link>
        </div>
        
        <div className="allRoutes">
          <Route path= "/Quote_api" component={QuoteApi} />
          <Route path= "/random_quote" component={QuoteLocal} />
          <Route path= "/add_Quote" component={AddQuote} />
          <Route path= "/list_all" component={ListQuote} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
