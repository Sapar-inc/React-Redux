import React from "react";

function Intro () {   

    const text = 'hello'
    const gender = 'male'
    const loggedIn = false;
    const someSpan = <span>spaaan</span>
    const styleForH1 = {
        color: "green",
        textAlign: "center"
    }

    if(gender == 'female') {
        return (<div>hey</div>)
    }


    return(
        <div>
            <h1 
            style={styleForH1}
            >
                {text} from react
            </h1> 
            <div 
            className="text" 
            style={{
                backgroundColor: "red",
                fontSize: "32px",

            }}
            >this is app</div>

            {
                gender == 'male' ? (
                <div>u male</div>) : (
                <div>u Female</div>)
            }

            {loggedIn && (
                <>
                    <div>Correct</div>
                    <div>yess</div>
                </>
            )} {/* //типа v-if */}
            
            {!loggedIn && <div>Incorrect</div>} {/* //типа v-else */}

            <br/>

            {someSpan}<br/>

            <button onClick={() => alert("qwerty")}>press</button>
        </div>
    )
}

export default Intro