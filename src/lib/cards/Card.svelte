<script lang="ts">
  import { card, type CardProps as Props } from '.';

  let { children, href, color = 'gray', horizontal = false, shadow = 'md', reverse = false, img, padding = 'lg', size = 'sm', class: className, imgClass, contentClass, onclick, ...restProps }: Props = $props();

  const { base, image, content } = $derived(
    card({
      size,
      color,
      shadow,
      padding,
      horizontal,
      reverse,
      href: !!href
    })
  );
</script>

<svelte:element this={href ? 'a' : 'div'} {href} class={base({ className })} role={href ? 'link' : 'presentation'} {onclick} {...restProps}>
  {#if img}
    <img class={image({ class: imgClass })} src={img.src} alt={img.alt} />
    <div class={content({ class: contentClass })}>
      {@render children()}
    </div>
  {:else}
    <div class={content({ class: contentClass })}>
      {@render children()}
    </div>
  {/if}
</svelte:element>

<!--
@component
[Go to docs](https://svelte-5-ui-lib.codewithshin.com/)
## Props
@prop children
@prop href
@prop color = 'gray'
@prop horizontal = false
@prop shadow = 'md'
@prop reverse = false
@prop img
@prop padding = 'lg'
@prop size = 'sm'
@prop class: className
@prop imgClass
@prop contentClass
@prop onclick
@prop ...restProps
-->
