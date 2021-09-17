import React, { Component } from "react";
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Textarea from 'react-validation/build/textarea';
import CheckButton from 'react-validation/build/button';

import QuestionGenerator from "./question-generator.component";
import QuestionGenerated from "../form-generated/questions-generated.component";


export default class FormGenerator extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.addQuestion = this.addQuestion.bind(this);

        this.state = {
            title: "",
            description: "",
            questions: [],
            questionsCount: 0,
            renderQuestions: [],
            renderQuestionsGenerated: []
        }
    }

    handleSubmit(){}

    onChangeTitle(event) {
        this.setState({
            title: event.target.value
        })
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    async addQuestion() {
        await this.setState({
            questionsCount: this.state.questionsCount + 1
        })

        const questionComponent = (
            <QuestionGenerator
            id={this.state.questionsCount}
            callback={this.retrieveNewQuestion}
            >
            </QuestionGenerator>
        )
        const renderQuestions = this.state.renderQuestions;
        renderQuestions.push(questionComponent);
        
        this.setState({
            renderQuestions: renderQuestions
        });
    }

    retrieveNewQuestion = (newQuestion) => {
        const questions = this.state.questions;
        if(questions.length === 0) {
            console.log("Questions vacio")
            questions.push(newQuestion);
            return;
        }
        // Renew the values of the questions
        const questionsIndexes = [];
        questions.forEach((question) => {
            questionsIndexes.push(question.id);

            const areTheSameQuestion = question.id === newQuestion.id;
            if(areTheSameQuestion) {
                for (var key in question) {
                      question[key] = newQuestion[key];
                }
                this.setState({
                    questions: questions
                })
                return;
            }
        });

        const alreadyExistQuestion = questionsIndexes.includes(newQuestion.id);
        if(!alreadyExistQuestion) {
            questions.push(newQuestion);
        }

        this.setState({
            questions: questions
        });
        console.log(questions);
    }
    render() {
        return(
            <div className='flex flex-wrap'>
                
                <div className='flex-1 flex-wrap mx-2 px-10 flex-grow bg-gray-200 rounded'>
                    <div className='bg-gray-200 rounded mt-10 text-center text-9x1 h-24'>
                        <p className='text-3xl'>Creacion de Encuesta</p>
                    </div>
                    <div className='bg-red-400 py-16 w-full flex flex-col items-center justify-center'>
                        <Form
                        onSubmit={this.handleSubmit}
                        ref={c => {
                            this.form = c;
                        }}
                        className='grid justify-center items-center w-full'
                        >
                            <div className=' items-center mt-10'>
                                <label className='text-white w-12 text-lg' htmlFor="title">Title</label>
                                <Input
                                type='text'
                                className='py-2 rounded pl-6 border border-gray-200'
                                placeholder="Title"
                                name='title'
                                value={this.state.title}
                                onChange={this.onChangeTitle}
                                validations={[]}
                                />
                            </div>
                            <div className='items-center mt-10'>
                                <label className='text-white text-lg' htmlFor="description">Description</label>
                                <Textarea
                                type='text'
                                name='description'
                                className='py-12 rounded pl-6 border border-gray-200'
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                placeholder='Place your description here ^-^'
                                validations={[]}
                                />
                            </div>
                            <div>
                                <div>
                                    {this.state.renderQuestions}
                                </div>
                            </div>
                        </Form>
                        <button onClick={this.addQuestion} className='bg-blue-600 rounded-full h-10 w-32 mt-10'>
                            Add option
                        </button>
                    </div>
                </div>
                
                <div className='flex-1 mx-2 px-2 flex-grow bg-gray-200 rounded'>
                    <div className='bg-gray-200 rounded mt-10 text-center text-9x1 h-24'>
                        <p className='text-3xl'>{this.state.title}</p>
                        <p className='text-lg text-gray-500'>{this.state.description}</p>
                    </div>
                    <div className='bg-blue-500 py-16 px-12 flex flex-col items-center justify-center'>
                        {this.state.renderQuestionsGenerated}
                    </div>
                </div>
            </div>
        )
    }
}