import { width, height } from '../../constants/connectFour';

const Board = () => {
  return (
    <div id="style1">
      {Array.from(Array(height).keys()).map((r) => (
        <div key={`style2-${r}`} className="style2">
          {Array.from(Array(width).keys()).map((c) => (
            <div key={`style3-${c}`} id={`element-${r * width + c}`} className="style3"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
