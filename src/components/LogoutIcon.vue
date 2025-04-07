<script setup>
</script>

<template>
    <div id="logout-icon-container">
        <img src="@/assets/image/logout.png" alt="Logout Icon" id="logout-icon">
        <span>Logout</span>
    </div>
</template>
<style scoped>
#logout-icon-container {
    display: flex;
    align-items: center;
    
}
#logout-icon {
    width: 50px;
    height: auto;
}

#logout-icon-container:hover {
    cursor: pointer;
    transition: transform 0.3s ease;
}
</style>