import { useState } from "react";

const Statistics = (props) => {
  if (props.all === 0) {
    return <div>No feedback given</div>;
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <StatisticsLine text="good" value={props.good} />
          </tr>
          <tr>
            <StatisticsLine text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <StatisticsLine text="bad" value={props.bad} />
          </tr>
          <tr>
            <StatisticsLine text="all" value={props.all} />
          </tr>
          <tr>
            <StatisticsLine text="average" value={props.average} />
          </tr>
          <tr>
            <StatisticsLine text="positive" value={props.positive} />
          </tr>
        </tbody>
      </table>
    );
  }
};

const StatisticsLine = (props) => {
  if (props.text === "positive") {
    return (
      <td>
        {props.text} {props.value}%
      </td>
    );
  } else {
    return (
      <td>
        {props.text} {props.value}
      </td>
    );
  }
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleClickGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedAll = updatedGood + neutral + bad;
    setAll(updatedAll);
    setAverage((updatedGood - bad) / updatedAll);
    setPositive((updatedGood / updatedAll) * 100);
  };

  const handleClickNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedAll = good + updatedNeutral + bad;
    setAll(updatedAll);
    setAverage((good - bad) / updatedAll);
    setPositive((good / updatedAll) * 100);
  };

  const handleClickBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedAll = good + neutral + updatedBad;
    setAll(updatedAll);
    setAverage((good - updatedBad) / (updatedBad + neutral + good));
    setPositive((good / updatedAll) * 100);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />

      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
