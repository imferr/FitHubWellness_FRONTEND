<template>
    <div class="save">
        <button class="save-button">GUARDAR</button>
    </div>
</template>

<style>

.save {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.save-button {
    font-weight: bold;
    background-color: black;
    border: 2px solid white;
    color: white;
    padding: 10px;
    border-radius: 10px;
    margin: 5px;
    cursor: pointer;
}

.save-button a {
    color: white;
    text-decoration: none;
}

.save-button:hover {
    border: 2px solid black;
    background-color: white;
    color: black;
    scale: 1.1;
    transition: 0.5s;
}

.save-button:hover a {
    color: black;
    text-decoration: none;
}

</style>