import React, { Component } from 'react';
// import SimpleForm from './SimpleForm';
import ComplexForm from './ComplexForm';
//import { Header } from 'semantic-ui-react';
import Results from './Results/Results';
class Home extends Component {

  constructor(props) {
    super(props);

    this.yahooWidget = this.yahooWidget.bind(this);
  }

  yahooWidget() {
      const query = this.props.food;
      console.log("Home")
      console.log(this.props)
      if (query && query.businesses && query.businesses[0]) {
        let html = JSON.stringify(query.businesses);
        // remove <![CDATA[ and ]]>
          // html = html.replace(/(<!\[CDATA\[|]]>)/g, '');
            //
        return (
          <div>
              <Results items={query.businesses}/>
          </div>

        );
      } else {
        console.log("Home Failed")

        return false;
      }

  }

  render() {
    return (
      <div>
        <ComplexForm/>
        {this.yahooWidget()}
      </div>
    );
  }
}

export default Home;

