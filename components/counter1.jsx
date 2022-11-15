import React, { Component } from 'react';
export default class Counter extends Component {
    render() {
        return (<div><h1>Counter App</h1> <button>Increment</button> <button>Decrement</button>
        </div>);
    }
}

state = { count: 0 };
render()
return (<div><button>Increment</button> <span>{this.state.count}</span> <button>Decrement</button>
</div>);

<span>{this.formatCount()}</span>
formatCount()
const { count } = this.state;
return count === 0 ? 'Zero' : count;

state = {
    count: 0,
    imageUrl: 'https://picsum.photos/200'
};
<><img src={this.state.imageUrl} />

    <button className="btn btn-dark btn-sm"> +
    </button><span className="badge bg-info m-2"> {this.formatCount()}
    </span><button className="btn btn-dark btn-sm"> -
    </button></>

class ClassBasedComponent extends React.Component {
    render() {
        return <div>Class Based Component</div>;
    }
}

const ArrowFunctionComponent = (props) => {
    return <div>Arrow Function Component</div>;
};

function FunctionComponent(props) {
    return <div>Function Component</div>;
}

import React, { useState } from "react";
const [name, setName] = useState("Alin");