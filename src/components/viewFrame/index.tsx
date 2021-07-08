import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../../store';

// UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import LanguageSelector from '../languageSelector';

// Icons
import MenuIcon from '@material-ui/icons/Menu';

const mapStateToProps = (state: RootState) => ({
  sessionStarted: () => selectors.session.sessionStarted(state.session),
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  toggleMenu: () => actions.menu.toggleMenu()
};

type Props = ReturnType<typeof mapStateToProps> &
typeof mapDispatchToProps & {
  children: React.ReactNode,
  title: string
}

const ViewFrame: FunctionComponent<Props> = ({
  toggleMenu,
  children,
  title,
  sessionStarted }) => {
  
  function handleDrawerOpen() {
    toggleMenu();
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            {sessionStarted() && <MenuIcon />}
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>{title}</Typography>
          <LanguageSelector />
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewFrame);
