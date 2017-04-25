import React from 'react';
import '../../style/bootstrap/less/bootstrap.less';
import Navigation from './Navigation.js';

class App extends React.Component {

    render() {
        const { location } = this.props;
        const containerStyle = {
            marginTop: "20px"
        };
        console.log("layout");

        return (
            <div>
                <Navigation location={ location }/>
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

export default App;
