//React and friends (other 3rd party libs)
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import {INITIAL_STATE} from './actions/initialState.js';
import getParameterByName from './Toolbox/getUrlParameterByName.js'
//App components
import Header from './Header/Header.jsx';
import StoriesContainer from './StoriesContainer/StoriesContainer.jsx';
import StoryModal from './StoryModal/StoryModal.jsx';
//Scss (webpacked)
require('./Toolbox/global.scss');
import styles from './index.scss';
//Test component
import {stories} from './assets/stories/stories.js';
import DevTools from './Toolbox/DevTools.jsx'

const QS_URL="http://quantifiedselfbackend.local:6060/news_processor/news_category?rfid="
const store=createStore(reducer, INITIAL_STATE, DevTools.instrument());

//getting information from the server boilerplate
var userResponse;
var storyToRender = null;

var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200){
        userResponse = JSON.parse(httpRequest.responseText);
        storyToRender = userResponse.data.category;
        if(storyToRender !== null){
            console.log('storyToRender is ', storyToRender);
            store.dispatch({
                type: 'SET_STORIES',
                stories: stories[storyToRender]
            });
        }
        else
            store.dispatch({
                type: 'SET_STORIES',
                stories: stories[3]
            });
    }
    else if(httpRequest.readyState === 4 && httpRequest.status !== 200){
        store.dispatch({
            type: 'SET_STORIES',
            stories: stories[5]
        });
    }
};

var userId = null
userId = getParameterByName('rfid');
if(userId === null)
    userId = getParameterByName('userId');
var fullRequestUrl = QS_URL+userId

console.log("called the ajax request");
httpRequest.open("GET", fullRequestUrl, true);
httpRequest.send();

const AppContainer = () => (
    <div className={styles.appContainer}>
        <Header />
        <StoriesContainer />
        <StoryModal />
    </div>
);

render(
    <Provider store={store}>
        <div>
            <AppContainer />
        </div>
    </Provider>,
    document.getElementById('app')
);
