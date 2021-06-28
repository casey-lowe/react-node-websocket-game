import Header from './Header';
import Board from './Board';
import { useConnectFour } from '../../hooks/useConnectFour';

const ConnectFour = () => {
  const { currentColor } = useConnectFour();

  return (
    <>
      {!!currentColor && <Header />}
      <Board />
    </>
  );
};
