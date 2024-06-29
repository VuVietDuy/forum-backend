const express = require('express')
const router = express.Router()
const tagsController = require('./tags.controllers')

router.get('/', tagsController.getAllTags)
router.post('/', tagsController.createNewTag)

module.exports = router