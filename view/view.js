"use strict"
export default class View {

    controller;

    constructor(controller) {
        this.controller = controller;

    }
    displayPlayerAtPosition(player) {
        const visualPlayer = document.querySelector("#player")
        visualPlayer.style.translate = `${player.x}px ${player.y}px`
    }
    displayerPlayerAnimation(player) {
        const visualPlayer = document.querySelector("#player")

        if (player.isMoving) {
            visualPlayer.classList.add("animate")
            visualPlayer.classList.remove("up", "down","right", "left")
            visualPlayer.classList.add(player.direction)
        } else {
            visualPlayer.classList.remove("animate")
        }
    }
}