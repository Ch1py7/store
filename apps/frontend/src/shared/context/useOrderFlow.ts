import { create } from 'zustand'

export interface OrderFlowState {
	step: 'cart' | 'checkout' | 'payment' | 'confirmation' | 'shipping'
	setStep: (step: OrderFlowState['step']) => void
}

export const useOrderFlowStore = create<OrderFlowState>((set) => ({
	step: 'payment',
	setStep: (step) => set({ step }),
}))
