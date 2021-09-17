import React, { Component } from "react";
import Logo from '../images/KY.png';

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: ''
        };
    }

    render() {
        return (
            <div className='flex justify-center'>
                <div>
                    <img 
                    src={Logo}
                    className='w-full'
                    alt="img"
                    />
                </div>
                <div>
                    <h3 className='text-center'>{this.state.message}</h3>
                </div>
            </div>
        );
    }
}