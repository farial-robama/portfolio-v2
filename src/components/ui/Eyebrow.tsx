interface EyebrowProps {
  number: string;
  label: string;
  className?: string;
}

export default function Eyebrow({ number, label, className = "" }: EyebrowProps) {
  return (
    <div className={`eyebrow ${className}`}>
      <span className="text-gold">{number}</span> {label}
    </div>
  );
}
