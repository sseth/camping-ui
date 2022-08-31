import styled from 'styled-components/macro';
import logo from '../images/logo.png';
import { ReactComponent as GearSvg } from '../images/gear-solid.svg';

const Header = styled.header`
  padding: 20px 50px 20px 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid green;
  /* box-shadow: 0 0 1px 2px rgba(0, 128, 0, 0.3); */
`;

const Settings = styled(GearSvg)`
  fill: green;
  width: 25px;
  margin-top: 10px;

  &:hover {
    fill: #006000;
  }

  &:active {
    filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.3));
  }
`;

export default function HeaderC({ options, toggle }) {
  return (
    <Header>
      <img src={logo} alt="logo" style={{ maxWidth: '317px' }} />
      <Settings />
    </Header>
  );
}
