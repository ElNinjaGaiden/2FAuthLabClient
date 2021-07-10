import React, { FunctionComponent, useState } from 'react';
import { Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState, selectors, actions } from '../../store';
import { connect } from 'react-redux';
import ViewFrame from '../../components/viewFrame';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import CropFree from '@material-ui/icons/CropFree';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';
import QRCode from 'qrcode.react';
import useStyles from './activateTwoFactorAuthStyles';
import verifySecretService from '../../services/session/verifySecret';

const mapStateToProps = (state: RootState) => ({
  user: state.session.user,
  localize: (key: string) => selectors.localization.localize(state.localization, key)
});

const mapDispatchToProps = {
  tokenVerificationSuccesful: () => actions.session.tokenVerificationSuccesful()
};

type Props = ReturnType<typeof mapStateToProps> & RouteComponentProps<{}> & typeof mapDispatchToProps;

const ActivateTwoFactorAuth: FunctionComponent<Props> = ({ user, localize, history, tokenVerificationSuccesful }) => {
  const classes = useStyles();
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage('');
    try {
      if (user) {
        const validated = await verifySecretService(user._id, token);
        console.log('Validated', validated);
        if (validated) {
          tokenVerificationSuccesful();
          // TODO: check if there is an specific path to redirect
          history.push('/');
        } else {
          setErrorMessage(localize('utils.invalidToken'));
        }
      }
    } catch (ex) {
      setErrorMessage(ex.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {
        !user || !user.tmpSecret ?
          <Redirect to={{ pathname: '/login' }} /> :
          <ViewFrame title={localize('pages.activateTwoFactorAuth.title')}>
            {isProcessing && <LinearProgress />}
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <CropFree />
                </Avatar>
                <Typography component="h1" variant="h6">
                  {localize('pages.activateTwoFactorAuth.activateTwoFactorAuthCard.header')}
                </Typography>
                <form className={classes.form} noValidate onSubmit={onSubmit}>
                  <QRCode className={classes.qrcode} value={user.tmpSecret.otpauth_url} />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="token"
                    label={localize('pages.activateTwoFactorAuth.activateTwoFactorAuthCard.token')}
                    type="number"
                    id="token"
                    autoComplete="token"
                    onChange={(e) => { setToken(e.target.value) }}
                  />
                  {errorMessage && <Alert severity="warning">{errorMessage}</Alert>}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={!token || isProcessing}
                    className={classes.submit}
                  >
                    {localize('pages.activateTwoFactorAuth.activateTwoFactorAuthCard.submitToken')}
                  </Button>
                </form>
              </div>
            </Container>
          </ViewFrame>
      }
    </>
  )
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ActivateTwoFactorAuth)
);