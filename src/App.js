import { useState } from 'react';
import './App.css';

function App() {
  const [l, sl] = useState(2);
  const defaultNum = Array(l).fill('0').reduce((x, y) => x + y);
  const [x, sx] = useState(defaultNum);
  const [y, sy] = useState(defaultNum);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [resultShown, setResultShown] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [result, setResult] = useState('');

  function stopTest() {
    setTestRunning(false);
    sx(defaultNum);
    sy(defaultNum);
    setResultShown(true);
  }

  function newQuestion() {
    const getRandomNumber = (len) => Array(len).fill(0).map(_ => Math.floor(Math.random() * 9) + 1).reduce((x, y) => x + y.toString());
    sx(getRandomNumber(l));
    sy(getRandomNumber(l));
  }

  function submitResult() {
    if (!testRunning) return;
    if (Number(x) + Number(y) != Number(result)) {
      setIncorrect(incorrect + 1);
    } else {
      setCorrect(correct + 1);
    }
    setResult('');
    newQuestion();
  }

  function runTest() {
    setCorrect(0);
    setIncorrect(0);
    setTimeout(stopTest, 1000 * 60 * 2)
    setTestRunning(true);
    newQuestion();
    document.getElementById('result').focus();
  }

  return (
    <div className="App">
      <div>
        <div>{x}</div>
        <div>{y}</div>
        <input id="result" type="text" value={result} onChange={e => setResult(e.target.value)} onKeyPress={e => e.key === 'Enter' && submitResult()} />
        <br />
        <br />
        {!testRunning &&
          (
            resultShown ? (
              <>
                <div>{`Right: ${correct}, Wrong: ${incorrect}`}</div>
                <br />
                <button onClick={runTest}>Retake Test</button>
              </>
            ) : (
              <button onClick={runTest}>Start Test</button>
            ))}
      </div>
    </div >
  );
}

export default App;
