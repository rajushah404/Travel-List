export function Stats({ item }) {

  if (!item.length)
    return (
      <p className="stats"><em>Add the items </em></p>
    );

  const numItems = item.length;
  const numPacked = item.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "You are ready to move " :
          ` You have ${numItems} items on your list, you have already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
