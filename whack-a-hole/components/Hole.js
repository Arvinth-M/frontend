import Mole from './Mole';

const Hole = ({ holeNumber, isActive, onMoleClick }) => {
  return (
    <div className={`hole hole${holeNumber} ${isActive ? 'up' : ''}`}>
      <Mole isActive={isActive} onMoleClick={onMoleClick} />
    </div>
  );
};

export default Hole;
