<template>
    <div class="wrap">
        <h3>Contributors</h3>
        <VPTeamMembers size="small" :members="members" />
    </div>
</template>

<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
    {
        avatar: 'https://avatars.githubusercontent.com/u/15719383?s=64',
        name: 'Vallemar',
        title: 'Creator',
        links: [
            { icon: 'github', link: 'https://github.com/vallemar' },
            { icon: 'twitter', link: 'https://twitter.com/vallemar89' }
        ]
    },
]
</script>

<style scoped>
.wrap{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3{
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 24px;
}
</style>