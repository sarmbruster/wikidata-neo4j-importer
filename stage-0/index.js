'use strict';
module.exports = (neo4j, database, callback) => {
    const session = neo4j.session({database: database});

    console.log('Clearing DB');

    session
        .run('MATCH (n) DETACH DELETE n')
        .subscribe({
            onCompleted: ()=> {
                session.close();
                return callback();
            },
            onError: (e)=> {
                session.close();
                callback(e);
            }
        })
}