import * as React from 'react';
import { render } from 'react-dom';
import './index.scss';
import RPECalculator from './components/RPECalculator';
import { Provider } from 'react-redux';
import appStore from './store';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={appStore}>
        <RPECalculator />
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
