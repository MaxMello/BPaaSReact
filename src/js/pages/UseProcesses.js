import React from 'react'
import '../../style/bootstrap/less/bootstrap.less'
const RB = require('react-bootstrap');
let Row = RB.Row;
let Col = RB.Col;
import { connect } from 'react-redux';
import { loadProcesses } from "./../actions/useProcessesActions";


@connect((store) => {
    return store.useProcesses;
})
export default class UseProcesses extends React.Component {

    load(){
        this.props.dispatch(loadProcesses(this.props.loading));
    }

    render() {
        const {processes, loading} = this.props;
        console.log(processes);
        console.log("Loading:" + loading);
        const isLoading =  loading ? "True" : "False";
        const processCols = processes.map((process, i) => (<Col key={i} xs={12}>{process.name}</Col>));
        return (
            <div>
                <Row>
                    <Col xs={12} className="text-center">
                        <h1>Use Processes</h1>
                        <p>Loading: {isLoading} </p>
                        <button onClick={this.load.bind(this)}>Lade Prozesse</button>
                    </Col>
                </Row>
                <Row>
                    {processCols}
                </Row>
            </div>
        );
    }
}
