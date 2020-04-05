module.exports.loop = function () {
    // Do I have the max amount of energy? Build something then.
    var spawn1 = Game.spawns['Spawn1'];
    if (spawn1.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
    {
        var creepName = 'Harvester' + Game.time;
        spawn1.spawnCreep([WORK, MOVE, CARRY, MOVE], creepName, { memory: { "role": "harvester" } });
    }
    
    for(var creepName in Game.creeps)
    {
        var creep = Game.creeps[creepName];
        
        // If the creep has free capacity, go to collect
        if (creep.store.getFreeCapacity() > 0)
        {
            var sources = creep.room.find(FIND_SOURCES);
            //console.log(JSON.stringify(sources));   // nice for debugging
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(sources[0]);
            }
        }
        else
        {
            var attemptToTransfer = creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY);
            if (attemptToTransfer == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(Game.spawns['Spawn1']);
            } else if (attemptToTransfer == ERR_FULL) {
                // I have saved too much. Build something.
                console.log('Wasting energy right now');
            }
        }
    }
}