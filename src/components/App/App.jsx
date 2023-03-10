import React from "react";
import Nav from "../Nav/Nav";
import Landing from "../Landing/Landing";
import { SAMPLE_PARAGRAPHS } from "../../data/sampleParagraphs";
import './App.css';
import Footer from "../Footer/Footer";
import ChallengeSection from "../ChallengeSection/ChallengeSection";

const TotalTime = 60;
const ServiceURL = "http://metaphorpsum.com/paragraphs/1/9";
const DefaultState = {
    selectedParagraph: "",
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo:[],

};

class App extends React.Component {

    state = DefaultState;

    fetchNewParagraphFallback = () => {
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ];
    }

    fetchNewParagraph = () => {
        fetch(ServiceURL)
        .then(response => response.text())
        .then(data => {
            
            this.setState({selectedParagraph: data})
            const selectedParagraphArray = data.split("");
            const testInfo = selectedParagraphArray.map(selectedLetter => {

                return {
                    testLetter: selectedLetter,
                    status: "notAttempted"
                };

    });
        this.setState({
            ...DefaultState,
            testInfo,
            selectedParagraph: data})
    });
    };

    componentDidMount(){
        
        this.fetchNewParagraphFallback();
    };

    startTimer = () => {

        this.setState({timerStarted: true});
        const timer = setInterval(() => {
            if(this.state.timeRemaining > 0){

                // change the wpm

                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0 
                ? (this.state.words/ timeSpent) * TotalTime
                : 0;
                this.setState({
                    timeRemaining: this.state.timeRemaining-1, 
                    wpm: parseInt(wpm),
                });
            }
            else{
                clearInterval(timer);
            }
            }, 1000);

    };


    startAgain = () => this.fetchNewParagraph();

    handleUserInput = (inputValue) => {
        if(!this.state.timerStarted) this.startTimer();

        // 1. Handle the underflow case - all the characters should be shown as not attempted
        // 2. Handle the overflow case- early exit
        // 3. handle the backspace
        //  -mark the [index+1] element as not-att
        
        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1;

        if(index<0){
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted"
                    },
                    ...this.state.testInfo.slice(1)
                ],
                characters,
                words
            })
            return;
        }

        if(index >= this.state.selectedParagraph.length){
            this.setState({
                characters,
                words
            });
            return;
        }

        //make a copy of testInfo
        const testInfo = this.state.testInfo;
        if(!(index===this.state.selectedParagraph.length-1)){
            testInfo[index+1].status = "notAttempted";
        }

        //check for the correct typed letters
        const isCorrect = inputValue[index] === testInfo[index].testLetter;
        
        //update the testInfo
        testInfo[index].status = isCorrect ? "correct" : "incorrect";

        //update the state
        this.setState({
            words,
            characters,
            testInfo
        })
   
    };

    render() {
        return (
            <div className = "app">
                {/*Nav Section */}
                <Nav/>
                {/*Landing Page */}
                <Landing/>
                {/*Challenge Section/*/}
                <ChallengeSection 
                    selectedParagraph = {this.state.selectedParagraph}
                    words = {this.state.words}
                    characters = {this.state.characters}
                    wpm = {this.state.wpm}
                    timeRemaining = {this.state.timeRemaining}
                    timerStarted = {this.state.timerStarted}
                    testInfo = {this.state.testInfo}
                    onInputChange = {this.handleUserInput}
                    startAgain = {this.startAgain}
               />
                {/*Footer */}
                <Footer/>
            </div>
        );
    }
}

export default App;