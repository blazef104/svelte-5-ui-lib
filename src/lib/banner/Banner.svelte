<script lang="ts">
  import { CloseButton } from '$lib';
  import { fade } from 'svelte/transition';
  import { type BannerProps as Props, banner } from './index';
  import type { ParamsType } from '../types';

  let { children, header, bannerStatus = $bindable(true), position = 'sticky', dismissable = true, color = 'gray', bannerType = 'default', class: className, innerClass, transition = fade, params, ...restProps }: Props = $props();

  const { base, insideDiv } = banner({
    bannerType,
    color
  });

  let bannerClass = $derived(base({ position, bannerType, color, className }));

  let innerCls = $derived(insideDiv({ bannerType, class: innerClass }));
</script>

{#if bannerStatus}
  <div tabindex="-1" class={bannerClass} {...restProps} transition:transition={params as ParamsType}>
    {#if header}
      {@render header()}
    {/if}

    <div class={innerCls}>
      {@render children()}
    </div>

    {#if dismissable}
      <div class="flex items-center">
        <CloseButton
          class="-mx-1.5 -my-1.5"
          {color}
          ariaLabel="Remove badge"
          onclick={() => {
            bannerStatus = false;
          }}
        />
      </div>
    {/if}
  </div>
{/if}

<!--
@component
[Go to docs](https://svelte-5-ui-lib.codewithshin.com/)
## Props
@prop children
@prop header
@prop bannerStatus = $bindable(true)
@prop position = 'sticky'
@prop dismissable = true
@prop color = 'gray'
@prop bannerType = 'default'
@prop class: className
@prop innerClass
@prop transition = fade
@prop params
@prop ...restProps
-->
