"use strict"
export default class View {

    controller;

    constructor(controller) {
        this.controller = controller;

    }
    displayPlayerAtPosition(player) {
        const visualPlayer = document.querySelector("#player")
        visualPlayer.style.translate = `${player.x - player.regX}px ${player.y - player.regY}px`
    }
    displayerPlayerAnimation(player) {
        const visualPlayer = document.querySelector("#player")

        if (player.isMoving) {
            visualPlayer.classList.add("animate")
            visualPlayer.classList.remove("up", "down", "right", "left")
            visualPlayer.classList.add(player.direction)
        } else {
            visualPlayer.classList.remove("animate")
        }
    }
    createTiles(tiles, width, height, tileSize) {
        const background = document.querySelector("#background")

        for (let r = 0; r < tiles.length; r++) {
            for (let c = 0; c < tiles[0].length; c++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                background.appendChild(tile);
            }
        }
        background.style.setProperty("--GRID_WIDTH", width)
        background.style.setProperty("--GRID_HEIGHT", height)
        background.style.setProperty("--TILE_SIZE", tileSize + "px")
    }
    displayTiles(tiles, width) {
        const visualTiles = document.querySelectorAll("#background .tile")
        const colAmount = tiles[0].length
        console.log(colAmount);
        for (let r = 0; r < tiles.length; r++) {
            for (let c = 0; c < tiles[0].length; c++) {
                const modelTile = tiles[r][c]
                const visualTile = visualTiles[r * width + c]
                visualTile.classList.add(this.getClassForTiletype(modelTile))
            }
        }
    }
    getClassForTiletype(modelTile) {
        switch (modelTile) {
            case 0: return "grass";
            case 1: return "path";
            case 2: return "wall"
            case 3: return "floor"
            case 5: return "water"
        }
    }
    highlightTile({ row, col }, GRID_WIDTH) {
        const visualTiles = document.querySelectorAll("#background .tile")
        const visualTile = visualTiles[row * GRID_WIDTH + col]

        visualTile.classList.add("highlight")
    }
    unhighlightTile({ row, col }, GRID_WIDTH) {
        const visualTiles = document.querySelectorAll("#background .tile")
        const visualTile = visualTiles[row * GRID_WIDTH + col]

        visualTile.classList.remove("highlight")
    }
    showDebugingPlayerRect() {
        const visualPlayer = document.querySelector("#player")
        if (!visualPlayer.classList.contains("show-rect")) {
            visualPlayer.classList.add("show-rect")
        }
    }
    showDebugingPlayerRegistrationPoint(player) {
        const visualPlayer = document.querySelector("#player")
        if (!visualPlayer.classList.contains("show-reg-point")) {
            visualPlayer.classList.add("show-reg-point")
        }
        visualPlayer.style.setProperty("--regX", player.regX + "px")
        visualPlayer.style.setProperty("--regY", player.regY + "px")
    }


}

