export default function NestedExpendedConfig(record) {
    if (record.hasOwnProperty('dishes')) {
        if (record.dishes.length > 1) {
            return record.dishes.length > 1;
        }
    } else {
        return record.desc.length > 1;
    }
}
