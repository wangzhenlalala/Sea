let loggerTimes = 0;
function logger({ getState }) {
    // 可以在这里进行一些改middleware状态的初始化工作
    return next => {
        // 可以在这里进行一些改middleware状态的初始化工作
        return action => {
            console.log('will dispatch', action)

            // Call the next dispatch method in the middleware chain.
            const returnValue = next(action)

            console.log('state after dispatch', getState())

            // This will likely be the action itself, unless
            // a middleware further in chain changed it.
            return returnValue
        }
    }
}