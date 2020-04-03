import * as React from 'react';
import { render } from 'react-dom';
import './index.scss';
import RpeCalculator from './components/RpeCalculator';
import { Provider } from 'react-redux';
import appStore from './store';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={appStore}>
        <h1>Hello World!</h1>
        <RpeCalculator />
      </Provider>
    );
  }
}

render(<App />, document.getElementById('root'));
