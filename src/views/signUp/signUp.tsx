import React, { FunctionComponent, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState, selectors, actions } from '../../store';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ViewFrame from '../../components/viewFrame';
import Alert from '@material-ui/lab/Alert';
import useStyles from './signUpStyles';
import registerUserService from '../../services/session/registerUser';
import User from '../../models/user';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) => selectors.localization.localize(state.localization, key)
});

const mapDispatchToState = {
  updateUser: (user: User) => actions.session.updateUser(user),
  passwordVerified: () => actions.session.passwordVerificationSuccesful()
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToState & RouteComponentProps<{}>;

const SignUp: FunctionComponent<Props> = ({ localize, updateUser, passwordVerified, history }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSumbit = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const userData: User = {
        _id: '',
        firstName,
        lastName,
        userName: email,
        password
      };
      const newUser = await registerUserService(userData);
      updateUser(newUser);
      passwordVerified();
      history.push('/login/activatetwofactor');
    } catch (ex) {
      setErrorMessage(ex.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <ViewFrame title={localize('pages.signUp.title')}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {localize('pages.signUp.signUpCard.header')}
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSumbit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={e => { setFirstName(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={e => { setLastName(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label={localize('pages.signUp.signUpCard.emailAddress')}
                  name="email"
                  autoComplete="email"
                  onChange={e => { setEmail(e.target.value) }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label={localize('pages.signUp.signUpCard.password')}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={e => { setPassword(e.target.value) }}
                />
              </Grid>
            </Grid>
            {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!firstName || !lastName || !email || !password || isProcessing}
            >
              {localize('pages.signUp.signUpCard.signUpSubmit')}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  {localize('pages.signUp.signUpCard.signIn')}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ViewFrame>
  )
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToState
  )(SignUp)
);