//validation middleware
const book = (Schema) => async(req, res, next) => {
    try {
        const parsedBody = await Schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (err) {
        const status = 400; 
        const message = "Fill the input properly"; 
        const extraDetails = err.errors.map(error => error.message).join(", ");

        return res.status(status).json({
            status,
            message,
            errors: extraDetails
        });
    }
};

export default book;