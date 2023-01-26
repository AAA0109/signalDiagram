<script lang="ts">
	import { screens, currentScreenIndex } from '$lib/store.designer';
	import { addUndoAfter, addUndoPrevious } from '$lib/functions';

	const rearViewChanged = (e:any) => {
		addUndoPrevious();
		$screens[$currentScreenIndex].isRearView = e.target.checked;
		addUndoAfter();
	}

	const showCoordinateChanged = (e:any) => {
		addUndoPrevious();
		$screens[$currentScreenIndex].showCoordinates = e.target.checked;
		addUndoAfter();
	}

	const opacityChanged = (e:any) => {
		addUndoPrevious();
		$screens[$currentScreenIndex].opacity = e.target.value;
		addUndoAfter();		
	}

	const fontSizeChanged = (e:any) => {
		addUndoPrevious();
		$screens[$currentScreenIndex].rearViewLabelFontSize = e.target.value;
		addUndoAfter();		
	}


</script>

<div class="general">
	<label class="hovered">
		<input
			type="checkbox"
			on:change={showCoordinateChanged} 
			checked={$screens[$currentScreenIndex].showCoordinates}
			/> 
		<!-- bind:checked={$screens[$currentScreenIndex].showCoordinates} -->
		Show Coordinates
	</label>

	<div class="divider" />

	<div id="input-wrapper" class="rear-view-options">
		<label class="hovered">
			<input
				type="checkbox"
				checked={$screens[$currentScreenIndex].isRearView}
				on:change={rearViewChanged} 
				/>
			<!-- bind:checked={$screens[$currentScreenIndex].isRearView}  -->
			Rear View
		</label>
		<div class="input-row">
			<div class="label">Opacity</div>
			<input
				disabled={!$screens[$currentScreenIndex].isRearView}
				type="range"
				min="0"
				max=".5"
				step=".01"
				value={$screens[$currentScreenIndex].opacity}
				on:change={opacityChanged}
				class="range"
				/>
				<!-- bind:value={$screens[$currentScreenIndex].opacity} -->
		</div>
		<div class="input-row">
			<div class="label">Font Size</div>
			<input
				disabled={!$screens[$currentScreenIndex].isRearView}
				type="range"
				min="0"
				max="1000"
				step="1"
				value={$screens[$currentScreenIndex].rearViewLabelFontSize}
				on:change={fontSizeChanged}
				class="range"
				/>
				<!-- bind:value={$screens[$currentScreenIndex].rearViewLabelFontSize} -->
		</div>
	</div>
</div>

<style>
	.input-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.general {
		margin-top: 5px;
	}
	label {
		padding-right: 10px;
	}
	label:hover {
		outline: 1.5px solid rgba(0, 0, 0, 0.445);
	}
	.rear-view-options {
		display: flex;
		margin-top: 10px;
		flex-direction: column;
		width: 100%;
	}
	.range {
		margin-top: 5px;
		flex: 0.8;
	}
</style>
