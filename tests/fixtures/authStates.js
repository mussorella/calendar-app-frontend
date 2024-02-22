    export const initialState=
    {
        status: 'checking',//authencicated- not authenticated
        user: {},
        errorMessage: undefined,
    }


    export const authenticatedState=
    {
        status: 'authenticated',//authencicated- not authenticated
        user: {
            uid: 'abc',
            name:'Fede'
        },
        errorMessage: undefined,
    }
    export const notAuthenticatedState=
    {
        status: 'not-authenticated',//authencicated- not authenticated
        user: {},
        errorMessage: undefined,
    }
