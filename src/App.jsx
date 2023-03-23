import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';

import './App.css'

const LANGUAGES = [
    { label: 'Afrikaans', value: 'af' },
    {label:'Akan', value:'ak'},
    {label:'Amharic', value:'am'},
    {label:'Arabic', value:'ar'},
    {label:'Assamese', value:'as'},
    {label:'Aymara', value:'ay'},
    {label:'Azerbaijani', value:'az'},
    {label:'Belarusian', value:'be'},
    {label:'Bulgarian', value:'bg'},
    {label:'Bhojpuri', value:'bho'},
    {label:'Bambara', value:'bm'},
    {label:'Bengali', value:'bn'},
    {label:'Bosnian', value:'bs'},
    {label:'atalan; Valencian',value:'ca'},
    {label:'Cebuano', value:'ceb'},
    {label:'Central Kurdish', value:'ckb'},
    {label:'Corsican', value:'co'},
    {label:'Czech', value:'cs'},
    {label:'Croation', value:'cy'},
    {label:'Danish', value:'da'},
    {label:'Deutschland', value:'de'},
    {label:'Dogri', value:'doi'},
    {label:'Divehi', value:'dv'},
    {label:'Ewe', value:'ee'},
    {label:'Greek, Modern', value:'el'},
    {label:'English', value:'en'},
    {label:'Esperanto', value:'eo'},
    {label:'Spanish (Spain)', value:'es'},
    {label:'Estonian', value:'et'},
    {label:'Basque', value:'eu'},
    {label:'Persian', value:'fa'},
    {label:'Finnish', value:'fi'},
    {label:'French', value:'fr'},
    {label:'Western Frisian', value:'fy'},
    {label:'Irish', value:'ga'},
    {label:'Gaelic; Scottish Gaelic', value:'gd'},
    {label:'Galician', value:'gl'},
    {label:'Guarani', value:'gn'},
    {label:'Konkani', value:'gom'},
    {label:'Gujarati', value:'gu'},
    {label:'Hausa', value:'ha'},
    {label:'Hawaiian', value:'haw'},
    {label:'Hebrew', value:'he'},
    {label:'Hindi', value:'hi'},
    {label:'Hmong; Mong', value:'hmn'},
    {label:'Croatian', value:'hr'},
    {label:'Haitian Creole', value:'ht'},
    {label:'Hungarian', value:'hu'},
    {label:'Armenian', value:'hy'},
    {label:'Indonesian', value:'id'},
    {label:'Igbo', value:'ig'},
    {label:'Iloko', value:'ilo'},
    {label:'Icelandic', value:'is'},
    {label:'Italian', value:'it'},
    {label:'Hebrew', value:'iw'},
    {label:'Japanese', value:'ja'},
    {label:'Javanese', value:'jv'},
    {label:'Javinic', value:'jw'},
    {label:'Georgian', value:'ka'},
    {label:'Kazakh', value:'kk'},
    {label:'Central Khmer', value:'km'},
    {label:'Kannada', value:'kn'},
    {label:'Korean', value:'ko'},
    {label:'Kri Phóng Mlengbrou', value:'kri'},
    {label:'Kurdish', value:'ku'},
    {label:'Kirghiz; Kyrgyz', value:'ky'},
    {label:'Latin', value:'la'},
    {label:'Letzeburgesch', value:'lb'},
    {label:'Ganda', value:'lg'},
    {label:'Lingala', value:'ln'},
    {label:'Lao', value:'lo'},
    {label:'Lithuanian', value:'lt'},
    {label:'Lushai', value:'lus'},
    {label:'Latvian', value:'lv'},
    {label:'Maithili', value:'mai'},
    {label:'Malagasy', value:'mg'},
    {label:'Maori',value:'mi'},
    {label:'Macedonian',value:'mk'},
    {label:'Malayalam',value:'ml'},
    {label:'Mongolian',value:'mn'},
    {label:'Manipuri',value:'mni-Mtei'},
    {label:'Marathi',value:'mr'},
    {label:'Malay',value:'ms'},
    {label:'Maltese',value:'mt'},
    {label:'Burmese',value:'my'},
    {label:'Nepali',value:'ne'},
    {label:'Flemish',value:'nl'},
    {label:'Norwegian',value:'no'},
    {label:'Northern Sotho',value:'nso'},
    {label:'Nyanja',value:'ny'},
    {label:'Oromo',value:'om'},
    {label:'Oriya',value:'or'},
    {label:'Panjabi',value:'pa'},
    {label:'Polish',value:'pl'},
    {label:'Pushto',value:'ps'},
    {label:'Portuguese',value:'pt'},
    {label:'Quechua',value:'qu'},
    {label:'Romanian',value:'ro'},
    {label:'Russian',value:'ru'},
    {label:'Kinyarwanda',value:'rw'},
    {label:'Sanskrit',value:'sa'},
    {label:'Sindhi',value:'sd'},
    {label:'Sinhalese',value:'si'},
    {label:'Slovak',value:'sk'},
    {label:'Slovenian',value:'sl'},
    {label:'Samoan',value:'sm'},
    {label:'Shona',value:'sn'},
    {label:'Somali',value:'so'},
    {label:'Albanian',value:'sq'},
    {label:'Serbian',value:'sr'},
    {label:'Southern Sotho',value:'st'},
    {label:'Sundanese',value:'su'},
    {label:'Swedish',value:'sv'},
    {label:'Swahili',value:'sw'},
    {label:'Tamil',value:'ta'},
    {label:'Telugu',value:'te'},
    {label:'Tajik',value:'tg'},
    {label:'Thai',value:'th'},
    {label:'Tigrinya',value:'ti'},
    {label:'Turkmen', value:'tk'},
    {label:'Tagalog', value:'tl'},
    {label:'Turkish', value:'tr'},
    {label:'Tsonga', value:'ts'},
    {label:'Tatar', value:'tt'},
    {label:'Uighur', value:'ug'},
    {label:'Ukrainian', value:'uk'},
    {label:'Urdu', value:'ur'},
    {label:'Uzbek', value:'uz'},
    {label:'Vietnamese', value:'vi'},
    {label:'Xhosa', value:'xh'},
    {label:'Yiddish', value:'yi'},
    {label:'Yoruba', value:'yo'},
    {label:'Chinese',value:'zh'},
    {label:'Chinese (PRC)',value:'zh-CN'},
    {label:'Chinese (Taiwan)',value:'zh-TW'},
    {label:'Zulu',value:'zu'},




    
  ];

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
            'X-RapidAPI-Key': 'caca96ab18msh8c66ba10d7023a9p144646jsndd92dada19dd',
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
        'X-RapidAPI-Key': 'caca96ab18msh8c66ba10d7023a9p144646jsndd92dada19dd',
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
                'X-RapidAPI-Key': 'caca96ab18msh8c66ba10d7023a9p144646jsndd92dada19dd',
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
    const emptyText = ()=>{
        setInputText('')
        setResultText('Translated Text')
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
                            value={inputText}
                            className='textarea-line'
                        /><br/>

                        <select className="language-select" onChange={languageKey}>
                            <option className='dropdown-list'>Please Select Language..</option>
                            {languagesList.map((lang, index) => {
                                return (
                                    <option value={lang.language} key={lang.language} > 
                                        {index < LANGUAGES.length ? LANGUAGES[index].label:lang.language}
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
                            /> : <p className='resultText' >{resultText}</p>}
                                    
                        
                        <br/>

                        <button
                            className='button'
                            onClick={translateText}
                        >
                            
                            Translate</button>
                        <button className='button' onClick={emptyText}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
export default Translate 