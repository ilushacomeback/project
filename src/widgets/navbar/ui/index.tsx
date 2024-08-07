import { useContext } from 'react';
import {
  NavbarContainer,
  Logo,
  Menu,
  NavLink,
  ResponsiveMenuItem,
  MenuItem,
} from '../styled-component/index';
import { useAppSelector, selectors, useAppDispatch, actions } from '@/shared';
import { AuthContext } from '@/shared';

const ButtonsForGuest = () => {
  return (
    <>
      <MenuItem>
        <NavLink to="/login">Login</NavLink>
      </MenuItem>
      <MenuItem>
        <NavLink to="/signup">Signup</NavLink>
      </MenuItem>
    </>
  );
};

const ButtonsForUser = () => {
  const { logOut } = useContext(AuthContext);
  const dispatch = useAppDispatch()

  const handleExit = () => {
    dispatch(actions.addProductsInBasket({}))
    logOut()
  }

  return (
    <>
      <MenuItem>
        <NavLink to="/login" onClick={handleExit}>
          Exit
        </NavLink>
      </MenuItem>
    </>
  );
};

const NavbarRight = ({ token }: { token: boolean }) => {
  return token ? <ButtonsForUser /> : <ButtonsForGuest />;
};

export const Navbar = () => {
  const token: boolean = !!useAppSelector(selectors.authSelectors.selectToken);

  return (
    <header>
      <NavbarContainer className="nav-container">
        <Logo>MyLogo</Logo>
        <Menu>
          <ResponsiveMenuItem>
            <NavLink to="/">Home</NavLink>
          </ResponsiveMenuItem>
          <MenuItem>
            <NavLink to="/account">Basket</NavLink>
          </MenuItem>
          <NavbarRight token={token} />
        </Menu>
      </NavbarContainer>
    </header>
  );
};
