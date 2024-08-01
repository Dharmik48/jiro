import { Skeleton } from '@/components/ui/skeleton'
import ToolButton from './ToolButton'
import {
	Circle,
	MousePointer2,
	Pencil,
	Redo,
	Square,
	StickyNote,
	Type,
	Undo,
} from 'lucide-react'
import { CanvasMode, CanvasState, LayerType } from '@/types'

interface Props {
	canvasState: CanvasState
	setCanvasState: (state: CanvasState) => void
}

const Toolbar = ({ canvasState, setCanvasState }: Props) => {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-2 bg-secondary gap-2 text-secondary-foreground border-border shadow-sm max-w-sm flex flex-col'>
				<ToolButton
					icon={MousePointer2}
					label='Select'
					onClick={() => setCanvasState({ mode: CanvasMode.NONE })}
					isActive={[
						CanvasMode.NONE,
						CanvasMode.RESIZING,
						CanvasMode.TRANSLATING,
					].includes(canvasState.mode)}
				/>
				<ToolButton
					icon={Type}
					label='Type'
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.INSERTING,
							layerType: LayerType.TEXT,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.INSERTING &&
						canvasState.layerType === LayerType.TEXT
					}
				/>
				<ToolButton
					icon={StickyNote}
					label='Sticky Note'
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.INSERTING,
							layerType: LayerType.NOTE,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.INSERTING &&
						canvasState.layerType === LayerType.NOTE
					}
				/>
				<ToolButton
					icon={Square}
					label='Rectangle'
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.INSERTING,
							layerType: LayerType.RECTANGLE,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.INSERTING &&
						canvasState.layerType === LayerType.RECTANGLE
					}
				/>
				<ToolButton
					icon={Circle}
					label='Circle'
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.INSERTING,
							layerType: LayerType.ELLIPSIS,
						})
					}
					isActive={
						canvasState.mode === CanvasMode.INSERTING &&
						canvasState.layerType === LayerType.ELLIPSIS
					}
				/>
				<ToolButton
					icon={Pencil}
					label='Pencil'
					onClick={() =>
						setCanvasState({
							mode: CanvasMode.PENCIL,
						})
					}
					isActive={canvasState.mode === CanvasMode.PENCIL}
				/>
			</div>
			<div className='rounded-lg border p-2 bg-secondary text-secondary-foreground border-border shadow-sm max-w-sm flex flex-col gap-2'>
				<ToolButton
					icon={Undo}
					label='Undo'
					onClick={() => {}}
					isDisabled={true}
				/>
				<ToolButton
					icon={Redo}
					label='Redo'
					onClick={() => {}}
					isDisabled={true}
				/>
			</div>
		</div>
	)
}

Toolbar.Skeleton = function ToolbarSkeleton() {
	return (
		<div className='absolute top-1/2 left-4 -translate-y-1/2 space-y-4'>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-28'>
				<Skeleton />
			</div>
			<div className='rounded-lg border p-4 bg-secondary text-secondary-foreground border-border shadow-sm w-28 h-16'>
				<Skeleton />
			</div>
		</div>
	)
}

export default Toolbar
