import {Animated} from 'react-native';

export function elevationStyle(value?: any, color?: string): any {
    if (typeof value === 'undefined' || value === 0 || color === 'transparent') {
        return {};
    }
    if (typeof value === 'number') {
        const elevation: number = Math.abs(value || 0);
        return {
            shadowOpacity: 0.0015 * elevation + 0.18,
            shadowRadius: 0.54 * elevation,
            shadowColor: color || '#000',
            shadowOffset: {
                width: 0,
                height: 0.6 * (value || 0),
            },
            elevation,
        };
    }
    if (value instanceof Animated.Value) {
        return {
            shadowOpacity: Animated.add(Animated.multiply(value, 0.0015), 0.18),
            shadowRadius: Animated.multiply(value, 0.54),
            shadowColor: color || '#000',
            shadowOffset: {
                width: 0,
                height: Animated.multiply(value, 0.6),
            },
            elevation: value,
        };
    }
    return {};
}
