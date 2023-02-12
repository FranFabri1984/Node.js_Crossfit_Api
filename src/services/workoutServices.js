const { v4: uuid } = require("uuid");
const workouts = require('../database/workouts');

function getAllService(filterParams) {
    try {
        const dbgetAll = workouts.dbGet(filterParams);
        return dbgetAll; 
    } 
    catch (error) {
        throw error;
    }
}

function getByIdService(workoutId) {
    try {
        const dbGetById = workouts.dbGetById(workoutId);
        return dbGetById;
    } 
    catch (error) {
        throw error;
    }    
}

function addService(newWorkout) {
    const dbAdd = {
        id: uuid(),
        ...newWorkout,
        createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    }
    try {
        const add = workouts.dbAdd(dbAdd);
        return add;
    } 
    catch (error) {
        throw error;
    }
}

function updateService(workoutId, changes) {
    try {
        const Update = workouts.dbUpdate(workoutId, changes);
        return Update;
    } 
    catch (error) {
        throw error;
    }
}

function deleteService(workoutId) {
    try {
        workouts.dbDelete(workoutId);
    } 
    catch (error) {
        throw error;
    }
}

module.exports = {
    getAllService, getByIdService,
    addService, updateService,
    deleteService
}