<template>
    <div>今年是{{year}}年</div>
</template>


<script>
export default {
    created(){
        console.log("haha")
    },
    computed: {
        year(){
            return new Date().getFullYear()
        }
    },
}
</script>


<style>

</style>
