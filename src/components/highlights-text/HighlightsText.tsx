type props = {
  text: string;
  highlight: string;
};

export default function HighlightsText({ text, highlight }: props) {
  if (!highlight) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        const isHighlight = part.toLowerCase() === highlight.toLowerCase();
        return isHighlight ? (
          <mark key={index}>{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
}
