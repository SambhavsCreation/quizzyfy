import React from 'react'
import Options from "./Options";
import {nanoid} from 'nanoid'
import './question.css'

export default function Question(props)
{
    function createOption(isSelectedX, valueX, isCorrectX)
    {
        return ({
            isSelected: isSelectedX,
            value: valueX,
            isCorrect: isCorrectX,
            id: nanoid()
        })
    }
    function createOptions()
    {
        console.log("I shouldnt be called")

        let temp = []
        for (let i = 0; i < 4; i++)
        {
            temp.push(createOption(false, 'x', false))
        }
        let tempInt = 0
        let z = Math.floor(Math.random() * 4)
        temp[z]['isCorrect'] = true
        for (let i = 0; i < 4; i++)
        {
            if (temp[i]['isCorrect'] === true)
            {
                temp[i]['value'] = props.correctOption
            }
            else
            {
                temp[i]['value'] = props.incorrectOptions[tempInt]
                tempInt++
            }
        }
        return temp
    }
    const [options, setOptions] = React.useState(createOptions())

    const [optionElements, setOptionElements] = React.useState(options.map(x => {
        return (
            <Options optionText={x.value} clicked={() => handleOptionClick(x['id'])} isSelected={x.isSelected}></Options>
        )
    }))

    function handleOptionClick(id)
    {
        setOptions(x => x.map(y => {
            y['id'] === id ? console.log(!y.isSelected) : console.log("pls")
            return y['id'] === id ?
                {...y, isSelected: !y.isSelected} :
                y
        }))
        console.log(options)
        setOptionElements(options.map(x => {
            return (
                <Options optionText={x.value} clicked={() => handleOptionClick(x['id'])} isSelected={x.isSelected}></Options>
            )
        }))
    }

    return (
        <div className="question-container">
            <h2 className="question-title">{props.question}
            </h2>
            {optionElements}
        </div>
    )
}
