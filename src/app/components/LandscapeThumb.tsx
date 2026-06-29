interface Props {
  className?: string;
}

export function LandscapeThumb({ className = '' }: Props) {
  return (
    <div className={`relative overflow-hidden flex-shrink-0 ${className}`} style={{ background: '#7ec8e3' }}>
      {/* Sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #87CEEB 0%, #b0dff0 100%)' }} />
      {/* Back hill */}
      <div className="absolute" style={{
        bottom: '40%', left: '-15%', width: '80%', height: '45%',
        background: '#7aab52', borderRadius: '50% 50% 0 0',
      }} />
      {/* Middle hill */}
      <div className="absolute" style={{
        bottom: '38%', right: '-5%', width: '65%', height: '40%',
        background: '#6a9e44', borderRadius: '50% 50% 0 0',
      }} />
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0" style={{
        height: '42%', background: 'linear-gradient(to bottom, #5c9130 0%, #4a7a26 100%)',
      }} />
      {/* Front hill bump */}
      <div className="absolute" style={{
        bottom: '38%', left: '10%', width: '50%', height: '30%',
        background: '#5c9130', borderRadius: '50% 50% 0 0',
      }} />
    </div>
  );
}
