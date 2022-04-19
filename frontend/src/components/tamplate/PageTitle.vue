<template>
    <div class="page-title">
        <h3><i v-if="icon" :class="icon"></i> {{ main }}</h3>
        <h4>{{ sub }}</h4>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main', 'sub']
}
</script>

<style>
    .page-title h3 {
        margin: 0px;
    }

    .page-title h4 {
        color: #777;
        margin-top: 5px;
        font-size: 1.3rem;
    }
</style>
