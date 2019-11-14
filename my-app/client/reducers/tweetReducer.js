
export default function TweetReducer(state = {
    username: null,
    tweet: null,
    result: null
}, action) {
    switch (action.type) {
        case 'getUsername':
            return {
                username: action.payload,
            }
        case 'getResult':
            return {
                username: action.payload,
                result: action.payload,
            }
        default:
            return state;
    }
}
