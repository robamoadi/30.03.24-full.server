const express = require("express")
const pupils_dal = require("../dals/pupils_dal")

const router = express.Router()

//../api/pupils = ""
//../api/pupils/id = "/:id"

router.get("", async (request, response) => {
    const result = await pupils_dal.get_all_student()
    response.status(200).json(result.data)

})

router.get('/:id', async (request, response) => {
    const id = request.params.id
    const result = await pupils_dal.get_by_id(id)
    response.status(200).json(result.data)
})

router.post('', async (request, response) => {
    const new_student = request.body
    const result = await pupils_dal.insert_student(new_student)
    response.status(200).json(result.data)
})

router.put('/:id', async (request, response) => {
    const id = request.params.id
    const updated_student = request.body
    const result = await pupils_dal.update_student(id, updated_student)
    response.status(200).json({ status: "student_updated" })
})

router.patch('/:id', async (request, response) => {
    const id = request.params.id
    const patched_student = request.body
    const result = await pupils_dal.patch_student(id, patched_student)
    response.status(200).json({ status: "student_patched" })
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    const result = await pupils_dal.delete_by_id(id)
    response.status(200).json(result.data)
})

router.post('/table/create_table', async (request, response) => {
    const result = await pupils_dal.create_table()
    if (result.status == "success")
        response.status(201).json({ status: "table-created" })
    else
        response.status(result.internal ? 500 : 400).json({ error: result.error })
})

router.post('/insert_5', async (request, response) =>{
    const result = await pupils_dal.insert_5()
    response.status(201).json({ result: "5 new students created" })
})

router.delete("/table/delete_table" ,async (request, response) => {
     await pupils_dal.delete_table()
    response.status(200).json({ status: "table-deleted" })
})

module.exports = router