const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

class ServerEngine {
    constructor(initialStateClass, target_fps = 60, port = process.env.PORT || 3000) {
        this.InitialStateClass = initialStateClass;
        this.target_fps = target_fps;
        this.frame_interval = 1000 / this.target_fps;
        this.port = port;

        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new Server(this.server);

        this.app.use(express.static(path.join(__dirname)));

        // TRACK ROOM AND SOCKET MAPS
        this.active_rooms = new Map(); // room_id -> { sockets: Set, state_stack: [], last_update_time, loop }
        this.active_sockets = new Map(); // socket.id -> room_id
    }

    push_state(socket, state) {
        const room_id = this.active_sockets.get(socket.id);
        const room = this.active_rooms.get(room_id);
        if (room) {
            room.state_stack.push(state);
        }
    }

    pop_state(socket, count = 1) {
        const room_id = this.active_sockets.get(socket.id);
        const room = this.active_rooms.get(room_id);
        if (room) {
            while (count > 0 && room.state_stack.length > 0) {
                room.state_stack.pop();
                count--;
            }
        }
    }
    
    create_room(room_id) {
        if (this.active_rooms.has(room_id)) return this.active_rooms.get(room_id);

        const room = {
            id: room_id,
            sockets: new Set(),
            state_stack: [new this.InitialStateClass()],
            last_update_time: performance.now(),
            loop: null
        };

        this.active_rooms.set(room_id, room);

        // const game_loop = () => {
        //     room.loop = setImmediate(game_loop);
        //     const active_game = room.state_stack[room.state_stack.length - 1];
        //     const server_time = performance.now();

        //     while (server_time >= room.last_update_time + this.frame_interval) {
        //         room.last_update_time += this.frame_interval;
        //         if (active_game) {
        //             if (typeof active_game.frame_update === 'function') active_game.frame_update(room.last_update_time);
        //             this.io.to(room.id).emit('game_state', active_game.get_macro_state()); // TODO: change to get_micro_state()
        //         }
        //     }
        // };
        // game_loop();

        return room;
    }

    join_room(socket, room_id) {
        this.leave_room(socket);

        const room = this.create_room(room_id);
        room.sockets.add(socket.id);
        this.active_sockets.set(socket.id, room_id);
        socket.join(room.id);

        console.log(`[Join]       Client ${socket.id} joined room ${room_id}`);
        return room;
    }

    leave_room(socket) {
        const room_id = this.active_sockets.get(socket.id);
        if (room_id) {
            const room = this.active_rooms.get(room_id);
            room.sockets.delete(socket.id);
            this.active_sockets.set(socket.id, null);
            socket.leave(room_id);

            if (room.sockets.size === 0) {
                clearImmediate(room.loop);
                this.active_rooms.delete(room_id);
            }

            console.log(`[Leave]      Client ${socket.id} left   room ${room_id}`);
        }
    }

    run() {
        this.io.on('connection', (socket) => {
            console.log(`[Connect]    Client ${socket.id} connected`);
            this.active_sockets.set(socket.id, null);

            // ROOM LISTENER
            socket.on('room', ({ type, room_id }, callback) => {
                switch (type) {
                    case 'join':
                        this.join_room(socket, room_id);
                        if (typeof callback === 'function') {
                            callback({ success: true });
                        }
                        break;
                    case 'leave':
                        this.leave_room(socket);
                        if (typeof callback === 'function') {
                            callback({ success: true });
                        }
                        break;
                }
            });

            // CONFIG LISTENER
            socket.on('config', ({ type, value }, callback) => {
                const room_id = this.active_sockets.get(socket.id);
                const room = this.active_rooms.get(room_id);
                const active_game = room?.state_stack[room.state_stack.length - 1];
                const handler = `set_${type}`;
                if (active_game && typeof active_game[handler] === 'function') {
                    active_game[handler](value, socket.id);
                    // TODO: emit get_macro_state() if necessary
                    if (typeof callback === 'function') {
                        callback({ success: true });
                    }
                }
            });

            // ACTION LISTENER
            socket.on('action', ({ type, time, ...params }, callback) => {
                const room_id = this.active_sockets.get(socket.id);
                const room = this.active_rooms.get(room_id);
                const active_game = room?.state_stack[room.state_stack.length - 1];

                if (active_game) {
                    const result = active_game.action_handler(type, time, params);
                    this.io.to(room.id).emit('game_state', active_game.get_macro_state());
                    if (typeof callback === 'function') {
                        callback({ time, ...result });
                    }
                }
            });

            // WHEN CLIENT DISCONNECTS
            socket.on('disconnect', () => {
                this.leave_room(socket);
                this.active_sockets.delete(socket.id);
                console.log(`[Disconnect] Client ${socket.id} disconnected`);
            });
        });

        // BEGIN LISTENING ON PORT
        this.server.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServerEngine;
}