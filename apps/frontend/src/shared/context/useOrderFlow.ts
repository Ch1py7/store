import { create } from 'zustand'

export interface OrderFlowState {
	step: 'cart' | 'checkout' | 'payment' | 'confirmation'
	setStep: (step: OrderFlowState['step']) => void
}

export const useOrderFlowStore = create<OrderFlowState>((set) => ({
	step: 'cart',
	setStep: (step) => set({ step }),
}))
