import React, { FunctionComponent, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../../store';
import User from '../../models/user';
import ViewFrame from '../../components/viewFrame';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Alert from '@material-ui/lab/Alert';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import getUsers from '../../services/users/getUsers';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

type Props = ReturnType<typeof mapStateToProps>;

const fetchUsers = async (setIsProcessing: Function, setUsers: Function, setErrorMessage: Function) => {
  setIsProcessing(true);
  try {
    const users = await getUsers();
    setUsers(users);
  } catch (ex) {
    setErrorMessage(ex.message);
  } finally {
    setIsProcessing(false);
  }
};

const Home: FunctionComponent<Props> = ({ localize }) => {

  const [users, setUsers] = useState<User[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUsers(setIsProcessing, setUsers, setErrorMessage);
  }, []);

  return (
    <ViewFrame title={localize('pages.home.title')}>
      {isProcessing && <LinearProgress />}
      {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
      <List>
        {users &&
          users.map(u => (
            <ListItem key={u._id}>
              <ListItemAvatar>
                <Avatar alt="logo" />
              </ListItemAvatar>
              <ListItemText primary={`${u.firstName} ${u.lastName}`} secondary={
                <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  // className={classes.inline}
                  color="textPrimary"
                >
                  {u.userName}
                </Typography>
                <br/>
                {localize('pages.home.twoFactorAuhtEnabled')}
                <Checkbox
                  edge="end"
                  disabled
                  checked={u.twoFactorAuhtEnabled}/>
              </React.Fragment>
              } />
              
            </ListItem>
          ))}
      </List>
    </ViewFrame>
  );
};

export default connect(
  mapStateToProps
)(Home);
