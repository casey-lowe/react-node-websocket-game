import { useConnectFour } from '../../hooks/useConnectFour';

const Header = () => {
  const { currentColor } = useConnectFour();

  return <h1 id="message">It is currently {currentColor}'s turn.</h1>;
};

export default Header;
