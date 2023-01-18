<template>
    <div class="empty-content">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-kong"></use>
        </svg>
        空空如也~~
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.empty-content {
    flex: 1;
    margin: 20px;
    font-size: 16px;
    overflow-y: auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
    height: 72vh;
    color: #141413;

    .icon {
        margin-bottom: 10px;
    }
}
</style>