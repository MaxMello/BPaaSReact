import React from 'react';
import '../../style/bootstrap/less/bootstrap.less';
import Navigation from './Navigation.js';
import "normalize.css";
import { connect } from 'react-redux';

@connect((store) => {
    return {user: store.user }
})
export default class App extends React.Component {

    render() {
        const { location } = this.props;
        const containerStyle = {
            marginTop: "0"
        };

        return (
            <div>
                <Navigation location={ location } user={this.props.user} />
                <div className="container" style={ containerStyle }>
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}