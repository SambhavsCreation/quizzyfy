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
    const [questionElements, setQuestionElements] = React.useState([])


    function StartQuiz()
    {
        setMenu(false)
        setIsGameOver(false)
        setQuestionElements(makeQuestions().map(y => {
            return (
                <Question question={y['text']} incorrectOptions={y['incorrectOptions']} correctOption={y['correctOption']} key={nanoid()} selectedOption={updateSelectedOption} isGameOver={isGameOver} ></Question>
            )
        }))
        setFinalValues(makeFinalValues())

        console.log(quizData)
    }

    const [quizData, setQuizData] = React.useState([{}])
    const [isGameOver, setIsGameOver] = React.useState(false)


    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => setQuizData(data['results']))
        console.log("halo")
    }, [isGameOver])


    function makeQuestion(dataID) {
        const str = quizData[dataID]['question'].replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            .replace(/&rdquo;/, '”').replace(/&ldquo;/, '“')
        return ({
            text: str,
            incorrectOptions: quizData[dataID]['incorrect_answers'],
            correctOption: quizData[dataID]['correct_answer']
        })
    }

    function makeQuestions() {
        let temp = []
        for (let i = 0; i < 5; i++)
        {
            temp.push(makeQuestion(i))
        }
        return temp
    }

    // on quiz submit

    const [finalValues, setFinalValues] = React.useState([{}])
    function makeFinalValue(dataID)
    {
        const str = quizData[dataID]['question'].replace(/&quot;/g, '"').replace(/&#039;/g, "'")
            .replace(/&rdquo;/, '”').replace(/&ldquo;/, '“')
        return ({
            text: str,
            correctOption: quizData[dataID]['correct_answer'],
            selectedOption: undefined
        })
    }

    function updateSelectedOption(question, selectedOption)
    {
        setFinalValues(x => x.map(y => {
            if (y['text'] === question)
            {
                if (selectedOption === y['selectedOption']) {
                    return y
                }
                else
                {
                    return ({
                        ...y,
                        selectedOption: selectedOption
                    })
                }
            }
            else
            {
                return y
            }
        }))
    }

    function makeFinalValues()
    {
        let temp = []
        for (let i = 0; i < 5; i++)
        {
            temp.push(makeFinalValue(i))
        }
        return temp
    }

    let score = 0
    const [scoreState, setScoreState] = React.useState(score)
    function handleSubmit()
    {
        for (let i = 0; i < 5; i++)
        {
            if (finalValues[i]['correctOption'] === finalValues[i]['selectedOption'])
            {
                score++
            }
        }
        console.log(finalValues)
        console.log(score)
        setIsGameOver(true)
        setScoreState(score)
    }

    // Restart Game
    function restart()
    {
        if (isGameOver)
        {
            StartQuiz()
        }
    }

    const [menu, setMenu] = React.useState(true)

    return (
        <div>
            <img src={require("./assets/blob 5.png")} alt="null" className="blob-1"/>
            <img src={require("./assets/blob 6.png")} alt="null" className="blob-2"/>
            {menu ? (<Menu menuChangeFunction={StartQuiz}></Menu>) : (<div>{questionElements}
                {isGameOver ? (<EndGame score={scoreState} restart={restart}></EndGame>) :
                    (<center><button className="submit-button" onClick={handleSubmit}><p className="submit-button-text">Submit</p></button></center>)
                }

            </div>)}
        </div>
    )
}