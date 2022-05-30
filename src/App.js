// React imports
import React from 'react'

//Project imports
import Menu from './Menu'
import Question from './Question'
import {nanoid} from 'nanoid'
import EndGame from './EndGame'

// CSS imports (loading through webpack)
import './style.css'
import './menu.css'

export default function App()
{
    const [loading, setLoading] = React.useState(true)
    const [isGameOver, setIsGameOver] = React.useState(false)
    const [quizData, setQuizData] = React.useState([{}])
    const [menu, setMenu] = React.useState(true)
    const [questionData, setQuestionData] = React.useState([{}])
    const [score, setScore] = React.useState(0)
    let questionElements = []


    React.useEffect(() => {
        // fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
        //     .then(res => res.json())
        //     .then(data => setQuizData(data['results']))
        if (isGameOver)
        {
            return
        }
        setLoading(true)
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => setQuizData(data['results']))
            .then(() => {
                setLoading(false)
            })
        console.log("running APP effect")

    }, [isGameOver])



    function makeOptions(data)
    {
        let options = data['incorrect_answers']
        const len = options.push(data['correct_answer']) - 1
        const rand = Math.floor(Math.random() * 4)
        let temp = options[len]
        options[len]  = options[rand]
        options[rand] = temp

        console.log(rand)

        let finalOptions = []

        console.log(options)
        for (let i = 0; i < 4; i++)
        {
            finalOptions.push({
                optionText: options[i],
                isSelected: false,
                isCorrect: data['correct_answer'] === options[i],
                childID: nanoid()
            })
        }

        return finalOptions
    }

    function makeQuestion(data)
    {
        return {
            question: data['question'],
            options: makeOptions(data),
            id: nanoid()
        }
    }

    function initQuizData()
    {
        let tempArr = []
        for (let i = 0; i < 5; i++)
        {
            tempArr.push(makeQuestion(quizData[i]))
        }
        return tempArr
    }

    function StartQuiz()
    {
        setMenu(false)
        setIsGameOver(false)
        setQuestionData(initQuizData())
    }
    if (!loading)
    {
        questionElements = questionData.map(x => {
            return (
                <Question props={x} key={nanoid()} updateSelected={updateSelectedOption} isGameOver={isGameOver}></Question>
            )
        })
    }

    function updateSelectedOption(childID, parentID)
    {
        !isGameOver &&
        setQuestionData(x => x.map((y) => {
            if (y.id === parentID)
            {
                for (let i = 0; i < 4; i++)
                {
                    console.log(i)
                    if (y.options[i].childID === childID)
                    {
                        y.options[i].isSelected = !y.options[i].isSelected
                    }
                    else
                    {
                        y.options[i].isSelected = false
                    }
                }
            }
            return y
        }))
    }

    function incrementScore()
    {
        setScore(x => x+1)
    }

    function submitQuiz()
    {
        setIsGameOver(true)
        for (let i = 0; i < 5; i++)
        {
            for (let j = 0; j < 4; j++)
            {
                if (questionData[i].options[j].isSelected === true && questionData[i].options[j].isCorrect === true)
                {
                    incrementScore()
                    break
                }
            }
        }
    }

    function restart()
    {
        console.log("restarting")
        setIsGameOver(false)
        StartQuiz()
        setScore(0)
    }

    console.log(quizData)

    return (
        <div>
            <img src={require("./assets/blob 5.png")} alt="null" className="blob-1"/>
            <img src={require("./assets/blob 6.png")} alt="null" className="blob-2"/>
            {loading ? (<h1>loading</h1>) : (menu ? (<Menu menuChangeFunction={StartQuiz}></Menu>) : (<div>{questionElements}{isGameOver ? (<EndGame restart={restart} score={score}></EndGame>) :
                (<center><button className="submit-button" onClick={submitQuiz}><p className="submit-button-text">Submit</p></button></center>)}
            </div>))}
        </div>
    )
}