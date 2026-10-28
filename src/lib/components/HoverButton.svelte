<script lang="ts">
	let hover = $state(false);

	function onmouseenter() {
		hover = true;
	}

	function onmouseleave() {
		hover = false;
	}

	let { child, ...props } = $props();
</script>

<a {onmouseenter} {onmouseleave} {...props}>
	{@render child(hover)}
</a>
