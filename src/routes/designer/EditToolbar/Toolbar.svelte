<script lang="ts">
	import Mode from './Toolbar.Mode.svelte';
	import Panels from './Toolbar.Panels.svelte';
	import SnapPoints from './Toolbar.SnapPoints.svelte';
	import SignalLines from './Toolbar.SignalLines.svelte';

	import { selection, currentScreenIndex } from '$lib/store.designer';

	import { undo, redo } from '$lib/functions'
</script>

<div id="container">
	<div class="crisscross">
		<button class="criss-cross" on:click={undo}>Undo</button>
		<button class="criss-cross" on:click={redo}>Redo</button>
	</div>

	<div id="mode">
		<Mode />
	</div>

	{#if typeof $currentScreenIndex === 'number'}
		<div class="divider" />

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="title-container">
			<div
				class="title"
				on:click={() => ($selection = 'panels')}
				class:selected={$selection === 'panels'}
			>
				Panels
			</div>
			<div
				class="title"
				on:click={() => ($selection = 'snappoints')}
				class:selected={$selection === 'snappoints'}
			>
				Snap Points
			</div>
			<div
				class="title"
				on:click={() => ($selection = 'signallines')}
				class:selected={$selection === 'signallines'}
			>
				Signal Lines
			</div>
		</div>
	{/if}

	<div id="selectors">
		{#if $selection === 'panels'}
			<Panels />
		{/if}

		{#if $selection === 'snappoints'}
			<SnapPoints />
		{/if}

		{#if $selection === 'signallines'}
			<SignalLines />
		{/if}
	</div>
</div>

<style>
	.selected {
		color: #fff;
		background-color: var(--color-secondary);
		padding: 5px;
		transition: all 0.33s ease-in-out;
	}
	.title-container {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.title {
		padding: 5px;
		cursor: pointer;
	}
	.title:hover {
		outline: 1px solid #000;
	}

	#mode {
		margin-top: 0px;
	}

	#container {
		width: calc(100% - 10px);
		height: calc(100vh - 10px);
		color: #f7f7f7;
		font-size: 1em;
		font-weight: 500;
		display: flex;
		flex-direction: column;
		user-select: none;
		margin: 5px;
	}

	#selectors {
		position: relative;
		flex: 1;

		display: flex;
	}
	
	.criss-cross {
		padding: 5px;
		width: 45%;
	}

	.crisscross {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
	}
</style>
