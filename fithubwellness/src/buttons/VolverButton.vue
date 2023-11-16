<template>
    <div class="volver">
        <button class="volver-button"><a href="/">VOLVER</a></button>
    </div>
</template>

<style>

.volver {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.volver-button {
    font-weight: bold;
    background-color: black;
    border: 2px solid white;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
}

.volver-button a {
    color: white;
    text-decoration: none;
}

.volver-button:hover {
    border: 2px solid black;
    background-color: white;
    color: black;
    scale: 1.1;
    transition: 0.5s;
}

.volver-button:hover a {
    color: black;
    text-decoration: none;
}

</style>