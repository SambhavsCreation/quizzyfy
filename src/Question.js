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
            style: {backgroundColor: 'transparent'},
            id: nanoid()
        })
    }
    function createOptions()
    {

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

    const [options, setOptions] = React.useState(createOptions(true, "xyz", false))


    const optionElements = options.map((x, i) => {
        return (
            <Options optionText={x.value} clicked={() => handleOptionClick(x['id'])} key={nanoid()} optionProps={options[i]}></Options>
        )
    })


    //console.log(props.isSelected)




    function getSelectedOption()
    {
        let selectedOptionX
        for (let i = 0; i < 4; i++) {
            if (options[i]['isSelected'] === true) {
                selectedOptionX = options[i]['value']
            }
        }
        return selectedOptionX
    }
    function handleOptionClick(id)
    {
        if (!props.isGameOver)
        {
            setOptions(x => x.map(y => {
                if (y.isSelected === true) {
                    y.isSelected = false
                    return {...y, style: {backgroundColor: 'transparent'}}
                }

                return y['id'] === id ?
                    {...y, isSelected: !y.isSelected, style: {backgroundColor: '#D6DBF5'}} :
                    y
            }))
        }
    }

    console.log(props.isGameOver)

    React.useEffect(() => {
        props.selectedOption(props.question, getSelectedOption())
    })

    // function compileResults()
    // {
    //     let selectedOptionX
    //     for (let i = 0; i < 4; i++)
    //     {
    //         if (options[i]['isSelected'] === true) {
    //             selectedOptionX = options[i]['value']
    //         }
    //     }
    //     return ({
    //         question: props.question,
    //         selectedOption: selectedOptionX,
    //         correctOption: props.correctOption
    //     })
    // }

    return (
        <div className="question-container">
            <h2 className="question-title">{props.question}
            </h2>
            {optionElements}
        </div>
    )
}
