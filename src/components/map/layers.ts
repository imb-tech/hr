import type { LayerProps } from 'react-map-gl/mapbox';

export const clusterLayer = ({ source, id }: { source: string, id: string }): LayerProps => {
    return {
        id: 'clusters' + id,
        type: 'circle',
        source,
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
            'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
        }
    };
}

export const clusterCountLayer = ({ source, id }: { source: string, id: string }): LayerProps => {
    return {
        id: 'cluster-count' + id,
        type: 'symbol',
        source,
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    };
}

export const unclusteredPointLayer = ({ source, id, color }: { source: string, id: string, color?: string }): LayerProps => {
    return {
        id: 'unclustered-point' + id,
        type: 'circle',
        source,
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': color ?? '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 0.5,
            'circle-stroke-color': '#fff'
        }
    };
} 