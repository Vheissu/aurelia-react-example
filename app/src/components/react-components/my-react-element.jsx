import React from 'react';

'use strict';

export default class MyReactElement extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        if (!this.props.data.length) {
            return null;
        }
        
        return (
            <div>
                <hr />
                <p>Hello, I am a React component being rendered inside of Aurelia.</p>
                <p>This file is located in: src/components/react-components/my-react-element.jsx and is being included from within src/components/custom-elements/react-element.js</p>
                <p>Let's loop through any provided data:</p>
                
                <ul>
                {
                    this.props.data.map(item => {
                        return <li key={item.key}><strong>{item.name}</strong></li>
                    })
                }
                </ul>
            </div>
        );
    }
}

MyReactElement.defaultProps = { data: [] };