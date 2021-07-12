import React, { FunctionComponent, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
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
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import ViewFrame from '../../components/viewFrame';
import useStyles from './loginStyles';
import authenticate from '../../services/session/authenticate';
import authenticateByAccessToken from '../../services/session/authenticateByAccessToken';
import User from '../../models/user';

const doAuthenticateByAccessToken = async (
  cookies: any,
  setAutoLoginIsProcessing: Function,
  history: any,
  redirectTo: any,
  updateUser: Function,
  passwordVerified: Function,
  tokenVerificationSuccesful: Function
  ) => {
  try {
    setAutoLoginIsProcessing(true);
    const { accessToken } = cookies;
    if (accessToken) {
      const { jwt, userId } = accessToken;
      console.log('Attempting auto login', accessToken);
      const { success: tokenValid, user } = await authenticateByAccessToken(userId, jwt);
      console.log('Response', tokenValid, user);
      if (tokenValid && user) {
        updateUser(user);
        passwordVerified();
        tokenVerificationSuccesful();
        history.push(redirectTo || '/');
      }
    }
  } catch (ex) {
    console.error(ex);
  } finally {
    setAutoLoginIsProcessing(false);
  }
};

const mapStateToProps = (state: RootState) => ({
  user: state.session.user,
  localize: (key: string) =>
    selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  updateUser: (user: User) => actions.session.updateUser(user),
  passwordVerified: () => actions.session.passwordVerificationSuccesful(),
  tokenVerificationSuccesful: () => actions.session.tokenVerificationSuccesful()
};

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & RouteComponentProps<{}, {}, { from: string }>;

const Login: FunctionComponent<Props> = ({ localize, updateUser, passwordVerified, tokenVerificationSuccesful, user, history }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [autoLoginIsProcessing, setAutoLoginIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cookies] = useCookies();
  let redirectTo: any;
  const { location } = history;
  if (location && location.state) {
    const { from } = location.state;
    if (from) {
      redirectTo = from;
    }
  }

  const onSumbit = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');
    try {
      const user = await authenticate(userName, password);
      updateUser(user);
      passwordVerified();
    } catch (ex) {
      setErrorMessage(ex.message);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    doAuthenticateByAccessToken(cookies, setAutoLoginIsProcessing, history, redirectTo, updateUser, passwordVerified, tokenVerificationSuccesful);
  }, []);

  return (
    <>
      {
        user ?
          <Redirect to={{ pathname: user.tmpSecret ? '/login/activatetwofactor' : '/login/validatetoken', state: { from: redirectTo } }} />
          :
          <ViewFrame title={localize('pages.login.title')}>
            {
              autoLoginIsProcessing ?
                <LinearProgress />
                :
                <>
                  {isProcessing && <LinearProgress />}
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        {localize('pages.login.loginCard.header')}
                      </Typography>
                      <form className={classes.form} noValidate onSubmit={onSumbit}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label={localize('pages.login.loginCard.emailAddress')}
                          name="email"
                          autoComplete="email"
                          autoFocus
                          onChange={(e) => { setUserName(e.target.value) }}
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label={localize('pages.login.loginCard.password')}
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          onChange={(e) => { setPassword(e.target.value) }}
                        />
                        {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={!userName || !password || isProcessing}
                          className={classes.submit}
                        >
                          {localize('pages.login.loginCard.signInSubmit')}
                        </Button>
                        <Grid container>
                          <Grid item xs>
                            <Link href="#" variant="body2">
                              {localize('pages.login.loginCard.forgotPassword')}
                            </Link>
                          </Grid>
                          <Grid item>
                            <Link href="/signup" variant="body2">
                              {localize('pages.login.loginCard.signUp')}
                            </Link>
                          </Grid>
                        </Grid>
                      </form>
                    </div>
                  </Container>
                </>
            }
          </ViewFrame>
      }
    </>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Login)
);

