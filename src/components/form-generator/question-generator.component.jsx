import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Textarea from 'react-validation/build/textarea';
import Select from 'react-validation/build/select';

export default class QuestionGenerator extends Component {
    constructor(props) {
        super(props)
        this.onChangeQuestionType = this.onChangeQuestionType.bind(this);
        this.onChangeQuestion = this.onChangeQuestion.bind(this);

        this.state = {
            id: props.id,
            questionType: '',
            question: '',
            options: []
        }
    }

    componentDidMount() {
        this.props.callback(this.state);
    }

    shouldComponentUpdate(nextProps, nextState){
        const sameQuestion = nextState.question === this.state.question;
        const sameQuestionType = nextState.questionType === this.state.questionType;
        const sameOptions = nextState.options.every( (property, index) => {
            return property === this.state.options[index];
        });

        if(sameQuestionType && sameQuestion && sameOptions){
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this.props.callback(this.state);
    }

    async onChangeQuestionType(event) {
        await this.setState({
            questionType: event.target.value
        })
    }

    async onChangeQuestion(event) {
        await this.setState({
            question: event.target.value
        });
    }

    render() {
        return(
            <div>
                <Form
                ref={c => {
                    this.form = c;
                }}
                >
                    <div className='grid justify-center items-center border rounded py-4 my-10'>
                        <div className='grid items-center'>
                            <div className='p-2'>
                                <label className='text-white text-lg' htmlFor="questionType">Question's type</label>
                                <Select
                                className='py-2 rounded text-left p-12 border border-gray-200'
                                name='questionType'
                                value={this.state.questionType}
                                onChange={this.onChangeQuestionType}
                                >
                                    <option value="">Choose option type</option>
                                    <option value="text">Text</option>
                                    <option value="checkbox">Checkbox</option>
                                    <option value="radio">Radio</option>
                                </Select>
                            </div>

                            <div className='p-2'>
                                <label className='text-white text-lg' htmlFor="question">Question</label>
                                <Input
                                type='text'
                                className='py-2 rounded pl-6 border border-gray-200'
                                placeholder="Question"
                                name='question'
                                value={this.state.question}
                                onChange={this.onChangeQuestion}
                                validations={[]}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

