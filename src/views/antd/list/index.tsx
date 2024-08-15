export default function Page() {
  return (
    <div>
      <ul>
        {new Array(100).fill(0).map((_v, i) => (
          <li key={i}>{i + 1}</li>
        ))}
      </ul>
    </div>
  );
}
