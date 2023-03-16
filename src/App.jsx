import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';

import './App.css'

function Translate() {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectedLanguageKey] = useState('en');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [resultText, setResultText] = useState('Translated Text');
    const [isLoading, setLoading] = useState(false);
    
    //get the languages from rapid api//
    useEffect(() => {
    const options = {
        method: 'GET',
        headers: {
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'bf4565e885mshbf3a16fa15b65bap1fe3c7jsn2cefec3fe038',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
        
    };
    
    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/languages', options)
        .then(response => response.json())
        .then(response => {
            setLanguagesList(response.data.languages)})

        .catch(err => console.error(err));
    }, [])

//post detect the language//

const detect = () => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", inputText);

const options = {
	method: 'POST',
	headers: {
		'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': 'bf4565e885mshbf3a16fa15b65bap1fe3c7jsn2cefec3fe038',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
	},
	body: encodedParams
};

fetch('https://google-translate1.p.rapidapi.com/language/translate/v2/detect', options)
    .then((response) => response.json())
    .then((response) => {
        console.log(response.data.detections[0][0].language)
        setdetectedLanguageKey(response.data.detections[0][0].language)})
    .catch((error) => console.log(error))

}









    
    
    
    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }


//Post Translate the text..!

    const translateText = () => {
        setLoading(true)
        detect();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        const encodedValue = new URLSearchParams();
        encodedValue.append("q", inputText);
        encodedValue.append("target", selectedLanguageKey);
        encodedValue.append("source", detectLanguageKey);
        
        const translateLang = {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': 'bf4565e885mshbf3a16fa15b65bap1fe3c7jsn2cefec3fe038',
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: encodedValue
        };
        
        fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', translateLang)
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                setResultText(response.data.translations[0].translatedText);
            })
            .catch(err => console.error(err));
    } 

    const setInputValue = (e) =>{
        setInputText(e.target.value)
    }

    return (
        <div className='main-contianer'>
            <div className="app-header">
                <h2 className="header">Text Translator</h2>
            </div>

            <div className='app-body'>
                <div>
                    <div>
                        <textarea
                            rows="10"
                            cols="45"
                            placeholder='Type Text to Translate..'
                            onChange={setInputValue}
                            className='textarea-line'
                        /><br/>

                        <select className="language-select" onChange={languageKey}>
                            <option className='dropdown-list'>Please Select Language..</option>
                            {languagesList.map((lang) => {
                                return (
                                    <option value={lang.language} key={lang.language}>
                                        {lang.language}
                                    </option>
                                )
                            })}
                        </select><br/>
                        {isLoading? <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            /> : <p className='resultText'>{resultText}</p>}
                                    
                        
                        <br/>

                        <button
                            className='button'
                            onClick={translateText}
                        >
                            
                            Translate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Translate 