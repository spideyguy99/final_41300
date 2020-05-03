export const initCart = (value)=>{
    return {
        type:"INIT_CART",
        value:value
    }
};
export const checkChange = ()=>{
    return {
        type:"CHECK_CHANGE",
    }
};

export const checkSignIn = (sign)=>{
    return {
        type:"CHECK_SIGN_IN",
        check:sign
    }
};

export const currentUser = (user)=>{
    return {
        type:"CURRENT_USER",
        user:user
    }
};