export const SET_LANGUAGE = 'SET_LANGUAGE';


export function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        value: language
    }
}

export const language = (state = [], action) => {
    switch (action.type) {
        case SET_LANGUAGE: {
            return {
                ...state,
                language: action.value
            }
        }
        default: {
            return state;
        }
    }
}