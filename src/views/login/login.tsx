import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { RootState, selectors } from '../../store';
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
import useStyles from './loginStyles';

const mapStateToProps = (state: RootState) => ({
  localize: (key: string) => selectors.localization.localize(state.localization, key)
});

type Props = ReturnType<typeof mapStateToProps>;

const Login: FunctionComponent<Props> = ({ localize }) => {
  const classes = useStyles();
  return (
    <ViewFrame title={localize('pages.login.title')}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {localize('pages.login.loginCard.header')}
          </Typography>
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
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
        </div>
      </Container>
    </ViewFrame>
  );
};

export default connect(mapStateToProps)(Login);

