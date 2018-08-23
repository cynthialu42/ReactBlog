import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  form: formReducer // must be assigned to a key of 'form'
});

export default rootReducer;
