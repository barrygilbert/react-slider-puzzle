import React from 'react';
import { ThemeProvider } from 'styled-components';
import Puzzle from 'components/organisms/Puzzle';

const theme = {
  backgroundA: '#694e56',
  backgroundB: '#ed537f',
  colorA: '#eeeeee',
  colorB: '#000000',
};

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <Puzzle defaultSize={4} />
    </div>
  </ThemeProvider>
);

export default App;
