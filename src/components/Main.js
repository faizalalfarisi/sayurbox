import React from 'react'
import Movies from './Movies'
import MoviesDetail from './MoviesDetail'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

const Main = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path='/movies' component={Movies}></Route>
                <Route path='/movies-detail' component={MoviesDetail}></Route>
                <Redirect to='/movies' />
            </Switch>
        </React.Fragment>
    )
}

export default withRouter(Main)
