<script lang="ts" setup>
import {ListItem} from "nativescript-vue";
import {useColorMode} from "@vallemar/nativescript-vueuse";
import {THEMES} from "~/data";


const {store} = useColorMode({
  modes: THEMES, onChanged: (mode) => {
    console.log("onChanged: " + mode);
  }
})

function changeTheme(newTheme: string) {
  store.value = newTheme
}

</script>

<template>
  <Page actionBarHidden="true">
    <StackLayout class="p-4">
      <Label :text="`Current Theme: ${store}`"/>

      <ListView :items="THEMES" height="800">
        <template #default="{ item, index }: ListItem<string>">
          <FlexboxLayout
              class="px-2 py-4"
              @tap="changeTheme(item)"
          >

            <Label class="text-lg rounded-2xl px-2 py-1" :class="[item === store ? 'bg-green-400' : '']" :text="item"/>
          </FlexboxLayout>
        </template>
      </ListView>
    </StackLayout>
  </Page>
</template>
