const pupils_dal = require("./dals/pupils_dal")
const assert = require("assert")

describe('Testing students dal', () => {
    it('test get students', async () => {
        // ARRANGE
        await pupils_dal.delete_table();
        await pupils_dal.create_table();
        await pupils_dal.insert_5();

        // ACT
        const result = await pupils_dal.get_all_student();
        //console.log(result.row);

        // ASSERT
        assert.strictEqual(result.status, 'success')
        assert.strictEqual(result.data.length, 5)
        // this is how to check object fields

        assert.deepStrictEqual(result.data[0], {
            id: 1,
            name: 'Arya Stark',
            age: 18,
            email: 'arya.stark@example.com',
            city: 'Winterfell'
        })

        pupils_dal.data_base.destroy()
    })

    it("test insert student", async () => {
        await pupils_dal.delete_table();
        await pupils_dal.create_table();
        await pupils_dal.insert_5();

        const result = await pupils_dal.insert_student();
        console.log(result.row);
    })

    // add test for insert
    // call add and then get by id and then assert the result of the get
})
