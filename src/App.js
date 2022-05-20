// React imports
import React from 'react'

//Project imports
import Menu from './Menu'
import Question from './Question'
import {nanoid} from 'nanoid'

// CSS imports (loading through webpacks)
import './style.css'
import './menu.css'

export default function App()
{
    const [questionElements, setQuestionElements] = React.useState([])

    function StartQuiz()
    {
        setMenu(x => {return !x})
        setQuestionElements(makeQuestions().map(y => {
            return (
                <Question question={y['text']} incorrectOptions={y['incorrectOptions']} correctOption={y['correctOption']} key={nanoid()}></Question>
            )
        }))
        console.log(makeQuestions().map((y) => {
            return (
                <Question question={y['text']} incorrectOptions={y['incorrectOptions']} correctOption={y['correctOption']} key={nanoid()}></Question>
            )
        }))
    }

    const [quizData, setQuizData] = React.useState([{}])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => setQuizData(data['results']))

    }, [])

    // will need an isSelected prop, value prop, isCorrect for options;


    // will need a question text, incorrect options, correct options for question

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

    // option data






    const [menu, setMenu] = React.useState(true)
    return (
        <div>
            <img src={require("./assets/blob 5.png")} alt="null" className="blob-1"/>
            <img src={require("./assets/blob 6.png")} alt="null" className="blob-2"/>
            {menu ? (<Menu menuChangeFunction={StartQuiz}></Menu>) : (<div>{questionElements}</div>)}
        </div>
    )
}