import * as React from 'react';
import { render } from 'react-dom';
import './index.scss';
import RpeCalculator from './components/RpeCalculator';

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <RpeCalculator />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
