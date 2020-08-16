import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

import Layout from './components/Layout'
import Landing from "./components/Landing";
import About from "./components/About";
import Blog from "./components/Blog";
import SingleBlogView from "./components/SingleBlogView";

export default () => {
    return (
        <Router>
            <Layout>
                <Switch>
                <Route exact path="/" component={Landing}/>
                <Route exact path="/about" component={About} />
                <Route exact path="/blog" component={Blog} />
                <Route path="/blog/:id" component={SingleBlogView} />
                <Route path="/" component={Landing} />
                </Switch>
            </Layout>
        </Router>
    );
}