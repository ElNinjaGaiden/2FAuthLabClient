import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../../store';
import ListItemModel from '../../models/listItem';
import ViewFrame from '../../components/viewFrame';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

type Props = ReturnType<typeof mapStateToProps>;

const Home: FunctionComponent<Props> = ({ localize }) => {

  const data: ListItemModel[] = [
    {
      _id: '1',
      primary: 'Item 1',
      secondary: 'Wala wala wala'
    },
    {
      _id: '2',
      primary: 'Item 2',
      secondary: 'Bla bla bla'
    }
  ];
  return (
    <ViewFrame title={localize('pages.home.title')}>
      <List>
        {data &&
          data.map(l => (
            <ListItem key={l._id}>
              <ListItemAvatar>
                <Avatar alt="logo" />
              </ListItemAvatar>
              <ListItemText primary={l.primary} secondary={l.secondary} />
            </ListItem>
          ))}
      </List>
    </ViewFrame>
  );
};

export default connect(
  mapStateToProps
)(Home);
