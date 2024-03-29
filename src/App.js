import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [l, sl] = useState(3);
  const [n, sn] = useState(2);
  const [t, st] = useState(2);
  const [op, setOp] = useState(0);
  const [nums, setNums] = useState(Array(n).fill(Array(l).fill('0').join('')));
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [resultShown, setResultShown] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [result, setResult] = useState('');

  function resetNums(l, n) {
    setNums(Array(n).fill(Array(l).fill('0').join('')));
  }

  function updateParameters(l, n) {
    sl(l);
    sn(n);
    resetNums(l, n);
  }

  function stopTest() {
    setTestRunning(false);
    resetNums(l, n);
    setResultShown(true);
  }

  function newQuestion() {
    const getRandomNumber = (len) => Array(len).fill(0).map(_ => Math.floor(Math.random() * 9) + 1).join('');
    const nums = Array(n).fill('').map(_ => getRandomNumber(l));
    setNums(nums);
  }

  function submitResult() {
    if (!testRunning) return;
    let sum;
    switch (op) {
      case 0:
        sum = nums.reduce((x, y) => {
          return x + Number(y)
        }, 0);
        break;
      // case 1:
      //   return x - Number(y)
      case 2:
        sum = nums.reduce((x, y) => {
          return x * Number(y)
        }, 1);
        break;
      default:
        sum = 0;
    }
    console.log(sum, result);
    if (sum !== Number(result)) {
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
    setTimeout(stopTest, t * 60 * 1000)
    setTestRunning(true);
    newQuestion();
    document.getElementById('result').focus();
  }

  useEffect(() => {
    document.getElementById('result').focus();
    document.getElementById('result').value = "";
  }, [testRunning])

  return (
    <div className="App">
      <div className="section">
        <span>{`L : `}</span>
        <input type="number" size={1} value={l} disabled={testRunning} onChange={e => updateParameters(Number(e.target.value), n)} />
        <span>{`N : `}</span>
        <input type="number" size={1} value={n} disabled={testRunning} onChange={e => updateParameters(l, Number(e.target.value))} />
        <span>{`T : `}</span>
        <input type="number" size={1} value={t} disabled={testRunning} onChange={e => st(Number(e.target.value))} />
        <span>{`Operator : `}</span>
        <select value={op} onChange={e => setOp(Number(e.target.value))}>
          <option key={0} value={0}>+</option>
          {/* <option key={1} value={1}>-</option> */}
          <option key={2} value={2}>*</option>
        </select>
      </div>
      <div className="section">
        Add the following numbers for {t} minutes (do this everyday and keep track of your performance)
      </div>
      <div className="section">
        {nums.map(x => <div>{x}</div>)}
        <input id="result" type="number" value={result} disabled={!testRunning} onChange={e => setResult(e.target.value)} onKeyPress={e => e.key === 'Enter' && submitResult()} />
      </div>
      <div>
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
