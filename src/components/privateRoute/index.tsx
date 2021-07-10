import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState, selectors } from '../../store';

const mapStateToProps = (state: RootState) => ({
    sessionStarted: selectors.session.sessionStarted(state.session)
});

type Props = ReturnType<typeof mapStateToProps> & {
    component: any,
    path: string,
    exact?: boolean
};

const PrivateRoute: FunctionComponent<Props> = ({ component: Component, sessionStarted, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                sessionStarted ? (
                <Component {...props} />
                ) : (
                <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
                )
            }
        />
    );
};

export default connect(mapStateToProps)(PrivateRoute);