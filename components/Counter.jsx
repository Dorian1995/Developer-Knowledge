import React, { Component } from 'react'
export default class Counter extends Component {
    render() {
        return (<h1>Counter Component</h1>)
    }
}

constructor(); {
    super();
    this.state = {
        data: 'React Course'
    }
}
componentDidMount(); {
    fetch('https://api.github.com/users')
        .then((res) => res.json())
        .then((data) => this.setState({ users: data }));
}

getSnapshotBeforeUpdate(); {
    return "value from snapshot";
}




