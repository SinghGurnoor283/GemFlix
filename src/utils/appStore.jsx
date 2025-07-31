import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import movieSliceReducer from './movieSlice';
import gptReducer from './GptSlice';
import configReducer from './configSlice';
const appStore= configureStore(
    {
        reducer:{
            userReducer:userReducer,
            movies: movieSliceReducer,
            gpt: gptReducer,
            config: configReducer
        }
    }

)
export default appStore;