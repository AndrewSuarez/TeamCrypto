const AuthReducer = (state, action) => {
    switch(action.type){
        case "LOGIN_SUCCESS":
            return{
                user:action.payload,
                error: false,
            };

        case "LOGIN_FAILURE":
            return{
                user:null,
                error: action.payload,
            };
            default:
                return state
    }
}

export default AuthReducer