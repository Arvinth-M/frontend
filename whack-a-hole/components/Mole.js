const Mole = ({ isActive, onMoleClick }) => {
  const handleClick = (e) => {
    if (!e.isTrusted) return;
    if (isActive) {
      onMoleClick();
    }
  };

  return (
    <div 
      className="mole" 
      onClick={handleClick}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
    />
  );
};

export default Mole;
