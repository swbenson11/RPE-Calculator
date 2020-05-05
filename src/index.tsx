import * as React from 'react';
import { render } from 'react-dom';

import './css/global.scss';
import './css/layout.scss';

import RPECalculator from './components/RPECalculator';
import { Provider } from 'react-redux';
import appStore from './store';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={appStore}>
        <div className="grid-container ">
          <div className="side-columns" />
          <div className="main-column">
            <RPECalculator />
          </div>

          <div className="side-columns" />
        </div>
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
