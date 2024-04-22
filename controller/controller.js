"use strict"

import Model from "../model/model.js"
import View from "../view/view.js"

export default class Controller {
    constructor() {
        this.model = new Model()
        this.view = new View(this)
        this.tick = this.tick.bind(this); //binds this.tick function to this controller instance... i think
        this.controls = { left: false, right: false, up: false, down: false, use: false }
        this.lastTimestamp = 0
        this.highlightedTiles = []
    }

    init() {
        this.initEventListeners()
        requestAnimationFrame(this.tick)
        this.view.createTiles(this.model.tiles, this.model.GRID_WIDTH, this.model.GRID_HEIGHT, this.model.TILE_SIZE)
        this.view.displayTiles(this.model.tiles, this.model.GRID_WIDTH)
        this.view.createItems(this.model.items, this.model.GRID_WIDTH, this.model.GRID_HEIGHT)
        //this.view.displayPlayerAtPosition(this.model.player)

    }
    tick(timestamp) {
        requestAnimationFrame(this.tick) //prep next tick

        const deltaTime = (timestamp - this.lastTimestamp) / 1000
        this.lastTimestamp = timestamp

        this.movePlayer(deltaTime)

        this.checkForItems()


        this.view.displayPlayerAtPosition(this.model.player)
        this.view.displayerPlayerAnimation(this.model.player)

        this.showDebuging()
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

        if (this.canMovePlayerToPos(newPos)) {
            this.model.player.x = newPos.x
            this.model.player.y = newPos.y
        }
    }
    canMoveTo({ row, col }) {
        //const  = this.model.getCoordFromPos(pos)

        if (row < 0 || row >= this.model.GRID_HEIGHT ||
            col < 0 || col >= this.model.GRID_WIDTH) {
            return false
        }
        const tileType = this.model.getTileAtAtCoord({ row, col })
        switch (tileType) {
            case 0: return true;
            case 1: return true;
            case 3: return true
        }
    }
    canMovePlayerToPos(newPos){
        const coords = this.model.getTilesUnderPlayer(newPos)

        let canMove = true
        for (let i = 0; i < coords.length; i++) {
            if (!this.canMoveTo(coords[i])){
                canMove = false
            }
        }
        return canMove
    }
    checkForItems() {
        const itemCoord = this.getItemsCoordUnderPlayer();
        if (itemCoord !== null && this.controls.use) {
            console.log("picked Up");
            this.view.pickupVisualItem(itemCoord, this.model.GRID_WIDTH)
            this.model.items[itemCoord.row][itemCoord.col] = 0
        }
    }
    getItemsCoordUnderPlayer() {
        const coord = this.model.getCoordFromPos(this.model.player)
        if (this.model.items[coord.row][coord.col] == 1) {
            return coord
        } else {
            return null
        }
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
            case "e": this.controls.use = true; break
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
            case "e": this.controls.use = false; break
        }
    }
    showDebuging() {
        this.showDebugingunderPlayer()
        this.view.showDebugingPlayerRect()
        this.view.showDebugingPlayerRegistrationPoint(this.model.player)
        this.view.showDebugingPlayerHitbox(this.model.player)

    }
    showDebugingunderPlayer() {
        const coordList = this.model.getTilesUnderPlayer()

        for (let i = 0; i < this.highlightedTiles.length; i++) {
            this.view.unhighlightTile(this.highlightedTiles[i], this.model.GRID_WIDTH)

        }
        for (let i = 0; i < coordList.length; i++) {
            this.view.highlightTile(coordList[i], this.model.GRID_WIDTH)

        }
        this.highlightedTiles = coordList

    }
}