---
to: src/components/<%= name %>.vue
---
<template>

</template>

<script lang="ts">
import "reflect-metadata";
import { Vue, Component } from "vue-property-decorator";

/**
 * 
 */
@Component
export default class <%= name %> extends Vue {

}
</script>

<docs>
## Examples

<%= name %>

```html
<<%= h.changeCase.param(name) %> />
```
</docs>

