const StarsField = () => {
  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 3,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full bg-primary animate-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarsField;
