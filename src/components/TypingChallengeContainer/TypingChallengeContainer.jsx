import React from "react";
import ChallengeDetailsCard from "../ChallengeDetailsCard/ChallengeDetailsCard";
import TypingChallenge from "../TypingChallenge/TypingChallenge";
// import TestContainer from "../ChallengeSection/TestContainer/TestContainer";
import './TypingChallengeContainer.css'; 

const TypingChallengeContainer = ({
    selectedParagraph,
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange,
    
}) =>{
    return(
        <div className="typing-challenge-container">
            {/* Details section */}
            <div className="details-container">
                {/* Words typed */}
                <ChallengeDetailsCard cardName="Words" cardValue={words}/>
                
                {/* Characters Typed */}
                <ChallengeDetailsCard cardName="Characters" cardValue={characters}/>

                {/* Speed */}
                <ChallengeDetailsCard cardName="Speed" cardValue={wpm}/>
            </div>
            {/* The Real Challenge */}
            <div className="typewriter-container">
                <TypingChallenge 
                    testInfo = {testInfo}
                    selectedParagraph={selectedParagraph}
                    timerStarted={timerStarted}
                    timeRemaining={timeRemaining}
                    onInputChange={onInputChange}
                    
                />
            </div>
        </div>
    );
}

export default TypingChallengeContainer;