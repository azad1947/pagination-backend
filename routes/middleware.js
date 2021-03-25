
export const async_handler = (handler) => {
    return (req, res, next)=>{
        handler(req, res, next).catch(next);
    }
}

export const error_handler = (err, req, res, next) => {
    const error = {
        status: err.status,
        message: err.message
    }

    if (process.env.NODE_ENV === 'dev') {
        error.stack = err.stack;
    }

    res.json({ error });
}
