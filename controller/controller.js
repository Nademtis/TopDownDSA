"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model()
        this.view = new View(this)
        this.tick = this.tick.bind(this); //binds this.tick function to this controller instance... i think
        this.controls = { left: false, right: false, up: false, down: false }
        this.lastTimestamp = 0
    }

    init() {
        this.initEventListeners()
        requestAnimationFrame(this.tick)


        //this.view.displayPlayerAtPosition(this.model.player)

    }
    tick(timestamp) {
        requestAnimationFrame(this.tick) //prep next tick

        const deltaTime = (timestamp - this.lastTimestamp) / 1000
        this.lastTimestamp = timestamp

        this.movePlayer(deltaTime)

        this.view.displayPlayerAtPosition(this.model.player)
        this.view.displayerPlayerAnimation(this.model.player)
    }
    movePlayer(deltaTime) {
        this.model.player.isMoving = false

        const newPos = {
            x: this.model.player.x,
            y: this.model.player.y,
        }

        if (this.controls.left) {
            this.model.player.isMoving = true
            this.model.player.direction = "left"
            newPos.x -= this.model.player.speed * deltaTime
        } else if (this.controls.right) {
            this.model.player.isMoving = true
            this.model.player.direction = "right"
            newPos.x += this.model.player.speed * deltaTime
        }

        if (this.controls.up) {
            this.model.player.isMoving = true
            this.model.player.direction = "up"
            newPos.y -= this.model.player.speed * deltaTime
        } else if (this.controls.down) {
            this.model.player.isMoving = true
            this.model.player.direction = "down"
            newPos.y += this.model.player.speed * deltaTime
        }

        if (this.canMoveTo(newPos)) {
            this.model.player.x = newPos.x
            this.model.player.y = newPos.y
        }
    }
    canMoveTo(pos) {
        if (pos.x < 0 || pos.x > 484 ||
            pos.y < 0 || pos.y > 340) {
            return false

        }
        else { return true }
    }


    initEventListeners() {
        document.addEventListener("keydown", (event) => this.keyPress(event)) // without using arrow function the method would not have the correct refference -->
        document.addEventListener("keyup", (event) => this.keyUp(event))      // to this object. so inside keyPress "this.controls" would not work, since it doesnt point at
    }
    keyPress(event) {
        switch (event.key) {
            case "ArrowRight": this.controls.right = true; break
            case "ArrowLeft": this.controls.left = true; break
            case "ArrowUp": this.controls.up = true; break
            case "ArrowDown": this.controls.down = true; break
        }
        if (this.controls.right) this.direction = "right"
        else if (this.controls.left) this.direction = "left"
        else if (this.controls.up) this.direction = "up"
        else if (this.controls.down) this.direction = "down"
    }

    keyUp(event) {
        switch (event.key) {
            case "ArrowRight": this.controls.right = false; break
            case "ArrowLeft": this.controls.left = false; break
            case "ArrowUp": this.controls.up = false; break
            case "ArrowDown": this.controls.down = false; break
        }
    }

}