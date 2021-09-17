import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Textarea from 'react-validation/build/textarea';
import Select from 'react-validation/build/select';

export default class QuestionGenerated extends Component {
    constructor(props){
        super(props);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);

        this.state = {
            question: props.question,
            questionType: props.questionType,
            options: props.options
        }
    }

    onChangeQuestion(event) {
        this.setState({
            question: event.target.value
        })
    }

    render() {
        return (
            <div>
                <p>
                    {this.state.question}
                </p>
                <Input
                type={this.state.questionType}
                className='py-2 rounded pl-6 border border-gray-200'
                name='question'
                value={this.state.question}
                onChange={this.onChangeQuestion}
                validations={[]}
                />
                
            </div>
        )
    }
}