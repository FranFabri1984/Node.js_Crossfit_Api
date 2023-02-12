const DB = require('./db.json');
const {saveToDatabase} = require('./utils');
/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy V  
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
function dbGet(filterParams) {
    try {
        let workouts = DB.workouts;
        if (filterParams.mode) {
            return DB.workouts.filter(function (workout) {
                return workout.mode.toLowerCase().includes(filterParams.mode);
            });
        }
        return workouts;
    } 
    catch (error) {
        throw {status: 500, message: error};
    }
}

function dbGetById(workoutId) {
    try {
        const workout = DB.workouts.find(function (work) {
            return work.id === workoutId;
        });
        if (!workout) {
            throw {status: 400, message: `${workoutId} not found`};
        }
        return workout;
    } 
    catch (error) {
        throw {status: error?.status || 500, message: error?.message || error };
    }
}

function dbAdd(newWorkout) {
    try {
        const isAdded = DB.workouts.findIndex((workout) => 
        workout.name === newWorkout.name) > -1;
        if (isAdded) {
            throw {status: 400, message: `${newWorkout.name} already exists`};  
        }
        DB.workouts.push(newWorkout);
        saveToDatabase(DB);
        return newWorkout;  
    } 
    catch (error) {
        throw {status: error?.status || 500, message: error?.message || error };
    }
}

function dbUpdate(workoutId, changes) {
    try {
        const index = DB.workouts.findIndex(function (id) {
            return id.id === workoutId;
        });
        if (index === -1) {
            throw {status: 400, message: `${workoutId} not found`}; 
        }
        const update = {
            ...DB.workouts[index],
            ...changes,
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
        }
        DB.workouts[index] = update;
        saveToDatabase(DB);
        return update;
    } 
    catch (error) {
        throw {status: error?.status || 500, message: error?.message || error };
    }
}

function dbDelete(workoutId) {
    try {
        const index = DB.workouts.findIndex(function (id) {
            return id.id === workoutId;
        });
        if (index === -1) {
            return console.log('Id not exists');
        }
        DB.workouts.splice(index, 1);
        saveToDatabase(DB);
    } 
    catch (error) {
        throw {status: error?.status || 500, message: error?.message || error };
    }
}

module.exports = { 
    dbGet,
    dbGetById,
    dbAdd,
    dbUpdate,
    dbDelete
}