export const centeroid =  (geometry) => {
    let polygon = [];

    switch (geometry.type) {
        case "MultiPolygon":
            geometry.coordinates.forEach(function (d, i) {
                if (i == 0 || polygon.length < d[0].length) polygon = d[0];
            });
            break;
        case "Polygon":
            polygon = geometry.coordinates[0];
            break;
    }

    const center = polygon
        .reduce(
            function (a, b) {
                return [
                    a[0] + b[0] / polygon.length,
                    a[1] + b[1] / polygon.length,
                ];
            },
            [0, 0]
        )

    return { lng: center[0], lat: center[1] }
}