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
import useStyles from './signUpStyles';

const mapStateToProps = (state: RootState) => ({
    localize: (key: string) => selectors.localization.localize(state.localization, key)
  });
  
type Props = ReturnType<typeof mapStateToProps>;

const SignUp: FunctionComponent<Props> = ({ localize }) => {
  const classes = useStyles();
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label={localize('pages.signUp.signUpCard.emailAddress')}
                name="email"
                autoComplete="email"
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
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
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
        </div>
      </Container>
    </ViewFrame>
  )
};

export default connect(mapStateToProps)(SignUp);