import React from 'react';

export default class AuthenticatedComponent extends React.Component {
    render() {
        if(this.props.user !== undefined && this.props.user !== null){
            if(this.props.user.user === null && this.props.router !== null){
                return this.props.router.push({
                    "pathname": "/login",
                    "search": "?redirect=true"
                });
            }
        }
    }
};