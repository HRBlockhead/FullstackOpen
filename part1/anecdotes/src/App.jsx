import { useState } from "react";

const VoteTotal = (props) => {
  if (props.votes > 0) {
    return <div> This entry has {props.votes} votes</div>;
  } else {
    return <div />;
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [highestVoted, setHighestVoted] = useState(0);
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length));

  const handleClickNextAnecdote = () => {
    let newSelected = Math.floor(Math.random() * 8);
    while (newSelected === selected) {
      newSelected = Math.floor(Math.random() * 8);
    }
    setSelected(newSelected);
  };

  const handleClickVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    updateHighestVoted(copy);
    setVotes(copy);
  };

  const updateHighestVoted = (props) => {
    let highestIndex = 0;
    for (let ii = 0; ii < props.length; ii++) {
      if (props[highestIndex] < props[ii]) {
        highestIndex = ii;
      }
    }
    setHighestVoted(highestIndex);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      <VoteTotal votes={votes[selected]} />
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>
        {anecdotes[highestVoted]} <br />
        has {votes[highestVoted]} votes
      </p>
    </div>
  );
};

export default App;
