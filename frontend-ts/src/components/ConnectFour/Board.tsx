import { width, height } from '../../constants/connectFour';
import { getElementIdFromRowCol } from '../../utils/connectFour';

const Board = () => {
  const handleClick = (col: number) => {};

  return (
    <div id="style1">
      {Array.from(Array(width).keys()).map((col) => (
        <div key={`style2-${col}`} className="style2">
          {Array.from(Array(height).keys()).map((row) => (
            <div
              key={`style3-${row}`}
              id={getElementIdFromRowCol({ row, col })}
              className="style3"
              onClick={() => handleClick(col)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
