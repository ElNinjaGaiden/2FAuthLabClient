import React, { FunctionComponent, MouseEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, selectors, actions } from '../../store';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ListItemModel from '../../models/listItem';

// UI components
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

// Icons
import CloseIcon from '@material-ui/icons/Close';

const mapStateToProps = (state: RootState) => ({
  open: state.menu.open,
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  toggleMenu: () => actions.menu.toggleMenu()
};

const useStyles = makeStyles({
  list: {
    width: 250
  },
  closeButton: {
    marginLeft: 'auto',
    order: 2
  }
});

const menuItems: ListItemModel[] = [
    {
      id: '1',
      localizationKey: 'pages.home.title',
      route: '/'
    },
    {
      id: '2',
      localizationKey: 'pages.view2.title',
      route: '/view2'
    }
];

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps<{}> & typeof mapDispatchToProps;

const Drawer: FunctionComponent<Props> = ({
  open,
  localize,
  toggleMenu,
  history
}) => {
  const classes = useStyles();

  function handleDrawerClose() {
    toggleMenu();
  }

  function onMenuItemClick(e: MouseEvent, item: ListItemModel) {
    item.route && history.push(item.route);
    toggleMenu();
  }

  return (
    <SwipeableDrawer open={open} onOpen={toggleMenu} onClose={toggleMenu}>
      <Toolbar>
        <Typography>{localize('components.mainMenu.title')}</Typography>
        <IconButton
          onClick={handleDrawerClose}
          color="inherit"
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List className={classes.list}>
        {menuItems.map(l => (
          <ListItem button key={l.id} onClick={e => onMenuItemClick(e, l)}>
            <ListItemText primary={localize(l.localizationKey || '')} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Drawer)
);
