const INITIAL_STATE = {
    description: 'Ler livro',
    list: [{
        id: 1,
        description: 'Elaborar Parecer Técnico',
        done: false
    }, {
        id: 2,
        description: 'Ir ao médico após almoço',
        done: true
    }]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'DESCRIPTION_CHANGED':
            return {...state, description: action.payload}
        
        default:
            return state
    }
}
