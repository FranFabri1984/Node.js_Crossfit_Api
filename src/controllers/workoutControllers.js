const {getAllService, getByIdService, addService, updateService, deleteService} = require('../services/workoutServices')

async function getAll(req, res) {
    try {
        const {mode} = req.query;
        const getAll = await getAllService({mode});
        res.status(202).send({ status: "Get OK",  data : getAll});
    } 
    catch (error) {
        res.status(500).send({ status: "Failed", data: { error: error?.message || error }});
    }
}

async function getById(req, res) {
    const {id} = req.params;
    if (!id) {
        res.status(400).send({ status: "Failed", data: { error:"Id is empty in request body"}});
        return; 
    }
    try {
        const getId = await getByIdService(id);
        res.status(202).send({ status: "Get by id", data: getId});  
    } 
    catch (error) {
        res.status(500).send({ status: "Failed", data: { error: error?.message || error }});
    }
}

async function Add(req, res) {
    const {body} = req;
    if (!body.name || !body.mode || !body.equipment ||
        !body.exercises || !body.trainerTips) {
        res.status(400).send({ status: "Failed", data: { error:"keys is empty in request body"}});
        return;
    }
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips
    }
    try {
        const add = await addService(newWorkout);
        res.status(201).send({status: "Added", data: add});
    } 
    catch (error) {
        res.status(500).send({ status: "Failed", data: { error: error?.message || error }});
    }
}

async function Update(req, res) {
    const {id}  = req.params;
    const {body} = req;
    if (!id) {
        res.status(400).send({ status: "Failed", data: { error:"Keys is empty in request body"}});
        return;
    }
    try {
        const update = await updateService(id, body);
        res.status(200).send({status: "Udated", data: update});    
    } 
    catch (error) {
        res.status(500).send({ status: "Failed", data: { error: error?.message || error }});
    }
}

async function Delete(req, res) {
    const {id}  = req.params;
    if (!id) {
        res.status(400).send({ status: "Failed", data: { error:"Keys is empty in request body"}});
        return; 
    }
    try {
         await deleteService(id);
        res.status(200).send({status: "Deleted"});
    } 
    catch (error) {
        res.status(500).send({ status: "Failed", data: { error: error?.message || error }});
    }
}

module.exports = {
    getAll, getById,
    Add, Update,
    Delete
}

