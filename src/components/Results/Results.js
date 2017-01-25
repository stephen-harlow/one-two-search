import React, {Component} from 'react';
import SingleResult from './SingleResult';
import { Card, Icon, Image } from 'semantic-ui-react'

class Results extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.componentWillReceiveProps(props);
        
    }
    componentWillReceiveProps (nextProps) {
        this.state = {items: nextProps.items};
        this.runner = this.runner.bind(this);
    }
    runner(){   
        var j = this.state.items;
        var indent = [];

        for (var o = 0; o < j.length; o++){
            indent.push(<SingleResult key={j[o].id} place={j[o]}/>);    
        }
        return (
            <Card.Group>
                {indent}
            </Card.Group>
        );
    }
    render(){
    
        return (
            this.runner()
        );
    }
}
export default Results;
