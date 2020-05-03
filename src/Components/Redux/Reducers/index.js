const initState = {
    toggle:false,
    change:false,
    user:{
        name:"Noah",
        lastName:"Furniss"
    },
    realUser:{
        name:""
    },
    cart:[]
};

const rootReducer = (state=initState, action)=>{
    if(action.type==="SET_TOGGLE"){
        return{
            ...state,
            toggle:!state.toggle,
            // user:{
            //     ...state.user,
            //     country:(!state.toggle?"USA":"CANADA")
            // }
        }
    }

    if(action.type==="CHANGE_COUNTRY"){
        return{
            ...state,
            user:{
                ...state.user,
                country:action.country
            }
        }
    }

    if(action.type==="CHANGE_SORT"){

        let orgArray = state.sort[action.prop].val;

        if(orgArray.includes(action.val)){
            let ind = orgArray.indexOf(action.val);
            orgArray.splice(ind,1);

        }else{
            orgArray.push(action.val)
        }

        let togg = orgArray.length > 0;


        return{
            ...state,
            sort:{
                ...state.sort,
                [action.prop]:{
                    toggle:togg,val:orgArray
                }

            }
        }
    }

    if(action.type==="INIT_CART"){
        return{
            ...state,
            cart:action.value
        }
    }

    if(action.type==="CHECK_CHANGE"){
        return{
            ...state,
            change:!state.change
        }
    }

    if(action.type==="CHECK_SIGN_IN"){
        return{
            ...state,
            signedIn: action.check
        }
    }

    if(action.type==="CURRENT_USER"){
        return{
            ...state,
            realUser: {
                name:action.user.displayName
            }
        }
    }

    return state;
};

export default  rootReducer;