const {strictEqual} = require('assert')
const liburKah = require('.')

strictEqual(liburKah('2020-10-30T14:19:44.913Z'), true)
strictEqual(liburKah('2020-10-27T14:19:44.913Z'), false)
strictEqual(liburKah('2020-10-30'), true)
strictEqual(liburKah('2020-10-27'), false)