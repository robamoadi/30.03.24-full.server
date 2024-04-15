const knex = require("knex")
const config = require("config");
const { log } = require("winston");

const data_base = knex({
    client: "pg",
    connection: {
        host: config.db_connection.host,
        user: config.db_connection.user,
        password: config.db_connection.password,
        database: config.db_connection.database
    }
})

async function create_table() {
    try {
        await data_base.raw(`CREATE TABLE if not exists pupils (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            age INT,
            email VARCHAR(255) NOT NULL,
            city VARCHAR(255),
            UNIQUE(name),
            UNIQUE(email)
        );`)
        console.log("table successfully created");
        return{
            status: "success"
        }
    }
    catch (e) {
        console.log("creation failed");
        console.log(e.message);
    }
}

async function insert_5() {
    try {
        `INSERT INTO pupils (name, age, email, city) VALUES ('Arya Stark', 18 , 'arya.stark@example.com', 'Winterfell');
        INSERT INTO pupils (name, age, email, city) VALUES ('Jon Snow', 20 , 'jon.snow@example.com', 'The Wall');
        INSERT INTO pupils (name, age, email, city) VALUES ('Daenerys Targaryen', 22 , 'daenerys.targaryen@example.com', 'Dragonstone');
        INSERT INTO pupils (name, age, email, city) VALUES ('Tyrion Lannister', 24 , 'tyrion.lannister@example.com', 'Kings Landing');
        INSERT INTO pupils (name, age, email, city) VALUES ('Sansa Stark', 19 , 'sansa.stark@example.com', 'Winterfell');`
            .replaceAll('\n    ', '')
            .split(';')
            .filter(query => query)
            .forEach(async query => { await data_base.raw(query + ';') })

    }
    catch (e) {
        console.log("insert 5 failed");
        console.log(e.mmessage);
    }
}

async function get_all_student() {
    const students = await data_base.raw("select * from pupils")
    //console.log(students.rows)
    return{
        status: "success",
        data: students.rows
    }

}

async function get_by_id(id) {
    const students = await data_base.raw(`select * from pupils where id = ${id}`)

    console.log(students.rows[0]);
    return{
        status : "success",
        data: students.rows[0]
    }
}

async function insert_student(new_student) {
    delete new_student.id
    const result = await data_base('pupils').insert(new_student).returning('id');
    const id = result_ids[0].id
    console.log(result);
    return{
        status: "success",
        data: { id, ...new_student }
    }
}

async function update_student(id, updated_student) {
    const result = await data_base.raw(`UPDATE pupils set name=?,age=?,email=?,city=? where id=?`,
        [updated_student.name ? updated_student.name : '',
        updated_student.age ? updated_student.age : 0,
        updated_student.email ? updated_student.email : '',
        updated_student.city ? updated_student.city : '',
            id])
    console.log('updated succeeded for id ' + id);
    return {
        status: "success",
        data: result.rowCount
    }
}

async function patch_student(id, patched_student) {
    const query_arr = []
    for (let key in patched_student) {
        query_arr.push(`${key}='${patched_student[key]}'`)
    }

    if (query_arr.length > 0) {
        const query = `UPDATE pupils set ${query_arr.join(', ')} where id=${id}`
        const result = await data_base.raw(query)
    }
    return {
        status: "success",
        data: query_arr.length
    }
}

async function delete_by_id(id) {
    const result =await data_base.raw(`DELETE from pupils where id=${id}`)
    console.log(result.rowCount);
    return {
        status: "success",
        data: result.rowCount
    }
}

async function delete_table() {
    await data_base.raw(`DROP table if exists pupils`)
}

//const new_student = { name: 'Sansa Stark!', age: 19, email: 'sansa.starkk@example.com', city: 'Winterfell' }
//insert_student(new_student)

//const updated_student = {name: 'Sansa Stark!!', age: 20, email: 'sansa.stark@example.com', city: 'Winterfell'}
//update_student(5, updated_student)

//const patched_student = {name: 'Sansa Stark$', age: 30 }
//patch_student(5, patched_student)

//create_table()
//insert_5()
//get_all_student()
//get_by_id(3)
//delete_table()
//delete_by_id(3)

module.exports = {
    create_table , insert_5, get_all_student , get_by_id , delete_table,
    delete_by_id, patch_student, insert_student, update_student , data_base
} 