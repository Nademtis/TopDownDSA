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
        const gamefield = document.querySelector("#gamefield")

        for (let r = 0; r < tiles.length; r++) {
            for (let c = 0; c < tiles[0].length; c++) {
                const tile = document.createElement("div");
                tile.classList.add("tile");
                background.appendChild(tile);
            }
        }
        gamefield.style.setProperty("--GRID_WIDTH", width)
        gamefield.style.setProperty("--GRID_HEIGHT", height)
        gamefield.style.setProperty("--TILE_SIZE", tileSize + "px")
    }
    displayTiles(tiles, width) {
        const visualTiles = document.querySelectorAll("#background .tile")
        const colAmount = tiles[0].length
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
    createItems(itemGrid, width, height) {
        const items = document.querySelector("#items");

        for (let r = 0; r < height; r++) {
            for (let c = 0; c < width; c++) {
                if (itemGrid[r][c] == 1) {
                    const item = document.createElement("div");
                    item.classList.add("item");
                    item.classList.add("gold");
                    item.style.setProperty("--row", r);
                    item.style.setProperty("--col", c);
                    items.append(item);
                }
            }

        }


    }
    pickupVisualItem({ row, col }) {
        const visualItems = document.querySelectorAll(".item");
        visualItems.forEach(visualItem => {
            const visualRow = parseInt(visualItem.style.getPropertyValue("--row"));
            const visualCol = parseInt(visualItem.style.getPropertyValue("--col"));
            if (visualRow == row && visualCol == col) {
                visualItem.classList.add('take');
            }
        });

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
    showDebugingPlayerHitbox(player) {
        const visualPlayer = document.querySelector("#player")
        if (!visualPlayer.classList.contains("show-hitbox")) {
            visualPlayer.classList.add("show-hitbox")
        }
        visualPlayer.style.setProperty("--hitboxW", player.hitbox.w + "px")
        visualPlayer.style.setProperty("--hitboxH", player.hitbox.h + "px")
        visualPlayer.style.setProperty("--hitboxX", player.hitbox.x + "px")
        visualPlayer.style.setProperty("--hitboxY", player.hitbox.y + "px")
    }


}

