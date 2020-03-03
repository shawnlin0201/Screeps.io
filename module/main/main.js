var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

// Check energy
    // for(var name in Game.rooms) {
    //     console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    // }

// Clean Memory
    // for(var name in Memory.creeps) {
    //     if(!Game.creeps[name]) {
    //         delete Memory.creeps[name];
    //         console.log('Clearing non-existing creep memory:', name);
    //     }
    // }

// Auto generate harvesters
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var limitHarvesters = 12

    if(harvesters.length < limitHarvesters) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    
// Auto generate builders
    // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // var limitBuilders = 1

    // if(builders.length < limitBuilders) {
    //     var newName = 'Builder' + Game.time;
    //     console.log('Spawning new builder: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'builder'}});
    // }


// Creeps controller
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        // if(creep.memory.role == 'upgrader') {
        //     roleUpgrader.run(creep);
        // }
        // if(creep.memory.role == 'builder') {
        //     roleBuilder.run(creep);
        // }
    }
}
