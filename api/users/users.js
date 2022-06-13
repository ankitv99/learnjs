const Joi = require('joi')
const models = require('../../models')


const addUser = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().min(2).required(),
        lastName: Joi.string().min(2).required(),
        email: Joi.string().email().min(2).required()
    })
    const details = schema.validate(req.body)
    if (!details.error) {

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }
        models.User.create(data).then((result) => {

            res.json({
                success: true
            })
        }).catch((err) => {
            next(err)
        });
    } else {
    next(details.error)
    }

}

const getUser = (req, res, next) => {
    models.User.findAll({ order: [['id', 'ASC']] }).then
        ((result) => {
            res.json({
                result
            })
        }).catch((err) => {
            console.log(err)
            res.json({
                success: false,
                message: 'Error occurred'
            })
        });
}

const updateUser = (req, res, next) => {
    const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }

    models.User.update(data, {
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json({
            result
        })
    }).catch((err) => {
        console.log(err)
        res.json({
            success: false,
            message: 'Error occurred'
        })
    });
}
const deleteUser = (req, res, next) => {
    models.User.destroy({
        where: {
            id: req.params.id
        }
    }).then((result) => {
        res.json({
            result
        })
    }).catch((err) => {
        console.log(err)
        res.json({
            success: false,
            message: 'Error occurred'
        })
    });
}
module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser
}

