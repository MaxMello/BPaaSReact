import React from 'react';
import { USER_STATUS } from "../constants/constants"

export default class AuthenticatedComponent extends React.Component {
    render() {
        if(this.props.user !== undefined && this.props.user.status !== USER_STATUS.EXISTS && this.props.router !== null){
            return this.props.router.push({
                "pathname": "/login",
                "search": "?redirect=true"
            });
        }
    }
};